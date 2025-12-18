# Infrastructure Module Documentation

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Infrastructure Types](#infrastructure-types)
4. [Module Structure](#module-structure)
5. [Redis Sentinel Cluster Deployment](#redis-sentinel-cluster-deployment)
6. [VPN Server Deployment](#vpn-server-deployment)
7. [User Workflows](#user-workflows)
8. [API Integration](#api-integration)
9. [Troubleshooting](#troubleshooting)

---

## Overview

The Infrastructure Module is a comprehensive system for managing and deploying infrastructure resources including:

- **Redis Sentinel Clusters** (Master-Replica-Sentinel architecture)
- **VPN Servers** (WireGuard-based deployment)
- **Kafka Clusters** (Message broker infrastructure)

This module provides a user-friendly interface for provisioning, configuring, updating, and monitoring infrastructure resources across multiple cloud regions, with support for multi-organization RBAC (Role-Based Access Control).

### Key Features

- ✅ Multi-cloud infrastructure deployment (DigitalOcean)
- ✅ Real-time deployment progress tracking
- ✅ High-availability Redis Sentinel clusters
- ✅ Automated VPN server provisioning
- ✅ Server lifecycle management (Create, Update, Upgrade, Downgrade, Delete)
- ✅ TLS/SSL certificate management
- ✅ Multi-region support
- ✅ Role-based access control

---

## Architecture

### System Components

```
┌─────────────────────────────────────────────────────────────┐
│                     React Frontend (UI)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Servers    │  │  VPN Servers │  │    Kafka     │     │
│  │   Manager    │  │   Manager    │  │   Manager    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            ↕ API Calls
┌─────────────────────────────────────────────────────────────┐
│               Infrastructure API Backend                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Redis API   │  │   VPN API    │  │  Kafka API   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│              Cloud Provider (DigitalOcean)                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ Droplet  │  │ Droplet  │  │ Droplet  │  │   VPC    │   │
│  │ Master   │  │ Replica  │  │ Sentinel │  │ Network  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack

- **Frontend**: React + TypeScript + Vite
- **State Management**: Redux Toolkit (RTK Query)
- **UI Components**: DevExtreme React
- **API Communication**: Axios with custom base query
- **Cloud Provider**: DigitalOcean
- **Database**: Redis Sentinel Clusters
- **VPN**: WireGuard Protocol

---

## Infrastructure Types

### 1. Redis Sentinel Clusters

**Purpose**: High-availability Redis database clusters with automatic failover

**Deployment Types**:

- **Single Node** (`redis-single`): Single Redis instance for development
- **Production Single** (`redis-prod-single`): Single instance with production configuration
- **Sentinel Cluster** (`redis-sentinel-cluster-1`): 3+ Master, 3+ Replica, 3+ Sentinel nodes
- **Sentinel Production** (`redis-sentinel-prod`): Production-grade sentinel cluster

**Node Roles**:

- **Master**: Primary read/write nodes
- **Replica**: Read replicas for high availability
- **Sentinel**: Monitoring and automatic failover coordination

### 2. VPN Servers

**Purpose**: Secure VPN infrastructure for remote access

**Deployment Modes**:

- `setup`: Initial server setup and configuration
- `deploy`: Deploy VPN services
- `update`: Update existing configurations
- `rollback`: Rollback to previous configuration
- `maintenance`: Maintenance mode

**Environments**: `dev`, `stage`, `prod`, `qa`

### 3. Kafka Clusters

**Purpose**: Distributed message streaming platform

---

## Module Structure

### Directory Layout

```
src/
├── pages/infrastructure/
│   ├── index.tsx                    # Redis servers list page
│   ├── createServer.tsx             # Redis cluster creation form
│   ├── updateServer.tsx             # Redis cluster update form
│   ├── serverDetails.tsx            # Redis cluster details view
│   └── vpnServers/
│       ├── index.tsx                # VPN servers list page
│       ├── createServer.tsx         # VPN server creation page
│       ├── updateServer.tsx         # VPN server update page
│       └── serverDetails.tsx        # VPN server details view
│
├── store/features/infrastructure/
│   ├── servers/
│   │   ├── serverApi.ts            # Server CRUD API
│   │   └── types.ts                # Server type definitions
│   ├── redis/
│   │   ├── redisApi.ts             # Redis deployment API
│   │   └── types.ts                # Redis type definitions
│   ├── vpn-servers/
│   │   ├── vpnServerApi.ts         # VPN server API
│   │   └── types/
│   │       ├── vpnServer.types.ts
│   │       └── serverRegistery.types.ts
│   └── kafka/
│       ├── kafkaApi.ts             # Kafka API
│       └── types.ts
│
└── components/servers/
    ├── CreateVpnServerForm.tsx      # VPN creation form
    ├── DeploymentProgressBar.tsx    # Redis deployment progress
    ├── DeploymentProgressModal.tsx  # VPN deployment progress
    ├── KafkaServerTab.tsx           # Kafka configuration
    └── RedisServerTab.tsx           # Redis configuration
```

---

## Redis Sentinel Cluster Deployment

### Step-by-Step Deployment Process

#### Step 1: Navigate to Infrastructure Manager

1. Access the application
2. Navigate to **Infrastructure** → **Servers** (or `/servers` route)
3. You'll see a list of existing Redis clusters with their status

#### Step 2: Create New Cluster

1. Click **"Create"** button on the Servers page
2. You'll be redirected to the cluster creation form (`/servers/create`)

#### Step 3: Configure Cluster Settings

**Basic Configuration**:

```yaml
Cluster Name: my-redis-cluster-prod
Cluster Type: sentinel | single
Region: nyc1 | sfo3 | ams3 | sgp1
VPC UUID: <your-vpc-uuid>
Target Clusters: redis-sentinel-cluster-1
Enable TLS: true | false
System Password: <secure-password>
```

**Node Configuration**:

##### Master Nodes

- **Count**: Number of master nodes (typically 3 for HA)
- **Size**: `s-1vcpu-1gb`, `s-2vcpu-2gb`, `s-4vcpu-8gb`
- **Region**: Same as cluster region
- **Tags**: `master`

##### Replica Nodes

- **Count**: Number of replicas (typically 3-6 for HA)
- **Size**: Match or smaller than master
- **Region**: Same as cluster region
- **Tags**: `replica`

##### Sentinel Nodes

- **Count**: Number of sentinels (minimum 3 for quorum)
- **Size**: `s-1vcpu-1gb` (lightweight)
- **Region**: Same as cluster region
- **Tags**: `sentinel`

#### Step 4: Dynamic Node Management

**Add Nodes**:

- Click **"+ Add node"** button under each role section
- Configure the new node's size and region
- The system automatically assigns node IDs

**Remove Nodes**:

- Click the **"×"** icon on individual node cards
- Minimum counts are enforced (typically 1 master minimum)

#### Step 5: Submit Deployment

1. Review all configurations
2. Click **"Deploy Cluster"** button
3. A deployment progress modal appears

**Deployment Progress Tracking**:

```
Phase: in-progress (0-95%)
├─ Creating DigitalOcean droplets
├─ Installing Redis on each node
├─ Configuring master-replica relationships
├─ Setting up Sentinel nodes
├─ Configuring SSL/TLS certificates
└─ Finalizing cluster configuration

Phase: success (100%)
└─ All nodes active and configured
```

#### Step 6: Monitor Deployment

The progress bar shows:

- **Current Phase**: e.g., "Provisioning your Redis cluster…"
- **Progress Percentage**: 0-100%
- **Estimated Time**: 10+ minutes
- **Status Updates**: Real-time deployment steps

#### Step 7: Post-Deployment

Once deployment completes:

1. Navigate to **Server Details** page
2. View cluster information:
    - Node count breakdown (Master/Replica/Sentinel)
    - Connection strings
    - Node IPs and status
    - Certificate paths (if TLS enabled)
    - Target clusters
    - Creation timestamp

### Cluster Operations

#### View Server Details

- **Route**: `/servers/:id`
- **Features**:
    - Overview of cluster configuration
    - Node status grid with role, IP, size, status
    - TLS certificate information
    - Target cluster associations

#### Update Server

- **Route**: `/servers/update/:id`
- **Capabilities**:
    - Modify cluster configuration
    - Add/remove nodes
    - Change node sizes
    - Update target clusters

#### Upgrade Server

- **Route**: `/servers/upgrade/:id`
- **Purpose**: Scale up node sizes for better performance

#### Downgrade Server

- **Route**: `/servers/downgrade/:id`
- **Purpose**: Scale down node sizes to reduce costs

#### Stop Server

- **Action**: Gracefully stop all nodes in the cluster
- **Effect**: Cluster becomes inactive but data is preserved

#### Delete Server

- **Action**: Permanently delete the entire cluster
- **Warning**: All data will be lost

---

## VPN Server Deployment

### Step-by-Step Deployment Process

#### Step 1: Navigate to VPN Servers

1. Access the application
2. Navigate to **Infrastructure** → **VPN Servers** (or `/servers/vpn` route)
3. View existing VPN server deployments

#### Step 2: Create New VPN Server

1. Click **"Create Server"** button
2. Redirected to VPN server creation form (`/servers/vpn/create`)

#### Step 3: Configure Deployment Settings

**Main Configuration**:

```yaml
Mode: setup | deploy | update | rollback | maintenance
Client: generic | <organization-name>
```

**Environment Overrides** (Node.js Application):

```yaml
NODE_ENV: production
LOG_LEVEL: info
MONITORING_PORT: 3000
VPN_INTERFACE: wg0
HEALTH_CHECK_INTERVAL: 30
MAX_PEERS: 100
```

#### Step 4: Configure Server Details

**Server Configuration** (Can add multiple servers):

```yaml
Host: 192.168.1.100
Username: root
Password: <secure-ssh-password>
Environment: prod | dev | stage | qa
Group: production | staging | development | testing
Tags:
    region: us-east-1
    role: vpn
    <custom-key>: <custom-value>
```

**Multi-Server Setup**:

- Click **"+ Add Server"** to deploy to multiple hosts
- Each server can have unique configurations
- Minimum: 1 server required

#### Step 5: Server Tag Management

**Add Custom Tags**:

1. Click **"+ Add tag"** on any server
2. Enter `Key` and `Value`
3. Tags help with server organization and filtering

**Remove Tags**:

- Click **"×"** next to any tag to remove it

#### Step 6: Submit Deployment

1. Validate all required fields are filled
2. Click **"Deploy VPN Servers"** button
3. Deployment Progress Modal opens automatically

**Progress Tracking**:

```
Deployment ID: <correlation-id>
Status: pending → running → completed/failed
Progress: 0% → 100%

Deployment Steps:
1. Initializing deployment
2. Connecting to server(s)
3. Installing WireGuard
4. Configuring VPN interface
5. Setting up firewall rules
6. Starting VPN service
7. Verifying connectivity
8. Deployment completed
```

#### Step 7: Monitor Real-Time Progress

The **Deployment Progress Modal** shows:

- **Status Icon**: ○ pending | ⟳ running | ✓ completed | ✗ failed
- **Current Phase**: Descriptive status message
- **Progress Bar**: Visual percentage indicator
- **Deployment Steps**: Chronological list with timestamps
- **Server Host**: Target server(s) being configured
- **Timestamps**: Started, Updated, Completed times
- **Duration**: Total deployment time

**Auto-Polling**:

- Progress updates every 30 seconds
- Modal cannot be closed until deployment completes
- Real-time status updates from backend

#### Step 8: Post-Deployment Management

Once deployment succeeds:

1. Return to VPN Servers list (`/servers/vpn`)
2. View deployed servers with:
    - Mode, Client, Host
    - Username, Environment, Group
    - Tags (key-value pairs)
    - Created/Updated timestamps

### VPN Server Operations

#### View VPN Server Details

- **Route**: `/servers/vpn/:id`
- **Information**:
    - Server configuration
    - Connection details
    - Environment variables
    - Tags and metadata

#### Update VPN Server

- **Route**: `/servers/vpn/update/:id`
- **Capabilities**:
    - Modify configuration
    - Update environment variables
    - Change mode or client
    - Update tags

#### Delete VPN Server

- **Action**: Remove VPN server from registry
- **Effect**: Server configuration is deleted (actual VPN may need manual cleanup)

---

## User Workflows

### Workflow 1: High-Availability Redis Cluster Setup

**Objective**: Deploy a production-ready Redis Sentinel cluster

**Steps**:

1. **Plan Architecture**:
    - 3 Master nodes (write capability)
    - 6 Replica nodes (2 replicas per master)
    - 3 Sentinel nodes (quorum = 2)

2. **Create Cluster**:
    - Navigate to `/servers/create`
    - Name: `prod-redis-cluster-us-east`
    - Type: `sentinel`
    - Region: `nyc1`
    - Enable TLS: ✓

3. **Configure Masters**:
    - Count: 3
    - Size: `s-2vcpu-4gb`
    - Add 3 master nodes

4. **Configure Replicas**:
    - Count: 6
    - Size: `s-2vcpu-2gb`
    - Add 6 replica nodes

5. **Configure Sentinels**:
    - Count: 3
    - Size: `s-1vcpu-1gb`
    - Add 3 sentinel nodes

6. **Deploy**:
    - Click "Deploy Cluster"
    - Wait 15-20 minutes for provisioning
    - Monitor progress bar

7. **Verify**:
    - Check server details page
    - Verify all nodes are "Active"
    - Test connectivity with provided connection strings

**Result**: Production-ready Redis cluster with automatic failover

---

### Workflow 2: Multi-Region VPN Infrastructure

**Objective**: Deploy VPN servers across multiple regions

**Steps**:

1. **US East Deployment**:

    ```yaml
    Mode: setup
    Client: my-organization
    Server:
        Host: us-east-vpn.example.com
        Environment: prod
        Group: production
        Tags:
            region: us-east-1
            role: vpn
            datacenter: primary
    ```

2. **Europe Deployment**:

    ```yaml
    Mode: setup
    Client: my-organization
    Server:
        Host: eu-west-vpn.example.com
        Environment: prod
        Group: production
        Tags:
            region: eu-west-1
            role: vpn
            datacenter: secondary
    ```

3. **Asia Pacific Deployment**:

    ```yaml
    Mode: setup
    Client: my-organization
    Server:
        Host: ap-southeast-vpn.example.com
        Environment: prod
        Group: production
        Tags:
            region: ap-southeast-1
            role: vpn
            datacenter: tertiary
    ```

4. **Deploy All**:
    - Use "Add Server" to add all three servers in one deployment
    - Submit single deployment request
    - Monitor progress for all servers simultaneously

**Result**: Global VPN infrastructure with regional coverage

---

### Workflow 3: Cluster Upgrade for Performance

**Objective**: Upgrade Redis cluster node sizes without downtime

**Steps**:

1. Navigate to server details (`/servers/:id`)
2. Click "Actions" → "Upgrade"
3. Select new node sizes:
    - Masters: `s-2vcpu-4gb` → `s-4vcpu-8gb`
    - Replicas: `s-2vcpu-2gb` → `s-4vcpu-8gb`
4. Review changes in upgrade form
5. Submit upgrade request
6. Monitor progress (rolling upgrade, minimal downtime)
7. Verify upgraded nodes in details page

**Result**: Cluster with increased performance and capacity

---

## API Integration

### Redux RTK Query APIs

#### Redis API (`redisApi.ts`)

```typescript
// Deploy Redis Cluster
const { data } = await deployRedisCluster({
  targetClusters: ['redis-sentinel-cluster-1'],
  clusters: [{
    name: 'my-cluster',
    type: 'sentinel',
    region: 'nyc1',
    vpcUUID: 'vpc-xxx',
    systemPassword: 'secure-password',
    enableTLS: true,
    desiredState: {
      roles: {
        master: { count: 3, size: 's-2vcpu-4gb', nodes: [...] },
        replica: { count: 6, size: 's-2vcpu-2gb', nodes: [...] },
        sentinel: { count: 3, size: 's-1vcpu-1gb', nodes: [...] }
      }
    }
  }]
}).unwrap();

// Get All Servers
const { data } = useGetAllServersQuery();

// Get Single Server
const { data } = useGetServerQuery(serverId);

// Get DigitalOcean Regions
const { data } = useGetDigitalOceanRegionsQuery();
```

#### Server API (`serverApi.ts`)

```typescript
// Update Server
await updateServer({
    id: serverId,
    data: {
        /* updated config */
    },
}).unwrap();

// Delete Server
await deleteServer(serverId).unwrap();

// Stop Server
await stopServer(serverId).unwrap();
```

#### VPN Server API (`vpnServerApi.ts`)

```typescript
// Deploy VPN Servers
const response = await deployVpnServers({
  servers: [{
    host: '192.168.1.100',
    username: 'root',
    password: 'secure-password',
    env: 'prod',
    group: 'production',
    tags: { region: 'us-east-1', role: 'vpn' }
  }],
  mode: 'setup',
  client: 'my-org',
  NodeAppEnvOverrides: { NODE_ENV: 'production', ... }
}).unwrap();

// Get correlation ID for progress tracking
const correlationId = response.body.data.correlationId;

// Get VPN Servers List
const { data } = useGetVpnServersQuery();

// Get Single VPN Server
const { data } = useGetVpnServerQuery(serverId);

// Check Deployment Progress
const { data } = useCheckDeploymentProgressQuery(correlationId, {
  pollingInterval: 30000 // 30 seconds
});

// Update VPN Server
await updateVpnServer({
  id: serverId,
  data: { /* updated config */ }
}).unwrap();

// Delete VPN Server
await deleteVpnServer(serverId).unwrap();
```

### API Endpoints

**Base URL**: Configured in `src/base/contants/env.ts`

```typescript
INFRASTRUCTURE_API_BASE_URL = process.env.VITE_INFRASTRUCTURE_API_BASE_URL;
```

**Redis Endpoints**:

- `POST /infrastructure/redis/deploy` - Deploy Redis cluster
- `GET /infrastructure/redis` - List all Redis servers
- `GET /infrastructure/redis/:id` - Get server details
- `PATCH /servers/:id` - Update server
- `DELETE /servers/:id` - Delete server
- `PATCH /servers/:id/stop` - Stop server
- `GET /global/digitalocean/regions` - Get available regions

**VPN Endpoints**:

- `POST /vpn-servers/deploy` - Deploy VPN servers
- `GET /vpn-servers` - List all VPN servers
- `GET /vpn-servers/:id` - Get VPN server details
- `PATCH /vpn-servers/:id` - Update VPN server
- `DELETE /vpn-servers/:id` - Delete VPN server
- `GET /vpn-servers/server-registry/deploy/progress/:correlationId/full` - Get deployment progress
- `GET /vpn-servers/server-registry/constants` - Get server constants
- `GET /vpn-servers/server-registry/summary` - Get servers summary

---

## Troubleshooting

### Common Issues and Solutions

#### Issue 1: Deployment Stuck at High Percentage (95%+)

**Symptoms**:

- Progress bar reaches 95% and stops
- No error message displayed

**Causes**:

- Cloud provider API rate limiting
- Network connectivity issues
- Node configuration taking longer than expected

**Solutions**:

1. Wait for deployment to complete (can take 15-20 minutes)
2. Check backend logs for detailed status
3. Verify cloud provider API credentials
4. Ensure sufficient cloud credits/resources

---

#### Issue 2: VPN Deployment Shows "Failed" Status

**Symptoms**:

- Deployment status: "failed" or "error"
- Progress bar shows red color
- Error message in deployment modal

**Causes**:

- SSH connection failure
- Incorrect server credentials
- Firewall blocking SSH port (22)
- Server not accessible from deployment orchestrator

**Solutions**:

1. Verify server host is accessible
2. Check SSH credentials (username/password)
3. Ensure SSH port (22) is open in firewall
4. Test SSH connection manually: `ssh username@host`
5. Review error message in deployment modal for specifics

---

#### Issue 3: "At least one server is required" Error

**Symptoms**:

- Cannot remove last server from VPN deployment form
- Warning notification appears

**Cause**:

- System requires minimum 1 server per deployment

**Solution**:

- Keep at least one server in the configuration
- To change server, modify existing instead of removing all

---

#### Issue 4: Cannot Access Created Servers

**Symptoms**:

- Servers list shows empty
- Created servers don't appear after deployment

**Causes**:

- Cache not updated
- API permissions issue
- Filter settings hiding servers

**Solutions**:

1. Click "Refresh" button in toolbar
2. Clear browser cache and reload
3. Check RBAC permissions for "read" access to servers
4. Verify no active filters in data grid

---

#### Issue 5: Node Count Mismatch in Sentinel Cluster

**Symptoms**:

- Server details shows fewer nodes than configured
- Some nodes show "error" status

**Causes**:

- Partial deployment failure
- Insufficient cloud resources
- VPC network configuration issues

**Solutions**:

1. Check server details page for node-specific errors
2. View individual node status and error messages
3. Verify VPC UUID is correct
4. Ensure cloud region has sufficient capacity
5. Use "Update" action to retry failed nodes

---

#### Issue 6: TLS Certificate Issues

**Symptoms**:

- Nodes created but Redis connection fails with SSL error
- Certificate paths empty in server details

**Causes**:

- Certificate generation failed
- Certificate not properly distributed to nodes

**Solutions**:

1. Check server details for certificate paths
2. Verify `enableTLS` was set to `true` during deployment
3. Re-deploy cluster with TLS enabled
4. Contact backend administrator to verify certificate generation

---

#### Issue 7: Deployment Progress Not Updating (VPN)

**Symptoms**:

- Deployment modal stuck at 0% or low percentage
- Status shows "pending" for extended time
- No step updates appearing

**Causes**:

- Backend deployment orchestrator not running
- Correlation ID not found in system
- Network connectivity to polling endpoint

**Solutions**:

1. Wait for auto-polling (30-second intervals)
2. Close and reopen modal to restart polling
3. Verify correlation ID is valid
4. Check backend deployment service status
5. Review browser console for API errors

---

### Best Practices

#### Redis Clusters

1. **Always use odd number of Sentinels** (3, 5, 7) for proper quorum
2. **Enable TLS for production** clusters
3. **Use appropriate node sizes** based on expected load:
    - Development: `s-1vcpu-1gb`
    - Staging: `s-2vcpu-2gb`
    - Production: `s-4vcpu-8gb` or higher
4. **Deploy replicas in same region** as masters for low latency
5. **Plan for scaling**: Start with smaller sizes, use upgrade feature as needed
6. **Use descriptive cluster names** with environment prefix: `prod-redis-us-east`

#### VPN Servers

1. **Use strong SSH passwords** or preferably SSH keys
2. **Tag servers properly** for easy organization and filtering
3. **Choose appropriate environment** (dev/stage/prod) for tracking
4. **Set realistic monitoring values** in environment overrides
5. **Test connectivity** before deploying to production
6. **Use setup mode first** for initial configuration, then deploy mode
7. **Keep correlation IDs** for deployment tracking and debugging

#### General

1. **Always monitor deployments** until completion
2. **Don't close browser during critical deployments** (Redis)
3. **Use "View" action** before modifying or deleting servers
4. **Regular backups**: Note down connection strings and certificates
5. **Document custom configurations** for your team
6. **Test in dev/stage** environments before production deployments

---

## Permissions and Access Control

The infrastructure module respects RBAC permissions configured in the system:

**Required Permissions**:

- `servers:create` - Create new infrastructure
- `servers:read` - View servers list and details
- `servers:update` - Modify server configurations
- `servers:delete` - Delete servers
- `servers:upgrade` - Upgrade server sizes
- `servers:downgrade` - Downgrade server sizes
- `servers:stop` - Stop running servers

**Permission Checking**:
Users without proper permissions will see "No Permission" page when attempting unauthorized actions.

---

## Support and Contact

For issues not covered in this documentation:

1. Check application logs in browser console
2. Review backend API logs for detailed error messages
3. Contact your system administrator
4. Refer to cloud provider (DigitalOcean) documentation for infrastructure-specific issues

---

## Appendix

### Glossary

- **Cluster**: Group of nodes working together for high availability
- **Node**: Individual server instance (droplet) in a cluster
- **Master**: Primary Redis node that handles writes
- **Replica**: Secondary Redis node that replicates master data
- **Sentinel**: Monitoring node that manages automatic failover
- **Quorum**: Minimum number of Sentinels needed to agree on failover (typically 2)
- **VPC**: Virtual Private Cloud - isolated network for your infrastructure
- **TLS**: Transport Layer Security - encryption for data in transit
- **Correlation ID**: Unique identifier for tracking VPN deployment progress
- **Polling**: Automatic periodic checking for status updates
- **Droplet**: DigitalOcean's term for virtual machine instances

### Region Codes (DigitalOcean)

Common regions available:

- `nyc1`, `nyc3` - New York, USA
- `sfo3` - San Francisco, USA
- `ams3` - Amsterdam, Netherlands
- `sgp1` - Singapore
- `lon1` - London, UK
- `fra1` - Frankfurt, Germany
- `tor1` - Toronto, Canada
- `blr1` - Bangalore, India

### Node Size Reference

| Size          | vCPU | Memory | Disk   | Use Case         |
| ------------- | ---- | ------ | ------ | ---------------- |
| `s-1vcpu-1gb` | 1    | 1 GB   | 25 GB  | Dev, Sentinel    |
| `s-1vcpu-2gb` | 1    | 2 GB   | 50 GB  | Staging          |
| `s-2vcpu-2gb` | 2    | 2 GB   | 60 GB  | Small Production |
| `s-2vcpu-4gb` | 2    | 4 GB   | 80 GB  | Production       |
| `s-4vcpu-8gb` | 4    | 8 GB   | 160 GB | Large Production |

---

**Document Version**: 1.0  
**Last Updated**: December 18, 2025  
**Maintained By**: Infrastructure Team

---

## Quick Start Guide

### Deploy Your First Redis Cluster (5 Steps)

1. Navigate to `/servers` → Click "Create"
2. Fill in: Name, Type (sentinel), Region, VPC UUID, Password
3. Add nodes: 3 Masters, 3 Replicas, 3 Sentinels (use defaults)
4. Enable TLS, click "Deploy Cluster"
5. Wait for completion (15-20 min), check server details

### Deploy Your First VPN Server (5 Steps)

1. Navigate to `/servers/vpn` → Click "Create Server"
2. Set Mode: `setup`, Client: `my-org`
3. Add server: Host, Username, Password, Environment: `prod`
4. Review environment overrides (use defaults)
5. Click "Deploy VPN Servers", monitor progress modal

**Congratulations! You're now ready to manage infrastructure like a pro! 🚀**
