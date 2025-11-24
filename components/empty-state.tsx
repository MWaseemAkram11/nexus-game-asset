"use client"

import type React from "react"

interface EmptyStateProps {
  title: string
  description: string
  icon: string
}

export const EmptyState: React.FC<EmptyStateProps> = ({ title, description, icon }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-6xl mb-4 animate-bounce">{icon}</div>
      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      <p className="text-slate-400 text-center max-w-md">{description}</p>
    </div>
  )
}
