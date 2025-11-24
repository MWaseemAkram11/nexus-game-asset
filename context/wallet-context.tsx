"use client"

import type React from "react"
import { createContext, useContext, useState, type ReactNode } from "react"
import type { WalletState, AppContextType } from "@/lib/types"
import { MOCK_ASSETS, CONNECTED_WALLET_ADDRESS } from "@/lib/mock-data"

const WalletContext = createContext<AppContextType | undefined>(undefined)

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: false,
    address: null,
    chainId: null,
  })

  const connectWallet = () => {
    // Simulate wallet connection with smooth animation delay
    setTimeout(() => {
      setWallet({
        isConnected: true,
        address: CONNECTED_WALLET_ADDRESS,
        chainId: 1,
      })
    }, 300)
  }

  const disconnectWallet = () => {
    setWallet({
      isConnected: false,
      address: null,
      chainId: null,
    })
  }

  const value: AppContextType = {
    wallet,
    connectWallet,
    disconnectWallet,
    assets: MOCK_ASSETS,
  }

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
}

export const useWallet = (): AppContextType => {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error("useWallet must be used within WalletProvider")
  }
  return context
}
