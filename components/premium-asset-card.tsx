"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import type { GameAsset } from "@/lib/types"
import { useWallet } from "@/context/wallet-context"
import { shortenAddress, isAssetOwnedByUser, getRarityBg } from "@/lib/utils"

interface AssetCardProps {
  asset: GameAsset
}

export const PremiumAssetCard: React.FC<AssetCardProps> = ({ asset }) => {
  const { wallet } = useWallet()
  const isOwned = isAssetOwnedByUser(asset, wallet.address)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative overflow-hidden rounded-xl transition-all duration-500 transform"
    >
      <div className="absolute inset-0 rounded-xl glass -z-10 group-hover:shadow-2xl group-hover:shadow-indigo-500/20 transition-all duration-500" />

      {/* Border with gradient effect */}
      <div
        className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 p-[1px] ${
          isOwned ? "gradient-success" : "gradient-primary"
        }`}
      >
        <div className="absolute inset-0 rounded-xl bg-slate-950" />
      </div>

      {/* Outer glow on hover */}
      {isHovered && (
        <div
          className={`absolute -inset-0.5 rounded-xl opacity-30 blur-lg -z-10 transition-all duration-300 ${
            isOwned ? "gradient-success" : "gradient-primary"
          }`}
        />
      )}

      {/* Owned Badge - Premium Style */}
      {isOwned && (
        <div className="absolute top-0 right-0 z-20">
          <div className="relative overflow-hidden rounded-bl-lg">
            <div className="absolute inset-0 gradient-success opacity-80" />
            <div className="relative px-3 py-1.5 text-xs font-bold text-white flex items-center gap-1">
              <span>★</span> YOUR ASSET
            </div>
          </div>
        </div>
      )}

      {/* Image Container with Effects */}
      <div className="relative w-full h-64 overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
        {/* Image */}
        <Image
          src={asset.image || "/placeholder.svg"}
          alt={asset.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Overlay gradient on hover */}
        {isHovered && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-100 transition-all duration-300" />
        )}

        {/* Rarity Badge - Premium */}
        {asset.rarity && (
          <div
            className={`absolute bottom-3 left-3 px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm border border-white/20 ${getRarityBg(asset.rarity)}`}
          >
            {asset.rarity.charAt(0).toUpperCase() + asset.rarity.slice(1)}
          </div>
        )}

        {/* Price Badge */}
        {asset.price && (
          <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full text-xs font-bold bg-black/50 backdrop-blur-sm border border-white/20 text-indigo-300">
            {asset.price.toFixed(2)} Ξ
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-3">
        {/* Name */}
        <div>
          <h3 className="text-lg font-bold text-white truncate group-hover:text-indigo-300 transition-colors duration-300">
            {asset.name}
          </h3>
          <p className="text-xs text-slate-400 font-mono mt-1">ID: #{asset.id}</p>
        </div>

        {/* Description */}
        {asset.description && (
          <p className="text-sm text-slate-300 line-clamp-2 group-hover:text-slate-200 transition-colors duration-300">
            {asset.description}
          </p>
        )}

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />

        {/* Owner Info */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 mb-0.5">Owner</p>
            <p className="text-sm font-mono text-slate-300 hover:text-indigo-300 transition-colors cursor-pointer">
              {shortenAddress(asset.ownerAddress)}
            </p>
          </div>
          {isOwned && (
            <div className="w-8 h-8 rounded-full gradient-success flex items-center justify-center text-white font-bold text-xs">
              ✓
            </div>
          )}
        </div>
      </div>

      {/* Interactive indicator on hover */}
      {isHovered && <div className="absolute bottom-0 left-0 right-0 h-1 gradient-primary animate-pulse" />}
    </div>
  )
}

export const PremiumAssetGrid: React.FC<{ assets: GameAsset[] }> = ({ assets }) => {
  if (assets.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-16 px-4 glass rounded-xl">
        <div className="text-6xl mb-4 bounce-in">🔍</div>
        <h3 className="text-2xl font-bold text-white mb-2">No assets found</h3>
        <p className="text-slate-400 text-center max-w-md">Try adjusting your search or filters</p>
      </div>
    )
  }

  return (
    <>
      {assets.map((asset, index) => (
        <div
          key={asset.id}
          className="animate-in fade-in zoom-in-95 duration-300"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <PremiumAssetCard asset={asset} />
        </div>
      ))}
    </>
  )
}
