"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"

function Bubble({ x, y, size, color }: { x: number; y: number; size: number; color: string }) {
  return (
    <motion.circle
      cx={x}
      cy={y}
      r={size}
      fill={color}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0.7, 0.3, 0.7],
        scale: [1, 1.2, 1],
        x: x + Math.random() * 100 - 50,
        y: y + Math.random() * 100 - 50,
      }}
      transition={{
        duration: 5 + Math.random() * 10,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
      }}
    />
  )
}

function FloatingBubbles() {
  const [bubbles, setBubbles] = useState<Array<{ id: number; x: number; y: number; size: number; color: string }>>([])

  useEffect(() => {
    const newBubbles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 20 + 5,
      color: `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.3)`,
    }))
    setBubbles(newBubbles)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full">
        <title>Floating Bubbles</title>
        {bubbles.map((bubble) => (
          <Bubble key={bubble.id} {...bubble} />
        ))}
      </svg>
    </div>
  )
}

function Navbar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-20 bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-pink-500 dark:text-pink-300 flex items-center">
              <span className="text-2xl mr-1">🐰</span> pupu.ai
            </span>
            <nav className="hidden md:block ml-10">
              <ul className="flex space-x-4">
                <li>
                  <a
                    href="#"
                    className="px-4 py-2 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-300 
                              hover:bg-pink-200 dark:hover:bg-pink-800/50 transition-all duration-300 
                              border-2 border-pink-200 dark:border-pink-700 hover:scale-105 
                              font-medium text-sm flex items-center"
                  >
                    <span className="mr-1">🏠</span> Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 
                              hover:bg-purple-200 dark:hover:bg-purple-800/50 transition-all duration-300 
                              border-2 border-purple-200 dark:border-purple-700 hover:scale-105 
                              font-medium text-sm flex items-center"
                  >
                    <span className="mr-1">✨</span> Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 
                              hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-all duration-300 
                              border-2 border-blue-200 dark:border-blue-700 hover:scale-105 
                              font-medium text-sm flex items-center"
                  >
                    <span className="mr-1">💰</span> Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300 
                              hover:bg-green-200 dark:hover:bg-green-800/50 transition-all duration-300 
                              border-2 border-green-200 dark:border-green-700 hover:scale-105 
                              font-medium text-sm flex items-center"
                  >
                    <span className="mr-1">🌱</span> About
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 
                      transition-all duration-300 hover:scale-110 border-2 border-gray-200 dark:border-gray-700"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5 text-gray-700 dark:text-gray-300" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default function FloatingBubblesBackground({
  title = "pupu.ai",
}: {
  title?: string
}) {
  const words = title.split(" ")

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
      <Navbar />
      <FloatingBubbles />

      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold mb-8 tracking-tighter">
            {words.map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block mr-4 last:mr-0">
                {word.split("").map((letter, letterIndex) => (
                  <motion.span
                    key={`${wordIndex}-${letterIndex}`}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: wordIndex * 0.1 + letterIndex * 0.03,
                      type: "spring",
                      stiffness: 150,
                      damping: 25,
                    }}
                    className="inline-block text-transparent bg-clip-text 
                               bg-gradient-to-r from-blue-600 to-purple-600 
                               dark:from-blue-300 dark:to-purple-300"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          <div
            className="inline-block group relative bg-gradient-to-b from-blue-400/30 to-purple-400/30 
                       dark:from-blue-600/30 dark:to-purple-600/30 p-px rounded-2xl backdrop-blur-lg 
                       overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <Button
              variant="ghost"
              className="rounded-[1.15rem] px-8 py-6 text-lg font-semibold backdrop-blur-md 
                         bg-white/80 hover:bg-white/90 dark:bg-black/80 dark:hover:bg-black/90 
                         text-blue-600 dark:text-blue-300 transition-all duration-300 
                         group-hover:-translate-y-0.5 border border-blue-200/50 dark:border-blue-700/50
                         hover:shadow-md dark:hover:shadow-blue-900/30"
            >
              <span className="opacity-90 group-hover:opacity-100 transition-opacity">Explore</span>
              <span
                className="ml-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-1.5 
                           transition-all duration-300"
              >
                →
              </span>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
