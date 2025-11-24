"use client"

import { useMemo, useState, useCallback } from "react"
import type { GameAsset, FilterState } from "@/lib/types"

export const useAssetFilter = (assets: GameAsset[], userAddress: string | null) => {
  const [filters, setFilters] = useState<FilterState>({
    showOnlyMine: false,
    searchQuery: "",
    sortBy: "name",
  })

  const filteredAssets = useMemo(() => {
    let result = [...assets]

    // Filter by ownership
    if (filters.showOnlyMine && userAddress) {
      result = result.filter((asset) => asset.ownerAddress.toLowerCase() === userAddress.toLowerCase())
    }

    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      result = result.filter(
        (asset) =>
          asset.name.toLowerCase().includes(query) ||
          asset.description?.toLowerCase().includes(query) ||
          asset.id.includes(query),
      )
    }

    // Sort
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case "owner":
          return a.ownerAddress.localeCompare(b.ownerAddress)
        case "rarity":
          const rarityOrder = { legendary: 0, epic: 1, rare: 2, common: 3 }
          return (
            (rarityOrder[a.rarity as keyof typeof rarityOrder] || 4) -
            (rarityOrder[b.rarity as keyof typeof rarityOrder] || 4)
          )
        case "name":
        default:
          return a.name.localeCompare(b.name)
      }
    })

    return result
  }, [assets, filters, userAddress])

  const setSearchQuery = useCallback((query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }))
  }, [])

  const setShowOnlyMine = useCallback((show: boolean) => {
    setFilters((prev) => ({ ...prev, showOnlyMine: show }))
  }, [])

  const setSortBy = useCallback((sortBy: "name" | "owner" | "rarity") => {
    setFilters((prev) => ({ ...prev, sortBy }))
  }, [])

  return {
    filteredAssets,
    filters,
    setSearchQuery,
    setShowOnlyMine,
    setSortBy,
  }
}
