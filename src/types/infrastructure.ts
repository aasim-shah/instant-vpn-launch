// Infrastructure Types based on INFRASTRUCTURE_DOCUMENTATION.md

// ============ Common Types ============
export type ServerStatus = 'active' | 'inactive' | 'deploying' | 'error' | 'pending';
export type Environment = 'dev' | 'stage' | 'prod' | 'qa';
export type DeploymentMode = 'setup' | 'deploy' | 'update' | 'rollback' | 'maintenance';

// ============ Region Types ============
export interface Region {
  slug: string;
  name: string;
  available: boolean;
}

export const REGIONS: Region[] = [
  { slug: 'nyc1', name: 'New York 1', available: true },
  { slug: 'nyc3', name: 'New York 3', available: true },
  { slug: 'sfo3', name: 'San Francisco 3', available: true },
  { slug: 'ams3', name: 'Amsterdam 3', available: true },
  { slug: 'sgp1', name: 'Singapore 1', available: true },
  { slug: 'lon1', name: 'London 1', available: true },
  { slug: 'fra1', name: 'Frankfurt 1', available: true },
  { slug: 'tor1', name: 'Toronto 1', available: true },
  { slug: 'blr1', name: 'Bangalore 1', available: true },
];

// ============ Node Size Types ============
export interface NodeSize {
  slug: string;
  label: string;
  vcpu: number;
  memory: string;
  disk: string;
  useCase: string;
}

export const NODE_SIZES: NodeSize[] = [
  { slug: 's-1vcpu-1gb', label: '1 vCPU / 1 GB', vcpu: 1, memory: '1 GB', disk: '25 GB', useCase: 'Dev, Sentinel' },
  { slug: 's-1vcpu-2gb', label: '1 vCPU / 2 GB', vcpu: 1, memory: '2 GB', disk: '50 GB', useCase: 'Staging' },
  { slug: 's-2vcpu-2gb', label: '2 vCPU / 2 GB', vcpu: 2, memory: '2 GB', disk: '60 GB', useCase: 'Small Production' },
  { slug: 's-2vcpu-4gb', label: '2 vCPU / 4 GB', vcpu: 2, memory: '4 GB', disk: '80 GB', useCase: 'Production' },
  { slug: 's-4vcpu-8gb', label: '4 vCPU / 8 GB', vcpu: 4, memory: '8 GB', disk: '160 GB', useCase: 'Large Production' },
];

// ============ VPN Server Types ============
export interface VPNServer {
  id: string;
  environment: Environment;
  size: string;
  region: string;
}

export interface VPNDeploymentConfig {
  mode: DeploymentMode;
  client: string;
  servers: VPNServer[];
  envOverrides: {
    NODE_ENV: string;
    LOG_LEVEL: string;
    MONITORING_PORT: number;
    VPN_INTERFACE: string;
    HEALTH_CHECK_INTERVAL: number;
    MAX_PEERS: number;
  };
}

// ============ Redis Server Types ============
export type RedisClusterType = 'redis-single' | 'redis-prod-single' | 'redis-sentinel-cluster-1' | 'redis-sentinel-prod';
export type RedisNodeRole = 'master' | 'replica' | 'sentinel';

export interface RedisNode {
  id: string;
  role: RedisNodeRole;
  size: string;
  region: string;
  status: ServerStatus;
  ip?: string;
}

export interface RedisClusterConfig {
  name: string;
  type: RedisClusterType;
  region: string;
  vpcUUID: string;
  systemPassword: string;
  enableTLS: boolean;
  targetClusters: string[];
  nodes: {
    masters: RedisNode[];
    replicas: RedisNode[];
    sentinels: RedisNode[];
  };
}

// ============ Kafka Server Types ============
export type KafkaNodeType = 'template' | 'custom';

export interface KafkaNode {
  id: string;
  name: string;
  type: KafkaNodeType;
  template?: string;
  size: string;
  region: string;
  status: ServerStatus;
  config?: {
    brokerCount: number;
    replicationFactor: number;
    partitions: number;
    retentionHours: number;
  };
}

export interface KafkaClusterConfig {
  name: string;
  region: string;
  vpcUUID: string;
  nodes: KafkaNode[];
}

export const KAFKA_TEMPLATES = [
  { id: 'small', name: 'Small (Dev)', brokerCount: 1, replicationFactor: 1, partitions: 3, retentionHours: 24 },
  { id: 'medium', name: 'Medium (Staging)', brokerCount: 3, replicationFactor: 2, partitions: 6, retentionHours: 72 },
  { id: 'large', name: 'Large (Production)', brokerCount: 5, replicationFactor: 3, partitions: 12, retentionHours: 168 },
  { id: 'enterprise', name: 'Enterprise', brokerCount: 7, replicationFactor: 3, partitions: 24, retentionHours: 336 },
];

// ============ Infrastructure State ============
export interface InfrastructureState {
  // Navigation
  selectedCategory: 'vpn' | 'infrastructure';
  selectedServerType: 'vpn' | 'redis' | 'kafka' | null;
  selectedKafkaNodeType: 'template' | 'custom' | null;
  
  // VPN Configuration
  vpnConfig: VPNDeploymentConfig;
  
  // Redis Configuration
  redisConfig: RedisClusterConfig;
  
  // Kafka Configuration
  kafkaConfig: KafkaClusterConfig;
  
  // Deployment State
  isDeploying: boolean;
  deploymentProgress: number;
  deploymentStatus: string;
  deploymentId: string | null;
}

// Initial state factory functions
export const createInitialVPNServer = (): VPNServer => ({
  id: crypto.randomUUID(),
  environment: 'dev',
  size: 's-2vcpu-4gb',
  region: 'nyc1',
});

export const createInitialVPNConfig = (): VPNDeploymentConfig => ({
  mode: 'setup',
  client: '',
  servers: [createInitialVPNServer()],
  envOverrides: {
    NODE_ENV: 'production',
    LOG_LEVEL: 'info',
    MONITORING_PORT: 3000,
    VPN_INTERFACE: 'wg0',
    HEALTH_CHECK_INTERVAL: 30,
    MAX_PEERS: 100,
  },
});

export const createInitialRedisNode = (role: RedisNodeRole, region: string): RedisNode => ({
  id: crypto.randomUUID(),
  role,
  size: role === 'sentinel' ? 's-1vcpu-1gb' : 's-2vcpu-4gb',
  region,
  status: 'pending',
});

export const createInitialRedisConfig = (): RedisClusterConfig => ({
  name: '',
  type: 'redis-sentinel-cluster-1',
  region: 'nyc1',
  vpcUUID: '',
  systemPassword: '',
  enableTLS: true,
  targetClusters: ['redis-sentinel-cluster-1'],
  nodes: {
    masters: [createInitialRedisNode('master', 'nyc1')],
    replicas: [createInitialRedisNode('replica', 'nyc1')],
    sentinels: [createInitialRedisNode('sentinel', 'nyc1')],
  },
});

export const createInitialKafkaNode = (type: KafkaNodeType, region: string): KafkaNode => ({
  id: crypto.randomUUID(),
  name: '',
  type,
  template: type === 'template' ? 'small' : undefined,
  size: 's-2vcpu-4gb',
  region,
  status: 'pending',
  config: type === 'custom' ? {
    brokerCount: 3,
    replicationFactor: 2,
    partitions: 6,
    retentionHours: 72,
  } : undefined,
});

export const createInitialKafkaConfig = (): KafkaClusterConfig => ({
  name: '',
  region: 'nyc1',
  vpcUUID: '',
  nodes: [],
});

export const createInitialInfrastructureState = (): InfrastructureState => ({
  selectedCategory: 'vpn',
  selectedServerType: null,
  selectedKafkaNodeType: null,
  vpnConfig: createInitialVPNConfig(),
  redisConfig: createInitialRedisConfig(),
  kafkaConfig: createInitialKafkaConfig(),
  isDeploying: false,
  deploymentProgress: 0,
  deploymentStatus: '',
  deploymentId: null,
});
