import { useEffect, useState, useRef } from "react";
import { Progress } from "@/components/ui/progress";
import { Server, Globe } from "lucide-react";

const servers = [
  { serverIp: "45.67.89.12", location: { lat: 37.7749, lng: -122.4194 }, region: "USA", city: "San Francisco", status: "active" },
  { serverIp: "103.21.244.45", location: { lat: 28.6139, lng: 77.209 }, region: "India", city: "Delhi", status: "active" },
  { serverIp: "51.158.72.9", location: { lat: 48.8566, lng: 2.3522 }, region: "France", city: "Paris", status: "active" },
  { serverIp: "139.99.88.21", location: { lat: -33.8688, lng: 151.2093 }, region: "Australia", city: "Sydney", status: "active" },
  { serverIp: "18.197.101.55", location: { lat: 50.1109, lng: 8.6821 }, region: "Germany", city: "Frankfurt", status: "active" },
];

const regions = [
  { region: "USA", servers: 24, utilizationPercent: 79, flag: "🇺🇸" },
  { region: "Germany", servers: 10, utilizationPercent: 48, flag: "🇩🇪" },
  { region: "India", servers: 12, utilizationPercent: 55, flag: "🇮🇳" },
  { region: "France", servers: 8, utilizationPercent: 23, flag: "🇫🇷" },
  { region: "Australia", servers: 6, utilizationPercent: 31, flag: "🇦🇺" },
];

// Convert lat/lng to SVG coordinates (Mercator-like projection)
const latLngToXY = (lat: number, lng: number, width: number, height: number) => {
  const x = ((lng + 180) / 360) * width;
  const y = ((90 - lat) / 180) * height;
  return { x, y };
};

export const ServerDemographicsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [hoveredServer, setHoveredServer] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const mapWidth = 800;
  const mapHeight = 400;

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Globe className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Global Infrastructure</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Server Demographics
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real-time distribution of our VPN servers across the globe. 
            Transparent infrastructure for maximum trust and reliability.
          </p>
        </div>

        {/* Main content grid */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-lg">
          <div className="grid lg:grid-cols-5 gap-0">
            {/* Map Section - 3 cols */}
            <div className="lg:col-span-3 p-6 lg:p-8 bg-muted/30 relative">
              <div className="relative w-full aspect-[2/1] rounded-xl overflow-hidden bg-muted/50 border border-border">
                {/* World Map SVG */}
                <svg
                  viewBox={`0 0 ${mapWidth} ${mapHeight}`}
                  className="w-full h-full"
                  preserveAspectRatio="xMidYMid meet"
                >
                  {/* Simplified world map path */}
                  <path
                    d="M110,95 L130,85 L155,90 L175,80 L200,85 L215,95 L230,90 L250,95 L270,100 L285,95 L300,100 L290,115 L275,120 L260,115 L245,125 L230,120 L215,130 L200,125 L185,135 L165,130 L145,140 L125,135 L110,145 L95,140 L80,150 L65,145 L55,155 L45,150 L40,165 L55,175 L45,195 L60,210 L55,225 L70,235 L85,230 L100,240 L115,235 L130,245 L140,235 L155,230 L145,215 L160,200 L150,185 L165,170 L155,155 L140,160 L125,150 L115,135 L130,125 L120,110 Z
                    M350,70 L370,65 L390,70 L410,60 L430,65 L445,75 L460,70 L475,80 L490,75 L505,85 L515,80 L525,90 L535,85 L550,95 L560,90 L575,100 L585,95 L600,105 L610,100 L620,110 L620,125 L610,135 L600,130 L585,140 L575,135 L560,145 L545,140 L530,150 L515,145 L500,155 L485,150 L470,160 L455,155 L440,165 L425,160 L410,170 L395,165 L380,175 L365,170 L355,160 L370,150 L360,140 L375,130 L365,120 L380,110 L370,100 L385,90 L375,80 L360,85 Z
                    M630,130 L650,125 L670,130 L690,125 L710,135 L720,150 L730,165 L720,180 L710,195 L695,205 L680,200 L665,210 L650,205 L640,195 L650,180 L640,165 L655,150 L645,140 Z
                    M680,260 L700,255 L720,265 L740,275 L750,290 L745,310 L730,325 L710,330 L690,320 L675,305 L680,285 Z"
                    className="fill-muted-foreground/20 stroke-muted-foreground/30"
                    strokeWidth="1"
                  />
                  
                  {/* Server markers */}
                  {servers.map((server, index) => {
                    const { x, y } = latLngToXY(server.location.lat, server.location.lng, mapWidth, mapHeight);
                    const isHighlighted = hoveredRegion === server.region || hoveredServer === server.serverIp;
                    
                    return (
                      <g
                        key={server.serverIp}
                        className="cursor-pointer"
                        onMouseEnter={() => setHoveredServer(server.serverIp)}
                        onMouseLeave={() => setHoveredServer(null)}
                        style={{
                          opacity: isVisible ? 1 : 0,
                          transform: isVisible ? 'scale(1)' : 'scale(0)',
                          transformOrigin: `${x}px ${y}px`,
                          transition: `all 0.5s ease-out ${index * 150}ms`,
                        }}
                      >
                        {/* Pulse ring */}
                        <circle
                          cx={x}
                          cy={y}
                          r={isHighlighted ? 20 : 12}
                          className={`fill-primary/20 ${isHighlighted ? 'animate-ping' : ''}`}
                          style={{ animationDuration: '2s' }}
                        />
                        {/* Main marker */}
                        <circle
                          cx={x}
                          cy={y}
                          r={isHighlighted ? 10 : 7}
                          className={`fill-primary transition-all duration-300 ${isHighlighted ? 'stroke-primary-foreground stroke-2' : ''}`}
                        />
                        
                        {/* Tooltip on hover */}
                        {hoveredServer === server.serverIp && (
                          <g>
                            <rect
                              x={x - 55}
                              y={y - 50}
                              width={110}
                              height={35}
                              rx={6}
                              className="fill-card stroke-border"
                            />
                            <text
                              x={x}
                              y={y - 35}
                              textAnchor="middle"
                              className="fill-foreground text-xs font-semibold"
                            >
                              {server.city}
                            </text>
                            <text
                              x={x}
                              y={y - 22}
                              textAnchor="middle"
                              className="fill-muted-foreground text-xs"
                            >
                              {server.region}
                            </text>
                          </g>
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>
              
              {/* Map legend */}
              <div className="flex items-center justify-center gap-6 mt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span>Active Server</span>
                </div>
                <div className="flex items-center gap-2">
                  <Server className="w-4 h-4" />
                  <span>{servers.length} Locations</span>
                </div>
              </div>
            </div>

            {/* Stats Section - 2 cols */}
            <div className="lg:col-span-2 p-6 lg:p-8 border-t lg:border-t-0 lg:border-l border-border">
              <h3 className="text-lg font-semibold text-foreground mb-6">
                Regional Distribution
              </h3>
              
              <div className="space-y-5">
                {regions.map((region, index) => (
                  <div
                    key={region.region}
                    className={`group cursor-pointer transition-all duration-300 p-3 -mx-3 rounded-lg ${
                      hoveredRegion === region.region ? 'bg-muted' : 'hover:bg-muted/50'
                    }`}
                    onMouseEnter={() => setHoveredRegion(region.region)}
                    onMouseLeave={() => setHoveredRegion(null)}
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateX(0)' : 'translateX(20px)',
                      transition: `all 0.5s ease-out ${index * 100}ms`,
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{region.flag}</span>
                        <div>
                          <p className="font-medium text-foreground">{region.region}</p>
                          <p className="text-sm text-muted-foreground">
                            {region.servers} Servers
                          </p>
                        </div>
                      </div>
                      <span className="text-lg font-semibold text-foreground">
                        {region.utilizationPercent}%
                      </span>
                    </div>
                    <Progress 
                      value={isVisible ? region.utilizationPercent : 0} 
                      className="h-2 bg-muted"
                      style={{
                        transition: `all 1s ease-out ${index * 100 + 300}ms`,
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Total stats */}
              <div className="mt-8 pt-6 border-t border-border">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold text-primary">
                      {regions.reduce((sum, r) => sum + r.servers, 0)}
                    </p>
                    <p className="text-sm text-muted-foreground">Total Servers</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold text-primary">99.9%</p>
                    <p className="text-sm text-muted-foreground">Uptime SLA</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
