"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Github, Sparkles, MessageCircle, ShieldCheck } from "lucide-react"
import Link from 'next/link';

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

function skipToPrivacyPolicyPage() {
  const privacyPolicySection = document.getElementById("privacy-policy-section");
  if (privacyPolicySection) {
    privacyPolicySection.scrollIntoView({ behavior: "smooth" });
  }
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
          </div>

          <Link href="/privacy" className="ml-auto mr-6 flex text-blue-600 items-center cursor-pointer">
            Privacy policy
          </Link>
          
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

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features-section");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    // Main wrapper for gradient and bubbles to span the entire page
    <div className="relative w-full min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 overflow-x-hidden">
      <FloatingBubbles /> {/* Bubbles now cover the entire background */}

      {/* Hero Section - content above bubbles */}
      <div className="relative z-10 min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        <Navbar />
        <div className="relative z-10 container mx-auto px-4 md:px-6 text-center flex-grow flex flex-col items-center justify-center">
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

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 0.5, // Delay after title animation
                type: "spring",
                stiffness: 100,
                damping: 20,
              }}
              className="mb-12"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-500 dark:from-pink-400 dark:to-yellow-400">
                Introducing Story AI
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Story AI is an innovative platform designed for children. We bring stories to life with AI-powered narration and interactive audio responses, making learning fun and engaging.
              </p>
            </motion.div>

            <div
              className="inline-block group relative bg-gradient-to-b from-blue-400/30 to-purple-400/30 
                       dark:from-blue-600/30 dark:to-purple-600/30 p-px rounded-2xl backdrop-blur-lg 
                       overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <Button
                variant="ghost"
                onClick={scrollToFeatures} // Added onClick handler
                className="rounded-[1.15rem] px-8 py-6 text-lg font-semibold backdrop-blur-md 
                         bg-white/80 hover:bg-white/90 dark:bg-black/80 dark:hover:bg-black/90 
                         text-blue-600 dark:text-blue-300 transition-all duration-300 
                         group-hover:-translate-y-0.5 border border-blue-200/50 dark:border-blue-700/50
                         hover:shadow-md dark:hover:shadow-blue-900/30 cursor-pointer"
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

      {/* Features Section - content above bubbles, transparent background to show main gradient/bubbles */}
      <section id="features-section" className="relative z-10 w-full py-20">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight 
                           text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 
                           dark:from-purple-400 dark:to-pink-400">
              Discover the Magic of Story AI
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our platform is crafted to provide an enchanting and educational storytelling experience for children.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[{
              icon: <Sparkles className="w-12 h-12 text-yellow-500 mb-4" />,
              title: "AI-Powered Storytelling",
              description: "Engaging and imaginative tales dynamically generated by advanced AI, designed to captivate young minds and spark creativity."
            }, {
              icon: <MessageCircle className="w-12 h-12 text-blue-500 mb-4" />,
              title: "Interactive Audio Responses",
              description: "Children can actively participate by responding to stories, influencing the narrative and making each experience unique and personal."
            }, {
              icon: <ShieldCheck className="w-12 h-12 text-green-500 mb-4" />,
              title: "Safe & Fun Learning Environment",
              description: "A secure, ad-free platform where children can explore, learn, and play with peace of mind for parents."
            }].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="bg-white dark:bg-slate-800/50 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 
                           border border-transparent hover:border-purple-300 dark:hover:border-purple-700 flex flex-col items-center text-center"
              >
                {feature.icon}
                <h3 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-gray-100">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Download Buttons Start */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }} // Delay after feature cards
          className="mt-20 text-center"
        >
          <h3 className="text-3xl font-semibold mb-8 text-gray-800 dark:text-gray-100">
            Get Started with Story AI
          </h3>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <a
              href="#" // Replace with actual App Store link
              className="flex items-center justify-center gap-3 px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-lg text-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-apple"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"/><path d="M10 2c1 .5 2 2 2 5"/></svg>
              <span>App Store</span>
            </a>
            <a
              href="#" // Replace with actual Google Play link
              className="flex items-center justify-center gap-3 px-8 py-4 bg-gray-700 dark:bg-gray-300 text-white dark:text-black rounded-lg text-lg font-medium hover:bg-gray-600 dark:hover:bg-gray-400 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* Basic Google Play-like icon (simplified) */}
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-white dark:text-black"><path d="M3 20.517V3.483A2.006 2.006 0 0 1 4.274 1.7L15.726 12L4.274 22.3A2.006 2.006 0 0 1 3 20.517zM17.184 12.75L6.468 19.965l7.708-3.854.001-.001.001-.001 3.006-1.503zm0-1.5L6.468 4.035l7.708 3.854.001.001.001.001 3.006 1.503zM20.726 12L17.185 14.25v-4.5L20.726 12z"/></svg>
              <span>Google Play</span>
            </a>
          </div>
        </motion.div>
        {/* Download Buttons End */}

      </section>
    </div>
  )
}
