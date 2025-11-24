"use client"

import type React from "react"
import { useWallet } from "@/context/wallet-context"
import { shortenAddress } from "@/lib/utils"

interface WalletModalProps {
  isOpen: boolean
  onClose: () => void
}

export const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose }) => {
  const { wallet, connectWallet, disconnectWallet } = useWallet()

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-slate-800 rounded-xl border border-slate-700 p-6 max-w-md w-full mx-4 animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-white mb-4">Wallet Connection</h2>

        {!wallet.isConnected ? (
          <div className="space-y-4">
            <p className="text-slate-400 mb-6">
              Connect your wallet to access your game assets and exclusive features.
            </p>
            <button
              onClick={() => {
                connectWallet()
                onClose()
              }}
              className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300"
            >
              Connect Wallet
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-slate-700 rounded-lg p-4">
              <p className="text-slate-400 text-sm mb-2">Connected Address</p>
              <p className="text-white font-mono font-bold">{shortenAddress(wallet.address)}</p>
              <p className="text-slate-500 text-xs mt-2">Chain ID: {wallet.chainId}</p>
            </div>
            <button
              onClick={() => {
                disconnectWallet()
                onClose()
              }}
              className="w-full px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all duration-300"
            >
              Disconnect
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
