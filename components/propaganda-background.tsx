export function PropagandaBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      {/* Red star in top left */}
      <div className="absolute top-0 left-0 w-64 h-64 opacity-20">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <polygon points="50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35" fill="#ffcc00" />
        </svg>
      </div>

      {/* Hammer and sickle in bottom right */}
      <div className="absolute bottom-0 right-0 w-80 h-80 opacity-15">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M35,20 L35,50 L20,65 L30,75 L45,60 L75,60 L75,50 L45,50 L45,20 Z" fill="#ffcc00" />
          <path
            d="M80,30 C65,30 55,40 50,50 C45,60 35,75 20,75 L25,85 C45,85 55,70 60,60 C65,50 70,40 80,40 Z"
            fill="#ffcc00"
          />
        </svg>
      </div>

      {/* Diagonal rays */}
      <div className="absolute top-0 left-0 w-full h-full">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="diagonalRays"
              patternUnits="userSpaceOnUse"
              width="100"
              height="100"
              patternTransform="rotate(45)"
            >
              <line x1="0" y1="0" x2="0" y2="100" stroke="#b91c1c" strokeWidth="10" strokeOpacity="0.1" />
              <line x1="50" y1="0" x2="50" y2="100" stroke="#b91c1c" strokeWidth="10" strokeOpacity="0.1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diagonalRays)" />
        </svg>
      </div>

      {/* Worker silhouette */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 opacity-10">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M40,100 L40,70 L35,65 L35,55 L40,50 L45,45 L50,40 L50,30 L45,25 L50,20 L55,25 L55,40 L60,45 L65,50 L70,55 L70,65 L65,70 L65,100 Z"
            fill="#ffcc00"
          />
          <circle cx="50" cy="15" r="10" fill="#ffcc00" />
          <rect x="20" y="60" width="30" height="5" fill="#ffcc00" />
        </svg>
      </div>

      {/* Radial rays from center */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-10">
        <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" stroke="#b91c1c" strokeWidth="1">
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

      {/* Factory silhouette */}
      <div className="absolute bottom-0 right-1/4 w-96 h-64 opacity-10">
        <svg viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="30" width="10" height="20" fill="#ffcc00" />
          <rect x="25" y="20" width="10" height="30" fill="#ffcc00" />
          <rect x="40" y="25" width="10" height="25" fill="#ffcc00" />
          <rect x="55" y="15" width="10" height="35" fill="#ffcc00" />
          <rect x="70" y="20" width="10" height="30" fill="#ffcc00" />
          <rect x="0" y="45" width="100" height="5" fill="#ffcc00" />
          <rect x="15" y="10" width="5" height="20" fill="#ffcc00" />
          <rect x="60" y="5" width="5" height="10" fill="#ffcc00" />
        </svg>
      </div>

      {/* Propaganda text banner */}
      <div className="absolute top-1/3 right-0 w-96 h-20 opacity-15 rotate-45">
        <svg width="100%" height="100%" viewBox="0 0 100 20" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="100" height="20" fill="#b91c1c" />
          <text x="50" y="15" fontFamily="sans-serif" fontSize="10" fill="#ffcc00" textAnchor="middle">
            GLORY TO NFTs
          </text>
        </svg>
      </div>
    </div>
  )
}
