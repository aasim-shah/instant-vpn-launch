import { SDKDocsLayout, PageNav, Badge, MermaidDiagram } from '@/components/SDKDocsLayout';
import { SEO } from '@/components/SEO';
import { Link } from 'react-router-dom';

export default function SDKDocsWhatsNew() {

  const startupFlowChart = `
flowchart TD
    A["App Launch"] --> B{"Device Activated?"}
    B -- No --> C["activateDevice(appVersion)"]
    C --> D["getRegistryConstants()"]
    B -- Yes --> D
    D --> E["Cache constants 24 h"]
    E --> F["getOptimalServer(tier, protocol, platform)"]
    E --> G["Populate protocol / category pickers"]
    F --> H["Pre-select server in connection screen"]
  `;

  const optimalRespChart = `
graph LR
    A["/optimal request"] --> B{"servers match?"}
    B -- Yes --> C["200 recommended + alternatives[]"]
    B -- No  --> D["503 NoServersAvailableException"]
  `;

  const filterRetryChart = `
sequenceDiagram
    participant App
    participant SDK as FyreWay SDK
    participant API as Backend
    App->>SDK: getServers(filter.tier = "gold")
    SDK->>API: GET /active-servers/sdk/list?tier=gold
    API-->>SDK: 400 INVALID_TIER
    SDK->>API: GET /server-registry/constants (refresh)
    API-->>SDK: updated constants
    SDK->>API: GET /active-servers/sdk/list?tier=gold (retry)
    API-->>SDK: 400 INVALID_TIER (still invalid)
    SDK-->>App: VpnResult.Error(InvalidFilterValueException)
  `;

  return (
    <>
      <SEO
        title="What's New — April 2026 Release · FyreWay SDK Docs"
        description="Full changelog for the FyreWay VPN SDK April 2026 release: registry constants, classification filtering, optimal server improvements, ranking endpoints, and more."
        canonical="/sdk/docs/v2/whats-new"
        jsonLd={{
          '@type': 'TechArticle',
          headline: "What's New — FyreWay VPN SDK April 2026 Release",
          description: 'Complete changelog and migration guide for SDK v1.2.0',
          author: { '@type': 'Organization', name: 'FyreWay' },
          datePublished: '2026-04-10',
          dateModified: '2026-04-10',
        }}
      />
      <SDKDocsLayout title="What's New">
        <h1>What's New — April 2026 Release</h1>
        <p className="sdk-page-description">
          <Badge>SDK v1.2.0</Badge>&nbsp;·&nbsp;Released April 10, 2026&nbsp;·&nbsp;All changes are <strong>additive</strong> — no existing method signature was removed or made breaking.
        </p>

        <blockquote>
          <strong>TL;DR for existing integrators:</strong> The SDK gained four new server-classification filter parameters (<code>tier</code>, <code>protocol</code>, <code>platform</code>, <code>category</code>) across every discovery endpoint. A new <code>getRegistryConstants()</code> startup call fetches valid filter values dynamically. <code>smartConnect()</code> now returns alternative servers and accepts the same classification criteria. The <code>/optimal</code> endpoint returns a richer response and uses <strong>503</strong> (not 200 + null) when no servers match. All existing calls without new parameters behave exactly as before.
        </blockquote>

        <hr />

        <h2>Release Highlights at a Glance</h2>
        <table>
          <thead>
            <tr>
              <th>Area</th>
              <th>Change</th>
              <th>Impact</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Registry Constants</strong></td>
              <td>New <code>getRegistryConstants()</code> startup call; 24 h cache</td>
              <td>Required for dynamic filter pickers</td>
            </tr>
            <tr>
              <td><strong>Server Model</strong></td>
              <td><code>accessTiers[]</code>, <code>platforms[]</code>, <code>categories[]</code>, <code>features{'{}'}</code> fields added</td>
              <td>Additive — existing <code>tier</code> and <code>protocols</code> fields unchanged</td>
            </tr>
            <tr>
              <td><strong>Classification Filters</strong></td>
              <td><code>tier</code>, <code>protocol</code>, <code>platform</code>, <code>category</code> on all discovery endpoints</td>
              <td>All params are optional with <code>null</code> defaults</td>
            </tr>
            <tr>
              <td><strong>ServerFilter</strong></td>
              <td>Four new fields + <code>byTier()</code>, <code>byCategory()</code> factory methods</td>
              <td>Additive</td>
            </tr>
            <tr>
              <td><strong>SmartConnectCriteria</strong></td>
              <td><code>tier</code>, <code>preferredProtocol</code>, <code>platform</code>, <code>preferredCategory</code> added</td>
              <td>Additive</td>
            </tr>
            <tr>
              <td><strong>SmartConnectResult</strong></td>
              <td><code>alternatives: List&lt;Server&gt;</code> added</td>
              <td>Additive — populated from backend or left empty on offline path</td>
            </tr>
            <tr>
              <td><strong>smartConnectForCategory()</strong></td>
              <td>New convenience method</td>
              <td>New API</td>
            </tr>
            <tr>
              <td><strong>Optimal Server Response</strong></td>
              <td>Richer <code>recommended + alternatives[] + selectionCriteria</code> envelope</td>
              <td>Internal — mapped to existing <code>SmartConnectResult</code></td>
            </tr>
            <tr>
              <td><strong>503 from /optimal</strong></td>
              <td>Now returns <code>NoServersAvailableException</code> instead of empty result</td>
              <td>Handle this case (was previously silent)</td>
            </tr>
            <tr>
              <td><strong>400 auto-retry</strong></td>
              <td>Invalid filter value → constants refresh → one automatic retry</td>
              <td>Transparent to most callers</td>
            </tr>
            <tr>
              <td><strong>InvalidFilterValueException</strong></td>
              <td>New exception when a filter value is invalid after auto-retry</td>
              <td>New <code>catch</code> branch to add</td>
            </tr>
            <tr>
              <td><strong>Ranking Endpoints</strong></td>
              <td><code>getRankedServersInCity()</code>, <code>getBestServersInCountry()</code></td>
              <td>New API</td>
            </tr>
            <tr>
              <td><strong>getRecommendedServers()</strong></td>
              <td>Analytics-backed recommended server list</td>
              <td>New API</td>
            </tr>
            <tr>
              <td><strong>Location API Filters</strong></td>
              <td><code>tier</code> and <code>protocol</code> on hierarchy / countries / cities calls</td>
              <td>Additive — zero-count locations automatically excluded by backend</td>
            </tr>
            <tr>
              <td><strong>Server Extensions</strong></td>
              <td><code>isAccessibleForTier()</code>, <code>tierBadgeText()</code>, <code>supportsWireGuard()</code>, <code>supportsOpenVpn()</code></td>
              <td>New utility functions</td>
            </tr>
            <tr>
              <td><strong>UserServerPreferences</strong></td>
              <td>New model — persists user's tier / protocol / platform / category choice</td>
              <td>New API</td>
            </tr>
          </tbody>
        </table>

        <hr />

        {/* ─── 1. Registry Constants ─────────────────────────────────────────── */}
        <h2 id="registry-constants">1. Registry Constants — Dynamic Filter Values</h2>
        <p>
          The backend now stores all valid values for <code>tier</code>, <code>protocol</code>, <code>platform</code>, and <code>category</code> in MongoDB and exposes them via <code>GET /api/v2/server-registry/constants</code>. <strong>Do not hardcode these strings</strong> — they can change without an app release when the backend admin adds a new tier or category.
        </p>
        <p>
          Fetch constants once at cold start. The SDK caches the result for 24 hours and automatically refreshes when a filter validation error is received.
        </p>

        <h3>Recommended Startup Sequence</h3>
        <MermaidDiagram chart={startupFlowChart} />

        <h3>Fetching Constants</h3>
        <div className="sdk-code-header"><span>Kotlin</span></div>
        <pre><code><span className="kw">val</span> sdk = <span className="type">FyreWaySDK</span>.<span className="fn">getInstance</span>(){'\n'}
{'\n'}
<span className="cmt">// Called automatically in background at startup, but you can also</span>{'\n'}
<span className="cmt">// call it explicitly to pre-populate your filter picker UI.</span>{'\n'}
<span className="kw">when</span> (<span className="kw">val</span> result = sdk.<span className="fn">getRegistryConstants</span>()) {'{'}{'\n'}
    <span className="kw">is</span> <span className="type">VpnResult.Success</span> -&gt; {'{'}{'\n'}
        <span className="kw">val</span> constants = result.data{'\n'}
{'\n'}
        <span className="cmt">// Drive your picker UI — never hardcode these</span>{'\n'}
        <span className="kw">val</span> tiers     = constants.accessTiers  <span className="cmt">// e.g. [AccessTier("free","Free",0), AccessTier("premium","Premium",1)]</span>{'\n'}
        <span className="kw">val</span> protocols = constants.services     <span className="cmt">// e.g. [ServiceProtocol("wireguard","WireGuard"), ...]</span>{'\n'}
        <span className="kw">val</span> platforms = constants.platforms    <span className="cmt">// e.g. [Platform("android","Android"), ...]</span>{'\n'}
        <span className="kw">val</span> categories = constants.categories  <span className="cmt">// e.g. [Category("streaming","Streaming", "Optimised for video")]</span>{'\n'}
    {'}'}{'\n'}
    <span className="kw">is</span> <span className="type">VpnResult.Error</span> -&gt; {'{'} <span className="cmt">/* gracefully degrade — filters still work with null values */</span> {'}'}{'\n'}
{'}'}</code></pre>

        <h3>Building a Dynamic Filter UI</h3>
        <p>Use the constants to drive your protocol and category picker without hardcoded strings:</p>
        <div className="sdk-code-header"><span>Kotlin — ViewModel</span></div>
        <pre><code><span className="kw">class</span> <span className="type">FilterViewModel</span> : <span className="type">ViewModel</span>() {'{'}{'\n'}
    <span className="kw">private val</span> sdk = <span className="type">FyreWaySDK</span>.<span className="fn">getInstance</span>(){'\n'}
{'\n'}
    <span className="kw">val</span> protocols = <span className="fn">liveData</span> {'{'}{'\n'}
        <span className="kw">val</span> result = sdk.<span className="fn">getRegistryConstants</span>(){'\n'}
        <span className="kw">if</span> (result <span className="kw">is</span> <span className="type">VpnResult.Success</span>) <span className="fn">emit</span>(result.data.services){'\n'}
        <span className="cmt">// Emits: [ServiceProtocol("wireguard","WireGuard"), ServiceProtocol("openvpn-udp","OpenVPN UDP")]</span>{'\n'}
    {'}'}{'\n'}
{'\n'}
    <span className="kw">val</span> categories = <span className="fn">liveData</span> {'{'}{'\n'}
        <span className="kw">val</span> result = sdk.<span className="fn">getRegistryConstants</span>(){'\n'}
        <span className="kw">if</span> (result <span className="kw">is</span> <span className="type">VpnResult.Success</span>) <span className="fn">emit</span>(result.data.categories){'\n'}
        <span className="cmt">// Emits: [Category("general","General",…), Category("streaming","Streaming",…)]</span>{'\n'}
    {'}'}{'\n'}
{'}'}</code></pre>

        <blockquote>
          <strong>When constants refresh:</strong> On cold start, on foreground resume after &gt;24 h, and automatically whenever a 400 "invalid enum" error is received from any discovery endpoint. You never need to invalidate the cache manually.
        </blockquote>

        <hr />

        {/* ─── 2. Extended Server Model ──────────────────────────────────────── */}
        <h2 id="server-model">2. Extended Server Model</h2>
        <p>
          The <code>Server</code> data class has four new fields. The existing <code>tier: String?</code> and <code>protocols: List&lt;String&gt;?</code> fields are <strong>unchanged</strong>.
        </p>

        <div className="sdk-code-header"><span>Kotlin — Updated Server data class</span></div>
        <pre><code><span className="kw">data class</span> <span className="type">Server</span>({'\n'}
    <span className="cmt">// ── Existing fields (unchanged) ─────────────────────────────</span>{'\n'}
    <span className="kw">val</span> serverId: <span className="type">String</span>,{'\n'}
    <span className="kw">val</span> name: <span className="type">String</span>,{'\n'}
    <span className="kw">val</span> location: <span className="type">ServerLocation</span>,{'\n'}
    <span className="kw">val</span> capacity: <span className="type">ServerCapacity?</span>,{'\n'}
    <span className="kw">val</span> performance: <span className="type">ServerPerformance?</span>,{'\n'}
    <span className="kw">val</span> tier: <span className="type">String?</span>,              <span className="cmt">// Kept for backward compat — lowest tier in accessTiers</span>{'\n'}
    <span className="kw">val</span> protocols: <span className="type">List&lt;String&gt;?</span>,    <span className="cmt">// Kept for backward compat</span>{'\n'}
    <span className="kw">val</span> status: <span className="type">String?</span>,{'\n'}
{'\n'}
    <span className="cmt">// ── New fields (April 2026) ──────────────────────────────────</span>{'\n'}
    <span className="kw">val</span> accessTiers: <span className="type">List&lt;String&gt;</span> = <span className="fn">emptyList</span>(),   <span className="cmt">// ["free", "premium"]</span>{'\n'}
    <span className="kw">val</span> platforms: <span className="type">List&lt;String&gt;</span> = <span className="fn">emptyList</span>(),    <span className="cmt">// ["android", "ios", "windows"]</span>{'\n'}
    <span className="kw">val</span> categories: <span className="type">List&lt;String&gt;</span> = <span className="fn">emptyList</span>(),   <span className="cmt">// ["general", "streaming", "gaming"]</span>{'\n'}
    <span className="kw">val</span> features: <span className="type">ServerFeatures?</span> = <span className="kw">null</span>          <span className="cmt">// Boolean capability map for UI</span>{'\n'}
){'\n'}
{'\n'}
<span className="kw">data class</span> <span className="type">ServerFeatures</span>({'\n'}
    <span className="kw">val</span> wireguard: <span className="type">Boolean</span> = <span className="kw">false</span>,{'\n'}
    <span className="kw">val</span> openvpn: <span className="type">Boolean</span> = <span className="kw">false</span>{'\n'}
)</code></pre>

        <h3>New Extension Functions on Server</h3>
        <p>Use these helpers for instant local checks — no extra API calls needed:</p>
        <div className="sdk-code-header"><span>Kotlin</span></div>
        <pre><code><span className="cmt">// Protocol capability checks</span>{'\n'}
server.<span className="fn">supportsWireGuard</span>()    <span className="cmt">// features?.wireguard == true</span>{'\n'}
server.<span className="fn">supportsOpenVpn</span>()      <span className="cmt">// features?.openvpn == true</span>{'\n'}
{'\n'}
<span className="cmt">// Tier access check — mirrors backend canAccessServer() logic</span>{'\n'}
server.<span className="fn">isAccessibleForTier</span>(<span className="str">"free"</span>)      <span className="cmt">// true for free servers, false for premium-only</span>{'\n'}
server.<span className="fn">isAccessibleForTier</span>(<span className="str">"premium"</span>)   <span className="cmt">// true for both free and premium servers</span>{'\n'}
{'\n'}
<span className="cmt">// Tier badge for UI display</span>{'\n'}
<span className="kw">val</span> badge = server.<span className="fn">tierBadgeText</span>()  <span className="cmt">// "Free" | "Premium" | "Business" | "Dedicated"</span>{'\n'}
{'\n'}
<span className="cmt">// Tier hierarchy (for reference)</span>{'\n'}
<span className="cmt">// free(0) &lt; basic(1) &lt; premium(2) &lt; business(3) &lt; dedicated(4)</span>{'\n'}
<span className="cmt">// isAccessibleForTier() returns true if userLevel &gt;= min(server.accessTiers)</span>{'\n'}
<span className="cmt">// Old servers with empty accessTiers always return true (backward compat)</span></code></pre>

        <h3>Rendering Server Capability Badges</h3>
        <div className="sdk-code-header"><span>Kotlin — Compose / XML example</span></div>
        <pre><code><span className="kw">fun</span> <span className="type">ServerListItem</span>.<span className="fn">Composable</span>(server: <span className="type">Server</span>, userTier: <span className="type">String</span>) {'{'}{'\n'}
    <span className="cmt">// Dim locked servers immediately without a network call</span>{'\n'}
    <span className="kw">val</span> isLocked = !server.<span className="fn">isAccessibleForTier</span>(userTier){'\n'}
{'\n'}
    <span className="cmt">// Show tier badge</span>{'\n'}
    <span className="type">Text</span>(text = server.<span className="fn">tierBadgeText</span>()){'\n'}
{'\n'}
    <span className="cmt">// Show protocol icons</span>{'\n'}
    <span className="kw">if</span> (server.<span className="fn">supportsWireGuard</span>()) <span className="type">WireGuardIcon</span>(){'\n'}
    <span className="kw">if</span> (server.<span className="fn">supportsOpenVpn</span>()) <span className="type">OpenVpnIcon</span>(){'\n'}
{'}'}</code></pre>

        <hr />

        {/* ─── 3. Classification Filtering ──────────────────────────────────── */}
        <h2 id="classification-filtering">3. Classification Filtering</h2>
        <p>
          Every server-discovery endpoint now accepts four optional query parameters. Pass them via <code>ServerFilter</code> or directly in convenience methods. Calls that omit these parameters behave exactly as before.
        </p>

        <h3>ServerFilter — New Fields &amp; Factory Methods</h3>
        <div className="sdk-code-header"><span>Kotlin</span></div>
        <pre><code><span className="cmt">// Single-field factory methods</span>{'\n'}
<span className="type">ServerFilter</span>.<span className="fn">byTier</span>(<span className="str">"premium"</span>){'\n'}
<span className="type">ServerFilter</span>.<span className="fn">byProtocol</span>(<span className="str">"wireguard"</span>){'\n'}
<span className="type">ServerFilter</span>.<span className="fn">byPlatform</span>(<span className="str">"android"</span>){'\n'}
<span className="type">ServerFilter</span>.<span className="fn">byCategory</span>(<span className="str">"streaming"</span>){'\n'}
{'\n'}
<span className="cmt">// Compose multiple filters</span>{'\n'}
<span className="type">ServerFilter</span>({'\n'}
    country  = <span className="str">"US"</span>,{'\n'}
    tier     = <span className="str">"premium"</span>,{'\n'}
    protocol = <span className="str">"wireguard"</span>,{'\n'}
    platform = <span className="str">"android"</span>,{'\n'}
    category = <span className="str">"streaming"</span>{'\n'}
)</code></pre>

        <h3>Using Filters with Discovery APIs</h3>
        <div className="sdk-code-header"><span>Kotlin</span></div>
        <pre><code><span className="cmt">// All streaming-optimised servers accessible on the "premium" tier</span>{'\n'}
sdk.<span className="fn">getServers</span>(filter = <span className="type">ServerFilter</span>({'\n'}
    tier     = <span className="str">"premium"</span>,{'\n'}
    category = <span className="str">"streaming"</span>,{'\n'}
    platform = <span className="str">"android"</span>{'\n'}
)){'\n'}
{'\n'}
<span className="cmt">// WireGuard-only servers in the US</span>{'\n'}
sdk.<span className="fn">getServers</span>(filter = <span className="type">ServerFilter</span>({'\n'}
    country  = <span className="str">"US"</span>,{'\n'}
    protocol = <span className="str">"wireguard"</span>{'\n'}
)){'\n'}
{'\n'}
<span className="cmt">// Tier-aware server count in location hierarchy</span>{'\n'}
sdk.<span className="fn">getLocationsHierarchy</span>(tier = <span className="str">"free"</span>, protocol = <span className="str">"wireguard"</span>){'\n'}
<span className="cmt">// Locations with zero matching servers are excluded automatically</span></code></pre>

        <blockquote>
          <strong>Important:</strong> Valid values for <code>tier</code>, <code>protocol</code>, <code>platform</code>, and <code>category</code> come from <code>getRegistryConstants()</code>, not hardcoded strings. Using an invalid value triggers an automatic constants refresh and one retry. If it fails again, you receive an <code>InvalidFilterValueException</code>.
        </blockquote>

        <hr />

        {/* ─── 4. Optimal Server Improvements ───────────────────────────────── */}
        <h2 id="optimal-server">4. Optimal Server — Improved Response &amp; 503 Handling</h2>
        <p>
          The <code>/optimal</code> endpoint has been completely rewritten with a 5-factor QoS scoring model that uses live heartbeat data. The response envelope has changed, and the endpoint now returns <strong>HTTP 503</strong> instead of a 200 with a null server when no servers match the criteria.
        </p>

        <MermaidDiagram chart={optimalRespChart} />

        <h3>New Response Fields</h3>
        <p>The result is already mapped into the standard <code>SmartConnectResult</code> — the change is transparent when you call <code>sdk.smartConnect()</code>. The new <code>alternatives</code> field is now populated:</p>
        <div className="sdk-code-header"><span>Kotlin</span></div>
        <pre><code><span className="kw">when</span> (<span className="kw">val</span> result = sdk.<span className="fn">smartConnect</span>()) {'{'}{'\n'}
    <span className="kw">is</span> <span className="type">VpnResult.Success</span> -&gt; {'{'}{'\n'}
        <span className="kw">val</span> primary = result.data.server           <span className="cmt">// Best server (QoS scored)</span>{'\n'}
        <span className="kw">val</span> backups  = result.data.alternatives    <span className="cmt">// Next-best servers (new field)</span>{'\n'}
        <span className="kw">val</span> score    = result.data.score{'\n'}
        <span className="kw">val</span> reason   = result.data.reason{'\n'}
    {'}'}{'\n'}
    <span className="kw">is</span> <span className="type">VpnResult.Error</span> -&gt; {'{'}{'\n'}
        <span className="kw">when</span> (result.exception) {'{'}{'\n'}
            <span className="kw">is</span> <span className="type">NoServersAvailableException</span> -&gt; {'{'}{'\n'}
                <span className="cmt">// Was previously a silent 200+null — now explicit</span>{'\n'}
                <span className="fn">showMessage</span>(<span className="str">"No servers match your filters. Try broadening your selection."</span>){'\n'}
            {'}'}{'\n'}
            <span className="kw">else</span> -&gt; <span className="fn">showGenericError</span>(result.exception){'\n'}
        {'}'}{'\n'}
    {'}'}{'\n'}
{'}'}</code></pre>

        <blockquote>
          <strong>Action required:</strong> If you previously checked for a null server in a <code>VpnResult.Success</code>, replace that with a <code>NoServersAvailableException</code> handler in the <code>VpnResult.Error</code> branch.
        </blockquote>

        <h3>Passing Criteria to the Backend Optimal Endpoint</h3>
        <div className="sdk-code-header"><span>Kotlin</span></div>
        <pre><code><span className="cmt">// The SDK now passes tier/protocol/platform to the backend by default.</span>{'\n'}
<span className="cmt">// Use criteria to specify them explicitly:</span>{'\n'}
sdk.<span className="fn">smartConnect</span>({'\n'}
    criteria = <span className="type">SmartConnectCriteria</span>({'\n'}
        tier              = <span className="str">"premium"</span>,{'\n'}
        preferredProtocol = <span className="str">"wireguard"</span>,{'\n'}
        platform          = <span className="str">"android"</span>,{'\n'}
        preferredCategory = <span className="str">"streaming"</span>,{'\n'}
        preferredCountry  = <span className="str">"US"</span>{'\n'}
    ),{'\n'}
    strategy = <span className="type">SelectionStrategy</span>.LOWEST_LATENCY{'\n'}
)</code></pre>

        <hr />

        {/* ─── 5. New Ranking Endpoints ──────────────────────────────────────── */}
        <h2 id="ranking-endpoints">5. New Ranking Endpoints</h2>
        <p>
          Two new endpoints give you QoS-ranked server lists for a specific city or the best servers per city within a country.
        </p>

        <h3>getRankedServersInCity()</h3>
        <p>Returns a list of servers in a city ranked by the backend QoS algorithm, with optional performance metrics.</p>
        <div className="sdk-code-header"><span>Kotlin</span></div>
        <pre><code><span className="kw">when</span> (<span className="kw">val</span> result = sdk.<span className="fn">getRankedServersInCity</span>({'\n'}
    country = <span className="str">"US"</span>,{'\n'}
    city    = <span className="str">"New York"</span>,{'\n'}
    filter  = <span className="type">ServerFilter</span>(tier = <span className="str">"free"</span>, protocol = <span className="str">"wireguard"</span>),{'\n'}
    limit   = <span className="num">10</span>,{'\n'}
    includeMetrics = <span className="kw">true</span>{'\n'}
)) {'{'}{'\n'}
    <span className="kw">is</span> <span className="type">VpnResult.Success</span> -&gt; {'{'}{'\n'}
        result.data.servers.<span className="fn">forEachIndexed</span> {'{'} idx, server -&gt;{'\n'}
            <span className="fn">println</span>(<span className="str">"#${'{'}idx + 1{'}'} ${'{'}server.name{'}'} — score ${'{'}server.score{'}'}"</span>){'\n'}
        {'}'}{'\n'}
        <span className="kw">val</span> fromCache = result.data.metadata.cached{'\n'}
    {'}'}{'\n'}
    <span className="kw">is</span> <span className="type">VpnResult.Error</span> -&gt; {'{'} <span className="cmt">/* Handle error */</span> {'}'}{'\n'}
{'}'}</code></pre>

        <h3>getBestServersInCountry()</h3>
        <p>Returns the top server per city within a country — ideal for building a location picker with a "best pick" indicator.</p>
        <div className="sdk-code-header"><span>Kotlin</span></div>
        <pre><code><span className="kw">when</span> (<span className="kw">val</span> result = sdk.<span className="fn">getBestServersInCountry</span>({'\n'}
    country = <span className="str">"US"</span>,{'\n'}
    filter  = <span className="type">ServerFilter</span>(tier = <span className="str">"free"</span>),{'\n'}
    limit   = <span className="num">3</span>{'\n'}
)) {'{'}{'\n'}
    <span className="kw">is</span> <span className="type">VpnResult.Success</span> -&gt; {'{'}{'\n'}
        result.data.cities.<span className="fn">forEach</span> {'{'} cityResult -&gt;{'\n'}
            <span className="fn">println</span>(<span className="str">"${'{'}cityResult.city{'}'} → best: ${'{'}cityResult.topServer?.name{'}'}"</span>){'\n'}
        {'}'}{'\n'}
    {'}'}{'\n'}
    <span className="kw">is</span> <span className="type">VpnResult.Error</span> -&gt; {'{'} <span className="cmt">/* Handle error */</span> {'}'}{'\n'}
{'}'}</code></pre>

        <h3>getRecommendedServers()</h3>
        <p>Analytics-backed endpoint that returns personalised server recommendations. The device token automatically identifies the customer — no separate customer ID is needed.</p>
        <div className="sdk-code-header"><span>Kotlin</span></div>
        <pre><code><span className="kw">val</span> result = sdk.<span className="fn">getRecommendedServers</span>({'\n'}
    filter = <span className="type">ServerFilter</span>(tier = <span className="str">"premium"</span>, category = <span className="str">"streaming"</span>),{'\n'}
    limit  = <span className="num">5</span>{'\n'}
)</code></pre>

        <hr />

        {/* ─── 6. Smart Connect Enhancements ────────────────────────────────── */}
        <h2 id="smart-connect">6. Smart Connect Enhancements</h2>

        <h3>Extended SmartConnectCriteria</h3>
        <div className="sdk-code-header"><span>Kotlin — All available criteria fields</span></div>
        <pre><code><span className="type">SmartConnectCriteria</span>({'\n'}
    <span className="cmt">// Geography (unchanged)</span>{'\n'}
    preferredCountry = <span className="str">"US"</span>,{'\n'}
    preferredCity    = <span className="str">"New York"</span>,{'\n'}
    preferredRegion  = <span className="str">"Virginia"</span>,  <span className="cmt">// physical province, not cloud code</span>{'\n'}
    maxLatency       = <span className="num">100</span>,{'\n'}
    minCapacity      = <span className="num">20</span>,{'\n'}
{'\n'}
    <span className="cmt">// Classification (new)</span>{'\n'}
    tier              = <span className="str">"premium"</span>,{'\n'}
    preferredProtocol = <span className="str">"wireguard"</span>,{'\n'}
    platform          = <span className="str">"android"</span>,{'\n'}
    preferredCategory = <span className="str">"streaming"</span>{'\n'}
)</code></pre>

        <h3>smartConnectForCategory() — New Convenience Method</h3>
        <div className="sdk-code-header"><span>Kotlin</span></div>
        <pre><code><span className="cmt">// Streaming-optimised server in the US, premium tier</span>{'\n'}
sdk.<span className="fn">smartConnectForCategory</span>({'\n'}
    category = <span className="str">"streaming"</span>,{'\n'}
    tier     = <span className="str">"premium"</span>,{'\n'}
    country  = <span className="str">"US"</span>{'\n'}
){'\n'}
{'\n'}
<span className="cmt">// Gaming server (lowest latency selected automatically)</span>{'\n'}
sdk.<span className="fn">smartConnectForCategory</span>(category = <span className="str">"gaming"</span>){'\n'}
{'\n'}
<span className="cmt">// P2P server anywhere</span>{'\n'}
sdk.<span className="fn">smartConnectForCategory</span>(category = <span className="str">"p2p"</span>, tier = <span className="str">"free"</span>)</code></pre>

        <h3>Alternatives in SmartConnectResult</h3>
        <p>
          <code>SmartConnectResult.alternatives</code> is now populated from the backend <code>alternatives[]</code> array when online, or left empty when the local engine is used as an offline fallback.
        </p>
        <div className="sdk-code-header"><span>Kotlin</span></div>
        <pre><code><span className="kw">val</span> result = sdk.<span className="fn">smartConnect</span>(){'\n'}
<span className="kw">if</span> (result <span className="kw">is</span> <span className="type">VpnResult.Success</span>) {'{'}{'\n'}
    <span className="kw">val</span> primary   = result.data.server{'\n'}
    <span className="kw">val</span> backupOne = result.data.alternatives.<span className="fn">getOrNull</span>(<span className="num">0</span>){'\n'}
    <span className="kw">val</span> backupTwo = result.data.alternatives.<span className="fn">getOrNull</span>(<span className="num">1</span>){'\n'}
{'\n'}
    <span className="cmt">// Show top 3 in connection screen without extra API calls</span>{'\n'}
{'}'}</code></pre>

        <hr />

        {/* ─── 7. New Exception ──────────────────────────────────────────────── */}
        <h2 id="exceptions">7. New Exception — InvalidFilterValueException</h2>
        <p>
          When you pass a filter value that the backend doesn't recognise, the SDK automatically refreshes the registry constants and retries the request once. If the value is still invalid after the retry, it surfaces an <code>InvalidFilterValueException</code>.
        </p>

        <MermaidDiagram chart={filterRetryChart} />

        <div className="sdk-code-header"><span>Kotlin — Handling the new exception</span></div>
        <pre><code><span className="kw">when</span> (<span className="kw">val</span> result = sdk.<span className="fn">getServers</span>(filter = <span className="type">ServerFilter</span>(tier = userSelectedTier))) {'{'}{'\n'}
    <span className="kw">is</span> <span className="type">VpnResult.Success</span> -&gt; <span className="fn">displayServers</span>(result.data.servers){'\n'}
    <span className="kw">is</span> <span className="type">VpnResult.Error</span>   -&gt; {'{'}{'\n'}
        <span className="kw">when</span> (result.exception) {'{'}{'\n'}
            <span className="kw">is</span> <span className="type">InvalidFilterValueException</span> -&gt; {'{'}{'\n'}
                <span className="cmt">// The value is genuinely invalid — prompt user to reselect</span>{'\n'}
                <span className="kw">val</span> badParam  = result.exception.paramName    <span className="cmt">// e.g. "tier"</span>{'\n'}
                <span className="kw">val</span> badValue  = result.exception.invalidValue  <span className="cmt">// e.g. "gold"</span>{'\n'}
                <span className="fn">showError</span>(<span className="str">"Invalid filter value '${'$'}{'{'}badValue{'}'}' for ${'$'}{'{'}badParam{'}'}. Please select a different option."</span>){'\n'}
                <span className="cmt">// Reload the filter UI from fresh constants</span>{'\n'}
                <span className="fn">reloadFilterPicker</span>(){'\n'}
            {'}'}{'\n'}
            <span className="kw">is</span> <span className="type">NoServersAvailableException</span> -&gt; <span className="fn">showBroadenFiltersMessage</span>(){'\n'}
            <span className="kw">else</span> -&gt; <span className="fn">showGenericError</span>(result.exception){'\n'}
        {'}'}{'\n'}
    {'}'}{'\n'}
{'}'}</code></pre>

        <table>
          <thead>
            <tr>
              <th>Property</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>paramName</code></td>
              <td><code>String?</code></td>
              <td>The filter parameter that was invalid, e.g. <code>"tier"</code></td>
            </tr>
            <tr>
              <td><code>invalidValue</code></td>
              <td><code>String?</code></td>
              <td>The value that was rejected, e.g. <code>"gold"</code></td>
            </tr>
            <tr>
              <td><code>statusCode</code></td>
              <td><code>Int?</code></td>
              <td>Always <code>400</code></td>
            </tr>
          </tbody>
        </table>

        <blockquote>
          <strong>ErrorMessageMapper:</strong> <code>InvalidFilterValueException</code> maps to the user message <em>"Invalid filter value. Please update the app or change your selection."</em> with <code>isRetryable = false</code>.
        </blockquote>

        <hr />

        {/* ─── 8. Location API Updates ───────────────────────────────────────── */}
        <h2 id="location-api">8. Location API — Tier-Aware Filtering</h2>
        <p>
          The hierarchy, country, and city endpoints now accept optional <code>tier</code> and <code>protocol</code> parameters. The backend automatically excludes locations with zero matching servers when filters are applied — no client-side filtering needed.
        </p>
        <div className="sdk-code-header"><span>Kotlin</span></div>
        <pre><code><span className="cmt">// Only show countries that have at least one free WireGuard server</span>{'\n'}
sdk.<span className="fn">getLocationsHierarchy</span>(tier = <span className="str">"free"</span>, protocol = <span className="str">"wireguard"</span>){'\n'}
{'\n'}
<span className="cmt">// Same for countries list</span>{'\n'}
sdk.<span className="fn">getCountries</span>(tier = <span className="str">"free"</span>, protocol = <span className="str">"wireguard"</span>){'\n'}
{'\n'}
<span className="cmt">// Cities in Germany with premium servers</span>{'\n'}
sdk.<span className="fn">getCities</span>(country = <span className="str">"DE"</span>, tier = <span className="str">"premium"</span>)</code></pre>

        <hr />

        {/* ─── 9. User Preferences ──────────────────────────────────────────── */}
        <h2 id="user-preferences">9. User Server Preferences</h2>
        <p>
          A new <code>UserServerPreferences</code> model lets you persist the user's tier, protocol, platform, and category preference in one place and pass it automatically to every discovery call.
        </p>
        <div className="sdk-code-header"><span>Kotlin</span></div>
        <pre><code><span className="cmt">// Set user preferences on the SDK (in-memory; update from your own persistence layer)</span>{'\n'}
sdk.userPreferences = <span className="type">UserServerPreferences</span>({'\n'}
    tier              = <span className="str">"premium"</span>,       <span className="cmt">// From user's subscription plan</span>{'\n'}
    preferredProtocol = <span className="str">"wireguard"</span>,    <span className="cmt">// User's last selected protocol</span>{'\n'}
    platform          = <span className="str">"android"</span>,       <span className="cmt">// Auto-set; override if needed</span>{'\n'}
    preferredCategory = <span className="str">"streaming"</span>     <span className="cmt">// User's saved category preference</span>{'\n'}
){'\n'}
{'\n'}
<span className="cmt">// Discovery calls now automatically include these preferences when no</span>{'\n'}
<span className="cmt">// explicit ServerFilter is provided — avoiding repetition in every ViewModel.</span>{'\n'}
sdk.<span className="fn">getServers</span>()  <span className="cmt">// Automatically uses sdk.userPreferences fields</span>{'\n'}
sdk.<span className="fn">smartConnect</span>() <span className="cmt">// Same</span>{'\n'}
{'\n'}
<span className="cmt">// Reset to defaults</span>{'\n'}
sdk.userPreferences = <span className="type">UserServerPreferences</span>.<span className="fn">default</span>()</code></pre>

        <hr />

        {/* ─── 10. Complete Updated Startup Flow ────────────────────────────── */}
        <h2 id="startup-flow">10. Complete Recommended Startup Flow</h2>
        <p>Here is the full recommended sequence to follow in your app's startup path:</p>
        <div className="sdk-code-header"><span>Kotlin — Application + ViewModel</span></div>
        <pre><code><span className="cmt">// Application.kt — initialize once</span>{'\n'}
<span className="type">FyreWaySDK</span>.<span className="fn">initialize</span> {'{'}{'\n'}
    baseUrl       = <span className="type">BuildConfig</span>.API_BASE_URL{'\n'}
    enableLogging = <span className="type">BuildConfig</span>.DEBUG{'\n'}
{'}'}{'\n'}
{'\n'}
<span className="cmt">// MainViewModel.kt — run on first launch</span>{'\n'}
<span className="kw">class</span> <span className="type">MainViewModel</span> : <span className="type">ViewModel</span>() {'{'}{'\n'}
    <span className="kw">private val</span> sdk = <span className="type">FyreWaySDK</span>.<span className="fn">getInstance</span>(){'\n'}
{'\n'}
    <span className="kw">fun</span> <span className="fn">onAppStart</span>() = viewModelScope.<span className="fn">launch</span> {'{'}{'\n'}
{'\n'}
        <span className="cmt">// Step 1 — Activate device (first launch only)</span>{'\n'}
        <span className="kw">if</span> (!sdk.<span className="fn">isAuthenticated</span>()) {'{'}{'\n'}
            sdk.<span className="fn">activateDevice</span>(appVersion = <span className="type">BuildConfig</span>.VERSION_NAME){'\n'}
        {'}'}{'\n'}
{'\n'}
        <span className="cmt">// Step 2 — Load registry constants (drives picker UI)</span>{'\n'}
        sdk.<span className="fn">getRegistryConstants</span>(){'\n'}
{'\n'}
        <span className="cmt">// Step 3 — Apply user preferences</span>{'\n'}
        sdk.userPreferences = <span className="fn">loadUserPrefsFromStorage</span>(){'\n'}
{'\n'}
        <span className="cmt">// Step 4 — Pre-select optimal server for connection screen</span>{'\n'}
        sdk.<span className="fn">smartConnect</span>({'\n'}
            criteria = <span className="type">SmartConnectCriteria</span>({'\n'}
                tier     = sdk.userPreferences.tier,{'\n'}
                platform = sdk.userPreferences.platform{'\n'}
            ){'\n'}
        ){'\n'}
    {'}'}{'\n'}
{'}'}</code></pre>

        <hr />

        {/* ─── 11. Migration Checklist ──────────────────────────────────────── */}
        <h2 id="migration">11. Migration Checklist</h2>
        <p>Everything below is optional — your existing integration keeps working without any changes. The checklist covers improvements you should adopt to get the best experience from v1.2.0.</p>

        <ul className="sdk-checklist">
          <li>Call <code>sdk.getRegistryConstants()</code> at app startup (fire-and-forget; runs in background automatically)</li>
          <li>Replace hardcoded tier/protocol string arrays in filter picker UI with data from <code>constants.services</code> / <code>constants.categories</code></li>
          <li>Add <code>NoServersAvailableException</code> handler in the <code>VpnResult.Error</code> branch of <code>smartConnect()</code> (was previously a silent null result)</li>
          <li>Add <code>InvalidFilterValueException</code> handler wherever you pass classification filter values</li>
          <li>Use <code>sdk.userPreferences</code> to centralise tier/protocol/platform settings instead of repeating them in every ViewModel</li>
          <li>Use <code>server.isAccessibleForTier(userTier)</code> to dim locked servers in your server list without extra API calls</li>
          <li>Use <code>server.tierBadgeText()</code> and <code>server.supportsWireGuard()</code> for fast UI state</li>
          <li>Pass <code>tier</code> and <code>protocol</code> to <code>getLocationsHierarchy()</code> so the location picker only shows reachable locations</li>
          <li>Use <code>result.data.alternatives</code> from <code>smartConnect()</code> to show backup options without extra calls</li>
          <li>Add <code>consumer-rules.pro</code> rules for new model packages: <code>-keep class com.fyreway.vpn.sdk.model.registry.** {'{'} *; {'}'}</code></li>
        </ul>

        <hr />

        <h2>Full Changelog</h2>
        <table>
          <thead>
            <tr>
              <th>Component</th>
              <th>Change type</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>model/registry/RegistryConstants.kt</code></td>
              <td>New file</td>
              <td><code>AccessTier</code>, <code>ServiceProtocol</code>, <code>Platform</code>, <code>Category</code>, <code>RegistryConstants</code></td>
            </tr>
            <tr>
              <td><code>model/server/ServerModels.kt</code></td>
              <td>Additive</td>
              <td><code>Server</code> gains <code>accessTiers</code>, <code>platforms</code>, <code>categories</code>, <code>features</code></td>
            </tr>
            <tr>
              <td><code>model/server/ServerFeatures.kt</code></td>
              <td>New file</td>
              <td><code>ServerFeatures(wireguard, openvpn)</code></td>
            </tr>
            <tr>
              <td><code>model/server/ServerExtensions.kt</code></td>
              <td>New file</td>
              <td><code>isAccessibleForTier()</code>, <code>tierBadgeText()</code>, <code>supportsWireGuard()</code>, <code>supportsOpenVpn()</code></td>
            </tr>
            <tr>
              <td><code>model/server/ServerEnums.kt</code></td>
              <td>Additive</td>
              <td><code>ServerFilter</code> gains <code>tier</code>, <code>protocol</code>, <code>platform</code>, <code>category</code> + 4 factory methods</td>
            </tr>
            <tr>
              <td><code>model/server/OptimalServerModels.kt</code></td>
              <td>New file</td>
              <td>New response envelope: <code>OptimalServerApiResponse</code>, <code>OptimalServerData</code>, <code>SelectionCriteria</code></td>
            </tr>
            <tr>
              <td><code>model/server/RankingModels.kt</code></td>
              <td>New file</td>
              <td><code>CityRankingResponse</code>, <code>CountryBestResponse</code>, <code>RankedServer</code>, <code>RankingMetadata</code></td>
            </tr>
            <tr>
              <td><code>model/smartconnect/SmartConnectModels.kt</code></td>
              <td>Additive</td>
              <td><code>SmartConnectCriteria</code> gains 4 fields; <code>SmartConnectResult</code> gains <code>alternatives</code></td>
            </tr>
            <tr>
              <td><code>model/preferences/UserServerPreferences.kt</code></td>
              <td>New file</td>
              <td>User tier / protocol / platform / category preferences</td>
            </tr>
            <tr>
              <td><code>api/RegistryApi.kt</code></td>
              <td>New file</td>
              <td>Public interface: <code>getRegistryConstants(forceRefresh)</code></td>
            </tr>
            <tr>
              <td><code>api/ServerApi.kt</code></td>
              <td>Additive</td>
              <td>New: <code>getRankedServersInCity()</code>, <code>getBestServersInCountry()</code>, <code>getRecommendedServers()</code></td>
            </tr>
            <tr>
              <td><code>api/SmartConnectApi.kt</code></td>
              <td>Additive</td>
              <td>New: <code>smartConnectForCategory()</code></td>
            </tr>
            <tr>
              <td><code>api/LocationApi.kt</code></td>
              <td>Additive</td>
              <td>Optional <code>tier</code>, <code>protocol</code> params on hierarchy / countries / cities</td>
            </tr>
            <tr>
              <td><code>exception/FyreWayException.kt</code></td>
              <td>Additive</td>
              <td>New: <code>InvalidFilterValueException(paramName, invalidValue)</code></td>
            </tr>
            <tr>
              <td><code>internal/network/ApiService.kt</code></td>
              <td>Additive</td>
              <td>4 filter params on 6 endpoints; 3 new endpoint definitions; rewritten <code>getOptimalServer()</code></td>
            </tr>
            <tr>
              <td><code>internal/smartconnect/SmartConnectEngine.kt</code></td>
              <td>Enhanced</td>
              <td>Offline engine now respects <code>tier</code>, <code>protocol</code>, <code>platform</code>, <code>category</code> filters</td>
            </tr>
            <tr>
              <td><code>internal/repository/RegistryConstantsRepository.kt</code></td>
              <td>New file</td>
              <td>24 h TTL cache + automatic refresh on 400</td>
            </tr>
            <tr>
              <td><code>FyreWaySDK.kt</code></td>
              <td>Additive</td>
              <td>New: <code>getRegistryConstants()</code>, <code>getRankedServersInCity()</code>, <code>getBestServersInCountry()</code>, <code>smartConnectForCategory()</code>, <code>getRecommendedServers()</code>, <code>userPreferences</code> property</td>
            </tr>
          </tbody>
        </table>

        <PageNav
          prev={{ href: '/sdk/docs/v2', title: 'Overview' }}
          next={{ href: '/sdk/docs/v2/getting-started', title: 'Getting Started' }}
        />
      </SDKDocsLayout>
    </>
  );
}

