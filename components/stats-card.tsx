"use client"

import type React from "react"

interface StatsCardProps {
  label: string
  value: string | number
  icon: string
  color: "indigo" | "emerald" | "purple" | "blue"
}

const colorMap = {
  indigo: "from-indigo-500 to-purple-600",
  emerald: "from-emerald-500 to-teal-600",
  purple: "from-purple-500 to-pink-600",
  blue: "from-blue-500 to-cyan-600",
}

export const StatsCard: React.FC<StatsCardProps> = ({ label, value, icon, color }) => {
  return (
    <div
      className={`bg-gradient-to-br ${colorMap[color]} rounded-lg p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-white/80 mb-1">{label}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  )
}
