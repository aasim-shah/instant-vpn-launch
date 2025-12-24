import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useInfrastructure } from "@/hooks/use-infrastructure";
import {
  REGIONS,
  NODE_SIZES,
  KAFKA_TEMPLATES,
  RedisNodeRole,
} from "@/types/infrastructure";
import {
  Server,
  Shield,
  Database,
  Network,
  ChevronRight,
  ChevronDown,
  Plus,
  X,
  Loader2,
  Check,
  Settings,
  Tag,
  Layers,
  FileCode,
  Blocks,
} from "lucide-react";
import { toast } from "sonner";

// Tree navigation item component
interface TreeItemProps {
  label: string;
  icon: React.ReactNode;
  isSelected?: boolean;
  isExpanded?: boolean;
  hasChildren?: boolean;
  level?: number;
  onClick?: () => void;
  onToggle?: () => void;
  badge?: string;
}

function TreeItem({
  label,
  icon,
  isSelected,
  isExpanded,
  hasChildren,
  level = 0,
  onClick,
  onToggle,
  badge,
}: TreeItemProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all",
        "hover:bg-secondary/80",
        isSelected && "bg-primary/10 text-primary border border-primary/20",
        !isSelected && "text-muted-foreground hover:text-foreground"
      )}
      style={{ paddingLeft: `${12 + level * 16}px` }}
      onClick={onClick}
    >
      {hasChildren && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggle?.();
          }}
          className="p-0.5 hover:bg-secondary rounded"
        >
          {isExpanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
      )}
      {!hasChildren && <div className="w-5" />}
      <span className="flex-shrink-0">{icon}</span>
      <span className="text-sm font-medium truncate">{label}</span>
      {badge && (
        <Badge variant="secondary" className="ml-auto text-xs">
          {badge}
        </Badge>
      )}
    </div>
  );
}

// VPN Server Form Component
function VPNServerForm({ infrastructure }: { infrastructure: ReturnType<typeof useInfrastructure> }) {
  const { state, updateVPNMode, updateVPNClient, addVPNServer, removeVPNServer, updateVPNServer } = infrastructure;
  const { vpnConfig } = state;

  return (
    <div className="space-y-6">
      {/* Deployment Mode & Client */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Deployment Mode *</Label>
          <Select value={vpnConfig.mode} onValueChange={(v) => updateVPNMode(v as any)}>
            <SelectTrigger>
              <SelectValue placeholder="Select mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="setup">Setup - Initial configuration</SelectItem>
              <SelectItem value="deploy">Deploy - Deploy services</SelectItem>
              <SelectItem value="update">Update - Update configuration</SelectItem>
              <SelectItem value="rollback">Rollback - Revert changes</SelectItem>
              <SelectItem value="maintenance">Maintenance - Maintenance mode</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Client / Organization *</Label>
          <Input
            placeholder="e.g., my-organization"
            value={vpnConfig.client}
            onChange={(e) => updateVPNClient(e.target.value)}
          />
        </div>
      </div>

      <Separator />

      {/* Server Configurations */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Server className="h-4 w-4 text-primary" />
            <h3 className="font-semibold">Server Configurations</h3>
          </div>
          <Button variant="outline" size="sm" onClick={addVPNServer}>
            <Plus className="h-4 w-4 mr-1" />
            Add Server
          </Button>
        </div>

        <div className="space-y-4">
          {vpnConfig.servers.map((server, index) => (
            <Card key={server.id} className="border-border/50">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Server {index + 1}</CardTitle>
                  {vpnConfig.servers.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => removeVPNServer(server.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Environment *</Label>
                    <Select
                      value={server.environment}
                      onValueChange={(v) => updateVPNServer(server.id, { environment: v as any })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dev">Development</SelectItem>
                        <SelectItem value="stage">Staging</SelectItem>
                        <SelectItem value="prod">Production</SelectItem>
                        <SelectItem value="qa">QA</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Size *</Label>
                    <Select
                      value={server.size}
                      onValueChange={(v) => updateVPNServer(server.id, { size: v })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {NODE_SIZES.map((size) => (
                          <SelectItem key={size.slug} value={size.slug}>
                            {size.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Region *</Label>
                    <Select
                      value={server.region}
                      onValueChange={(v) => updateVPNServer(server.id, { region: v })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {REGIONS.filter((r) => r.available).map((region) => (
                          <SelectItem key={region.slug} value={region.slug}>
                            {region.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

// Redis Server Form Component
function RedisServerForm({ infrastructure }: { infrastructure: ReturnType<typeof useInfrastructure> }) {
  const { state, updateRedisConfig, addRedisNode, removeRedisNode, updateRedisNode } = infrastructure;
  const { redisConfig } = state;

  const renderNodeSection = (role: RedisNodeRole, nodes: typeof redisConfig.nodes.masters, title: string, description: string) => (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium capitalize">{title}</h4>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => addRedisNode(role)}>
          <Plus className="h-4 w-4 mr-1" />
          Add {role}
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {nodes.map((node, index) => (
          <Card key={node.id} className="border-border/50 bg-secondary/20">
            <CardContent className="p-3 space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="capitalize">
                  {role} {index + 1}
                </Badge>
                {nodes.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => removeRedisNode(role, node.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Size</Label>
                <Select
                  value={node.size}
                  onValueChange={(v) => updateRedisNode(role, node.id, { size: v })}
                >
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {NODE_SIZES.map((size) => (
                      <SelectItem key={size.slug} value={size.slug}>
                        {size.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Region</Label>
                <Select
                  value={node.region}
                  onValueChange={(v) => updateRedisNode(role, node.id, { region: v })}
                >
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {REGIONS.filter((r) => r.available).map((region) => (
                      <SelectItem key={region.slug} value={region.slug}>
                        {region.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Basic Configuration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Cluster Name *</Label>
          <Input
            placeholder="e.g., prod-redis-cluster"
            value={redisConfig.name}
            onChange={(e) => updateRedisConfig({ name: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Cluster Type *</Label>
          <Select
            value={redisConfig.type}
            onValueChange={(v) => updateRedisConfig({ type: v as any })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="redis-single">Single Node (Dev)</SelectItem>
              <SelectItem value="redis-prod-single">Production Single</SelectItem>
              <SelectItem value="redis-sentinel-cluster-1">Sentinel Cluster</SelectItem>
              <SelectItem value="redis-sentinel-prod">Sentinel Production</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Region *</Label>
          <Select
            value={redisConfig.region}
            onValueChange={(v) => updateRedisConfig({ region: v })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {REGIONS.filter((r) => r.available).map((region) => (
                <SelectItem key={region.slug} value={region.slug}>
                  {region.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* <div className="space-y-2">
          <Label>VPC UUID *</Label>
          <Input
            placeholder="vpc-xxxxxxxx"
            value={redisConfig.vpcUUID}
            onChange={(e) => updateRedisConfig({ vpcUUID: e.target.value })}
          />
        </div> */}
        {/* <div className="space-y-2">
          <Label>System Password *</Label>
          <Input
            type="password"
            placeholder="Secure password"
            value={redisConfig.systemPassword}
            onChange={(e) => updateRedisConfig({ systemPassword: e.target.value })}
          />
        </div> */}
        <div className="space-y-2">
          <Label>Enable TLS</Label>
          <div className="flex items-center gap-2 pt-2">
            <Switch
              checked={redisConfig.enableTLS}
              disabled={true}
              // onCheckedChange={(checked) => updateRedisConfig({ enableTLS: checked })}
            />
            <span className="text-sm text-muted-foreground">
              {redisConfig.enableTLS ? "Enabled" : "Disabled"}
            </span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Node Configuration */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-primary" />
          <h3 className="font-semibold">Node Configuration</h3>
        </div>

        {renderNodeSection(
          "master",
          redisConfig.nodes.masters,
          "Master Nodes",
          "Primary read/write nodes"
        )}

        <Separator />

        {renderNodeSection(
          "replica",
          redisConfig.nodes.replicas,
          "Replica Nodes",
          "Read replicas for high availability"
        )}

        <Separator />

        {renderNodeSection(
          "sentinel",
          redisConfig.nodes.sentinels,
          "Sentinel Nodes",
          "Monitoring and automatic failover (min 3 for quorum)"
        )}
      </div>
    </div>
  );
}

// Kafka Server Form Component
function KafkaServerForm({ infrastructure }: { infrastructure: ReturnType<typeof useInfrastructure> }) {
  const { state, updateKafkaConfig, addKafkaNode, removeKafkaNode, updateKafkaNode, applyKafkaTemplate } = infrastructure;
  const { kafkaConfig, selectedKafkaNodeType } = state;

  return (
    <div className="space-y-6">
      {/* Basic Configuration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Cluster Name *</Label>
          <Input
            placeholder="e.g., prod-kafka-cluster"
            value={kafkaConfig.name}
            onChange={(e) => updateKafkaConfig({ name: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Region *</Label>
          <Select
            value={kafkaConfig.region}
            onValueChange={(v) => updateKafkaConfig({ region: v })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {REGIONS.filter((r) => r.available).map((region) => (
                <SelectItem key={region.slug} value={region.slug}>
                  {region.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* <div className="space-y-2 md:col-span-2">
          <Label>VPC UUID *</Label>
          <Input
            placeholder="vpc-xxxxxxxx"
            value={kafkaConfig.vpcUUID}
            onChange={(e) => updateKafkaConfig({ vpcUUID: e.target.value })}
          />
        </div> */}
      </div>

      <Separator />

      {/* Node Type Selection Info */}
      {selectedKafkaNodeType && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Blocks className="h-4 w-4 text-primary" />
              <h3 className="font-semibold">
                {selectedKafkaNodeType === "template" ? "Template-based Nodes" : "Custom Nodes"}
              </h3>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => addKafkaNode(selectedKafkaNodeType)}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Node
            </Button>
          </div>

          {kafkaConfig.nodes.length === 0 ? (
            <Card className="border-dashed border-2 border-border/50 bg-secondary/10">
              <CardContent className="flex flex-col items-center justify-center py-8">
                <Blocks className="h-10 w-10 text-muted-foreground/50 mb-3" />
                <p className="text-sm text-muted-foreground text-center">
                  No Kafka nodes configured yet.
                  <br />
                  Click "Add Node" to get started.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {kafkaConfig.nodes
                .filter((n) => n.type === selectedKafkaNodeType)
                .map((node, index) => (
                  <Card key={node.id} className="border-border/50">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base flex items-center gap-2">
                          {node.type === "template" ? (
                            <FileCode className="h-4 w-4 text-primary" />
                          ) : (
                            <Settings className="h-4 w-4 text-primary" />
                          )}
                          Node {index + 1}
                        </CardTitle>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => removeKafkaNode(node.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Node Name *</Label>
                          <Input
                            placeholder="e.g., kafka-broker-1"
                            value={node.name}
                            onChange={(e) => updateKafkaNode(node.id, { name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Size</Label>
                          <Select
                            value={node.size}
                            onValueChange={(v) => updateKafkaNode(node.id, { size: v })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {NODE_SIZES.map((size) => (
                                <SelectItem key={size.slug} value={size.slug}>
                                  {size.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {node.type === "template" && (
                          <div className="space-y-2 md:col-span-2">
                            <Label>Template</Label>
                            <Select
                              value={node.template}
                              onValueChange={(v) => applyKafkaTemplate(node.id, v)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select a template" />
                              </SelectTrigger>
                              <SelectContent>
                                {KAFKA_TEMPLATES.map((template) => (
                                  <SelectItem key={template.id} value={template.id}>
                                    {template.name} - {template.brokerCount} broker(s)
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                      </div>

                      {/* Custom Configuration */}
                      {node.type === "custom" && node.config && (
                        <div className="space-y-3 p-3 bg-secondary/20 rounded-lg">
                          <h4 className="text-sm font-medium">Custom Configuration</h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <div className="space-y-1">
                              <Label className="text-xs">Broker Count</Label>
                              <Input
                                type="number"
                                className="h-8"
                                value={node.config.brokerCount}
                                onChange={(e) =>
                                  updateKafkaNode(node.id, {
                                    config: { ...node.config!, brokerCount: parseInt(e.target.value) || 1 },
                                  })
                                }
                              />
                            </div>
                            <div className="space-y-1">
                              <Label className="text-xs">Replication Factor</Label>
                              <Input
                                type="number"
                                className="h-8"
                                value={node.config.replicationFactor}
                                onChange={(e) =>
                                  updateKafkaNode(node.id, {
                                    config: { ...node.config!, replicationFactor: parseInt(e.target.value) || 1 },
                                  })
                                }
                              />
                            </div>
                            <div className="space-y-1">
                              <Label className="text-xs">Partitions</Label>
                              <Input
                                type="number"
                                className="h-8"
                                value={node.config.partitions}
                                onChange={(e) =>
                                  updateKafkaNode(node.id, {
                                    config: { ...node.config!, partitions: parseInt(e.target.value) || 1 },
                                  })
                                }
                              />
                            </div>
                            <div className="space-y-1">
                              <Label className="text-xs">Retention (hours)</Label>
                              <Input
                                type="number"
                                className="h-8"
                                value={node.config.retentionHours}
                                onChange={(e) =>
                                  updateKafkaNode(node.id, {
                                    config: { ...node.config!, retentionHours: parseInt(e.target.value) || 24 },
                                  })
                                }
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Template Preview */}
                      {node.type === "template" && node.config && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-3 bg-secondary/20 rounded-lg">
                          <div className="text-center">
                            <p className="text-xs text-muted-foreground">Brokers</p>
                            <p className="font-semibold">{node.config.brokerCount}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-muted-foreground">Replication</p>
                            <p className="font-semibold">{node.config.replicationFactor}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-muted-foreground">Partitions</p>
                            <p className="font-semibold">{node.config.partitions}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-muted-foreground">Retention</p>
                            <p className="font-semibold">{node.config.retentionHours}h</p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
            </div>
          )}
        </div>
      )}

      {!selectedKafkaNodeType && (
        <Card className="border-dashed border-2 border-border/50 bg-secondary/10">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <Blocks className="h-10 w-10 text-muted-foreground/50 mb-3" />
            <p className="text-sm text-muted-foreground text-center">
              Select a node type from the tree navigation
              <br />
              to configure Kafka nodes.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Deployment Progress Modal
function DeploymentModal({
  isOpen,
  progress,
  status,
  onClose,
  canClose,
}: {
  isOpen: boolean;
  progress: number;
  status: string;
  onClose: () => void;
  canClose: boolean;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={canClose ? onClose : undefined}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {progress < 100 ? (
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            ) : (
              <Check className="h-5 w-5 text-green-500" />
            )}
            {progress < 100 ? "Deploying Infrastructure" : "Deployment Complete"}
          </DialogTitle>
          <DialogDescription>
            {progress < 100
              ? "Please wait while we provision your infrastructure..."
              : "Your infrastructure has been successfully deployed."}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Progress value={progress} className="h-2" />
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{status}</span>
            <span className="font-medium">{progress}%</span>
          </div>
        </div>
        {canClose && (
          <Button onClick={onClose} className="w-full">
            Close
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}

// Main Infrastructure Page
export default function Infrastructure() {
  const infrastructure = useInfrastructure();
  const { state, setSelectedCategory, setSelectedServerType, setSelectedKafkaNodeType, validateVPNConfig, validateRedisConfig, validateKafkaConfig, startDeployment, updateDeploymentProgress, completeDeployment, resetDeployment } = infrastructure;

  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    servers: true,
    infrastructure: true,
    kafka: false,
  });

  const toggleExpand = (key: string) => {
    setExpandedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Simulate deployment
  const handleDeploy = async () => {
    let errors: string[] = [];

    if (state.selectedServerType === "vpn") {
      errors = validateVPNConfig();
    } else if (state.selectedServerType === "redis") {
      errors = validateRedisConfig();
    } else if (state.selectedServerType === "kafka") {
      errors = validateKafkaConfig();
    }

    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
      return;
    }

    startDeployment();

    // Simulate deployment progress
    const steps = [
      { progress: 10, status: "Initializing deployment..." },
      { progress: 25, status: "Connecting to cloud provider..." },
      { progress: 40, status: "Provisioning resources..." },
      { progress: 55, status: "Configuring network..." },
      { progress: 70, status: "Installing services..." },
      { progress: 85, status: "Running health checks..." },
      { progress: 95, status: "Finalizing configuration..." },
      { progress: 100, status: "Deployment complete!" },
    ];

    for (const step of steps) {
      await new Promise((resolve) => setTimeout(resolve, 800));
      updateDeploymentProgress(step.progress, step.status);
    }

    completeDeployment(true);
    toast.success("Infrastructure deployed successfully!");
  };

  const getConfigSummary = () => {
    if (state.selectedServerType === "vpn") {
      return `${state.vpnConfig.servers.length} server(s) • ${state.vpnConfig.mode} mode`;
    } else if (state.selectedServerType === "redis") {
      const { masters, replicas, sentinels } = state.redisConfig.nodes;
      return `${masters.length}M / ${replicas.length}R / ${sentinels.length}S nodes`;
    } else if (state.selectedServerType === "kafka") {
      return `${state.kafkaConfig.nodes.length} node(s)`;
    }
    return "";
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative py-12 lg:py-16 overflow-hidden">
          <div className="hero-grid absolute inset-0" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="h-[400px] w-[400px] rounded-full bg-primary/10 blur-[100px]" />
          </div>
          <div className="container relative mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-2 text-sm backdrop-blur-sm">
                <Settings className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Infrastructure Management</span>
              </div>
              <h1 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
                Configure Your{" "}
                <span className="gradient-text">Infrastructure</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Deploy and manage VPN servers, Redis clusters, and Kafka infrastructure
                with our intuitive configuration wizard.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8 lg:py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Tree Navigation Sidebar */}
              <Card className="lg:col-span-1 border-border/50 h-fit">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Network className="h-5 w-5 text-primary" />
                    Infrastructure
                  </CardTitle>
                  <CardDescription>Select a server type to configure</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[400px]">
                    <div className="p-3 space-y-1">
                      {/* Servers Category */}
                      <Collapsible open={expandedItems.servers} onOpenChange={() => toggleExpand("servers")}>
                       
                        <CollapsibleContent>
                          {/* VPN Servers */}
                          <TreeItem
                            label="VPN Servers"
                            icon={<Shield className="h-4 w-4" />}
                            level={1}
                            isSelected={state.selectedServerType === "vpn"}
                            onClick={() => {
                              setSelectedCategory("vpn");
                              setSelectedServerType("vpn");
                            }}
                            badge="WireGuard"
                          />

                          {/* Infrastructure Servers */}
                          <Collapsible
                            open={expandedItems.infrastructure}
                            onOpenChange={() => toggleExpand("infrastructure")}
                          >
                            <CollapsibleTrigger asChild>
                              <div>
                                <TreeItem
                                  label="Infrastructure Servers"
                                  icon={<Database className="h-4 w-4" />}
                                  level={1}
                                  hasChildren
                                  isExpanded={expandedItems.infrastructure}
                                  onToggle={() => toggleExpand("infrastructure")}
                                />
                              </div>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              {/* Redis Servers */}
                              <TreeItem
                                label="Redis Servers"
                                icon={<Database className="h-4 w-4 text-red-500" />}
                                level={2}
                                isSelected={state.selectedServerType === "redis"}
                                onClick={() => {
                                  setSelectedCategory("infrastructure");
                                  setSelectedServerType("redis");
                                }}
                                badge="Sentinel"
                              />

                              {/* Kafka Servers */}
                              <Collapsible
                                open={expandedItems.kafka}
                                onOpenChange={() => toggleExpand("kafka")}
                              >
                                <CollapsibleTrigger asChild>
                                  <div>
                                    <TreeItem
                                      label="Kafka Servers"
                                      icon={<Layers className="h-4 w-4 text-orange-500" />}
                                      level={2}
                                      hasChildren
                                      isExpanded={expandedItems.kafka}
                                      isSelected={state.selectedServerType === "kafka" && !state.selectedKafkaNodeType}
                                      onClick={() => {
                                        setSelectedCategory("infrastructure");
                                        setSelectedServerType("kafka");
                                        setSelectedKafkaNodeType(null);
                                      }}
                                      onToggle={() => toggleExpand("kafka")}
                                    />
                                  </div>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                  {/* Template-based Nodes */}
                                  <TreeItem
                                    label="Template-based Nodes"
                                    icon={<FileCode className="h-4 w-4" />}
                                    level={3}
                                    isSelected={state.selectedServerType === "kafka" && state.selectedKafkaNodeType === "template"}
                                    onClick={() => {
                                      setSelectedCategory("infrastructure");
                                      setSelectedServerType("kafka");
                                      setSelectedKafkaNodeType("template");
                                    }}
                                  />
                                  {/* Custom Nodes */}
                                  <TreeItem
                                    label="Custom Nodes"
                                    icon={<Settings className="h-4 w-4" />}
                                    level={3}
                                    isSelected={state.selectedServerType === "kafka" && state.selectedKafkaNodeType === "custom"}
                                    onClick={() => {
                                      setSelectedCategory("infrastructure");
                                      setSelectedServerType("kafka");
                                      setSelectedKafkaNodeType("custom");
                                    }}
                                  />
                                </CollapsibleContent>
                              </Collapsible>
                            </CollapsibleContent>
                          </Collapsible>
                        </CollapsibleContent>
                      </Collapsible>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Configuration Panel */}
              <Card className="lg:col-span-3 border-border/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl flex items-center gap-2">
                        {state.selectedServerType === "vpn" && (
                          <>
                            <Shield className="h-5 w-5 text-primary" />
                            VPN Server Configuration
                          </>
                        )}
                        {state.selectedServerType === "redis" && (
                          <>
                            <Database className="h-5 w-5 text-red-500" />
                            Redis Cluster Configuration
                          </>
                        )}
                        {state.selectedServerType === "kafka" && (
                          <>
                            <Layers className="h-5 w-5 text-orange-500" />
                            Kafka Cluster Configuration
                          </>
                        )}
                        {!state.selectedServerType && (
                          <>
                            <Settings className="h-5 w-5 text-muted-foreground" />
                            Select Infrastructure Type
                          </>
                        )}
                      </CardTitle>
                      {state.selectedServerType && (
                        <CardDescription className="mt-1">
                          {getConfigSummary()}
                        </CardDescription>
                      )}
                    </div>
                    {state.selectedServerType && (
                      <Button onClick={handleDeploy} disabled={state.isDeploying}>
                        {state.isDeploying ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Deploying...
                          </>
                        ) : (
                          <>
                            Deploy
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {!state.selectedServerType ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
                        <Network className="h-10 w-10 text-muted-foreground" />
                      </div>
                      <h3 className="mb-2 text-lg font-semibold">No Server Type Selected</h3>
                      <p className="max-w-sm text-muted-foreground">
                        Select a server type from the navigation tree on the left to begin
                        configuring your infrastructure.
                      </p>
                    </div>
                  ) : (
                    <ScrollArea className="h-[600px] pr-4">
                      {state.selectedServerType === "vpn" && (
                        <VPNServerForm infrastructure={infrastructure} />
                      )}
                      {state.selectedServerType === "redis" && (
                        <RedisServerForm infrastructure={infrastructure} />
                      )}
                      {state.selectedServerType === "kafka" && (
                        <KafkaServerForm infrastructure={infrastructure} />
                      )}
                    </ScrollArea>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Deployment Progress Modal */}
      <DeploymentModal
        isOpen={state.isDeploying || state.deploymentProgress === 100}
        progress={state.deploymentProgress}
        status={state.deploymentStatus}
        onClose={resetDeployment}
        canClose={state.deploymentProgress === 100}
      />
    </div>
  );
}
