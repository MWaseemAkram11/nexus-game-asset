"use client"

import type React from "react"

interface StatItem {
  label: string
  value: string | number
  icon: string
  color: "indigo" | "emerald" | "purple" | "pink"
}

const colorClasses = {
  indigo: "from-indigo-500/20 to-indigo-600/10 border-indigo-500/30",
  emerald: "from-emerald-500/20 to-emerald-600/10 border-emerald-500/30",
  purple: "from-purple-500/20 to-purple-600/10 border-purple-500/30",
  pink: "from-pink-500/20 to-pink-600/10 border-pink-500/30",
}

export const StatsSection: React.FC<{ stats: StatItem[] }> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`group relative rounded-lg p-6 border bg-gradient-to-br ${colorClasses[stat.color]} transition-all duration-300 hover:shadow-lg hover:shadow-${stat.color}-500/20 animate-in fade-in zoom-in-95`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative space-y-2">
            <p className="text-3xl">{stat.icon}</p>
            <p className="text-3xl font-bold text-white">{stat.value}</p>
            <p className="text-sm text-slate-400">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
