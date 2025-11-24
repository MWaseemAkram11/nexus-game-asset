"use client"

import { useEffect, useState } from "react"
import { EnhancedHeader } from "@/components/enhanced-header"
import { PremiumAssetGrid } from "@/components/premium-asset-card"
import { StatsSection } from "@/components/stats-section"
import { HeroSection } from "@/components/hero-section"
import { SkeletonGrid } from "@/components/loading-spinner"
import { useWallet } from "@/context/wallet-context"
import { useAssetFilter } from "@/hooks/use-asset-filter"

export default function Home() {
  const { wallet, assets } = useWallet()
  const [searchQuery, setSearchQuery] = useState("")
  const [showOnlyMine, setShowOnlyMine] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      setIsInitialLoad(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  const { filteredAssets } = useAssetFilter(assets, showOnlyMine ? wallet.address : null)

  // Apply search filter
  const searchFiltered = filteredAssets.filter((asset) => {
    const query = searchQuery.toLowerCase()
    return (
      asset.name.toLowerCase().includes(query) ||
      asset.description?.toLowerCase().includes(query) ||
      asset.id.includes(query)
    )
  })

  const userAssets = assets.filter((a) => a.ownerAddress.toLowerCase() === wallet.address?.toLowerCase())
  const totalValue = searchFiltered.reduce((sum, asset) => sum + (asset.price || 0), 0)

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black">
      <EnhancedHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onFilterToggle={setShowOnlyMine}
        showOnlyMine={showOnlyMine}
        isLoading={isLoading}
      />

      {/* Hero Section */}
      <HeroSection isLoading={isLoading} onExploreClick={() => {}} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {isLoading ? (
          <SkeletonGrid count={8} />
        ) : (
          <>
            {/* Stats Grid */}
            <div className="mb-12">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Dashboard Stats</h3>
              <StatsSection
                stats={[
                  { label: "Total Assets", value: assets.length, icon: "⚔️", color: "indigo" },
                  ...(wallet.isConnected
                    ? [
                        { label: "Your Assets", value: userAssets.length, icon: "🎯", color: "emerald" },
                        { label: "Displayed Assets", value: searchFiltered.length, icon: "👁️", color: "purple" },
                        { label: "Total Value", value: `${totalValue.toFixed(2)} Ξ`, icon: "💎", color: "pink" },
                      ]
                    : []),
                ]}
              />
            </div>

            {/* Assets Section */}
            <div className="mb-12">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
                    {showOnlyMine ? "🎯 Your Assets" : "⚔️ Game Assets"}
                  </h2>
                  <p className="text-slate-400">
                    {searchQuery
                      ? `Showing ${searchFiltered.length} of ${filteredAssets.length} assets matching "${searchQuery}"`
                      : `Showing ${filteredAssets.length} of ${assets.length} total assets`}
                  </p>
                </div>
              </div>

              {/* Assets Grid */}
              {searchFiltered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 px-4 glass rounded-xl">
                  <div className="text-6xl mb-4 animate-bounce">🔍</div>
                  <h3 className="text-2xl font-bold text-white mb-2">No assets found</h3>
                  <p className="text-slate-400 text-center max-w-md">
                    {searchQuery
                      ? "Try adjusting your search query"
                      : wallet.isConnected && showOnlyMine
                        ? "You don't own any of these assets yet"
                        : "Connect your wallet to see your assets"}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  <PremiumAssetGrid assets={searchFiltered} />
                </div>
              )}
            </div>

            {/* Footer Section */}
            <div className="mt-16 border-t border-slate-700/50 pt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass rounded-lg p-6 text-center">
                  <p className="text-slate-400 mb-2">Platform Status</p>
                  <p className="text-lg font-semibold text-emerald-400">🟢 Live</p>
                </div>
                <div className="glass rounded-lg p-6 text-center">
                  <p className="text-slate-400 mb-2">Network</p>
                  <p className="text-lg font-semibold text-indigo-400">Ethereum (Mock)</p>
                </div>
                <div className="glass rounded-lg p-6 text-center">
                  <p className="text-slate-400 mb-2">API Version</p>
                  <p className="text-lg font-semibold text-purple-400">v1.0</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  )
}
