import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { GameAsset } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const shortenAddress = (address: string | null): string => {
  if (!address) return ""
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
}

export const isAssetOwnedByUser = (asset: GameAsset, userAddress: string | null): boolean => {
  if (!userAddress) return false
  return asset.ownerAddress.toLowerCase() === userAddress.toLowerCase()
}

export const getRarityColor = (rarity?: string): string => {
  switch (rarity) {
    case "legendary":
      return "from-yellow-400 to-orange-500"
    case "epic":
      return "from-purple-400 to-pink-500"
    case "rare":
      return "from-blue-400 to-cyan-500"
    default:
      return "from-gray-400 to-gray-500"
  }
}

export const getRarityBg = (rarity?: string): string => {
  switch (rarity) {
    case "legendary":
      return "bg-yellow-100 text-yellow-800"
    case "epic":
      return "bg-purple-100 text-purple-800"
    case "rare":
      return "bg-blue-100 text-blue-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}
