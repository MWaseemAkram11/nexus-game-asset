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

export const AssetCard: React.FC<AssetCardProps> = ({ asset }) => {
  const { wallet } = useWallet()
  const isOwned = isAssetOwnedByUser(asset, wallet.address)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative overflow-hidden rounded-xl bg-white transition-all duration-300 transform ${
        isOwned ? "border-2 border-emerald-500 shadow-lg shadow-emerald-500/30" : "border border-slate-200 shadow-md"
      } ${isHovered ? "scale-105 shadow-2xl" : ""}`}
    >
      {/* Owned Badge */}
      {isOwned && (
        <div className="absolute top-0 right-0 z-20">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white px-3 py-1 text-xs font-bold rounded-bl-lg shadow-lg">
            YOUR ASSET
          </div>
        </div>
      )}

      {/* Image Container */}
      <div className="relative w-full h-64 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
        <Image
          src={asset.image || "/placeholder.svg"}
          alt={asset.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />

        {/* Rarity Badge */}
        {asset.rarity && (
          <div
            className={`absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${getRarityBg(asset.rarity)}`}
          >
            {asset.rarity.charAt(0).toUpperCase() + asset.rarity.slice(1)}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Name */}
        <h3 className="text-lg font-bold text-slate-900 mb-1 truncate">{asset.name}</h3>

        {/* ID */}
        <p className="text-xs text-slate-500 mb-3 font-mono">ID: #{asset.id}</p>

        {/* Description */}
        {asset.description && <p className="text-sm text-slate-600 mb-3 line-clamp-2">{asset.description}</p>}

        {/* Owner Info */}
        <div className="border-t border-slate-200 pt-3 mb-3">
          <p className="text-xs text-slate-500 mb-1">Owner</p>
          <p className="text-sm font-mono text-slate-700">{shortenAddress(asset.ownerAddress)}</p>
        </div>

        {/* Price */}
        {asset.price && (
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500">Floor Price</span>
            <span className="text-lg font-bold text-indigo-600">{asset.price.toFixed(2)} Ξ</span>
          </div>
        )}
      </div>

      {/* Hover Overlay */}
      {isHovered && <div className="absolute inset-0 bg-black/10 backdrop-blur-sm animate-in fade-in duration-200" />}
    </div>
  )
}

export const AssetGrid: React.FC<{ assets: GameAsset[] }> = ({ assets }) => {
  if (assets.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-12">
        <div className="text-5xl mb-4">🔍</div>
        <p className="text-xl text-slate-600 font-semibold">No assets found</p>
        <p className="text-slate-500">Try adjusting your search or filters</p>
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
          <AssetCard asset={asset} />
        </div>
      ))}
    </>
  )
}
