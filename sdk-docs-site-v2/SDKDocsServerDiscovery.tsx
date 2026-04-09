import { SDKDocsLayout, PageNav, MermaidDiagram } from '@/components/SDKDocsLayout';
import { SEO } from '@/components/SEO';

export default function SDKDocsServerDiscovery() {
  const locationHierarchyChart = `
graph TD
    World["🌍 All Servers"]
    US["🇺🇸 United States"]
    DE["🇩🇪 Germany"]
    PK["🇵🇰 Pakistan"]
    VA["Virginia"]
    CA_R["California"]
    PJ["Punjab"]
    HE["Hessen"]
    NYC["New York"]
    LA["Los Angeles"]
    LHR["Lahore"]
    FFM["Frankfurt"]
    World --> US & DE & PK
    US --> VA --> NYC
    US --> CA_R --> LA
    PK --> PJ --> LHR
    DE --> HE --> FFM
  `;

  return (
    <>
      <SEO 
        title="Server Discovery — FyreWay SDK Docs"
        description="Browse, filter, and search VPN servers by country, city, region, or protocol with the FyreWay VPN SDK."
        canonical="/sdk/docs/server-discovery"
      />
      <SDKDocsLayout title="Server Discovery">
        <h1>Server Discovery</h1>
        <p className="sdk-page-description">
          The SDK provides a rich set of APIs to browse, filter, and search VPN servers. All data is cached by default — you control when to use fresh data.
        </p>

        <h2>Location Model</h2>
        <p>
          Servers are organized in a geographic hierarchy. The <code>region</code> field represents a <strong>physical province or state</strong> (e.g., "Punjab", "Virginia", "Île-de-France"), not a cloud region code.
        </p>

        <MermaidDiagram chart={locationHierarchyChart} />

        <hr />

        <h2>Fetching Servers</h2>
        <h3>Basic: Get All Servers</h3>
        <pre><code><span className="kw">when</span> (<span className="kw">val</span> result = sdk.<span className="fn">getServers</span>()) {'{'}{'\n'}
    <span className="kw">is</span> <span className="type">VpnResult.Success</span> -&gt; {'{'}{'\n'}
        <span className="kw">val</span> servers = result.data.servers  <span className="cmt">// List&lt;Server&gt;</span>{'\n'}
        <span className="kw">val</span> total = result.data.totalCount{'\n'}
        <span className="kw">val</span> fromCache = result.fromCache{'\n'}
    {'}'}{'\n'}
    <span className="kw">is</span> <span className="type">VpnResult.Error</span> -&gt; {'{'} <span className="cmt">/* Handle error */</span> {'}'}{'\n'}
{'}'}</code></pre>

        <h3>With Format Control</h3>
        <p>The <code>ServerFormat</code> enum controls how much data is returned:</p>
        <table>
          <thead>
            <tr>
              <th>Format</th>
              <th>Use case</th>
              <th>Data included</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>FULL</code></td>
              <td>Server detail view</td>
              <td>All fields: location, capacity, performance, protocols</td>
            </tr>
            <tr>
              <td><code>MINIMAL</code></td>
              <td>Dropdowns, pickers</td>
              <td>ID, name, location only</td>
            </tr>
            <tr>
              <td><code>GROUPED</code></td>
              <td>Grouped lists</td>
              <td>Servers grouped by country or city</td>
            </tr>
            <tr>
              <td><code>HIERARCHY</code></td>
              <td>Nested tree views</td>
              <td>Country → Region → City → Servers</td>
            </tr>
          </tbody>
        </table>

        <pre><code><span className="cmt">// Full details (default)</span>{'\n'}
sdk.<span className="fn">getServers</span>(format = <span className="type">ServerFormat</span>.FULL){'\n'}
{'\n'}
<span className="cmt">// Lightweight for dropdowns</span>{'\n'}
sdk.<span className="fn">getServersMinimal</span>(){'\n'}
{'\n'}
<span className="cmt">// Grouped by country</span>{'\n'}
sdk.<span className="fn">getServersGrouped</span>(groupBy = <span className="type">ServerGroupBy</span>.COUNTRY){'\n'}
{'\n'}
<span className="cmt">// Tree structure for nested pickers</span>{'\n'}
sdk.<span className="fn">getServersHierarchy</span>()</code></pre>

        <h3>With Filters</h3>
        <pre><code><span className="cmt">// By country</span>{'\n'}
sdk.<span className="fn">getServers</span>(filter = <span className="type">ServerFilter</span>.<span className="fn">byCountry</span>(<span className="str">"US"</span>)){'\n'}
{'\n'}
<span className="cmt">// By city</span>{'\n'}
sdk.<span className="fn">getServers</span>(filter = <span className="type">ServerFilter</span>.<span className="fn">byCity</span>(<span className="str">"US"</span>, <span className="str">"New York"</span>)){'\n'}
{'\n'}
<span className="cmt">// By region (physical province/state)</span>{'\n'}
sdk.<span className="fn">getServers</span>(filter = <span className="type">ServerFilter</span>.<span className="fn">byRegion</span>(<span className="str">"Virginia"</span>)){'\n'}
{'\n'}
<span className="cmt">// By access tier</span>{'\n'}
sdk.<span className="fn">getServers</span>(filter = <span className="type">ServerFilter</span>.<span className="fn">byTier</span>(<span className="str">"premium"</span>)){'\n'}
{'\n'}
<span className="cmt">// By protocol</span>{'\n'}
sdk.<span className="fn">getServers</span>(filter = <span className="type">ServerFilter</span>.<span className="fn">byProtocol</span>(<span className="str">"wireguard"</span>)){'\n'}
{'\n'}
<span className="cmt">// By use-case category (streaming, gaming, p2p, general)</span>{'\n'}
sdk.<span className="fn">getServers</span>(filter = <span className="type">ServerFilter</span>.<span className="fn">byCategory</span>(<span className="str">"streaming"</span>)){'\n'}
{'\n'}
<span className="cmt">// Combine multiple filters — all fields are optional</span>{'\n'}
sdk.<span className="fn">getServers</span>(filter = <span className="type">ServerFilter</span>({'\n'}
    country  = <span className="str">"US"</span>,{'\n'}
    tier     = <span className="str">"premium"</span>,{'\n'}
    protocol = <span className="str">"wireguard"</span>,{'\n'}
    platform = <span className="str">"android"</span>,{'\n'}
    category = <span className="str">"streaming"</span>,{'\n'}
    status   = <span className="str">"active"</span>{'\n'}
))</code></pre>

        <blockquote>
          <strong>Filter values:</strong> Valid values for <code>tier</code>, <code>protocol</code>, <code>platform</code>, and <code>category</code> are fetched at startup via <code>sdk.getRegistryConstants()</code> — do not hardcode them. Using an invalid value triggers an automatic retry; a persistent mismatch surfaces as <code>InvalidFilterValueException</code>.
        </blockquote>

        <hr />

        <h2>Registry Constants</h2>
        <p>
          The SDK fetches a list of all valid filter values from <code>GET /api/v2/server-registry/constants</code> on startup and caches them for 24 hours. Use these to populate your filter picker UI instead of hardcoding strings.
        </p>
        <pre><code><span className="kw">when</span> (<span className="kw">val</span> result = sdk.<span className="fn">getRegistryConstants</span>()) {'{'}{'\n'}
    <span className="kw">is</span> <span className="type">VpnResult.Success</span> -&gt; {'{'}{'\n'}
        <span className="kw">val</span> constants = result.data{'\n'}
        <span className="cmt">// Drive picker UI — IDs are the strings to pass as filter values</span>{'\n'}
        constants.accessTiers.<span className="fn">forEach</span> {'{'} tier -&gt; <span className="fn">println</span>(<span className="str">"${'{'}tier.id{'}'}: ${'{'}tier.name{'}'}"</span>) {'}'}{'\n'}
        constants.services.<span className="fn">forEach</span>   {'{'} svc -&gt; <span className="fn">println</span>(<span className="str">"${'{'}svc.id{'}'}: ${'{'}svc.name{'}'}"</span>) {'}'}{'\n'}
        constants.categories.<span className="fn">forEach</span>{'{'} cat -&gt; <span className="fn">println</span>(<span className="str">"${'{'}cat.id{'}'}: ${'{'}cat.name{'}'}"</span>) {'}'}{'\n'}
    {'}'}{'\n'}
    <span className="kw">is</span> <span className="type">VpnResult.Error</span> -&gt; {'{'} <span className="cmt">/* Degrade gracefully — discovery still works without filters */</span> {'}'}{'\n'}
{'}'}</code></pre>

        <hr />

        <h2>Convenience Methods</h2>
        <pre><code><span className="cmt">// Servers in a country</span>{'\n'}
<span className="kw">val</span> usServers = sdk.<span className="fn">getServersByCountry</span>(<span className="str">"US"</span>){'\n'}
{'\n'}
<span className="cmt">// Servers in a city</span>{'\n'}
<span className="kw">val</span> nycServers = sdk.<span className="fn">getServersByCity</span>(<span className="str">"US"</span>, <span className="str">"New York"</span>){'\n'}
{'\n'}
<span className="cmt">// Servers supporting a protocol</span>{'\n'}
<span className="kw">val</span> wgServers = sdk.<span className="fn">getServersByProtocol</span>(<span className="type">VpnProtocol</span>.WIREGUARD){'\n'}
<span className="kw">val</span> ovpnServers = sdk.<span className="fn">getServersByProtocol</span>(<span className="type">VpnProtocol</span>.OPENVPN)</code></pre>

        <hr />

        <h2>Location APIs</h2>
        <h3>Country List</h3>
        <pre><code><span className="kw">when</span> (<span className="kw">val</span> result = sdk.<span className="fn">getCountries</span>()) {'{'}{'\n'}
    <span className="kw">is</span> <span className="type">VpnResult.Success</span> -&gt; {'{'}{'\n'}
        result.data.<span className="fn">forEach</span> {'{'} country -&gt;{'\n'}
            <span className="fn">println</span>(<span className="str">"${'{'}country.flagEmoji{'}'} ${'{'}country.name{'}'} (${'{'}country.code{'}'}) — ${'{'}country.serverCount{'}'} servers"</span>){'\n'}
        {'}'}{'\n'}
    {'}'}{'\n'}
    <span className="kw">is</span> <span className="type">VpnResult.Error</span> -&gt; {'{'} <span className="cmt">/* Handle error */</span> {'}'}{'\n'}
{'}'}</code></pre>

        <h3>Cities in a Country</h3>
        <pre><code><span className="kw">when</span> (<span className="kw">val</span> result = sdk.<span className="fn">getCities</span>(<span className="str">"US"</span>)) {'{'}{'\n'}
    <span className="kw">is</span> <span className="type">VpnResult.Success</span> -&gt; {'{'}{'\n'}
        result.data.<span className="fn">forEach</span> {'{'} city -&gt;{'\n'}
            <span className="fn">println</span>(<span className="str">"${'{'}city.name{'}'} — ${'{'}city.serverCount{'}'} servers (${'{'}city.region{'}'})"</span>){'\n'}
        {'}'}{'\n'}
    {'}'}{'\n'}
    <span className="kw">is</span> <span className="type">VpnResult.Error</span> -&gt; {'{'} <span className="cmt">/* Handle error */</span> {'}'}{'\n'}
{'}'}</code></pre>

        <h3>Full Location Hierarchy</h3>
        <pre><code><span className="kw">when</span> (<span className="kw">val</span> result = sdk.<span className="fn">getLocationHierarchy</span>()) {'{'}{'\n'}
    <span className="kw">is</span> <span className="type">VpnResult.Success</span> -&gt; {'{'}{'\n'}
        result.data.countries.<span className="fn">forEach</span> {'{'} country -&gt;{'\n'}
            <span className="fn">println</span>(<span className="str">"${'{'}country.flagEmoji{'}'} ${'{'}country.name{'}'}"</span>){'\n'}
            country.regions.<span className="fn">forEach</span> {'{'} region -&gt;{'\n'}
                <span className="fn">println</span>(<span className="str">"  📍 ${'{'}region.name{'}'}"</span>){'\n'}
                region.cities.<span className="fn">forEach</span> {'{'} city -&gt;{'\n'}
                    <span className="fn">println</span>(<span className="str">"    🏙️ ${'{'}city.name{'}'} (${'{'}city.serverCount{'}'} servers)"</span>){'\n'}
                {'}'}{'\n'}
            {'}'}{'\n'}
        {'}'}{'\n'}
    {'}'}{'\n'}
    <span className="kw">is</span> <span className="type">VpnResult.Error</span> -&gt; {'{'} <span className="cmt">/* Handle error */</span> {'}'}{'\n'}
{'}'}</code></pre>

        <h3>Optimal Server (Backend Load-Balanced)</h3>
        <pre><code><span className="cmt">// Best server globally (uses QoS scoring — latency, load, heartbeat liveness)</span>{'\n'}
<span className="kw">val</span> best = sdk.<span className="fn">getOptimalServer</span>(){'\n'}
{'\n'}
<span className="cmt">// Best server for a specific tier and protocol</span>{'\n'}
<span className="kw">val</span> bestFree = sdk.<span className="fn">getOptimalServer</span>({'\n'}
    tier     = <span className="str">"free"</span>,{'\n'}
    protocol = <span className="str">"wireguard"</span>,{'\n'}
    platform = <span className="str">"android"</span>{'\n'}
){'\n'}
{'\n'}
<span className="cmt">// Best server for streaming in the US</span>{'\n'}
<span className="kw">val</span> bestStream = sdk.<span className="fn">getOptimalServer</span>({'\n'}
    tier     = <span className="str">"premium"</span>,{'\n'}
    category = <span className="str">"streaming"</span>,{'\n'}
    region   = <span className="str">"Virginia"</span>{'\n'}
){'\n'}
{'\n'}
<span className="cmt">// Handle 503 — returned when no servers match the filters</span>{'\n'}
<span className="kw">when</span> (<span className="kw">val</span> result = sdk.<span className="fn">getOptimalServer</span>(tier = <span className="str">"premium"</span>, category = <span className="str">"gaming"</span>)) {'{'}{'\n'}
    <span className="kw">is</span> <span className="type">VpnResult.Success</span> -&gt; {'{'}{'\n'}
        <span className="kw">val</span> server       = result.data.server{'\n'}
        <span className="kw">val</span> alternatives = result.data.alternatives  <span className="cmt">// Next-best options included</span>{'\n'}
    {'}'}{'\n'}
    <span className="kw">is</span> <span className="type">VpnResult.Error</span> -&gt; {'{'}{'\n'}
        <span className="kw">if</span> (result.exception <span className="kw">is</span> <span className="type">NoServersAvailableException</span>) {'{'}{'\n'}
            <span className="fn">showMessage</span>(<span className="str">"No servers match your criteria — try a broader filter."</span>){'\n'}
        {'}'}{'\n'}
    {'}'}{'\n'}
{'}'}</code></pre>

        <hr />

        <h2>Ranked Server Lists</h2>
        <p>
          Use these endpoints when you want a sorted, scored list for a specific city or country rather than a single "best" pick. Ideal for building custom server selection UIs.
        </p>

        <h3>Ranked Servers in a City</h3>
        <pre><code><span className="kw">when</span> (<span className="kw">val</span> result = sdk.<span className="fn">getRankedServersInCity</span>({'\n'}
    country        = <span className="str">"US"</span>,{'\n'}
    city           = <span className="str">"New York"</span>,{'\n'}
    filter         = <span className="type">ServerFilter</span>(tier = <span className="str">"free"</span>, protocol = <span className="str">"wireguard"</span>),{'\n'}
    limit          = <span className="num">10</span>,{'\n'}
    includeMetrics = <span className="kw">true</span>{'\n'}
)) {'{'}{'\n'}
    <span className="kw">is</span> <span className="type">VpnResult.Success</span> -&gt; {'{'}{'\n'}
        result.data.servers.<span className="fn">forEachIndexed</span> {'{'} idx, server -&gt;{'\n'}
            <span className="fn">println</span>(<span className="str">"#${'{'}idx + 1{'}'} ${'{'}server.name{'}'} (score ${'{'}server.score{'}'}, load ${'{'}server.performance?.load{'}'})"</span>){'\n'}
        {'}'}{'\n'}
    {'}'}{'\n'}
    <span className="kw">is</span> <span className="type">VpnResult.Error</span> -&gt; {'{'} <span className="cmt">/* Handle error */</span> {'}'}{'\n'}
{'}'}</code></pre>

        <h3>Best Servers per City in a Country</h3>
        <pre><code><span className="kw">when</span> (<span className="kw">val</span> result = sdk.<span className="fn">getBestServersInCountry</span>({'\n'}
    country = <span className="str">"DE"</span>,{'\n'}
    filter  = <span className="type">ServerFilter</span>(tier = <span className="str">"free"</span>),{'\n'}
    limit   = <span className="num">3</span>{'\n'}
)) {'{'}{'\n'}
    <span className="kw">is</span> <span className="type">VpnResult.Success</span> -&gt; {'{'}{'\n'}
        result.data.cities.<span className="fn">forEach</span> {'{'} cityResult -&gt;{'\n'}
            <span className="fn">println</span>(<span className="str">"${'{'}cityResult.city{'}'} → best server: ${'{'}cityResult.topServer?.name{'}'}"</span>){'\n'}
        {'}'}{'\n'}
    {'}'}{'\n'}
    <span className="kw">is</span> <span className="type">VpnResult.Error</span> -&gt; {'{'} <span className="cmt">/* Handle error */</span> {'}'}{'\n'}
{'}'}</code></pre>

        <h3>Tier-Aware Location Hierarchy</h3>
        <p>Pass <code>tier</code> and <code>protocol</code> to any location API to receive a hierarchy that only contains locations with at least one matching server — perfect for building a location picker that never shows empty entries:</p>
        <pre><code><span className="cmt">// Hierarchy with only free+wireguard locations</span>{'\n'}
sdk.<span className="fn">getLocationsHierarchy</span>(tier = <span className="str">"free"</span>, protocol = <span className="str">"wireguard"</span>){'\n'}
{'\n'}
<span className="cmt">// Countries with at least one premium server</span>{'\n'}
sdk.<span className="fn">getCountries</span>(tier = <span className="str">"premium"</span>){'\n'}
{'\n'}
<span className="cmt">// Cities in US with streaming servers</span>{'\n'}
sdk.<span className="fn">getCities</span>(country = <span className="str">"US"</span>, tier = <span className="str">"free"</span>)  <span className="cmt">// combine with category filter via ServerFilter</span></code></pre>

        <hr />

        <h2>The Server Object</h2>
        <pre><code><span className="kw">data class</span> <span className="type">Server</span>({'\n'}
    <span className="kw">val</span> serverId: <span className="type">String</span>,               <span className="cmt">// "wg-us-east-01"</span>{'\n'}
    <span className="kw">val</span> name: <span className="type">String</span>,                   <span className="cmt">// "US East 01"</span>{'\n'}
    <span className="kw">val</span> location: <span className="type">ServerLocation</span>,       <span className="cmt">// Country, city, region (province), coordinates</span>{'\n'}
    <span className="kw">val</span> capacity: <span className="type">ServerCapacity?</span>,      <span className="cmt">// Utilization, available slots</span>{'\n'}
    <span className="kw">val</span> performance: <span className="type">ServerPerformance?</span>,{'\n'}
    <span className="kw">val</span> tier: <span className="type">String?</span>,                  <span className="cmt">// "free" | "premium" — lowest tier (kept for compatibility)</span>{'\n'}
    <span className="kw">val</span> protocols: <span className="type">List&lt;String&gt;?</span>,      <span className="cmt">// ["wireguard", "openvpn"] — kept for compatibility</span>{'\n'}
    <span className="kw">val</span> status: <span className="type">String?</span>,               <span className="cmt">// "active", "maintenance", "offline"</span>{'\n'}
{'\n'}
    <span className="cmt">// Classification arrays — use these for filtering and UI display</span>{'\n'}
    <span className="kw">val</span> accessTiers: <span className="type">List&lt;String&gt;</span>,      <span className="cmt">// ["free", "premium"] — all accessible tiers</span>{'\n'}
    <span className="kw">val</span> platforms: <span className="type">List&lt;String&gt;</span>,        <span className="cmt">// ["android", "ios", "windows", "macos", "linux"]</span>{'\n'}
    <span className="kw">val</span> categories: <span className="type">List&lt;String&gt;</span>,       <span className="cmt">// ["general", "streaming", "gaming"]</span>{'\n'}
    <span className="kw">val</span> features: <span className="type">ServerFeatures?</span>        <span className="cmt">// Boolean capability map</span>{'\n'}
){'\n'}
{'\n'}
<span className="kw">data class</span> <span className="type">ServerFeatures</span>({'\n'}
    <span className="kw">val</span> wireguard: <span className="type">Boolean</span> = <span className="kw">false</span>,{'\n'}
    <span className="kw">val</span> openvpn: <span className="type">Boolean</span> = <span className="kw">false</span>{'\n'}
)</code></pre>

        <p><strong>Protocol and capability checks:</strong></p>
        <pre><code><span className="cmt">// Protocol support</span>{'\n'}
<span className="kw">if</span> (server.<span className="fn">supportsProtocol</span>(<span className="type">VpnProtocol</span>.OPENVPN)) {'{'}{'\n'}
    <span className="cmt">// This server supports OpenVPN</span>{'\n'}
{'}'}{'\n'}
<span className="kw">val</span> protocols: <span className="type">List&lt;VpnProtocol&gt;</span> = server.<span className="fn">getSupportedProtocols</span>(){'\n'}
{'\n'}
<span className="cmt">// Feature helpers (from new ServerExtensions)</span>{'\n'}
server.<span className="fn">supportsWireGuard</span>()           <span className="cmt">// features?.wireguard == true</span>{'\n'}
server.<span className="fn">supportsOpenVpn</span>()             <span className="cmt">// features?.openvpn == true</span>{'\n'}
{'\n'}
<span className="cmt">// Tier access — mirrors backend canAccessServer() logic</span>{'\n'}
server.<span className="fn">isAccessibleForTier</span>(<span className="str">"free"</span>)    <span className="cmt">// true for free servers, false for premium-only</span>{'\n'}
server.<span className="fn">isAccessibleForTier</span>(<span className="str">"premium"</span>) <span className="cmt">// true for any server (premium sees everything)</span>{'\n'}
{'\n'}
<span className="cmt">// Badge text for UI</span>{'\n'}
<span className="kw">val</span> badge = server.<span className="fn">tierBadgeText</span>()  <span className="cmt">// "Free" | "Premium" | "Business" | "Dedicated"</span></code></pre>

        <hr />

        <h2>Caching</h2>
        <table>
          <thead>
            <tr>
              <th>Policy</th>
              <th>Behavior</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>CACHE_FIRST</code></td>
              <td>Return cached data if available; fetch from network only if cache is empty</td>
            </tr>
            <tr>
              <td><code>NETWORK_FIRST</code></td>
              <td>Always try network first; fall back to cache on failure</td>
            </tr>
            <tr>
              <td><code>CACHE_ONLY</code></td>
              <td>Only use cache — fail if not cached</td>
            </tr>
            <tr>
              <td><code>NETWORK_ONLY</code></td>
              <td>Always use network — never cache</td>
            </tr>
          </tbody>
        </table>
        <pre><code><span className="cmt">// Use cache (default)</span>{'\n'}
sdk.<span className="fn">getServers</span>(useCache = <span className="kw">true</span>){'\n'}
{'\n'}
<span className="cmt">// Force fresh data</span>{'\n'}
sdk.<span className="fn">getServers</span>(useCache = <span className="kw">false</span>){'\n'}
{'\n'}
<span className="cmt">// Clear all cached data</span>{'\n'}
sdk.<span className="fn">clearCache</span>()</code></pre>

        <PageNav 
          prev={{ href: '/sdk/docs/getting-started', title: 'Getting Started' }}
          next={{ href: '/sdk/docs/connection-lifecycle', title: 'Connection Lifecycle' }} 
        />
      </SDKDocsLayout>
    </>
  );
}
