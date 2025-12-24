import { useState, useCallback } from 'react';
import {
  InfrastructureState,
  VPNServer,
  RedisNode,
  RedisNodeRole,
  KafkaNode,
  KafkaNodeType,
  createInitialInfrastructureState,
  createInitialVPNServer,
  createInitialRedisNode,
  createInitialKafkaNode,
  KAFKA_TEMPLATES,
  Environment,
  DeploymentMode,
  RedisClusterType,
} from '@/types/infrastructure';

export function useInfrastructure() {
  const [state, setState] = useState<InfrastructureState>(createInitialInfrastructureState());

  // ============ Navigation Actions ============
  const setSelectedCategory = useCallback((category: 'vpn' | 'infrastructure') => {
    setState(prev => ({ ...prev, selectedCategory: category, selectedServerType: null }));
  }, []);

  const setSelectedServerType = useCallback((type: 'vpn' | 'redis' | 'kafka' | null) => {
    setState(prev => ({ ...prev, selectedServerType: type, selectedKafkaNodeType: null }));
  }, []);

  const setSelectedKafkaNodeType = useCallback((type: 'template' | 'custom' | null) => {
    setState(prev => ({ ...prev, selectedKafkaNodeType: type }));
  }, []);

  // ============ VPN Actions ============
  const updateVPNMode = useCallback((mode: DeploymentMode) => {
    setState(prev => ({
      ...prev,
      vpnConfig: { ...prev.vpnConfig, mode },
    }));
  }, []);

  const updateVPNClient = useCallback((client: string) => {
    setState(prev => ({
      ...prev,
      vpnConfig: { ...prev.vpnConfig, client },
    }));
  }, []);

  const addVPNServer = useCallback(() => {
    setState(prev => ({
      ...prev,
      vpnConfig: {
        ...prev.vpnConfig,
        servers: [...prev.vpnConfig.servers, createInitialVPNServer()],
      },
    }));
  }, []);

  const removeVPNServer = useCallback((serverId: string) => {
    setState(prev => {
      if (prev.vpnConfig.servers.length <= 1) {
        return prev; // Keep at least one server
      }
      return {
        ...prev,
        vpnConfig: {
          ...prev.vpnConfig,
          servers: prev.vpnConfig.servers.filter(s => s.id !== serverId),
        },
      };
    });
  }, []);

  const updateVPNServer = useCallback((serverId: string, updates: Partial<VPNServer>) => {
    setState(prev => ({
      ...prev,
      vpnConfig: {
        ...prev.vpnConfig,
        servers: prev.vpnConfig.servers.map(s =>
          s.id === serverId ? { ...s, ...updates } : s
        ),
      },
    }));
  }, []);

  const updateVPNEnvOverride = useCallback((key: string, value: string | number) => {
    setState(prev => ({
      ...prev,
      vpnConfig: {
        ...prev.vpnConfig,
        envOverrides: { ...prev.vpnConfig.envOverrides, [key]: value },
      },
    }));
  }, []);

  // ============ Redis Actions ============
  const updateRedisConfig = useCallback((updates: Partial<typeof state.redisConfig>) => {
    setState(prev => ({
      ...prev,
      redisConfig: { ...prev.redisConfig, ...updates },
    }));
  }, []);

  const updateRedisClusterType = useCallback((type: RedisClusterType) => {
    setState(prev => ({
      ...prev,
      redisConfig: { ...prev.redisConfig, type },
    }));
  }, []);

  const addRedisNode = useCallback((role: RedisNodeRole) => {
    setState(prev => {
      const newNode = createInitialRedisNode(role, prev.redisConfig.region);
      const nodes = { ...prev.redisConfig.nodes };
      
      if (role === 'master') {
        nodes.masters = [...nodes.masters, newNode];
      } else if (role === 'replica') {
        nodes.replicas = [...nodes.replicas, newNode];
      } else {
        nodes.sentinels = [...nodes.sentinels, newNode];
      }
      
      return {
        ...prev,
        redisConfig: { ...prev.redisConfig, nodes },
      };
    });
  }, []);

  const removeRedisNode = useCallback((role: RedisNodeRole, nodeId: string) => {
    setState(prev => {
      const nodes = { ...prev.redisConfig.nodes };
      
      if (role === 'master' && nodes.masters.length > 1) {
        nodes.masters = nodes.masters.filter(n => n.id !== nodeId);
      } else if (role === 'replica' && nodes.replicas.length > 1) {
        nodes.replicas = nodes.replicas.filter(n => n.id !== nodeId);
      } else if (role === 'sentinel' && nodes.sentinels.length > 1) {
        nodes.sentinels = nodes.sentinels.filter(n => n.id !== nodeId);
      }
      
      return {
        ...prev,
        redisConfig: { ...prev.redisConfig, nodes },
      };
    });
  }, []);

  const updateRedisNode = useCallback((role: RedisNodeRole, nodeId: string, updates: Partial<RedisNode>) => {
    setState(prev => {
      const nodes = { ...prev.redisConfig.nodes };
      
      if (role === 'master') {
        nodes.masters = nodes.masters.map(n => n.id === nodeId ? { ...n, ...updates } : n);
      } else if (role === 'replica') {
        nodes.replicas = nodes.replicas.map(n => n.id === nodeId ? { ...n, ...updates } : n);
      } else {
        nodes.sentinels = nodes.sentinels.map(n => n.id === nodeId ? { ...n, ...updates } : n);
      }
      
      return {
        ...prev,
        redisConfig: { ...prev.redisConfig, nodes },
      };
    });
  }, []);

  // ============ Kafka Actions ============
  const updateKafkaConfig = useCallback((updates: Partial<typeof state.kafkaConfig>) => {
    setState(prev => ({
      ...prev,
      kafkaConfig: { ...prev.kafkaConfig, ...updates },
    }));
  }, []);

  const addKafkaNode = useCallback((type: KafkaNodeType) => {
    setState(prev => {
      const newNode = createInitialKafkaNode(type, prev.kafkaConfig.region);
      if (type === 'template') {
        const template = KAFKA_TEMPLATES[0];
        newNode.config = {
          brokerCount: template.brokerCount,
          replicationFactor: template.replicationFactor,
          partitions: template.partitions,
          retentionHours: template.retentionHours,
        };
      }
      return {
        ...prev,
        kafkaConfig: {
          ...prev.kafkaConfig,
          nodes: [...prev.kafkaConfig.nodes, newNode],
        },
      };
    });
  }, []);

  const removeKafkaNode = useCallback((nodeId: string) => {
    setState(prev => ({
      ...prev,
      kafkaConfig: {
        ...prev.kafkaConfig,
        nodes: prev.kafkaConfig.nodes.filter(n => n.id !== nodeId),
      },
    }));
  }, []);

  const updateKafkaNode = useCallback((nodeId: string, updates: Partial<KafkaNode>) => {
    setState(prev => ({
      ...prev,
      kafkaConfig: {
        ...prev.kafkaConfig,
        nodes: prev.kafkaConfig.nodes.map(n =>
          n.id === nodeId ? { ...n, ...updates } : n
        ),
      },
    }));
  }, []);

  const applyKafkaTemplate = useCallback((nodeId: string, templateId: string) => {
    const template = KAFKA_TEMPLATES.find(t => t.id === templateId);
    if (!template) return;
    
    setState(prev => ({
      ...prev,
      kafkaConfig: {
        ...prev.kafkaConfig,
        nodes: prev.kafkaConfig.nodes.map(n =>
          n.id === nodeId
            ? {
                ...n,
                template: templateId,
                config: {
                  brokerCount: template.brokerCount,
                  replicationFactor: template.replicationFactor,
                  partitions: template.partitions,
                  retentionHours: template.retentionHours,
                },
              }
            : n
        ),
      },
    }));
  }, []);

  // ============ Deployment Actions ============
  const startDeployment = useCallback(() => {
    setState(prev => ({
      ...prev,
      isDeploying: true,
      deploymentProgress: 0,
      deploymentStatus: 'Initializing deployment...',
      deploymentId: crypto.randomUUID(),
    }));
  }, []);

  const updateDeploymentProgress = useCallback((progress: number, status: string) => {
    setState(prev => ({
      ...prev,
      deploymentProgress: progress,
      deploymentStatus: status,
    }));
  }, []);

  const completeDeployment = useCallback((success: boolean) => {
    setState(prev => ({
      ...prev,
      isDeploying: false,
      deploymentProgress: success ? 100 : prev.deploymentProgress,
      deploymentStatus: success ? 'Deployment completed successfully!' : 'Deployment failed',
    }));
  }, []);

  const resetDeployment = useCallback(() => {
    setState(prev => ({
      ...prev,
      isDeploying: false,
      deploymentProgress: 0,
      deploymentStatus: '',
      deploymentId: null,
    }));
  }, []);

  // ============ Validation ============
  const validateVPNConfig = useCallback(() => {
    const errors: string[] = [];
    const { vpnConfig } = state;

    if (!vpnConfig.client.trim()) {
      errors.push('Client name is required');
    }

    vpnConfig.servers.forEach((server, index) => {
      if (!server.environment) {
        errors.push(`Server ${index + 1}: Environment is required`);
      }
      if (!server.size) {
        errors.push(`Server ${index + 1}: Size is required`);
      }
      if (!server.region) {
        errors.push(`Server ${index + 1}: Region is required`);
      }
    });

    return errors;
  }, [state]);

  const validateRedisConfig = useCallback(() => {
    const errors: string[] = [];
    const { redisConfig } = state;

    if (!redisConfig.name.trim()) {
      errors.push('Cluster name is required');
    }
    if (!redisConfig.vpcUUID.trim()) {
      errors.push('VPC UUID is required');
    }
    if (!redisConfig.systemPassword.trim()) {
      errors.push('System password is required');
    }
    if (redisConfig.nodes.masters.length < 1) {
      errors.push('At least one master node is required');
    }
    if (redisConfig.nodes.sentinels.length < 3 && redisConfig.type.includes('sentinel')) {
      errors.push('Sentinel clusters require at least 3 sentinel nodes');
    }

    return errors;
  }, [state]);

  const validateKafkaConfig = useCallback(() => {
    const errors: string[] = [];
    const { kafkaConfig } = state;

    if (!kafkaConfig.name.trim()) {
      errors.push('Cluster name is required');
    }
    if (!kafkaConfig.vpcUUID.trim()) {
      errors.push('VPC UUID is required');
    }
    if (kafkaConfig.nodes.length < 1) {
      errors.push('At least one Kafka node is required');
    }

    kafkaConfig.nodes.forEach((node, index) => {
      if (!node.name.trim()) {
        errors.push(`Node ${index + 1}: Name is required`);
      }
    });

    return errors;
  }, [state]);

  // ============ Reset ============
  const resetState = useCallback(() => {
    setState(createInitialInfrastructureState());
  }, []);

  return {
    state,
    // Navigation
    setSelectedCategory,
    setSelectedServerType,
    setSelectedKafkaNodeType,
    // VPN
    updateVPNMode,
    updateVPNClient,
    addVPNServer,
    removeVPNServer,
    updateVPNServer,
    updateVPNEnvOverride,
    // Redis
    updateRedisConfig,
    updateRedisClusterType,
    addRedisNode,
    removeRedisNode,
    updateRedisNode,
    // Kafka
    updateKafkaConfig,
    addKafkaNode,
    removeKafkaNode,
    updateKafkaNode,
    applyKafkaTemplate,
    // Deployment
    startDeployment,
    updateDeploymentProgress,
    completeDeployment,
    resetDeployment,
    // Validation
    validateVPNConfig,
    validateRedisConfig,
    validateKafkaConfig,
    // Reset
    resetState,
  };
}
