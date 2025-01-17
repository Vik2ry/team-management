"use client";

import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { Team, Position, mapPosition } from "@/types";
import { PlayerCard } from "@/components/player-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, Users, Trophy, Link, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const fetchTeam = async (): Promise<Team> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const { data } = await axios.get("/api/team", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"ALL" | Position>("ALL");
  const {
    data: team,
    isLoading,
    error,
  } = useQuery(["team"], fetchTeam, {
    staleTime: 300000,
    retry: 1,
  });

  const positions: Position[] = ["GK", "DEF", "MID", "FWD"];

  const calculateTeamRating = (players: Team["players"]) => {
    if (!players?.length) return 0;
    return Math.round(
      players.reduce((acc, player) => acc + player.rating, 0) / players.length
    );
  };

  const filteredPlayers = team?.players.filter((player) =>
    activeTab === "ALL" ? true : mapPosition(player.position) === activeTab
  );

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/80 backdrop-blur-sm fixed w-full z-50">
        <Link className="flex items-center justify-center" href="/">
          <Shield className="h-6 w-6 text-green-600" />
          <span className="ml-2 text-xl font-bold">FantasyPro</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/market"
          >
            Market
          </Link>
          {/* add a functional logout icon here */}
        </nav>
      </header>
      <div className="container mt-16 mx-auto py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-6">Your Team</h1>
          {!isLoading && !error && team && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Budget Available
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${team.budget.toLocaleString()}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Squad Size
                  </CardTitle>
                  <Users className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {team.players.length} Players
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Team Rating
                  </CardTitle>
                  <Trophy className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {calculateTeamRating(team.players)}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-[500px] rounded-lg" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-500">Failed to load team.</div>
        ) : (
          team && (
            <Tabs
              value={activeTab}
              onValueChange={(value) => setActiveTab(value as "ALL" | Position)}
              className="space-y-6"
            >
              <TabsList>
                <TabsTrigger value="ALL">All Players</TabsTrigger>
                {positions.map((pos) => (
                  <TabsTrigger key={pos} value={pos}>
                    {pos}
                  </TabsTrigger>
                ))}
              </TabsList>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredPlayers?.map((player) => (
                  <PlayerCard key={player.id} player={player} />
                ))}
              </div>
            </Tabs>
          )
        )}
      </div>
    </div>
  );
}
