"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { LoadingSpinner } from "./loading-spinner"

interface HeroSectionProps {
  isLoading: boolean
  onExploreClick: () => void
}

export const HeroSection: React.FC<HeroSectionProps> = ({ isLoading, onExploreClick }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  if (isLoading) {
    return (
      <div className="relative min-h-96 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <section
      className={`relative py-20 px-4 overflow-hidden transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 gradient-primary opacity-10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 gradient-success opacity-10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="max-w-4xl mx-auto text-center space-y-6">
        {/* Main Heading */}
        <div
          className={`space-y-2 transition-all duration-700 delay-100 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          <h2 className="text-5xl md:text-6xl font-bold">
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Ultimate Game Assets
            </span>
          </h2>
          <p className="text-xl text-slate-400">Explore, own, and trade legendary NFT game assets on Nexus</p>
        </div>

        {/* Stats Row */}
        <div
          className={`grid grid-cols-3 gap-4 max-w-2xl mx-auto mt-8 transition-all duration-700 delay-200 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          <div className="glass rounded-lg p-4">
            <p className="text-3xl font-bold text-indigo-400">8+</p>
            <p className="text-sm text-slate-400 mt-1">Unique Assets</p>
          </div>
          <div className="glass rounded-lg p-4">
            <p className="text-3xl font-bold text-purple-400">∞</p>
            <p className="text-sm text-slate-400 mt-1">Blockchain</p>
          </div>
          <div className="glass rounded-lg p-4">
            <p className="text-3xl font-bold text-emerald-400">0.24</p>
            <p className="text-sm text-slate-400 mt-1">Total Value</p>
          </div>
        </div>

        {/* CTA Button */}
        <div
          className={`mt-10 transition-all duration-700 delay-300 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          <button
            onClick={onExploreClick}
            className="group relative px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 rounded-lg gradient-primary" />
            <div className="absolute inset-0 rounded-lg border border-white/20 group-hover:border-white/40 transition-colors" />
            <span className="relative text-white flex items-center gap-2">
              Explore Assets
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}
