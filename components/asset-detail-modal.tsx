"use client"

import type React from "react"
import Image from "next/image"
import type { GameAsset } from "@/lib/types"
import { shortenAddress, getRarityBg } from "@/lib/utils"

interface AssetDetailModalProps {
  asset: GameAsset | null
  isOpen: boolean
  onClose: () => void
}

export const AssetDetailModal: React.FC<AssetDetailModalProps> = ({ asset, isOpen, onClose }) => {
  if (!isOpen || !asset) return null

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden max-w-2xl w-full mx-4 animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative w-full h-96 bg-gradient-to-br from-slate-700 to-slate-600">
          <Image src={asset.image || "/placeholder.svg"} alt={asset.name} fill className="object-cover" />
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">{asset.name}</h2>
              <p className="text-slate-400 font-mono">ID: #{asset.id}</p>
            </div>
            {asset.rarity && (
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getRarityBg(asset.rarity)}`}>
                {asset.rarity.toUpperCase()}
              </span>
            )}
          </div>

          {asset.description && (
            <div className="mb-6">
              <p className="text-slate-300">{asset.description}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-700 rounded-lg p-4">
              <p className="text-slate-400 text-sm mb-1">Owner Address</p>
              <p className="text-white font-mono text-sm">{shortenAddress(asset.ownerAddress)}</p>
            </div>
            {asset.price && (
              <div className="bg-slate-700 rounded-lg p-4">
                <p className="text-slate-400 text-sm mb-1">Floor Price</p>
                <p className="text-xl font-bold text-indigo-400">{asset.price.toFixed(2)} Ξ</p>
              </div>
            )}
          </div>

          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
