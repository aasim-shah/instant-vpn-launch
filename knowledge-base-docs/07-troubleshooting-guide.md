# Troubleshooting Guide

## Common Issues & Solutions

This guide helps you diagnose and resolve common issues when using the FyreWay platform.

---

## Connection Issues

### Issue: Cannot Connect to VPN Server

**What User Sees**:
- "Connection failed" error
- "Unable to reach server" message
- Timeout during connection attempt

**Common Causes**:
1. Server is offline or restarting
2. Firewall blocking VPN traffic
3. Incorrect credentials or configuration
4. Network restrictions (corporate firewall, ISP blocking)
5. Protocol not supported on client device

**How to Fix**:

**Step 1: Verify Server Status**
- Login to FyreWay dashboard
- Check "Servers" section for server health
- Look for red indicators or offline status
- Review recent alerts

**Step 2: Test Different Protocols**
- If using OpenVPN, try WireGuard
- If using WireGuard, try OpenVPN or IKEv2
- Different protocols use different ports and may bypass restrictions

**Step 3: Check Firewall Settings**
- Ensure these ports are open:
  - WireGuard: UDP 51820
  - OpenVPN: UDP 1194 or TCP 443
  - IKEv2: UDP 500, 4500
- Add exception for VPN application

**Step 4: Verify Credentials**
- Re-download configuration files from dashboard
- Ensure using latest connection credentials
- Check for expired certificates

**Step 5: Test from Different Network**
- Try connecting from different WiFi or mobile data
- If works on other network, issue is network-specific
- Contact network administrator if on corporate network

**Still Not Working?**
- Contact support with:
  - Server ID attempting to connect to
  - Protocol being used
  - Error message text
  - Client device type and OS version
  - Network type (home, corporate, public WiFi)

---

### Issue: Connection Drops Frequently

**What User Sees**:
- Connected but disconnects after few minutes
- Unstable connection
- "Reconnecting..." message appears frequently

**Common Causes**:
1. Unstable internet connection
2. Server overloaded
3. Network switching (WiFi to mobile data)
4. Power-saving mode on mobile device
5. ISP throttling VPN traffic

**How to Fix**:

**Step 1: Check Base Internet Connection**
- Test internet without VPN
- Visit speedtest.net and check stability
- If base connection unstable, resolve that first

**Step 2: Review Server Load**
- Dashboard → Servers → Select your server
- Check CPU and bandwidth utilization
- If >80%, server may be overloaded
- Deploy additional servers or enable auto-scaling

**Step 3: Adjust Client Settings**
- Enable "persistent keepalive" (WireGuard)
- Increase timeout values (OpenVPN)
- Disable power-saving for VPN app (mobile)

**Step 4: Try Different Server**
- Connect to server in different location
- If stable on other server, original server may have issues
- Report problematic server to support

**Step 5: Protocol Optimization**
- WireGuard handles network switching better than OpenVPN
- Switch to WireGuard if on mobile device
- Enable roaming features if available

---

### Issue: Slow Connection Speed

**What User Sees**:
- Slow downloads/uploads
- High latency/ping
- Video buffering
- Websites load slowly

**Common Causes**:
1. Connected to distant server
2. Server overloaded
3. ISP throttling
4. Protocol overhead
5. Encryption overhead on slow devices

**How to Fix**:

**Step 1: Connect to Nearest Server**
- Choose server geographically closest to your location
- Check latency in dashboard for each location
- Regional latency should be <10ms

**Step 2: Check Server Performance**
- Dashboard shows real-time server metrics
- High CPU/bandwidth usage = slow performance
- Switch to less loaded server
- Enable auto-scaling to add capacity

**Step 3: Optimize Protocol**
- WireGuard is fastest (5-10x faster than OpenVPN)
- Switch to WireGuard if currently using OpenVPN
- On modern devices, WireGuard offers best performance

**Step 4: Run Speed Test**
- Test speed without VPN first (baseline)
- Then test with VPN connected
- Some speed reduction is normal (10-30%)
- If >50% reduction, investigate further

**Step 5: Check Client Device**
- Older devices may struggle with encryption
- Close unnecessary apps using bandwidth
- Disable other VPNs or proxy software
- Update VPN client software

**Expected Performance**:
- WireGuard: 1-2 Gbps per connection
- OpenVPN: 300-500 Mbps per connection
- IKEv2: 500-800 Mbps per connection

---

## Server Management Issues

### Issue: Server Deployment Failed

**What User Sees**:
- "Deployment failed" error
- Server stuck in "provisioning" state
- Timeout during deployment

**Common Causes**:
1. Temporary infrastructure provider issue
2. Region capacity exhausted
3. Invalid configuration
4. Account limits reached

**How to Fix**:

**Step 1: Check Account Limits**
- Verify you haven't reached plan limits
- Starter: 2 locations
- Growth: 10 locations
- Upgrade plan if at limit

**Step 2: Retry Deployment**
- Delete failed deployment
- Wait 1-2 minutes
- Try deploying again
- Sometimes temporary provider glitches resolve

**Step 3: Try Different Region**
- If specific region fails repeatedly
- Deploy in alternative nearby region
- Report problematic region to support

**Step 4: Review Error Messages**
- Dashboard shows specific error codes
- Note error code for support ticket
- Check status page for known issues

**Contact Support If**:
- Multiple deployment attempts fail
- Need specific region that's failing
- Urgent deployment needed

---

### Issue: Cannot Delete Server

**What User Sees**:
- "Unable to delete" error
- Server remains after deletion attempt
- Stuck in "deleting" state

**Common Causes**:
1. Active user connections
2. Server in transition state
3. Billing issue preventing deletion
4. Technical glitch

**How to Fix**:

**Step 1: Disconnect All Users**
- Dashboard → Servers → Select server
- View active connections
- Force disconnect all users
- Wait 1-2 minutes and retry deletion

**Step 2: Check Server State**
- Server must be in "running" or "stopped" state
- If in transition, wait for completion
- If stuck >10 minutes, contact support

**Step 3: Clear Billing Issues**
- Outstanding invoices may prevent changes
- Review and settle any overdue payments
- Retry after billing resolved

**Step 4: Force Delete**
- Dashboard → Servers → Server options
- Select "Force Delete" option
- Confirm action
- May take 5-10 minutes

---

## User Management Issues

### Issue: User Cannot Authenticate

**What User Sees**:
- "Invalid credentials" error
- "User not found" message
- Login fails repeatedly

**Common Causes**:
1. Incorrect username/password
2. Account suspended
3. Password expired
4. User not properly created
5. API key invalid

**How to Fix**:

**Step 1: Verify User Exists**
- Dashboard → Users
- Search for user by email/username
- Confirm user account is active
- Check for "suspended" status

**Step 2: Reset Credentials**
- Select user in dashboard
- Click "Reset Password"
- User receives email with new credentials
- Or manually set new password

**Step 3: Check Account Status**
- Ensure account not suspended for:
  - Non-payment
  - Terms violation
  - Bandwidth exceeded
  - Manual suspension
- Reactivate if needed

**Step 4: Verify API Integration**
- If using API authentication
- Check API keys are valid
- Regenerate keys if needed
- Update keys in your application

---

### Issue: User Exceeds Bandwidth Limit

**What User Sees**:
- "Bandwidth limit reached" error
- Connection blocked
- Service interrupted

**Common Causes**:
1. Heavy usage exceeding allocation
2. Plan limits reached
3. Potential abuse/misuse
4. Incorrect limit configuration

**How to Fix**:

**Step 1: Review Usage**
- Dashboard → Users → Select user
- Check bandwidth consumption
- Review usage patterns
- Identify if legitimate or abuse

**Step 2: Adjust User Limits**
- Increase individual user bandwidth allocation
- Or upgrade overall plan for higher limits
- Changes apply immediately

**Step 3: Reset Usage Counter**
- If monthly limit reached
- Wait for automatic reset at billing cycle
- Or manually reset in dashboard

**Step 4: Investigate Unusual Usage**
- Sudden spike may indicate:
  - Account compromise
  - Automated scripts
  - Torrent usage
  - Video streaming
- Take appropriate action

---

## Monitoring & Alerts

### Issue: Not Receiving Alerts

**What User Sees**:
- No email notifications
- Missing critical alerts
- Dashboard shows alerts but no notifications

**Common Causes**:
1. Alert configuration disabled
2. Email going to spam
3. Incorrect email address
4. Alert thresholds not reached

**How to Fix**:

**Step 1: Verify Alert Settings**
- Dashboard → Settings → Alerts
- Ensure alerts enabled for desired events
- Check notification channels configured
- Verify email address is correct

**Step 2: Check Spam Folder**
- Alert emails may be marked as spam
- Add support@fyreway.com to contacts
- Whitelist our domain
- Check spam/junk folders

**Step 3: Test Notifications**
- Dashboard → Settings → Alerts
- Send test notification
- Verify receipt
- If no test email, contact support

**Step 4: Review Alert Thresholds**
- Thresholds may be too high
- Adjust to trigger more frequently
- Example: Change "CPU >90%" to "CPU >75%"

---

### Issue: Dashboard Shows Incorrect Metrics

**What User Sees**:
- Numbers don't match reality
- Graphs show unexpected data
- Missing data points
- Delayed updates

**Common Causes**:
1. Browser cache issue
2. Data synchronization delay
3. Timezone differences
4. Technical glitch

**How to Fix**:

**Step 1: Refresh Browser**
- Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- Clear browser cache
- Try different browser
- Disable browser extensions

**Step 2: Check Time Range**
- Verify correct time range selected
- Account for timezone differences
- Dashboard uses UTC by default
- Adjust filters if needed

**Step 3: Wait for Sync**
- Some metrics have 1-5 minute delay
- Real-time data may lag slightly
- Wait and refresh after few minutes

**Step 4: Compare with Raw Data**
- Export CSV data
- Verify numbers manually
- If discrepancy confirmed, report to support

---

## API & Integration Issues

### Issue: API Requests Failing

**What User Sees**:
- 401 Unauthorized errors
- 403 Forbidden errors
- 500 Internal Server Error
- Timeout errors

**Common Causes**:
1. Invalid API key
2. Expired authentication token
3. Rate limiting
4. Incorrect API endpoint
5. Server-side issue

**How to Fix**:

**Step 1: Verify API Key**
- Dashboard → Settings → API Keys
- Ensure using correct key
- Check key hasn't been revoked
- Regenerate if needed

**Step 2: Check Request Format**
- Verify proper authentication header:
  ```
  Authorization: Bearer your-api-key
  Content-Type: application/json
  ```
- Ensure JSON body is valid
- Check endpoint URL is correct

**Step 3: Review Rate Limits**
- Most endpoints: 100 requests/minute
- Check response headers for limit info
- Implement backoff and retry logic
- Upgrade plan if consistently hitting limits

**Step 4: Test with Curl**
```bash
curl -H "Authorization: Bearer your-api-key" \
     -H "Content-Type: application/json" \
     https://api.fyreway.com/servers
```

**Step 5: Check API Status**
- Visit status.fyreway.com (example)
- Check for known API issues
- Review error logs in dashboard

---

### Issue: SDK Integration Not Working

**What User Sees**:
- Compilation errors
- Runtime crashes
- SDK methods not found
- Connection failures from app

**Common Causes**:
1. Incorrect SDK version
2. Missing dependencies
3. Configuration errors
4. Platform compatibility

**How to Fix**:

**iOS SDK Issues**:
- Verify minimum iOS version (13.0+)
- Check Swift Package Manager integration
- Ensure proper import statements
- Review Network Extension permissions
- Check Xcode version compatibility

**Android SDK Issues**:
- Verify minimum API level (26+)
- Check Gradle dependencies
- Add required permissions to manifest
- Ensure VPN service permission granted
- Check ProGuard rules if using

**Common Integration Steps**:
1. Update to latest SDK version
2. Review integration documentation
3. Check sample app for reference
4. Verify API keys configured correctly
5. Test on physical device (not simulator)

---

## Billing Issues

### Issue: Payment Failed

**What User Sees**:
- "Payment declined" message
- Service suspended
- Unable to access features

**Common Causes**:
1. Insufficient funds
2. Expired card
3. Billing address mismatch
4. Bank blocking transaction
5. Card issuer fraud prevention

**How to Fix**:

**Step 1: Verify Card Details**
- Dashboard → Billing → Payment Methods
- Check card expiration date
- Verify billing address matches card
- Update if incorrect

**Step 2: Contact Bank**
- International transactions may be blocked
- Authorize transaction with card issuer
- Remove fraud holds if present

**Step 3: Try Alternative Payment**
- Use different card
- Try bank transfer/wire
- PayPal option if available

**Step 4: Contact Support**
- Request manual invoice
- Discuss payment alternatives
- Arrange payment plan if needed

---

### Issue: Unexpected Charges

**What User Sees**:
- Higher bill than expected
- Charges not recognized
- Overage fees applied

**Common Causes**:
1. Bandwidth overages
2. Additional services used
3. Plan upgrade charges
4. Prorated billing confusion

**How to Fix**:

**Step 1: Review Invoice**
- Dashboard → Billing → Invoices
- Download detailed invoice
- Review line items carefully
- Check for overage charges

**Step 2: Check Usage**
- Dashboard → Analytics
- Review bandwidth consumption
- Check number of users
- Identify unusual spikes

**Step 3: Understand Billing**
- Base plan charges
- Plus overage charges (bandwidth, users)
- Prorated upgrades/downgrades
- Optional add-ons

**Step 4: Dispute if Incorrect**
- Contact support with invoice number
- Explain discrepancy
- Provide usage evidence
- Request adjustment if warranted

---

## Emergency Situations

### Critical Outage

**Symptoms**: Complete service unavailability, all servers down

**Immediate Actions**:
1. Check status page for known issues
2. Call emergency support (Enterprise: +92 300 5163362)
3. Review dashboard for system alerts
4. Document error messages and times
5. Have server IDs ready for support

---

### Security Incident

**Symptoms**: Unauthorized access, unusual activity, suspected breach

**Immediate Actions**:
1. Change all passwords immediately
2. Revoke API keys
3. Contact security team: security@fyreway.com
4. Document suspicious activity
5. Suspend affected user accounts
6. Review access logs
7. Follow incident response plan

---

### Data Loss Concerns

**Symptoms**: Missing configurations, deleted data, can't access resources

**Immediate Actions**:
1. Do NOT make additional changes
2. Contact support immediately
3. Provide timeline of changes
4. Request restore from backup
5. Most data recoverable within 30 days

---

## Getting Additional Help

### When to Contact Support

Contact support when:
- Issue not resolved by troubleshooting steps
- Critical service interruption
- Security concerns
- Billing disputes
- Custom requirement discussions

### What Information to Provide

Include in support request:
- Account email/ID
- Server ID or resource affected
- Exact error messages
- Steps to reproduce
- Screenshots if applicable
- Date/time of issue
- Impact on users

### Support Channels

**Email**: support@fyreway.com  
Response time: 24-48 hours (Starter), 4-8 hours (Growth), 1-2 hours (Enterprise)

**Phone**: +92 300 5163362  
Available for: Enterprise customers, emergencies

**Dashboard**: Submit ticket from support section  
Includes automatic diagnostic information

**Live Chat**: Available for Growth/Enterprise tiers

---

## Preventive Measures

### Best Practices to Avoid Issues

1. **Monitor Regularly**: Check dashboard daily
2. **Set Up Alerts**: Configure all critical alerts
3. **Keep SDK Updated**: Use latest SDK versions
4. **Test Before Deploying**: Test changes in staging
5. **Document Configuration**: Keep configuration notes
6. **Regular Backups**: Export important configurations
7. **Review Usage**: Weekly usage reviews
8. **Plan Capacity**: Scale before hitting limits
9. **Security Hygiene**: Rotate keys regularly
10. **Stay Informed**: Read release notes and updates

---

*Last Updated: January 2026*
