# Getting Started & User Workflows

## Quick Start Guide

This guide walks you through getting started with FyreWay from initial contact to deploying your first VPN server.

---

## Step 1: Initial Contact & Consultation

### How to Get Started

**Contact Sales Team**:
- **Email**: info@fyreway.com
- **Phone**: +92 300 5163362 (Mon-Fri, 9am-6pm PKT)
- **Office**: Ground Floor, Binchiragh Heights, Plaza No 23, Near Eiffel Tower, Bahria Town Phase 7, Islamabad/Rawalpindi, Pakistan

### What to Prepare

Before contacting us, have answers to these questions ready:
1. **What type of VPN product are you building?**
   - Consumer VPN app
   - Enterprise VPN solution
   - White-label VPN service
   - Adding VPN features to existing app

2. **What is your expected user volume?**
   - Starting users (MVP phase)
   - 6-month projection
   - 12-month growth target

3. **Which geographic regions do you need?**
   - Priority regions for launch
   - Future expansion plans

4. **What is your technical setup?**
   - iOS, Android, or both
   - Web application or mobile-only
   - Existing infrastructure or greenfield

5. **When do you plan to launch?**
   - Timeline expectations
   - MVP vs full launch

### Consultation Process

**Step 1: Initial Call (30 minutes)**
- Discuss your use case and requirements
- Review technical architecture options
- Answer your questions about the platform
- Provide rough pricing estimate

**Step 2: Technical Deep Dive (Optional, 45 minutes)**
- API integration walkthrough
- SDK demonstration
- Security and compliance discussion
- Performance expectations review

**Step 3: Custom Proposal**
- Receive tailored pricing within 24 hours
- Review recommended plan tier
- Discuss contract terms and SLA
- Address any concerns

---

## Step 2: Account Creation & Onboarding

### Account Setup

Once you agree to proceed:

1. **Receive Welcome Email**
   - Login credentials for dashboard
   - API keys for integration
   - Onboarding documentation links
   - Dedicated support contact

2. **Dashboard Access**
   - Navigate to dashboard.fyreway.com (example URL)
   - Login with provided credentials
   - Complete account profile
   - Set up two-factor authentication (recommended)

3. **Team Setup** (if applicable)
   - Invite team members
   - Assign roles and permissions
   - Configure notification preferences

### Onboarding Checklist

Complete these steps during your first week:

- ✅ Login to dashboard and explore interface
- ✅ Review getting started documentation
- ✅ Generate API keys for development
- ✅ Deploy your first test server
- ✅ Test VPN connection from your device
- ✅ Review monitoring dashboard
- ✅ Schedule kickoff call with support team
- ✅ Integrate SDK into development environment

---

## Step 3: Deploy Your First Server

### Configuration Selection

**Choose Server Locations**:
1. Navigate to "Servers" section in dashboard
2. Click "Deploy New Server"
3. Select your desired regions from map or list
4. Start with 1-2 locations for testing

**Select VPN Protocol**:
- **WireGuard** (Recommended): Best performance, modern devices
- **OpenVPN**: Maximum compatibility, all devices
- **IKEv2**: Native iOS/macOS support

**Configure Settings**:
- Server name (for your reference)
- Bandwidth allocation
- User connection limits
- Auto-scaling preferences (Growth/Enterprise only)

### Deployment Process

**Typical Flow**:
1. Click "Deploy Server" button
2. Review configuration summary
3. Confirm deployment
4. Watch real-time provisioning status
5. Server ready in 10 seconds

**What Happens Behind the Scenes**:
- Infrastructure provider provisions virtual machine
- FyreWay installs and configures VPN software
- Security hardening applied automatically
- Firewall rules configured
- SSL certificates generated
- DNS records updated
- Health checks verify server operational

### Connection Credentials

**Receive Immediately**:
- Server IP address or hostname
- Connection port numbers
- Authentication keys/certificates
- Configuration files for each protocol
- QR codes for mobile setup (WireGuard)

### Testing Your Server

**Quick Test Options**:

1. **Mobile Device** (easiest):
   - Download WireGuard app (iOS/Android)
   - Scan QR code from dashboard
   - Tap "Connect"
   - Verify connection status

2. **Desktop Application**:
   - Download OpenVPN client
   - Import configuration file
   - Click "Connect"
   - Check connection logs

3. **Command Line** (advanced):
   ```
   # WireGuard
   wg-quick up wg0
   
   # OpenVPN
   openvpn --config fyreway-server.ovpn
   ```

4. **Verify Connection**:
   - Visit whatismyip.com
   - Confirm IP matches your server location
   - Test browsing speed
   - Check for DNS leaks

---

## Step 4: Integrate SDK into Your Application

### SDK Integration Guide

#### iOS Integration

**Requirements**:
- iOS 13.0 or higher
- Xcode 12+
- Swift 5.0+

**Installation**:
```swift
// Using Swift Package Manager
dependencies: [
    .package(url: "https://github.com/fyreway/fyreway-ios-sdk", from: "1.0.0")
]
```

**Basic Usage**:
```swift
import FyreWaySDK

// Initialize SDK
FyreWay.configure(apiKey: "your-api-key")

// Connect to VPN
FyreWay.connect(serverId: "server-id") { result in
    switch result {
    case .success:
        print("Connected to VPN")
    case .failure(let error):
        print("Connection failed: \(error)")
    }
}

// Disconnect
FyreWay.disconnect()
```

#### Android Integration

**Requirements**:
- Android 8.0 (API 26) or higher
- Android Studio 4.0+
- Kotlin or Java

**Installation**:
```gradle
// In build.gradle
dependencies {
    implementation 'com.fyreway:sdk:1.0.0'
}
```

**Basic Usage**:
```kotlin
import com.fyreway.sdk.FyreWay

// Initialize
FyreWay.init(context, "your-api-key")

// Connect
FyreWay.connect("server-id") { success, error ->
    if (success) {
        // Connected
    } else {
        // Handle error
    }
}

// Disconnect
FyreWay.disconnect()
```

### API Integration (Web/Backend)

**Authentication**:
```
Authorization: Bearer your-api-key
Content-Type: application/json
```

**Common Endpoints**:
```
GET /api/servers - List all servers
POST /api/servers/deploy - Deploy new server
GET /api/servers/{id} - Get server details
POST /api/users/create - Create VPN user
GET /api/users/{id}/sessions - Get user sessions
```

---

## Step 5: Monitor & Optimize

### Dashboard Overview

**Key Sections**:
1. **Overview**: High-level metrics and alerts
2. **Servers**: Server status and management
3. **Users**: User list and session management
4. **Analytics**: Traffic and performance data
5. **Billing**: Usage and costs
6. **Settings**: Account and configuration

### Daily Monitoring Tasks

**What to Check Daily**:
- Active user count and trends
- Server health status (all green?)
- Any alerts or warnings
- Bandwidth usage against limits
- Connection success rate

### Weekly Review Tasks

**What to Review Weekly**:
- Performance trends (improving or declining?)
- User growth patterns
- Geographic distribution
- Protocol usage breakdown
- Support ticket volume

### Monthly Optimization

**Monthly Actions**:
- Review server locations (add/remove based on usage)
- Analyze bandwidth patterns for cost optimization
- Review scaling events and triggers
- Update user access policies if needed
- Plan capacity for next month

---

## Common User Workflows

### Workflow 1: Creating a New VPN User

**Steps**:
1. Navigate to "Users" section in dashboard
2. Click "Add New User" button
3. Enter user details:
   - Email address
   - Username (optional)
   - Access tier/plan
   - Server location access
4. Set bandwidth limits (if applicable)
5. Choose authentication method:
   - Email/password
   - OAuth
   - API key
6. Click "Create User"
7. User receives welcome email with credentials
8. User can now connect to VPN

**Time Required**: 2 minutes

---

### Workflow 2: Scaling to New Region

**Steps**:
1. Identify demand in new region from analytics
2. Navigate to "Servers" → "Deploy New"
3. Select new region from map
4. Choose same protocol as existing servers
5. Configure settings (match current servers)
6. Click "Deploy"
7. Server ready in 10 seconds
8. Update your app's server list via API
9. Users automatically routed to nearest server

**Time Required**: 5 minutes

---

### Workflow 3: Troubleshooting Connection Issues

**Steps**:
1. Navigate to "Monitoring" dashboard
2. Identify affected server or region
3. Check server health metrics:
   - Is server online?
   - CPU/memory normal?
   - Bandwidth available?
4. Review recent alerts for that server
5. Check user's session logs
6. Common fixes:
   - Restart VPN server (1-click from dashboard)
   - Clear user's session and reconnect
   - Switch user to alternate server
   - Update firewall rules if blocked
7. Document issue and resolution
8. Contact support if issue persists

**Time Required**: 10-15 minutes

---

### Workflow 4: Upgrading Your Plan

**Steps**:
1. Navigate to "Billing" → "Change Plan"
2. Review current usage and limits
3. Select new plan tier
4. Review pricing change
5. Confirm upgrade
6. New limits applied immediately
7. No service interruption
8. Prorated billing calculated automatically

**Time Required**: 3 minutes

---

### Workflow 5: Viewing Usage Reports

**Steps**:
1. Navigate to "Analytics" section
2. Select date range (daily, weekly, monthly)
3. Choose report type:
   - Bandwidth usage
   - Active users
   - Server performance
   - Geographic distribution
4. View charts and graphs
5. Export as CSV or PDF (if needed)
6. Schedule automated reports (optional)

**Time Required**: 5 minutes

---

### Workflow 6: Adding Team Members

**Steps**:
1. Navigate to "Team" section
2. Click "Invite Team Member"
3. Enter email address
4. Select role:
   - Admin: Full access
   - Developer: Technical access only
   - Billing: Billing and usage only
   - Viewer: Read-only access
5. Click "Send Invitation"
6. Team member receives email
7. They create their account
8. Access granted based on role

**Time Required**: 2 minutes

---

## Best Practices

### For Testing Phase

1. **Start Small**: Deploy 1-2 servers initially
2. **Test All Protocols**: Verify each protocol works
3. **Monitor Closely**: Watch metrics daily during testing
4. **Document Issues**: Keep notes of any problems
5. **Gradual User Rollout**: Start with beta testers

### For Production Launch

1. **Multi-Region Setup**: Deploy servers in all target regions
2. **Enable Auto-Scaling**: Configure scaling rules before launch
3. **Set Up Alerts**: Configure all critical alerts
4. **Load Testing**: Test with simulated user load
5. **Backup Plan**: Have alternate servers ready

### For Ongoing Operations

1. **Regular Monitoring**: Check dashboard daily
2. **Proactive Scaling**: Scale before hitting limits
3. **Keep SDK Updated**: Use latest SDK versions
4. **Review Analytics**: Weekly performance review
5. **User Feedback**: Monitor user complaints/issues

---

## Support During Onboarding

### Available Resources

**Documentation**:
- Complete API documentation
- SDK integration guides
- Video tutorials
- Code examples repository

**Support Channels**:
- Email: support@fyreway.com
- Onboarding specialist (assigned to you)
- Developer community forum
- Live chat (Growth/Enterprise)

**Response Times**:
- Starter: 24-48 hours
- Growth: 4-8 hours (priority)
- Enterprise: 1-2 hours (24/7)

---

*Last Updated: January 2026*
