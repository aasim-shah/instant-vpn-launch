const MAP_WIDTH = 1200
const MAP_HEIGHT = 600

const servers = [
  { id: "us-sf-1", lat: 37.7749, lng: -122.4194 },
  { id: "us-ny-1", lat: 40.7128, lng: -74.0060 },
  { id: "us-tx-1", lat: 29.7604, lng: -95.3698 },

  { id: "ca-tor-1", lat: 43.6532, lng: -79.3832 },

  { id: "br-sp-1", lat: -23.5505, lng: -46.6333 },

  { id: "uk-lon-1", lat: 51.5074, lng: -0.1278 },
  { id: "fr-par-1", lat: 48.8566, lng: 2.3522 },
  { id: "de-fra-1", lat: 50.1109, lng: 8.6821 },
  { id: "nl-ams-1", lat: 52.3676, lng: 4.9041 },

  { id: "in-del-1", lat: 28.6139, lng: 77.2090 },
  { id: "in-mum-1", lat: 19.0760, lng: 72.8777 },
  { id: "sg-sin-1", lat: 1.3521, lng: 103.8198 },

  { id: "jp-tok-1", lat: 35.6762, lng: 139.6503 },
  { id: "kr-seo-1", lat: 37.5665, lng: 126.9780 },

  { id: "ae-dub-1", lat: 25.2048, lng: 55.2708 },

  { id: "au-syd-1", lat: -33.8688, lng: 151.2093 },
  { id: "au-mel-1", lat: -37.8136, lng: 144.9631 },

  { id: "za-jnb-1", lat: -26.2041, lng: 28.0473 },

  { id: "ru-mow-1", lat: 55.7558, lng: 37.6173 },

  { id: "se-sto-1", lat: 59.3293, lng: 18.0686 }
]


function project(lat: number, lng: number) {
  return {
    x: (lng + 180) * (MAP_WIDTH / 360),
    y: (90 - lat) * (MAP_HEIGHT / 180)
  }
}

export default function GlobalServerMap() {
  return (
    <section className="md:w-9/12 mx-auto border-none bg-transparent py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10">
          <h2 className="text-3xl font-semibold tracking-tight">
            Global Server Coverage
          </h2>
          <p className="mt-2 text-muted-foreground">
            Live view of our production-tested VPN infrastructure across regions
          </p>
        </div>

        <div className="relative rounded-3xl border-none p-6">
          <svg
            viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
            className="w-full h-auto"
          >
            <defs>
              <filter id="serverGlow">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="darkModeFilter">
                <feColorMatrix
                  type="matrix"
                  values="-1 0 0 0 0.45
                          0 -1 0 0 0.45
                          0 0 -1 0 0.45
                          0 0 0 1 0"
                />
              </filter>
              <filter id="lightModeFilter">
                <feColorMatrix
                  type="matrix"
                  values="0.4 0 0 0 0.05
                          0 0.4 0 0 0.05
                          0 0 0.4 0 0.05
                          0 0 0 1 0"
                />
              </filter>
            </defs>

            <image
              href="/world.svg"
              width={MAP_WIDTH}
              height={MAP_HEIGHT}
              preserveAspectRatio="xMidYMid meet"
              className="dark:hidden"
              filter="url(#lightModeFilter)"
            />
            
            <image
              href="/world.svg"
              width={MAP_WIDTH}
              height={MAP_HEIGHT}
              preserveAspectRatio="xMidYMid meet"
              className="hidden dark:block"
              filter="url(#darkModeFilter)"
            />

            {servers.map(server => {
              const { x, y } = project(server.lat, server.lng)

              return (
                <g key={server.id}>
                  <circle
                    cx={x}
                    cy={y}
                    r={14}
                    className="fill-primary/20 animate-pulse"
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r={7}
                    className="fill-primary stroke-background stroke-2"
                    filter="url(#serverGlow)"
                  />
                </g>
              )
            })}
          </svg>
        </div>
      </div>
    </section>
  )
}
