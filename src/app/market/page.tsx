'use client'

import { useState } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import { motion } from 'framer-motion'
import { Player, Position } from '@/types'
import { PlayerCard } from '@/components/player-card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'
import { Card } from '@/components/ui/card'

const fetchPlayers = async (): Promise<Player[]> => {
  const { data } = await axios.get<Player[]>('/api/market')
  return data
}

export default function Market() {
  const [filter, setFilter] = useState('')
  const [positionFilter, setPositionFilter] = useState<'ALL' | Position>('ALL')

  const { data: players, error, isLoading } = useQuery<Player[], Error>(
    'players',
    fetchPlayers
  )

  const handleBuy = async (playerId: string) => {
    try {
      const token = localStorage.getItem('token')
      await axios.post(
        '/api/market/buy',
        { playerId },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      toast.success('Player purchased successfully!')
    } catch (err) {
      toast.error('Failed to purchase player.')
    }
  }

  const filteredPlayers = players?.filter((player) => {
    const matchesSearch = player.name.toLowerCase().includes(filter.toLowerCase())
    const matchesPosition = positionFilter === 'ALL' || player.position === positionFilter
    return matchesSearch && matchesPosition && player.forSale
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Transfer Market</h1>
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
                onValueChange={(value) => setPositionFilter(value as 'ALL' | Position)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Positions</SelectItem>
                  <SelectItem value="Goalkeeper">Goalkeepers</SelectItem>
                  <SelectItem value="Defender">Defenders</SelectItem>
                  <SelectItem value="Midfielder">Midfielders</SelectItem>
                  <SelectItem value="Attacker">Attackers</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-[500px]" />
              </Card>
            ))}
          </div>
        ) : error ? (
          <div className="text-center p-8 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <p className="text-red-600 dark:text-red-400">Error: {error.message}</p>
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
  )
}

