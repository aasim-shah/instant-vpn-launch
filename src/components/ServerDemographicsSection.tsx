import { useEffect, useState, useRef } from "react";
import { Globe } from "lucide-react";

const servers = [
  { serverIp: "45.67.89.12", location: { lat: 37.7749, lng: -122.4194 }, region: "USA", city: "San Francisco", status: "active" },
  { serverIp: "103.21.244.45", location: { lat: 28.6139, lng: 77.209 }, region: "India", city: "Delhi", status: "active" },
  { serverIp: "51.158.72.9", location: { lat: 48.8566, lng: 2.3522 }, region: "France", city: "Paris", status: "active" },
  { serverIp: "139.99.88.21", location: { lat: -33.8688, lng: 151.2093 }, region: "Australia", city: "Sydney", status: "active" },
  { serverIp: "18.197.101.55", location: { lat: 50.1109, lng: 8.6821 }, region: "Germany", city: "Frankfurt", status: "active" },
];

// Convert lat/lng to SVG coordinates
const latLngToXY = (lat: number, lng: number, width: number, height: number) => {
  const x = ((lng + 180) / 360) * width;
  const latRad = (lat * Math.PI) / 180;
  const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
  const y = height / 2 - (mercN * height) / (2 * Math.PI);
  return { x, y };
};

export const ServerDemographicsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  const mapWidth = 900;
  const mapHeight = 450;

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

        {/* Map Container */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-lg p-6 lg:p-10">
          <div className="relative w-full aspect-[2/1] rounded-xl overflow-hidden bg-muted/30">
            <svg
              viewBox={`0 0 ${mapWidth} ${mapHeight}`}
              className="w-full h-full"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* World Map - Detailed continents */}
              <g className="fill-muted-foreground/25 stroke-muted-foreground/40" strokeWidth="0.5">
                {/* North America */}
                <path d="M55,95 L70,85 L85,80 L100,75 L120,70 L140,72 L160,68 L175,72 L190,70 L205,75 L215,85 L225,82 L240,88 L250,95 L245,105 L235,112 L225,108 L215,115 L205,120 L195,125 L185,130 L175,128 L165,135 L155,140 L145,138 L135,145 L125,150 L115,155 L105,160 L95,158 L85,165 L75,170 L65,175 L55,180 L50,175 L55,165 L50,155 L55,145 L50,135 L55,125 L50,115 L55,105 Z" />
                {/* Greenland */}
                <path d="M280,45 L295,42 L310,45 L320,55 L325,70 L320,85 L310,95 L295,98 L280,95 L270,85 L268,70 L272,55 Z" />
                {/* South America */}
                <path d="M145,200 L160,195 L175,198 L185,205 L195,215 L200,230 L205,250 L200,270 L195,290 L185,310 L170,325 L155,335 L140,340 L130,335 L125,320 L130,300 L125,280 L130,260 L125,240 L130,220 L140,210 Z" />
                {/* Europe */}
                <path d="M380,75 L395,70 L410,72 L425,68 L440,72 L455,70 L470,75 L480,85 L475,95 L465,102 L455,108 L445,105 L435,112 L425,118 L415,115 L405,120 L395,118 L385,125 L375,120 L370,110 L375,100 L370,90 L378,82 Z" />
                {/* Africa */}
                <path d="M400,145 L420,140 L440,142 L460,145 L480,150 L495,160 L505,175 L510,195 L505,220 L495,245 L480,265 L460,280 L440,290 L420,295 L400,290 L385,280 L375,260 L370,240 L375,215 L380,190 L385,165 L395,150 Z" />
                {/* Asia */}
                <path d="M490,60 L520,55 L550,52 L580,55 L610,50 L640,55 L670,52 L700,58 L725,65 L745,75 L760,90 L770,110 L765,130 L755,145 L740,155 L720,160 L700,165 L680,160 L660,168 L640,165 L620,170 L600,168 L580,175 L560,170 L540,175 L520,170 L500,165 L485,155 L475,140 L480,120 L475,100 L485,80 Z" />
                {/* Russia highlight region */}
                <path d="M500,45 L540,40 L580,38 L620,42 L660,38 L700,45 L740,48 L770,55 L790,68 L800,85 L795,100 L780,112 L760,118 L735,115 L710,120 L680,115 L650,118 L620,115 L590,120 L560,115 L530,118 L500,112 L480,100 L475,85 L485,68 L495,55 Z" />
                {/* Middle East */}
                <path d="M510,130 L530,125 L550,128 L565,135 L575,145 L570,160 L555,170 L535,175 L515,170 L500,160 L505,145 Z" />
                {/* India Subcontinent */}
                <path d="M580,140 L600,135 L620,140 L635,150 L640,170 L635,190 L620,210 L600,220 L580,215 L565,200 L560,180 L565,160 L575,148 Z" />
                {/* Southeast Asia */}
                <path d="M650,155 L670,150 L690,155 L705,165 L710,180 L705,195 L690,205 L670,210 L655,205 L645,192 L648,175 Z" />
                {/* Australia */}
                <path d="M700,260 L730,255 L760,258 L785,265 L805,280 L815,300 L810,325 L795,345 L770,355 L740,358 L710,350 L690,335 L680,310 L685,285 L695,268 Z" />
                {/* New Zealand */}
                <path d="M835,330 L850,325 L860,335 L855,350 L840,358 L828,350 L830,338 Z" />
                {/* Japan */}
                <path d="M780,105 L795,100 L805,108 L808,120 L800,132 L785,138 L775,130 L772,118 Z" />
                {/* UK & Ireland */}
                <path d="M365,80 L378,78 L385,88 L380,98 L368,102 L358,95 L360,85 Z" />
                {/* Iceland */}
                <path d="M325,55 L340,52 L350,58 L348,68 L338,72 L325,68 L322,60 Z" />
              </g>

              {/* Server markers */}
              {servers.map((server, index) => {
                const { x, y } = latLngToXY(server.location.lat, server.location.lng, mapWidth, mapHeight);
                const isHovered = hoveredServer === server.serverIp;
                
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
                    {/* Outer glow ring */}
                    <circle
                      cx={x}
                      cy={y}
                      r={isHovered ? 18 : 14}
                      className="fill-primary/20 transition-all duration-300"
                    />
                    {/* Main marker */}
                    <circle
                      cx={x}
                      cy={y}
                      r={isHovered ? 10 : 8}
                      className="fill-primary transition-all duration-300"
                    />
                    {/* Inner highlight */}
                    <circle
                      cx={x - 2}
                      cy={y - 2}
                      r={3}
                      className="fill-primary-foreground/40"
                    />
                    
                    {/* Tooltip */}
                    {isHovered && (
                      <g>
                        <rect
                          x={x - 45}
                          y={y - 45}
                          width={90}
                          height={30}
                          rx={6}
                          className="fill-primary"
                        />
                        {/* Tooltip arrow */}
                        <polygon
                          points={`${x - 8},${y - 15} ${x + 8},${y - 15} ${x},${y - 5}`}
                          className="fill-primary"
                        />
                        <text
                          x={x}
                          y={y - 25}
                          textAnchor="middle"
                          className="fill-primary-foreground text-sm font-semibold"
                          style={{ fontSize: '14px' }}
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
        </div>
      </div>
    </section>
  );
};
