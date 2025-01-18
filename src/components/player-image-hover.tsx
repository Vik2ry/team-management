'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { getFootballGif } from '@/utils/football-api'

interface PlayerImageHoverProps {
  playerImage: string
  playerName: string
}

export function PlayerImageHover({ playerImage, playerName }: PlayerImageHoverProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [celebrationGif, setCelebrationGif] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isHovered && !celebrationGif) {
      setIsLoading(true)
      getFootballGif()
        .then((url) => {
          setCelebrationGif(url)
          setIsLoading(false)
        })
        .catch(() => setIsLoading(false))
    }
  }, [isHovered, celebrationGif])

  return (
    <div 
      className="relative w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setCelebrationGif(null)
      }}
    >
      <AnimatePresence>
        {isHovered && (celebrationGif || isLoading) && (
          <motion.div
            key="hover-image"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-20"
          >
            {isLoading ? (
              <div className="w-full h-full bg-gray-200 animate-pulse" />
            ) : (
              <Image
                src={celebrationGif || "/placeholder.svg"}
                alt={`${playerName} celebration`}
                fill
                className="object-cover"
                unoptimized
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <Image
        src={playerImage || "/placeholder.svg"}
        alt={playerName}
        fill
        className="object-cover"
        priority={false}
      />
    </div>
  )
}

