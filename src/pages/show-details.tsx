import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Server,
  Shield,
  Database,
  Network,
  Key,
  FileText,
  Clock,
  Lock,
  Activity,
  Layers,
  CheckCircle2,
  AlertCircle,
  Settings,
  Link as LinkIcon,
  Info,
  Users,
  Download,
  Copy,
  Check,
} from "lucide-react";
import { useState, useEffect } from "react";

// Type definitions
interface DynamicData {
  [key: string]: any;
}

// Comprehensive icon mapping for any section name
const getIcon = (key: string) => {
  const lowerKey = key.toLowerCase();
  
  // Customer related
  if (lowerKey.includes("customer")) return Users;
  
  // Server/Infrastructure
  if (lowerKey.includes("server") || lowerKey.includes("monitor")) return Server;
  
  // Database/Storage
  if (lowerKey.includes("kafka")) return Layers;
  if (lowerKey.includes("redis")) return Database;
  if (lowerKey.includes("database") || lowerKey.includes("storage")) return Database;
  
  // Security
  if (lowerKey.includes("certificate") || lowerKey.includes("cert")) return Shield;
  if (lowerKey.includes("vpn") || lowerKey.includes("security")) return Lock;
  if (lowerKey.includes("key") || lowerKey.includes("auth")) return Key;
  
  // Configuration
  if (lowerKey.includes("config") || lowerKey.includes("setting")) return Settings;
  if (lowerKey.includes("broker") || lowerKey.includes("network")) return Network;
  if (lowerKey.includes("sync") || lowerKey.includes("time")) return Clock;
  if (lowerKey.includes("infra") || lowerKey.includes("url")) return LinkIcon;
  
  // Activity
  if (lowerKey.includes("deployment") || lowerKey.includes("activity")) return Activity;
  
  return FileText; // Default
};

// Color mapping with fallback
const getColor = (key: string) => {
  const lowerKey = key.toLowerCase();
  
  if (lowerKey.includes("customer")) return "purple";
  if (lowerKey.includes("kafka") || lowerKey.includes("broker")) return "orange";
  if (lowerKey.includes("redis") || lowerKey.includes("cache")) return "red";
  if (lowerKey.includes("certificate") || lowerKey.includes("security") || lowerKey.includes("vpn")) return "green";
  if (lowerKey.includes("server") || lowerKey.includes("monitor")) return "blue";
  if (lowerKey.includes("deployment") || lowerKey.includes("config")) return "indigo";
  if (lowerKey.includes("sync") || lowerKey.includes("infra")) return "cyan";
  
  return "slate"; // Default
};

const StatusBadge = ({ status }: { status: string }) => {
  const statusStr = String(status).toLowerCase();
  const isActive = statusStr === "active" || statusStr === "running" || statusStr === "enabled" || statusStr === "true";
  
  return (
    <Badge
      variant={isActive ? "default" : "secondary"}
      className={isActive ? "bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30" : ""}
    >
      {isActive ? (
        <CheckCircle2 className="h-3 w-3 mr-1" />
      ) : (
        <AlertCircle className="h-3 w-3 mr-1" />
      )}
      {status}
    </Badge>
  );
};

const InfoRow = ({ label, value, mono = false }: { label: string; value: any; mono?: boolean }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(String(value));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Handle null/undefined
  if (value === null || value === undefined) {
    return (
      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-3">
        <span className="text-sm text-muted-foreground min-w-[140px]">{label}</span>
        <span className="text-sm font-medium text-muted-foreground/50">—</span>
      </div>
    );
  }

  // Handle boolean
  if (typeof value === "boolean") {
    return (
      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-2">
        <span className="text-sm text-muted-foreground min-w-[140px]">{label}</span>
        <Badge variant={value ? "default" : "secondary"} className="w-fit">
          {value ? <CheckCircle2 className="h-3 w-3 mr-1" /> : <AlertCircle className="h-3 w-3 mr-1" />}
          {value ? "Yes" : "No"}
        </Badge>
      </div>
    );
  }

  // Handle arrays of primitives
  if (Array.isArray(value)) {
    return (
      <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 py-2">
        <span className="text-sm text-muted-foreground min-w-[140px]">{label}</span>
        <div className="flex flex-wrap gap-1">
          {value.map((item, idx) => (
            <Badge key={idx} variant="outline" className="text-xs font-mono">
              {typeof item === "object" ? JSON.stringify(item) : String(item)}
            </Badge>
          ))}
        </div>
      </div>
    );
  }

  // Handle objects (skip, will be rendered separately)
  if (typeof value === "object") {
    return null;
  }

  // Handle primitives with copy functionality
  const showCopy = mono && String(value).length > 20;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-2 group overflow-x-auto">
      <span className="text-sm text-muted-foreground min-w-[140px]">{label}</span>
      <div className="flex items-center gap-2 flex-1">
        <span className={`text-sm font-medium ${mono ? "font-mono text-xs bg-secondary/50 px-2 py-1 rounded break-all" : ""}`}>
          {String(value)}
        </span>
        {showCopy && (
          <Button
            size="sm"
            variant="ghost"
            className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleCopy}
          >
            {copied ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
          </Button>
        )}
      </div>
    </div>
  );
};

// Format key names to be more readable
const formatKey = (key: string): string => {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .replace(/_/g, " ")
    .trim();
};

// Check if value is a primitive
const isPrimitive = (value: any): boolean => {
  return (
    value === null ||
    value === undefined ||
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean" ||
    (Array.isArray(value) && value.every((item) => typeof item !== "object"))
  );
};

// Render nested object as a card
const NestedObjectCard = ({ title, data, level = 0 }: { title: string; data: any; level?: number }) => {
  if (!data) return null;

  // Handle arrays at top level
  if (Array.isArray(data)) {
    return (
      <Card className="border-border/50">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-${getColor(title)}-500/10`}>
              {(() => {
                const Icon = getIcon(title);
                return <Icon className={`h-5 w-5 text-${getColor(title)}-600 dark:text-${getColor(title)}-400`} />;
              })()}
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg">{formatKey(title)}</CardTitle>
              <CardDescription>{data.length} items</CardDescription>
            </div>
            <Badge variant="outline">{data.length}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {data.map((item, index) => (
              <div key={index} className="p-4 rounded-lg bg-secondary/30 border border-border/50">
                <RenderObjectContent data={item} level={level + 1} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Handle objects
  if (typeof data !== "object") return null;

  const Icon = getIcon(title);
  const color = getColor(title);
  const status = data.status || data.enabled;

  return (
    <Card className="border-border/50 hover:border-border transition-colors">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg bg-${color}-500/10`}>
            <Icon className={`h-5 w-5 text-${color}-600 dark:text-${color}-400`} />
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg">{formatKey(title)}</CardTitle>
            <CardDescription>Configuration details</CardDescription>
          </div>
          {status && (
            <div className="ml-auto">
              <StatusBadge status={String(status)} />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <RenderObjectContent data={data} level={level} />
      </CardContent>
    </Card>
  );
};

// Render object content intelligently
const RenderObjectContent = ({ data, level = 0 }: { data: any; level?: number }) => {
  if (!data || typeof data !== "object") return null;

  // Separate primitives from nested objects
  const primitives: { [key: string]: any } = {};
  const nestedObjects: { [key: string]: any } = {};
  const arrays: { [key: string]: any[] } = {};

  Object.entries(data).forEach(([key, value]) => {
    if (key === "status" || key === "enabled") return; // Skip status as it's shown in header

    if (Array.isArray(value)) {
      if (value.length > 0 && typeof value[0] === "object") {
        arrays[key] = value;
      } else {
        primitives[key] = value;
      }
    } else if (isPrimitive(value)) {
      primitives[key] = value;
    } else if (typeof value === "object" && value !== null) {
      nestedObjects[key] = value;
    }
  });

  return (
    <div className="space-y-6">
      {/* Render primitive values */}
      {Object.keys(primitives).length > 0 && (
        <div className="grid sm:grid-cols-2 gap-x-8 divide-y sm:divide-y-0 divide-border/50">
          <div>
            {Object.entries(primitives)
              .slice(0, Math.ceil(Object.keys(primitives).length / 2))
              .map(([key, value]) => (
                <InfoRow
                  key={key}
                  label={formatKey(key)}
                  value={value}
                  mono={
                    key.toLowerCase().includes("id") ||
                    key.toLowerCase().includes("path") ||
                    key.toLowerCase().includes("host") ||
                    key.toLowerCase().includes("fingerprint") ||
                    key.toLowerCase().includes("key") ||
                    key.toLowerCase().includes("cert") ||
                    key.toLowerCase().includes("url")
                  }
                />
              ))}
          </div>
          <div className="">
            {Object.entries(primitives)
              .slice(Math.ceil(Object.keys(primitives).length / 2))
              .map(([key, value]) => (
                <InfoRow
                  key={key}
                  label={formatKey(key)}
                  value={value}
                  mono={
                    key.toLowerCase().includes("id") ||
                    key.toLowerCase().includes("path") ||
                    key.toLowerCase().includes("host") ||
                    key.toLowerCase().includes("fingerprint") ||
                    key.toLowerCase().includes("key") ||
                    key.toLowerCase().includes("cert") ||
                    key.toLowerCase().includes("url")
                  }
                />
              ))}
          </div>
        </div>
      )}

      {/* Render arrays of objects */}
      {Object.entries(arrays).map(([key, items]) => (
        <div key={key}>
          {Object.keys(primitives).length > 0 && <Separator className="mb-4" />}
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Network className="h-4 w-4 text-muted-foreground" />
            {formatKey(key)} ({items.length})
          </h4>
          <div className="grid iver gap-3">
            {items.map((item, index) => (
              <div key={index} className="p-4 rounded-lg bg-secondary/30 border border-border/50 hover:bg-secondary/50 transition-colors">
                <RenderObjectContent data={item} level={level + 1} />
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Render nested objects */}
      {Object.entries(nestedObjects).map(([key, value], index) => (
        <div key={key}>
          {(Object.keys(primitives).length > 0 || Object.keys(arrays).length > 0 || index > 0) && <Separator className="mb-4" />}
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Info className="h-4 w-4  text-muted-foreground" />
            {formatKey(key)}
          </h4>
          <div className="p-4 rounded-lg bg-secondary/30 border border-border/50">
            <RenderObjectContent data={value} level={level + 1} />
          </div>
        </div>
      ))}
    </div>
  );
};

const ShowDetails = () => {
  const [data, setData] = useState<DynamicData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get API endpoint from URL parameter
        const params = new URLSearchParams(window.location.search);
        const apiType = params.get("type") || "infrastructure";
        const mockDataNum = params.get("mock") || "1"; // Get which mock data to use
        const customerId = params.get("customerId");

        // Build API URL based on type
        let apiUrl = "";
        switch (apiType) {
          case "infrastructure":
            apiUrl = customerId 
              ? `/api/customers/${customerId}/infrastructure`
              : "/api/infrastructure";
            break;
          case "deployment":
            apiUrl = customerId
              ? `/api/customers/${customerId}/deployment`
              : "/api/deployment";
            break;
          case "customers":
            apiUrl = "/api/customers";
            break;
          case "servers":
            apiUrl = customerId
              ? `/api/customers/${customerId}/servers`
              : "/api/servers";
            break;
          default:
            apiUrl = `/api/${apiType}`;
        }

        // For development: Use mock data
        // In production: Uncomment the fetch call below
        // const response = await fetch(apiUrl);
        // if (!response.ok) throw new Error("Failed to fetch data");
        // const result = await response.json();
        // setData(result.data || result);

        // Mock Data 1: Complete Infrastructure Details
        const mockData1 = {
          customer: {
            id: 1,
            customerId: "cust_d20d1362",
            customerName: "Acme Corporation (Updated)",
            status: "active",
            createdAt: "2025-12-23 07:42:33",
            updatedAt: "2025-12-23 10:28:11",
            createdBy: "system",
            notes: null,
          },
          kafka: {
            id: 1,
            customerId: "cust_d20d1362",
            deploymentId: "kafka_deploy_1766475796200_y7jxiefa8",
            brokers: [
              {
                host: "178.128.71.220",
                port: 9093,
                nodeId: 1,
              },
            ],
            sslEnabled: true,
            sslConfig: null,
            saslConfig: null,
            status: "active",
            serverPort: 9093,
            createdAt: "2025-12-23 07:45:32",
            updatedAt: "2025-12-23 07:45:32",
          },
          redis: {
            id: 4,
            customerId: "cust_d20d1362",
            host: "157.230.153.205",
            port: 6379,
            password: null,
            tlsEnabled: true,
            tlsConfig: null,
            database: 0,
            status: "active",
            serverHost: "157.230.153.205",
            createdAt: "2025-12-23 08:19:13",
            updatedAt: "2025-12-23 08:19:13",
          },
          certificates: {
            database: [],
            filesystem: [
              {
                type: "kafka",
                service: "Kafka",
                environment: "production",
                path: "/data/customers/cust_d20d1362/kafka/production/certificates",
                ca: "/opt/wg-monitor-server/data/customers/cust_d20d1362/kafka/production/certificates/ca-cert.pem",
                clients: "/opt/wg-monitor-server/data/customers/cust_d20d1362/kafka/production/certificates/clients",
              },
              {
                type: "redis",
                service: "Redis",
                environment: "production",
                path: "/data/customers/cust_d20d1362/redis/production/certificates",
                ca: "/opt/wg-monitor-server/data/customers/cust_d20d1362/redis/production/certificates/ca-cert.pem",
                clients: "/opt/wg-monitor-server/data/customers/cust_d20d1362/redis/production/certificates/clients",
              },
              {
                type: "vpn",
                service: "VPN",
                path: "/data/customers/cust_d20d1362/certificates/vpn",
                config: {
                  version: "2.0.0",
                  createdAt: "2025-12-23T08:24:35.595Z",
                  updatedAt: "2025-12-23T08:24:38.965Z",
                  ca: {
                    certificatePath: "/root/projects/wg-monitor-server/data/certificates/pki/ca/ca.crt",
                    fingerprint: "55:BB:41:18:4C:EF:19:1E:7F:E5:D4:21:FB:C4:FE:7D:99:AE:AE:68",
                    subject: "C = PK, ST = Punjab, L = Lahore, O = WG-Monitor, OU = Infrastructure, CN = WG-Monitor-CA",
                    notBefore: "Dec 23 08:24:38 2025 GMT",
                    notAfter: "Dec 21 08:24:38 2035 GMT",
                  },
                  client: {
                    certificatePath: "/opt/wg-monitor-server/data/certificates/client/client.crt",
                    keyPath: "/opt/wg-monitor-server/data/certificates/client/client.key",
                    bundlePath: "/opt/wg-monitor-server/data/customers/cust_d20d1362/certificates/client/bundle.pem",
                    fingerprint: "3E:3A:1C:E7:8F:57:8E:0C:2D:45:FF:9A:5D:48:1F:B1:31:35:8A:B1",
                    commonName: "wg-monitor-server-client",
                    serialNumber: "639BA3C1CCA45935BF819B2E8ABC5CFD442B388A",
                    issuedAt: "Dec 23 08:24:38 2025 GMT",
                    expiresAt: "Dec 23 08:24:38 2026 GMT",
                  },
                  server: {
                    certificatePath: "/opt/wg-monitor-server/data/certificates/server/server.crt",
                    keyPath: "/opt/wg-monitor-server/data/certificates/server/server.key",
                    caCertPath: "/opt/wg-monitor-server/data/certificates/server/ca.crt",
                    bundlePath: "/opt/wg-monitor-server/data/customers/cust_d20d1362/certificates/server/bundle.pem",
                    fingerprint: "3A:EB:A4:5A:1D:DE:A9:9B:28:AA:20:95:4E:1E:89:C7:7F:84:07:39",
                    commonName: "wg-monitor-agent-server",
                    serialNumber: "639BA3C1CCA45935BF819B2E8ABC5CFD442B388B",
                    issuedAt: "Dec 23 08:24:38 2025 GMT",
                    expiresAt: "Dec 23 08:24:38 2026 GMT",
                  },
                  options: {
                    defaultValidityDays: 365,
                    renewalThresholdDays: 30,
                    autoRenew: true,
                  },
                  paths: {
                    base: "/opt/wg-monitor-server/data/customers/cust_d20d1362/certificates",
                    pki: "/opt/wg-monitor-server/data/customers/cust_d20d1362/certificates/pki",
                    client: "/opt/wg-monitor-server/data/customers/cust_d20d1362/certificates/client",
                    server: "/opt/wg-monitor-server/data/customers/cust_d20d1362/certificates/server",
                  },
                },
              },
            ],
          },
          monitorServers: [
            {
              id: 4,
              customerId: "cust_d20d1362",
              serverId: "monitor-1766487731679-it0mhuq9b",
              serverName: "Production Monitor Server",
              host: "138.197.202.233",
              port: 3002,
              deployPath: "/opt/wg-monitor-prod",
              status: "running",
              deployedAt: "2025-12-23T11:02:50.892Z",
              configVersion: 1,
              notes: null,
              url: "http://138.197.202.233:3002",
              createdAt: "2025-12-23 11:02:11",
              updatedAt: "2025-12-23 11:02:50",
            },
            {
              id: 1,
              customerId: "cust_d20d1362",
              serverId: "monitor-1766478023781-n3lmjchcj",
              serverName: "Production Monitor Server",
              host: "138.197.202.233",
              port: 3002,
              deployPath: "/opt/wg-monitor-prod",
              status: "running",
              deployedAt: "2025-12-23T08:22:16.612Z",
              configVersion: 1,
              notes: null,
              url: "http://138.197.202.233:3002",
              createdAt: "2025-12-23 08:20:23",
              updatedAt: "2025-12-23 08:22:16",
            },
          ],
        };

        // Mock Data 2: Deployment Configuration
        const mockData2 = {
          deploymentRole: "MONITOR_SERVER",
          customerId: "cust_d20d1362",
          customerName: "Acme Corporation (Updated)",
          environment: "production",
          kafkaBrokersConfig: {
            deploymentId: "existing-server-kafka",
            timestamp: "2025-12-23T07:44:34.101Z",
            brokers: ["178.128.71.220:9093"],
            ssl: {
              enabled: true,
              rejectUnauthorized: false,
              ca: "/opt/wg-monitor-server/data/customers/cust_d20d1362/kafka/production/certificates/ca-cert.pem",
              consumer: {
                cert: "/opt/wg-monitor-server/data/customers/cust_d20d1362/kafka/production/certificates/clients/consumer-client.crt",
                key: "/opt/wg-monitor-server/data/customers/cust_d20d1362/kafka/production/certificates/clients/consumer-client.key",
              },
              producer: {
                cert: "/opt/wg-monitor-server/data/customers/cust_d20d1362/kafka/production/certificates/clients/producer-client.crt",
                key: "/opt/wg-monitor-server/data/customers/cust_d20d1362/kafka/production/certificates/clients/producer-client.key",
              },
            },
            sasl: null,
            clientId: "wg-monitor-consumer",
            consumerGroup: "wg-monitor-consumers",
            producer: {
              partitioner: "default",
            },
            redis: {
              host: "157.230.153.205",
              port: 6379,
              password: "RedisPass123!",
              tls: {
                enabled: true,
                rejectUnauthorized: false,
                ca: "/opt/wg-monitor-server/data/customers/cust_d20d1362/redis/production/certificates/ca-cert.pem",
                cert: "/opt/wg-monitor-server/data/customers/cust_d20d1362/redis/production/certificates/clients/redis-client.crt",
                key: "/opt/wg-monitor-server/data/customers/cust_d20d1362/redis/production/certificates/clients/redis-client.key",
                combined: "/opt/wg-monitor-server/data/customers/cust_d20d1362/redis/production/certificates/clients/redis-client-combined.pem",
              },
            },
          },
          vpnCertificates: {
            version: "2.0.0",
            createdAt: "2025-12-23T08:24:35.595Z",
            updatedAt: "2025-12-23T08:24:38.965Z",
            ca: {
              certificatePath: "/root/projects/wg-monitor-server/data/certificates/pki/ca/ca.crt",
              fingerprint: "55:BB:41:18:4C:EF:19:1E:7F:E5:D4:21:FB:C4:FE:7D:99:AE:AE:68",
              subject: "C = PK, ST = Punjab, L = Lahore, O = WG-Monitor, OU = Infrastructure, CN = WG-Monitor-CA",
              notBefore: "Dec 23 08:24:38 2025 GMT",
              notAfter: "Dec 21 08:24:38 2035 GMT",
            },
            client: {
              certificatePath: "/opt/wg-monitor-server/data/certificates/client/client.crt",
              keyPath: "/opt/wg-monitor-server/data/certificates/client/client.key",
              bundlePath: "/opt/wg-monitor-server/data/customers/cust_d20d1362/certificates/client/bundle.pem",
              fingerprint: "3E:3A:1C:E7:8F:57:8E:0C:2D:45:FF:9A:5D:48:1F:B1:31:35:8A:B1",
              commonName: "wg-monitor-server-client",
              serialNumber: "639BA3C1CCA45935BF819B2E8ABC5CFD442B388A",
              issuedAt: "Dec 23 08:24:38 2025 GMT",
              expiresAt: "Dec 23 08:24:38 2026 GMT",
            },
            server: {
              certificatePath: "/opt/wg-monitor-server/data/certificates/server/server.crt",
              keyPath: "/opt/wg-monitor-server/data/certificates/server/server.key",
              caCertPath: "/opt/wg-monitor-server/data/certificates/server/ca.crt",
              bundlePath: "/opt/wg-monitor-server/data/customers/cust_d20d1362/certificates/server/bundle.pem",
              fingerprint: "3A:EB:A4:5A:1D:DE:A9:9B:28:AA:20:95:4E:1E:89:C7:7F:84:07:39",
              commonName: "wg-monitor-agent-server",
              serialNumber: "639BA3C1CCA45935BF819B2E8ABC5CFD442B388B",
              issuedAt: "Dec 23 08:24:38 2025 GMT",
              expiresAt: "Dec 23 08:24:38 2026 GMT",
            },
            options: {
              defaultValidityDays: 365,
              renewalThresholdDays: 30,
              autoRenew: true,
            },
            paths: {
              base: "/opt/wg-monitor-server/data/customers/cust_d20d1362/certificates",
              pki: "/opt/wg-monitor-server/data/customers/cust_d20d1362/certificates/pki",
              client: "/opt/wg-monitor-server/data/customers/cust_d20d1362/certificates/client",
              server: "/opt/wg-monitor-server/data/customers/cust_d20d1362/certificates/server",
            },
          },
          certificatePaths: {
            kafka: {
              exists: true,
              path: "/opt/wg-monitor-server/data/customers/cust_d20d1362/kafka/production/certificates",
              relativePath: "/data/customers/cust_d20d1362/kafka/production/certificates",
              ca: "/opt/wg-monitor-server/data/customers/cust_d20d1362/kafka/production/certificates/ca-cert.pem",
              clients: "/opt/wg-monitor-server/data/customers/cust_d20d1362/kafka/production/certificates/clients",
            },
            redis: {
              exists: true,
              path: "/opt/wg-monitor-server/data/customers/cust_d20d1362/redis/production/certificates",
              relativePath: "/data/customers/cust_d20d1362/redis/production/certificates",
              ca: "/opt/wg-monitor-server/data/customers/cust_d20d1362/redis/production/certificates/ca-cert.pem",
              clients: "/opt/wg-monitor-server/data/customers/cust_d20d1362/redis/production/certificates/clients",
            },
            vpn: {
              exists: false,
              path: "/opt/wg-monitor-server/data/customers/cust_d20d1362/certificates/vpn",
              relativePath: "/data/customers/cust_d20d1362/certificates/vpn",
            },
          },
          kafkaConfig: {
            id: 1,
            customerId: "cust_d20d1362",
            deploymentId: "kafka_deploy_1766475796200_y7jxiefa8",
            brokers: [
              {
                host: "178.128.71.220",
                port: 9093,
                nodeId: 1,
              },
            ],
            sslEnabled: true,
            sslConfig: null,
            saslConfig: null,
            status: "active",
            serverPort: 9093,
            createdAt: "2025-12-23 07:45:32",
            updatedAt: "2025-12-23 07:45:32",
          },
          redisConfig: {
            id: 4,
            customerId: "cust_d20d1362",
            host: "157.230.153.205",
            port: 6379,
            password: null,
            tlsEnabled: true,
            tlsConfig: null,
            database: 0,
            status: "active",
            serverHost: "157.230.153.205",
            createdAt: "2025-12-23 08:19:13",
            updatedAt: "2025-12-23 08:19:13",
          },
          monitorServers: {
            active: [],
            total: 2,
          },
          exportedAt: "2025-12-24T10:20:40.795Z",
          infraServer: {
            url: "http://206.189.160.236:3002",
            authTokenRequired: true,
          },
          syncSettings: {
            enabled: true,
            interval: 300000,
          },
        };

        // Mock Data 3: Customer List
        const mockData3 = {
          customers: [
            {
              id: 4,
              customerId: "cust_0b2e0d46",
              customerName: "test customer ",
              status: "active",
              createdAt: "2025-12-24 08:19:30",
              updatedAt: "2025-12-24 08:19:30",
              createdBy: "system",
              notes: null,
            },
            {
              id: 3,
              customerId: "cust_8c5af412",
              customerName: "Acme Corporation",
              status: "active",
              createdAt: "2025-12-24 08:17:44",
              updatedAt: "2025-12-24 08:17:44",
              createdBy: "system",
              notes: null,
            },
            {
              id: 2,
              customerId: "cust_78946cba",
              customerName: "Acme Corporation 4",
              status: "active",
              createdAt: "2025-12-23 08:51:43",
              updatedAt: "2025-12-23 10:26:46",
              createdBy: "system",
              notes: null,
            },
            {
              id: 1,
              customerId: "cust_d20d1362",
              customerName: "Acme Corporation (Updated)",
              status: "active",
              createdAt: "2025-12-23 07:42:33",
              updatedAt: "2025-12-23 10:28:11",
              createdBy: "system",
              notes: null,
            },
          ],
          total: 4,
        };

        // Mock Data 4: Server List
        const mockData4 = {
          servers: [
            {
              id: 4,
              customerId: "cust_d20d1362",
              serverId: "monitor-1766487731679-it0mhuq9b",
              serverName: "Production Monitor Server",
              host: "138.197.202.233",
              port: 3002,
              deployPath: "/opt/wg-monitor-prod",
              status: "running",
              deployedAt: "2025-12-23T11:02:50.892Z",
              configVersion: 1,
              notes: null,
              url: "http://138.197.202.233:3002",
              createdAt: "2025-12-23 11:02:11",
              updatedAt: "2025-12-23 11:02:50",
            },
            {
              id: 1,
              customerId: "cust_d20d1362",
              serverId: "monitor-1766478023781-n3lmjchcj",
              serverName: "Production Monitor Server",
              host: "138.197.202.233",
              port: 3002,
              deployPath: "/opt/wg-monitor-prod",
              status: "running",
              deployedAt: "2025-12-23T08:22:16.612Z",
              configVersion: 1,
              notes: null,
              url: "http://138.197.202.233:3002",
              createdAt: "2025-12-23 08:20:23",
              updatedAt: "2025-12-23 08:22:16",
            },
          ],
          total: 2,
        };

        // Select mock data based on URL parameter
        let selectedData;
        switch (mockDataNum) {
          case "1":
            selectedData = mockData1;
            break;
          case "2":
            selectedData = mockData2;
            break;
          case "3":
            selectedData = mockData3;
            break;
          case "4":
            selectedData = mockData4;
            break;
          default:
            selectedData = mockData1;
        }

        setData(selectedData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err instanceof Error ? err.message : "Failed to load data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleExport = () => {
    if (!data) return;
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `infrastructure-${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Activity className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Loading details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="h-8 w-8 mx-auto mb-4 text-destructive" />
            <p className="text-muted-foreground">{error || "Failed to load data"}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="mt-20 bg-background flex flex-col">
      <Header />

      <main className="flex-1 py-8 lg:py-12">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6">
          {/* Page Header */}
          <div className="mb-8 flex items-start justify-between">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">Infrastructure Details</h1>
              <p className="text-muted-foreground">
                Complete overview of provisioned infrastructure and configuration
              </p>
            </div>
            <Button onClick={handleExport} variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Export JSON
            </Button>
          </div>

          <div className="grid gap-6">
            {/* Dynamically render all top-level sections */}
            {Object.entries(data).map(([key, value]) => (
              <NestedObjectCard key={key} title={key} data={value} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ShowDetails;
