"use client"

export const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden animate-pulse">
          <div className="w-full h-64 bg-gradient-to-r from-slate-700 to-slate-600" />
          <div className="p-4 space-y-3">
            <div className="h-4 bg-slate-700 rounded w-3/4" />
            <div className="h-3 bg-slate-700 rounded w-1/2" />
            <div className="h-3 bg-slate-700 rounded" />
            <div className="h-4 bg-slate-700 rounded w-2/3" />
          </div>
        </div>
      ))}
    </div>
  )
}
