'use client'

import { motion } from 'framer-motion'
import { Player } from '@/types'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import Image from 'next/image'

interface PlayerCardProps {
  player: Player
  onBuy?: (playerId: string) => Promise<void>
  showBuyButton?: boolean
}

const getPlayerImage = (name: string) => {
  const seed = encodeURIComponent(name)
  return `https://api.dicebear.com/7.x/personas/png?seed=${seed}&backgroundColor=b6e3f4`
}

export function PlayerCard({ player, onBuy, showBuyButton = false }: PlayerCardProps) {
  // Get stats based on position
  const getStats = () => {
    if (player.position === 'GK') {
      return [
        { name: 'Diving', value: player.diving },
        { name: 'Handling', value: player.handling },
        { name: 'Kicking', value: player.kicking },
        { name: 'Reflexes', value: player.reflexes },
        { name: 'Speed', value: player.speed },
        { name: 'Positioning', value: player.positioning }
      ]
    }
    return [
      { name: 'Pace', value: player.pace },
      { name: 'Shooting', value: player.shooting },
      { name: 'Passing', value: player.passing },
      { name: 'Dribbling', value: player.dribbling },
      { name: 'Defending', value: player.defending },
      { name: 'Physical', value: player.physical }
    ]
  }

  const stats = getStats()

  // Get position color
  const getPositionColor = () => {
    switch (player.position) {
      case 'GK':
        return 'bg-yellow-600'
      case 'DEF':
        return 'bg-blue-600'
      case 'MID':
        return 'bg-green-600'
      case 'FWD':
        return 'bg-red-600'
      default:
        return 'bg-gray-600'
    }
  }

  // Get rating color based on rating value
  const getRatingColor = () => {
    if (player.rating >= 85) return 'text-yellow-600 border-yellow-600'
    if (player.rating >= 80) return 'text-green-600 border-green-600'
    if (player.rating >= 75) return 'text-blue-600 border-blue-600'
    return 'text-gray-600 border-gray-600'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="overflow-hidden bg-white dark:bg-gray-800">
        <CardHeader className="relative h-48 p-0">
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
          <Image
            src={getPlayerImage(player.name) || "/placeholder.svg"}
            alt={player.name}
            fill
            className="object-cover"
            priority={false}
          />
          <div className="absolute top-2 right-2 z-20">
            <Badge 
              variant="secondary" 
              className={`${getPositionColor()} text-white font-semibold`}
            >
              {player.position}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="flex justify-between items-center">
            <span className="text-lg font-bold truncate">{player.name}</span>
            <Badge 
              variant="outline" 
              className={`${getRatingColor()} font-bold`}
            >
              {player.rating}
            </Badge>
          </CardTitle>
          <CardDescription className="mt-1 mb-4">
            Value: ${player.value?.toLocaleString() ?? 'N/A'}
          </CardDescription>
          <div className="mt-4 space-y-3">
            {stats.map(({ name, value }) => (
              <div key={name} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{name}</span>
                  <span className="font-semibold">{value ?? 'N/A'}</span>
                </div>
                <Progress 
                  value={value ?? 0} 
                  className={`h-1.5 bg-gray-100 dark:bg-gray-700 ${value && value >= 80 ? 'bg-green-600' : ''}`}
                />
              </div>
            ))}
          </div>
        </CardContent>
        {showBuyButton && player.forSale && (
          <CardFooter className="p-4 pt-0">
            <Button 
              className="w-full bg-green-600 hover:bg-green-700 transition-colors"
              onClick={() => onBuy?.(player.id)}
            >
              Buy for ${player.askingPrice.toLocaleString()}
            </Button>
          </CardFooter>
        )}
      </Card>
    </motion.div>
  )
}

