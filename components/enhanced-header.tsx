"use client"

import type React from "react"
import { useState } from "react"
import { useWallet } from "@/context/wallet-context"
import { shortenAddress } from "@/lib/utils"

interface HeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  onFilterToggle: (show: boolean) => void
  showOnlyMine: boolean
  isLoading?: boolean
}

export const EnhancedHeader: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  onFilterToggle,
  showOnlyMine,
  isLoading = false,
}) => {
  const { wallet, connectWallet, disconnectWallet } = useWallet()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const handleRefresh = () => {
    window.location.reload()
  }

  return (
    <header className="sticky top-0 z-50 glass border-b border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col gap-4">
          {/* Top Bar with Logo and Wallet */}
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 rounded-lg gradient-primary opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 rounded-lg border border-purple-400/30 group-hover:border-purple-400/60 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center text-lg">⚔️</div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Nexus
                </h1>
                <p className="text-xs text-slate-400">Game Assets</p>
              </div>
            </div>

            {/* Wallet Connection Button */}
            <div className="relative">
              <button
                onClick={() => {
                  if (wallet.isConnected) {
                    setIsDropdownOpen(!isDropdownOpen)
                  } else {
                    connectWallet()
                  }
                }}
                disabled={isLoading}
                className="group relative px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 overflow-hidden disabled:opacity-50"
              >
                <div
                  className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                    wallet.isConnected ? "gradient-success" : "gradient-primary"
                  }`}
                />
                <div className="absolute inset-0 rounded-lg border border-white/20 group-hover:border-white/40 transition-colors" />
                <span className="relative text-white flex items-center gap-2">
                  {wallet.isConnected ? (
                    <>
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      {shortenAddress(wallet.address)}
                    </>
                  ) : (
                    <>
                      <span>🔗</span>
                      Connect Wallet
                    </>
                  )}
                </span>
              </button>

              {isDropdownOpen && wallet.isConnected && (
                <div className="absolute right-0 mt-3 w-56 glass rounded-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                  <div className="px-4 py-4 border-b border-slate-700/50 bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
                    <p className="text-xs text-slate-400 mb-1">Connected Address</p>
                    <p className="text-sm text-white font-mono break-all">{wallet.address}</p>
                  </div>
                  <button
                    onClick={() => {
                      disconnectWallet()
                      setIsDropdownOpen(false)
                    }}
                    className="w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-red-500/10 transition-colors border-t border-slate-700/50"
                  >
                    ✕ Disconnect Wallet
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            {/* Search Bar with Focus Effect */}
            <div className={`flex-1 max-w-md relative transition-all duration-300 ${isFocused ? "scale-105" : ""}`}>
              <div className="absolute inset-0 rounded-lg gradient-primary opacity-0 group-hover:opacity-20 blur transition-opacity" />
              <div
                className={`relative flex items-center gap-2 px-4 py-3 rounded-lg glass transition-all duration-300 border ${
                  isFocused
                    ? "border-indigo-500/50 shadow-lg shadow-indigo-500/20"
                    : "border-slate-700/50 hover:border-slate-600/50"
                }`}
              >
                <span className="text-lg">🔍</span>
                <input
                  type="text"
                  placeholder="Search assets by name or ID..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="flex-1 bg-transparent text-white placeholder-slate-400 focus:outline-none text-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange("")}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex gap-2">
              {wallet.isConnected && (
                <button
                  onClick={() => onFilterToggle(!showOnlyMine)}
                  className={`group relative px-4 py-2.5 rounded-lg font-semibold transition-all duration-300 overflow-hidden ${
                    showOnlyMine ? "opacity-100" : "opacity-75 hover:opacity-100"
                  }`}
                >
                  <div
                    className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                      showOnlyMine ? "gradient-success" : "bg-slate-700/50"
                    }`}
                  />
                  <div className="absolute inset-0 rounded-lg border border-white/10 group-hover:border-white/20 transition-colors" />
                  <span className="relative text-white text-sm flex items-center gap-2">
                    {showOnlyMine ? "✓" : "○"} My Assets
                  </span>
                </button>
              )}

              <button
                onClick={handleRefresh}
                disabled={isLoading}
                className="group relative px-4 py-2.5 rounded-lg font-semibold transition-all duration-300 overflow-hidden disabled:opacity-50"
              >
                <div className="absolute inset-0 rounded-lg bg-slate-700/50 group-hover:bg-slate-600 transition-colors" />
                <div className="absolute inset-0 rounded-lg border border-white/10 group-hover:border-white/20 transition-colors" />
                <span className="relative text-white text-sm flex items-center gap-2">
                  <span
                    className={isLoading ? "spin-slow" : "group-hover:rotate-180 transition-transform duration-500"}
                  >
                    ↻
                  </span>
                  Refresh
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
