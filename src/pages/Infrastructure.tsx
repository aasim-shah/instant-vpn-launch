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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  ChevronRight,
  ChevronLeft,
  Plus,
  X,
  Loader2,
  Check,
  Settings,
  Layers,
  FileCode,
  Blocks,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";

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
    <div className="space-y-6 p-4">
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
        <div className="space-y-2">
          <Label>Enable TLS</Label>
          <div className="flex items-center gap-2 pt-2">
            <Switch
              checked={redisConfig.enableTLS}
              disabled={true}
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
  const { kafkaConfig } = state;

  return (
    <div className="space-y-6 p-4">
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
      </div>

      <Separator />

      {/* Node Configuration */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Blocks className="h-4 w-4 text-primary" />
            <h3 className="font-semibold">Kafka Nodes</h3>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => addKafkaNode("template")}>
              <FileCode className="h-4 w-4 mr-1" />
              Add Template Node
            </Button>
            <Button variant="outline" size="sm" onClick={() => addKafkaNode("custom")}>
              <Settings className="h-4 w-4 mr-1" />
              Add Custom Node
            </Button>
          </div>
        </div>

        {kafkaConfig.nodes.length === 0 ? (
          <Card className="border-dashed border-2 border-border/50 bg-secondary/10">
            <CardContent className="flex flex-col items-center justify-center py-8">
              <Blocks className="h-10 w-10 text-muted-foreground/50 mb-3" />
              <p className="text-sm text-muted-foreground text-center">
                No Kafka nodes configured yet.
                <br />
                Click "Add Template Node" or "Add Custom Node" to get started.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {kafkaConfig.nodes.map((node, index) => (
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
                      <Badge variant="outline" className="ml-2">
                        {node.type}
                      </Badge>
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
    </div>
  );
}

// Main Infrastructure Page
export default function Infrastructure() {
  const infrastructure = useInfrastructure();
  const { state, validateVPNConfig } = infrastructure;

  const [currentStep, setCurrentStep] = useState(1);
  const [skipRedis, setSkipRedis] = useState(false);
  const [skipKafka, setSkipKafka] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    { id: 1, name: "VPN Servers", icon: Shield, description: "Configure VPN servers" },
    { id: 2, name: "Redis Server", icon: Database, description: "Configure Redis cluster (optional)" },
    { id: 3, name: "Kafka Server", icon: Layers, description: "Configure Kafka cluster (optional)" },
  ];

  const handleNext = () => {
    if (currentStep === 1) {
      const errors = validateVPNConfig();
      if (errors.length > 0) {
        errors.forEach((error) => toast.error(error));
        return;
      }
    }
    
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Prepare payload
      const payload: any = {
        vpn: {
          mode: state.vpnConfig.mode,
          client: state.vpnConfig.client,
          servers: state.vpnConfig.servers.map(server => ({
            environment: server.environment,
            size: server.size,
            region: server.region,
          })),
        },
      };

      // Add Redis if not skipped and has a name
      if (!skipRedis && state.redisConfig.name.trim()) {
        payload.redis = {
          name: state.redisConfig.name,
          type: state.redisConfig.type,
          region: state.redisConfig.region,
          enableTLS: state.redisConfig.enableTLS,
          nodes: {
            masters: state.redisConfig.nodes.masters.map(node => ({
              size: node.size,
              region: node.region,
            })),
            replicas: state.redisConfig.nodes.replicas.map(node => ({
              size: node.size,
              region: node.region,
            })),
            sentinels: state.redisConfig.nodes.sentinels.map(node => ({
              size: node.size,
              region: node.region,
            })),
          },
        };
      }

      // Add Kafka if not skipped and has a name
      if (!skipKafka && state.kafkaConfig.name.trim()) {
        payload.kafka = {
          name: state.kafkaConfig.name,
          region: state.kafkaConfig.region,
          nodes: state.kafkaConfig.nodes.map(node => ({
            name: node.name,
            type: node.type,
            size: node.size,
            template: node.template,
            config: node.config,
          })),
        };
      }

      // Submit to API
      const response = await api.post("/api/v1/customer-survey/infra", payload);
      
      toast.success("Infrastructure configuration submitted successfully!");
      console.log("API Response:", response.data);
    } catch (error: any) {
      console.error("Submission error:", error);
      toast.error(error?.response?.data?.message || "Failed to submit infrastructure configuration");
    } finally {
      setIsSubmitting(false);
    }
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
                with our intuitive multi-step wizard.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8 lg:py-12">
          <div className="container mx-auto px-4 max-w-6xl">
            {/* Step Indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <div
                        className={cn(
                          "flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all",
                          currentStep === step.id
                            ? "border-primary bg-primary text-primary-foreground"
                            : currentStep > step.id
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-background text-muted-foreground"
                        )}
                      >
                        {currentStep > step.id ? (
                          <CheckCircle2 className="h-6 w-6" />
                        ) : (
                          <step.icon className="h-6 w-6" />
                        )}
                      </div>
                      <div className="mt-2 text-center">
                        <p className={cn(
                          "text-sm font-medium",
                          currentStep === step.id ? "text-primary" : "text-muted-foreground"
                        )}>
                          {step.name}
                        </p>
                        <p className="text-xs text-muted-foreground hidden sm:block">
                          {step.description}
                        </p>
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={cn(
                          "h-0.5 flex-1 mx-4 transition-all",
                          currentStep > step.id ? "bg-primary" : "bg-border"
                        )}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Form Content */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  {currentStep === 1 && (
                    <>
                      <Shield className="h-5 w-5 text-primary" />
                      VPN Server Configuration
                    </>
                  )}
                  {currentStep === 2 && (
                    <>
                      <Database className="h-5 w-5 text-red-500" />
                      Redis Cluster Configuration
                    </>
                  )}
                  {currentStep === 3 && (
                    <>
                      <Layers className="h-5 w-5 text-orange-500" />
                      Kafka Cluster Configuration
                    </>
                  )}
                </CardTitle>
                <CardDescription>
                  {currentStep === 1 && "Configure your VPN servers (Required)"}
                  {currentStep === 2 && (
                    <div className="flex items-center justify-between">
                      <span>Configure Redis cluster if needed (Optional)</span>
                      <div className="flex items-center gap-2">
                        <Label className="text-xs">Skip Redis</Label>
                        <Switch
                          checked={skipRedis}
                          onCheckedChange={setSkipRedis}
                        />
                      </div>
                    </div>
                  )}
                  {currentStep === 3 && (
                    <div className="flex items-center justify-between">
                      <span>Configure Kafka cluster if needed (Optional)</span>
                      <div className="flex items-center gap-2">
                        <Label className="text-xs">Skip Kafka</Label>
                        <Switch
                          checked={skipKafka}
                          onCheckedChange={setSkipKafka}
                        />
                      </div>
                    </div>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px] pr-4">
                  {currentStep === 1 && <VPNServerForm infrastructure={infrastructure} />}
                  {currentStep === 2 && !skipRedis && <RedisServerForm infrastructure={infrastructure} />}
                  {currentStep === 2 && skipRedis && (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <Database className="h-16 w-16 text-muted-foreground/50 mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Redis Configuration Skipped</h3>
                      <p className="text-muted-foreground">
                        You've chosen to skip Redis configuration. Click Next to continue.
                      </p>
                    </div>
                  )}
                  {currentStep === 3 && !skipKafka && <KafkaServerForm infrastructure={infrastructure} />}
                  {currentStep === 3 && skipKafka && (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <Layers className="h-16 w-16 text-muted-foreground/50 mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Kafka Configuration Skipped</h3>
                      <p className="text-muted-foreground">
                        You've chosen to skip Kafka configuration. Click Submit to send your configuration.
                      </p>
                    </div>
                  )}
                </ScrollArea>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-6 pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>

                  <div className="text-sm text-muted-foreground">
                    Step {currentStep} of {steps.length}
                  </div>

                  {currentStep < 3 ? (
                    <Button onClick={handleNext}>
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  ) : (
                    <Button onClick={handleSubmit} disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Configuration
                          <Check className="h-4 w-4 ml-2" />
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
