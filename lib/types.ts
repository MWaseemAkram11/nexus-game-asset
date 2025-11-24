// Core type definitions for Game Assets and App State
export interface GameAsset {
  id: string
  name: string
  image: string
  ownerAddress: string
  description?: string
  rarity?: "common" | "rare" | "epic" | "legendary"
  price?: number
}

export interface WalletState {
  isConnected: boolean
  address: string | null
  chainId: number | null
}

export interface FilterState {
  showOnlyMine: boolean
  searchQuery: string
  sortBy: "name" | "owner" | "rarity"
}

export interface AppContextType {
  wallet: WalletState
  connectWallet: () => void
  disconnectWallet: () => void
  assets: GameAsset[]
}
