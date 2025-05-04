import { Star } from "lucide-react"

export function About() {
  return (
    <section className="my-16 max-w-3xl mx-auto">
      <div className="flex items-center justify-center mb-6">
        <div className="h-0.5 flex-1 bg-red-800"></div>
        <Star className="h-6 w-6 text-yellow-500 mx-4" fill="currentColor" />
        <div className="h-0.5 flex-1 bg-red-800"></div>
      </div>

      <h2 className="text-3xl font-bold text-red-600 text-center mb-8 relative">
        <span className="relative z-10">The Collective Vision</span>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-yellow-500 rounded-full opacity-5 z-0"></div>
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-red-900/20 border-2 border-red-800 rounded-lg p-6 relative overflow-hidden">
          {/* Diagonal propaganda banner */}
          <div className="absolute -right-12 -top-2 w-40 bg-yellow-500 text-red-900 text-center transform rotate-45 text-xs py-1 font-bold">
            WORKERS UNITE
          </div>

          <h3 className="text-xl font-bold text-yellow-500 mb-4">For The People</h3>
          <p className="text-red-200">
            "Buy Me A Vodka" revolutionizes the NFT market by enforcing a gift-only economy. In the spirit of true
            communism, these digital assets can only be minted for others, never for oneself. This creates a community
            of giving rather than hoarding.
          </p>

          {/* Worker silhouette */}
          <div className="absolute bottom-0 right-0 w-24 h-24 opacity-10">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M40,100 L40,70 L35,65 L35,55 L40,50 L45,45 L50,40 L50,30 L45,25 L50,20 L55,25 L55,40 L60,45 L65,50 L70,55 L70,65 L65,70 L65,100 Z"
                fill="#ffcc00"
              />
              <circle cx="50" cy="15" r="10" fill="#ffcc00" />
            </svg>
          </div>
        </div>

        <div className="bg-red-900/20 border-2 border-red-800 rounded-lg p-6 relative overflow-hidden">
          {/* Hammer and sickle watermark */}
          <div className="absolute bottom-2 right-2 w-32 h-32 opacity-10">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path d="M35,20 L35,50 L20,65 L30,75 L45,60 L75,60 L75,50 L45,50 L45,20 Z" fill="#ffcc00" />
              <path
                d="M80,30 C65,30 55,40 50,50 C45,60 35,75 20,75 L25,85 C45,85 55,70 60,60 C65,50 70,40 80,40 Z"
                fill="#ffcc00"
              />
            </svg>
          </div>

          <h3 className="text-xl font-bold text-yellow-500 mb-4">The Party Rules</h3>
          <ul className="text-red-200 space-y-2 list-disc pl-5">
            <li>NFTs can only be minted as gifts for comrades</li>
            <li>Each NFT represents a symbolic vodka toast</li>
            <li>All transactions are recorded in the People's Blockchain</li>
            <li>The collective benefits from each transaction</li>
          </ul>

          {/* Red star */}
          <div className="absolute top-2 left-2 w-16 h-16 opacity-10">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <polygon points="50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35" fill="#ffcc00" />
            </svg>
          </div>
        </div>
      </div>

      {/* Propaganda poster-style quote */}
      <div className="mt-12 bg-red-900/30 border-2 border-red-800 rounded-lg p-6 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <div className="w-full h-full">
            <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <g fill="none" stroke="#ffcc00" strokeWidth="0.5">
                {Array.from({ length: 36 }).map((_, i) => (
                  <line
                    key={i}
                    x1="50"
                    y1="50"
                    x2={50 + 50 * Math.cos((i * 10 * Math.PI) / 180)}
                    y2={50 + 50 * Math.sin((i * 10 * Math.PI) / 180)}
                  />
                ))}
              </g>
            </svg>
          </div>
        </div>

        <blockquote className="text-center relative z-10">
          <p className="text-xl text-yellow-500 italic">
            "From each according to their ability, to each according to their needs."
          </p>
          <footer className="text-red-300 mt-2">— Karl Marx, NFT Enthusiast</footer>
        </blockquote>
      </div>
    </section>
  )
}
