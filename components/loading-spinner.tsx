"use client"

export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="relative w-16 h-16">
        {/* Outer rotating ring */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-500 border-r-purple-500 spin-slow" />

        {/* Middle rotating ring with delay */}
        <div
          className="absolute inset-2 rounded-full border-3 border-transparent border-b-emerald-500 border-l-indigo-500 spin-slow"
          style={{ animationDelay: "-1s" }}
        />

        {/* Inner pulsing core */}
        <div className="absolute inset-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 pulse-glow" />

        {/* Center dot */}
        <div className="absolute inset-5 rounded-full bg-slate-950" />
      </div>
    </div>
  )
}

export const SkeletonCard = () => {
  return (
    <div className="rounded-lg overflow-hidden glass">
      <div className="w-full h-56 skeleton rounded-t-lg" />
      <div className="p-4 space-y-3">
        <div className="h-4 skeleton rounded w-3/4" />
        <div className="h-3 skeleton rounded w-1/2" />
        <div className="h-3 skeleton rounded w-full" />
        <div className="pt-2 h-4 skeleton rounded w-2/3" />
      </div>
    </div>
  )
}

export const SkeletonGrid = ({ count = 8 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{ animationDelay: `${i * 50}ms` }} className="bounce-in">
          <SkeletonCard />
        </div>
      ))}
    </div>
  )
}
