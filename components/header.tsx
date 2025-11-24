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
}

export const Header: React.FC<HeaderProps> = ({ searchQuery, onSearchChange, onFilterToggle, showOnlyMine }) => {
  const { wallet, connectWallet, disconnectWallet } = useWallet()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-lg border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col gap-4">
          {/* Top Bar */}
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">⚔️</span>
              </div>
              <h1 className="text-2xl font-bold text-white">Game Asset Dashboard</h1>
            </div>

            {/* Wallet Button */}
            <div className="relative">
              <button
                onClick={() => {
                  if (wallet.isConnected) {
                    setIsDropdownOpen(!isDropdownOpen)
                  } else {
                    connectWallet()
                  }
                }}
                className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                  wallet.isConnected
                    ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/50"
                    : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/50 hover:shadow-indigo-500/70"
                }`}
              >
                {wallet.isConnected ? shortenAddress(wallet.address) : "Connect Wallet"}
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && wallet.isConnected && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-xl border border-slate-700 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                  <div className="px-4 py-3 border-b border-slate-700">
                    <p className="text-xs text-slate-400">Connected Address</p>
                    <p className="text-sm text-white font-mono truncate">{wallet.address}</p>
                  </div>
                  <button
                    onClick={() => {
                      disconnectWallet()
                      setIsDropdownOpen(false)
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-slate-700 transition-colors"
                  >
                    Disconnect
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search assets..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-all"
              />
            </div>

            {/* Filter & Refresh */}
            <div className="flex gap-2">
              {wallet.isConnected && (
                <button
                  onClick={() => onFilterToggle(!showOnlyMine)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    showOnlyMine
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/50"
                      : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                  }`}
                >
                  {showOnlyMine ? "✓ My Assets" : "My Assets"}
                </button>
              )}
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg font-semibold hover:bg-slate-600 transition-all duration-300"
              >
                ↻ Refresh
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
