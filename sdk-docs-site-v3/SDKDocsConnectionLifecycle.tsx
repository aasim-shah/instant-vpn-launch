import { SDKDocsLayout, PageNav, MermaidDiagram } from '@/components/SDKDocsLayout';
import { SEO } from '@/components/SEO';

export default function SDKDocsConnectionLifecycle() {
  const bigPictureChart = `
sequenceDiagram
    participant User
    participant App as Your App
    participant SDK as FyreWay SDK
    participant API as Backend
    participant Tunnel as VPN Tunnel
    User->>App: Tap "Connect"
    Note over App,API: 1. Find a Server
    App->>SDK: smartConnect()
    SDK->>API: GET optimal server
    API-->>SDK: Server details
    SDK-->>App: SmartConnectResult
    Note over App,API: 2. Create a VPN Profile
    App->>SDK: createProfile(serverId)
    SDK->>API: POST create peer
    API-->>SDK: VPN config + credentials
    SDK-->>App: VpnProfile
    Note over App,Tunnel: 3. Establish VPN Tunnel
    App->>Tunnel: Connect using VpnProfile
    Tunnel-->>App: Tunnel established
    Note over App,API: 4. Report Connected
    App->>SDK: reportConnected(...)
    SDK->>API: POST connection state
    Note over User,Tunnel: User uses VPN...
    Note over App,API: 5. Disconnect
    User->>App: Tap "Disconnect"
    App->>Tunnel: Tear down tunnel
    App->>SDK: reportDisconnected()
    SDK->>API: POST disconnected state
  `;

  return (
    <>
      <SEO 
        title="Connection Lifecycle — FyreWay SDK Docs"
        description="End-to-end VPN connection flow: find server, create profile, establish tunnel, report connection."
        canonical="/sdk/docs/connection-lifecycle"
      />
      <SDKDocsLayout title="Connection Lifecycle">
        <h1>Connection Lifecycle</h1>
        <p className="sdk-page-description">
          The complete flow from finding a server to establishing a VPN tunnel and reporting the session to the backend.
        </p>

        <h2>The Big Picture</h2>
        <MermaidDiagram chart={bigPictureChart} />

        <hr />

        <h2>Step 1 — Find a Server</h2>
        <pre><code><span className="cmt">// Option A: Automatic (recommended)</span>{'\n'}
<span className="kw">val</span> result = sdk.<span className="fn">smartConnect</span>(){'\n'}
<span className="kw">val</span> server = (result <span className="kw">as</span>? <span className="type">VpnResult.Success</span>)?.data?.server{'\n'}
{'\n'}
<span className="cmt">// Option B: User picks from a list</span>{'\n'}
<span className="kw">val</span> servers = sdk.<span className="fn">getServersByCountry</span>(<span className="str">"US"</span>){'\n'}
<span className="kw">val</span> server = (servers <span className="kw">as</span>? <span className="type">VpnResult.Success</span>)?.data?.<span className="fn">firstOrNull</span>()</code></pre>

        <hr />

        <h2>Step 2 — Create a VPN Profile</h2>
        <h3>WireGuard Profile</h3>
        <div className="sdk-code-header"><span>Kotlin</span></div>
        <pre><code><span className="kw">val</span> profileResult = sdk.<span className="fn">createProfile</span>({'\n'}
    serverId = server.serverId,{'\n'}
    request = <span className="type">CreateProfileRequest</span>({'\n'}
        clientIdentity = <span className="str">"user@example.com"</span>,{'\n'}
        tier = <span className="str">"free"</span>,{'\n'}
        protocol = <span className="str">"wireguard"</span>,{'\n'}
        allowedIPs = <span className="fn">listOf</span>(<span className="str">"0.0.0.0/0"</span>),{'\n'}
        persistentKeepalive = <span className="num">25</span>,{'\n'}
        dns = <span className="fn">listOf</span>(<span className="str">"1.1.1.1"</span>, <span className="str">"8.8.8.8"</span>){'\n'}
    ){'\n'}
){'\n'}
{'\n'}
<span className="kw">when</span> (profileResult) {'{'}{'\n'}
    <span className="kw">is</span> <span className="type">VpnResult.Success</span> -&gt; {'{'}{'\n'}
        <span className="kw">val</span> profile: <span className="type">VpnProfile</span> = profileResult.data{'\n'}
{'\n'}
        profile.peerIdentifier       <span className="cmt">// YOUR client public key — use for reportConnected()</span>{'\n'}
        profile.serverPublicKey      <span className="cmt">// Server's public key — goes in [Peer] section</span>{'\n'}
        profile.endpoint             <span className="cmt">// "1.2.3.4:51820"</span>{'\n'}
        profile.address              <span className="cmt">// "10.0.0.5/32" — your assigned IP</span>{'\n'}
{'\n'}
        <span className="kw">val</span> configText = profile.<span className="fn">toVpnConfig</span>(){'\n'}
        <span className="kw">val</span> rawConfig = profile.vpnConfig?.raw{'\n'}
    {'}'}{'\n'}
    <span className="kw">is</span> <span className="type">VpnResult.Error</span> -&gt; {'{'} <span className="cmt">/* Handle error */</span> {'}'}{'\n'}
{'}'}</code></pre>

        <h3>OpenVPN Profile</h3>
        <pre><code><span className="kw">val</span> profileResult = sdk.<span className="fn">createProfile</span>({'\n'}
    serverId = server.serverId,{'\n'}
    request = <span className="type">CreateProfileRequest</span>({'\n'}
        clientIdentity = <span className="str">"user@example.com"</span>,{'\n'}
        tier = <span className="str">"premium"</span>,{'\n'}
        protocol = <span className="str">"openvpn"</span>{'\n'}
    ){'\n'}
){'\n'}
{'\n'}
<span className="kw">when</span> (profileResult) {'{'}{'\n'}
    <span className="kw">is</span> <span className="type">VpnResult.Success</span> -&gt; {'{'}{'\n'}
        <span className="kw">val</span> ovpnContent = profileResult.data.vpnConfig?.raw{'\n'}
        profileResult.data.peerIdentifier  <span className="cmt">// clientName (certificate CN)</span>{'\n'}
    {'}'}{'\n'}
    <span className="kw">is</span> <span className="type">VpnResult.Error</span> -&gt; {'{'} <span className="cmt">/* Handle error */</span> {'}'}{'\n'}
{'}'}</code></pre>

        <h3>Current SDK behavior — Amnezia profiles</h3>
        <p>
          The SDK in this repository includes <code>VpnProtocol.AMNEZIA</code> and can map backend protocol strings such as
          <code>"amnezia"</code> and <code>"amneziawg-v20"</code> into that enum when parsing profile responses.
          Some backends may return the VPN config payload as base64; the SDK normalizes it internally before exposing it via <code>VpnProfile.vpnConfig.raw</code>.
        </p>
        <p>
          <strong>Needs manual verification:</strong> the exact <code>CreateProfileRequest.protocol</code> string you must send to request an Amnezia profile
          depends on your backend contract. The SDK’s request model uses a <code>String?</code> and does not enforce one value in the public API.
        </p>

        <hr />

        <h2>Optional — Let the SDK orchestrate server selection → profile provisioning</h2>
        <p>
          If you want to avoid duplicating the “selected server → ensure profile exists” logic in every screen/ViewModel,
          the SDK exposes a <code>ConnectionSessionApi</code> at <code>sdk.connectionSession</code>. It tracks a selected server and can provision a profile on demand.
        </p>
        <div className="sdk-code-header"><span>Kotlin — ConnectionSessionApi</span></div>
        <pre><code><span className="cmt">// Select a server (and optionally provision a profile immediately)</span>{'\n'}
sdk.connectionSession.<span className="fn">selectServer</span>({'\n'}
    serverId = server.serverId,{'\n'}
    protocol = <span className="type">VpnProtocol</span>.WIREGUARD,{'\n'}
    request  = <span className="type">CreateProfileRequest</span>(tier = <span className="str">"free"</span>),{'\n'}
    ensureProfile = <span className="kw">true</span>{'\n'}
){'\n'}
{'\n'}
<span className="cmt">// Or ensure later</span>{'\n'}
<span className="kw">val</span> ensured = sdk.connectionSession.<span className="fn">ensureProfile</span>(protocol = <span className="type">VpnProtocol</span>.WIREGUARD){'\n'}
<span className="kw">val</span> profile = (ensured <span className="kw">as</span>? <span className="type">VpnResult.Success</span>)?.data</code></pre>

        <hr />

        <h2>Step 3 — Establish the VPN Tunnel</h2>
        <p>This is <strong>your responsibility</strong>. Use whichever tunnel library fits your app:</p>
        <pre><code><span className="cmt">// WireGuard (pseudo-code)</span>{'\n'}
<span className="kw">val</span> tunnelConfig = profile.<span className="fn">toVpnConfig</span>(){'\n'}
wireguardBackend.<span className="fn">setState</span>(tunnel, tunnelConfig, <span className="type">State</span>.UP){'\n'}
{'\n'}
<span className="cmt">// OpenVPN (pseudo-code)</span>{'\n'}
<span className="kw">val</span> ovpnConfig = profile.vpnConfig?.raw ?: <span className="str">""</span>{'\n'}
openVpnManager.<span className="fn">startVpn</span>(ovpnConfig)</code></pre>

        <hr />

        <h2>Step 4 — Report Connected</h2>
        <div className="sdk-code-header"><span>Kotlin</span></div>
        <pre><code>sdk.<span className="fn">reportConnected</span>({'\n'}
    serverId = server.serverId,{'\n'}
    serverName = server.name,{'\n'}
    peerIdentifier = profile.peerIdentifier,{'\n'}
    clientIdentity = <span className="str">"user@example.com"</span>,{'\n'}
    tier = <span className="str">"free"</span>,{'\n'}
    protocol = <span className="type">VpnProtocol</span>.WIREGUARD{'\n'}
)</code></pre>

        <blockquote>
          <strong>Important:</strong> Always call <code>reportConnected()</code> after your tunnel is up. This enables session tracking, analytics, and ensures accurate connection state on the backend.
        </blockquote>

        <hr />

        <h2>Step 5 — Disconnect</h2>
        <pre><code><span className="cmt">// Tear down the tunnel (your code)</span>{'\n'}
wireguardBackend.<span className="fn">setState</span>(tunnel, <span className="kw">null</span>, <span className="type">State</span>.DOWN){'\n'}
{'\n'}
<span className="cmt">// Report to backend</span>{'\n'}
sdk.<span className="fn">reportDisconnected</span>({'\n'}
    serverId = server.serverId,{'\n'}
    peerIdentifier = profile.peerIdentifier,{'\n'}
    protocol = <span className="type">VpnProtocol</span>.WIREGUARD{'\n'}
)</code></pre>

        <h3>Correction — <code>reportDisconnected()</code> takes no parameters</h3>
        <p>
          In the SDK source code in this repository, <code>reportDisconnected()</code> does not accept <code>serverId</code>, <code>peerIdentifier</code>, or <code>protocol</code>.
          It reports a “disconnected” state and the backend identifies the device from the device token header.
        </p>
        <div className="sdk-code-header"><span>Kotlin — correct signature</span></div>
        <pre><code><span className="cmt">// Tear down the tunnel (your code)</span>{'\n'}
wireguardBackend.<span className="fn">setState</span>(tunnel, <span className="kw">null</span>, <span className="type">State</span>.DOWN){'\n'}
{'\n'}
<span className="cmt">// Report to backend (no args)</span>{'\n'}
sdk.<span className="fn">reportDisconnected</span>()</code></pre>

        <hr />

        <h2>Profile Management</h2>
        <h3>List Active Profiles</h3>
        <pre><code><span className="kw">val</span> profiles = sdk.<span className="fn">getProfiles</span>(){'\n'}
profiles.<span className="fn">forEach</span> {'{'} profile -&gt;{'\n'}
    <span className="fn">println</span>(<span className="str">"${'{'}profile.peerIdentifier{'}'} on ${'{'}profile.serverName{'}'}"</span>){'\n'}
{'}'}</code></pre>

        <h3>Revoke a Profile</h3>
        <pre><code><span className="cmt">// Revoke by peer identifier</span>{'\n'}
sdk.<span className="fn">revokeProfile</span>(peerIdentifier = profile.peerIdentifier){'\n'}
{'\n'}
<span className="cmt">// Or revoke all profiles on a server</span>{'\n'}
sdk.<span className="fn">revokeAllProfiles</span>(serverId = server.serverId)</code></pre>

        <h3>Export Profile Config</h3>
        <pre><code><span className="cmt">// Get shareable config text</span>{'\n'}
<span className="kw">val</span> configText = profile.<span className="fn">toVpnConfig</span>(){'\n'}
{'\n'}
<span className="cmt">// Save to file</span>{'\n'}
<span className="kw">val</span> file = File(context.filesDir, <span className="str">"wireguard.conf"</span>){'\n'}
file.<span className="fn">writeText</span>(configText)</code></pre>

        <h3>Correction — profile APIs in the current SDK</h3>
        <p>
          The SDK in this repository does not expose <code>getProfiles()</code>, <code>revokeProfile()</code>, or <code>revokeAllProfiles()</code> as shown above.
          Instead, it provides:
          <code>getStoredProfiles()</code> for locally stored profiles, and backend operations
          <code>revokeClient(serverId, clientName, ...)</code> and <code>exportConfig(serverId, clientName, ...)</code>.
        </p>
        <div className="sdk-code-header"><span>Kotlin — stored profiles + revoke/export</span></div>
        <pre><code><span className="cmt">// Local storage (profiles created via createProfile() are stored locally)</span>{'\n'}
<span className="kw">val</span> stored = sdk.<span className="fn">getStoredProfiles</span>(){'\n'}
stored.<span className="fn">forEach</span> {'{'} p -&gt; <span className="fn">println</span>(p.peerIdentifier) {'}'}{'\n'}
{'\n'}
<span className="cmt">// Backend revoke (requires serverId + clientName)</span>{'\n'}
sdk.<span className="fn">revokeClient</span>({'\n'}
    serverId = server.serverId,{'\n'}
    clientName = profile.clientIdentity ?: <span className="str">""</span>,{'\n'}
    protocol = <span className="type">VpnProtocol</span>.WIREGUARD{'\n'}
){'\n'}
{'\n'}
<span className="cmt">// Backend export (requires serverId + clientName; format is optional)</span>{'\n'}
<span className="kw">val</span> exported = sdk.<span className="fn">exportConfig</span>({'\n'}
    serverId = server.serverId,{'\n'}
    clientName = profile.clientIdentity ?: <span className="str">""</span>,{'\n'}
    format = <span className="str">"conf"</span>{'\n'}
)</code></pre>
        <p>
          <strong>Needs manual verification:</strong> whether your backend expects <code>clientName</code> vs a user-provided identity string for revocation/export.
          In SDK models, <code>clientName</code> is carried as <code>VpnProfile.clientIdentity</code> and is derived from the backend response.
        </p>

        <hr />

        <h2>Connection State Tracking</h2>
        <pre><code><span className="cmt">// Get current connection state</span>{'\n'}
<span className="kw">val</span> state = sdk.<span className="fn">getConnectionState</span>(){'\n'}
{'\n'}
<span className="kw">when</span> (state) {'{'}{'\n'}
    <span className="type">ConnectionState</span>.CONNECTED -&gt; {'{'} <span className="cmt">/* Show connected UI */</span> {'}'}{'\n'}
    <span className="type">ConnectionState</span>.CONNECTING -&gt; {'{'} <span className="cmt">/* Show spinner */</span> {'}'}{'\n'}
    <span className="type">ConnectionState</span>.DISCONNECTED -&gt; {'{'} <span className="cmt">/* Show connect button */</span> {'}'}{'\n'}
    <span className="type">ConnectionState</span>.DISCONNECTING -&gt; {'{'} <span className="cmt">/* Show spinner */</span> {'}'}{'\n'}
{'}'}{'\n'}
{'\n'}
<span className="cmt">// Get current session info (if connected)</span>{'\n'}
<span className="kw">val</span> session = sdk.<span className="fn">getCurrentSession</span>(){'\n'}
session?.let {'{'}{'\n'}
    <span className="fn">println</span>(<span className="str">"Connected to ${'{'}it.serverName{'}'} since ${'{'}it.connectedAt{'}'}"</span>){'\n'}
{'}'}</code></pre>

        <h3>Correction — current connection state APIs</h3>
        <p>
          The SDK in this repository exposes an observable <code>StateFlow</code> for connection state and a local snapshot of the active connection.
          It does not expose <code>getConnectionState()</code> / <code>getCurrentSession()</code> methods with the shapes shown above.
        </p>
        <div className="sdk-code-header"><span>Kotlin — StateFlow + active connection snapshot</span></div>
        <pre><code><span className="cmt">// Observe state changes (e.g. in a ViewModel)</span>{'\n'}
<span className="kw">val</span> stateFlow = sdk.connectionState{'\n'}
{'\n'}
<span className="cmt">// Snapshot</span>{'\n'}
<span className="kw">val</span> active = sdk.<span className="fn">getActiveConnection</span>(){'\n'}
<span className="kw">if</span> (active != <span className="kw">null</span>) {'{'}{'\n'}
    <span className="fn">println</span>(active.serverId){'\n'}
{' }'}</code></pre>

        <PageNav 
          prev={{ href: '/sdk/docs/server-discovery', title: 'Server Discovery' }}
          next={{ href: '/sdk/docs/smart-connect', title: 'Smart Connect' }} 
        />
      </SDKDocsLayout>
    </>
  );
}
