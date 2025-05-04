export function Footer() {
  return (
    <footer className="mt-16 py-6 border-t border-red-800 relative">
      {/* Propaganda-style banner */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-700 px-6 py-1">
        <p className="text-yellow-500 text-xs font-bold">GLORY TO THE COLLECTIVE</p>
      </div>

      <div className="text-center text-red-400 text-sm">
        <p>Buy Me A Vodka - The People's NFT Platform</p>
        <p className="mt-2">© {new Date().getFullYear()} All rights belong to the collective</p>
      </div>
    </footer>
  )
}
