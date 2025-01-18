"use client";

import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { Player, Position } from "@/types";
import { PlayerCard } from "@/components/player-card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Shield, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MetadataHelper from "@/components/metadata";

// Fetch the current user's team
const fetchTeam = async () => {
  const token = localStorage.getItem("token");
  const { data } = await axios.get("/api/team", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

// Fetch all players on the market
const fetchPlayers = async (): Promise<Player[]> => {
  const { data } = await axios.get<Player[]>("/api/market");
  return data;
};

export default function Market() {
  const router = useRouter();
  const [filter, setFilter] = useState("");
  const [positionFilter, setPositionFilter] = useState<Position | "ALL">("ALL");

  const {
    data: team,
    isLoading: teamLoading,
    error: teamError,
  } = useQuery(["team"], fetchTeam, {
    staleTime: 300000,
    retry: 1,
  });

  const {
    data: players,
    isLoading: playersLoading,
    error: playersError,
  } = useQuery<Player[], Error>("players", fetchPlayers);

  const handleBuy = async (playerId: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "/api/market",
        { playerId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      router.push("/dashboard");
      toast.success("Player purchased successfully!");
    } catch (err) {
      toast.error("Failed to purchase player.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  // Exclude players in the user's team
  const excludedPlayerIds =
    team?.players.map((player: Player) => player.id) || [];

  const [priceRange, setPriceRange] = useState<[number, number]>([
    50000, 5000000,
  ]); // Example range
  const [minRating, setMinRating] = useState(60); // Minimum rating filter

  const filteredPlayers = players?.filter((player) => {
    const isNotInTeam = !excludedPlayerIds.includes(player.id);
    const matchesSearch = player.name
      .toLowerCase()
      .includes(filter.toLowerCase());
    const matchesPosition =
      positionFilter === "ALL" || player.position === positionFilter;
    const matchesPrice =
      player.askingPrice >= priceRange[0] &&
      player.askingPrice <= priceRange[1];
    const matchesRating = player.rating >= minRating;

    return (
      isNotInTeam &&
      matchesSearch &&
      matchesPosition &&
      matchesPrice &&
      matchesRating &&
      player.forSale
    );
  });

  return (
    <>
      <MetadataHelper
        seoTitle={"Transfer Market"}
        seoDescription={"FantasyPro Transfer Market"}
      />
      <div className="flex flex-col min-h-screen">
        <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/80 backdrop-blur-sm fixed w-full z-50">
          <Link className="flex items-center justify-center" href="/">
            <Shield className="h-6 w-6 text-green-600" />
            <span className="ml-2 text-xl font-bold">FantasyPro</span>
          </Link>
          <nav className="ml-auto flex items-center gap-4 sm:gap-6">
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href="/dashboard"
            >
              Dashboard
            </Link>
            {/* Logout button for non-mobile screens */}
            <button
              onClick={handleLogout}
              className="hidden sm:block text-sm font-medium text-red-600 hover:underline underline-offset-4"
            >
              Logout
            </button>
            {/* Logout icon for mobile screens */}
            <button
              onClick={handleLogout}
              className="block sm:hidden text-red-600"
            >
              <LogOut className="h-6 w-6" />
            </button>
          </nav>
        </header>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <div className="container mt-16 mx-auto py-8 px-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                Transfer Market
              </h1>
              <Card className="p-4 mb-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    className="flex-1"
                    placeholder="Search players..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                  />
                  <Select
                    value={positionFilter}
                    onValueChange={(value: Position | "ALL") =>
                      setPositionFilter(value)
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">All Positions</SelectItem>
                      <SelectItem value="GK">Goalkeeper</SelectItem>
                      <SelectItem value="DEF">Defender</SelectItem>
                      <SelectItem value="MID">Midfielder</SelectItem>
                      <SelectItem value="FWD">Forward</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="mt-4 flex flex-col sm:flex-row gap-4 sm:max-w-sm mx-auto">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-2">
                      Price Range
                    </label>
                    <input
                      type="range"
                      min="50000"
                      max="5000000"
                      step="1"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], Number(e.target.value)])
                      }
                      className="w-full"
                    />
                    <div className="text-sm text-gray-500">
                      ${priceRange[0]} - ${priceRange[1]}
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-2">
                      Minimum Rating
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="1"
                      value={minRating}
                      onChange={(e) => setMinRating(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
              </Card>
            </motion.div>

            {teamLoading || playersLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <Skeleton className="h-[500px]" />
                  </Card>
                ))}
              </div>
            ) : teamError || playersError ? (
              <div className="text-center p-8 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <p className="text-red-600 dark:text-red-400">
                  Error:{" "}
                  {(teamError as any)?.message ||
                    (playersError as any)?.message}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredPlayers?.map((player) => (
                  <PlayerCard
                    key={player.id}
                    player={player}
                    onBuy={handleBuy}
                    showBuyButton
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
