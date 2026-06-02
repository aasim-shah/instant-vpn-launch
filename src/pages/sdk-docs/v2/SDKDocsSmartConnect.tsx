import { SDKDocsLayout, PageNav, MermaidDiagram } from '@/components/SDKDocsLayout';
import { SEO } from '@/components/SEO';

export default function SDKDocsSmartConnect() {
  const howItWorksChart = `
flowchart TD
    Start["smartConnect(criteria, strategy)"]
    Fetch["Fetch available servers"]
    Filter["Apply filters"]
    Score["Score each server"]
    Select["Select highest-scoring server"]
    Result["Return SmartConnectResult"]
    Start --> Fetch --> Filter --> Score --> Select --> Result
  `;

  const decisionGuideChart = `
flowchart TD
    Q1{What's the use case?}
    Q1 -- General --> B["smartConnect()"]
    Q1 -- Streaming --> S["smartConnectForCategory('streaming')"]
    Q1 -- P2P --> P["smartConnectForCategory('p2p')"]
    Q1 -- Gaming --> L["smartConnectForCategory('gaming') + LOWEST_LATENCY"]
    Q1 -- User picked country --> C["criteria = SmartConnectCriteria(country, tier)"]
    Q1 -- Simple 1-tap --> QC["quickConnect.selectRecommended()"]
  `;

  return (
    <>
      <SEO 
        title="Smart Connect — FyreWay SDK Docs"
        description="One-call optimal VPN server selection with configurable strategies."
        canonical="/sdk/docs/v2/smart-connect"
      />
      <SDKDocsLayout title="Smart Connect">
        <h1>Smart Connect</h1>
        <p className="sdk-page-description">
          One-call API that selects the optimal VPN server based on configurable strategies. No manual server selection logic needed.
        </p>

        <h2>How It Works</h2>
        <MermaidDiagram chart={howItWorksChart} />

        <hr />

        <h2>Basic Usage</h2>
        <pre><code><span className="kw">when</span> (<span className="kw">val</span> result = sdk.<span className="fn">smartConnect</span>()) {'{'}{'\n'}
    <span className="kw">is</span> <span className="type">VpnResult.Success</span> -&gt; {'{'}{'\n'}
        <span className="kw">val</span> server = result.data.server      <span className="cmt">// The selected Server</span>{'\n'}
        <span className="kw">val</span> reason = result.data.reason      <span className="cmt">// "Balanced: best overall score"</span>{'\n'}
        <span className="kw">val</span> score = result.data.score        <span className="cmt">// 0.0 – 1.0</span>{'\n'}
    {'}'}{'\n'}
    <span className="kw">is</span> <span className="type">VpnResult.Error</span> -&gt; {'{'} <span className="cmt">/* Handle error */</span> {'}'}{'\n'}
{'}'}</code></pre>

        <hr />

        <h2>Selection Strategies</h2>
        <table>
          <thead>
            <tr>
              <th>Strategy</th>
              <th>Best for</th>
              <th>How it scores</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>BALANCED</code></td>
              <td>General use (default)</td>
              <td>Weighted mix of load, latency, and capacity</td>
            </tr>
            <tr>
              <td><code>LOWEST_LOAD</code></td>
              <td>Maximum bandwidth</td>
              <td>Fewest active connections</td>
            </tr>
            <tr>
              <td><code>LOWEST_LATENCY</code></td>
              <td>Gaming, real-time</td>
              <td>Lowest ping</td>
            </tr>
            <tr>
              <td><code>HIGHEST_CAPACITY</code></td>
              <td>Peak hours</td>
              <td>Most available slots</td>
            </tr>
            <tr>
              <td><code>CLOSEST_LOCATION</code></td>
              <td>Lowest latency (geo)</td>
              <td>Geographic proximity</td>
            </tr>
          </tbody>
        </table>

        <pre><code><span className="cmt">// For gaming</span>{'\n'}
sdk.<span className="fn">smartConnect</span>(strategy = <span className="type">SelectionStrategy</span>.LOWEST_LATENCY){'\n'}
{'\n'}
<span className="cmt">// During peak hours</span>{'\n'}
sdk.<span className="fn">smartConnect</span>(strategy = <span className="type">SelectionStrategy</span>.HIGHEST_CAPACITY){'\n'}
{'\n'}
<span className="cmt">// For downloads</span>{'\n'}
sdk.<span className="fn">smartConnect</span>(strategy = <span className="type">SelectionStrategy</span>.LOWEST_LOAD)</code></pre>

        <hr />

        <h2>Filtering with Criteria</h2>
        <pre><code><span className="kw">val</span> result = sdk.<span className="fn">smartConnect</span>({'\n'}
    criteria = <span className="type">SmartConnectCriteria</span>({'\n'}
        <span className="cmt">// Geographic filters</span>{'\n'}
        preferredCountry = <span className="str">"US"</span>,{'\n'}
        preferredCity    = <span className="str">"New York"</span>,{'\n'}
        preferredRegion  = <span className="str">"Virginia"</span>,  <span className="cmt">// physical province, not cloud code</span>{'\n'}
        maxLatency       = <span className="num">100</span>,{'\n'}
        minCapacity      = <span className="num">20</span>,{'\n'}
{'\n'}
        <span className="cmt">// Classification filters</span>{'\n'}
        tier              = <span className="str">"premium"</span>,{'\n'}
        preferredProtocol = <span className="str">"wireguard"</span>,{'\n'}
        platform          = <span className="str">"android"</span>,{'\n'}
        preferredCategory = <span className="str">"streaming"</span>{'\n'}
    ),{'\n'}
    strategy = <span className="type">SelectionStrategy</span>.BALANCED{'\n'}
)</code></pre>

        <p>
          All criteria fields are optional — combine freely. Valid values for <code>tier</code>, <code>preferredProtocol</code>, <code>platform</code>, and <code>preferredCategory</code> come from <code>sdk.getRegistryConstants()</code>.
        </p>

        <hr />

        <h2>Purpose-Built Methods</h2>
        <pre><code><span className="cmt">// Best server near user's location</span>{'\n'}
sdk.<span className="fn">smartConnectByLocation</span>(strategy = <span className="type">SelectionStrategy</span>.BALANCED){'\n'}
{'\n'}
<span className="cmt">// Optimized for streaming</span>{'\n'}
sdk.<span className="fn">smartConnectForStreaming</span>(country = <span className="str">"US"</span>){'\n'}
{'\n'}
<span className="cmt">// Optimized for P2P</span>{'\n'}
sdk.<span className="fn">smartConnectForP2P</span>(country = <span className="str">"NL"</span>){'\n'}
{'\n'}
<span className="cmt">// By physical region</span>{'\n'}
sdk.<span className="fn">smartConnectByRegion</span>(<span className="str">"Virginia"</span>){'\n'}
{'\n'}
<span className="cmt">// By use-case category — valid IDs come from getRegistryConstants()</span>{'\n'}
sdk.<span className="fn">smartConnectForCategory</span>(category = <span className="str">"streaming"</span>){'\n'}
sdk.<span className="fn">smartConnectForCategory</span>(category = <span className="str">"gaming"</span>,   tier = <span className="str">"free"</span>){'\n'}
sdk.<span className="fn">smartConnectForCategory</span>(category = <span className="str">"p2p"</span>,      tier = <span className="str">"premium"</span>, country = <span className="str">"NL"</span>)</code></pre>

        <blockquote>
          <strong>Note:</strong> The <code>region</code> parameter is a physical province/state name (e.g., "Virginia", "Punjab"), not a cloud region code.
        </blockquote>

        <hr />

        <h2>Decision Guide</h2>
        <MermaidDiagram chart={decisionGuideChart} />

        <hr />

        <h2>SmartConnectResult</h2>
        <pre><code><span className="kw">data class</span> <span className="type">SmartConnectResult</span>({'\n'}
    <span className="kw">val</span> server: <span className="type">Server</span>,                      <span className="cmt">// The selected server (QoS-scored by backend)</span>{'\n'}
    <span className="kw">val</span> score: <span className="type">Float</span>,                        <span className="cmt">// 0.0 – 1.0</span>{'\n'}
    <span className="kw">val</span> reason: <span className="type">String</span>,                      <span className="cmt">// Human-readable explanation</span>{'\n'}
    <span className="kw">val</span> strategy: <span className="type">SelectionStrategy</span>,{'\n'}
    <span className="kw">val</span> criteria: <span className="type">SmartConnectCriteria?</span>,{'\n'}
    <span className="kw">val</span> alternatives: <span className="type">List&lt;Server&gt;</span>           <span className="cmt">// Next-best options (from backend or empty on offline path)</span>{'\n'}
)</code></pre>

        <h3>Using Alternatives</h3>
        <pre><code><span className="kw">val</span> result = sdk.<span className="fn">smartConnect</span>(){'\n'}
{'\n'}
<span className="kw">if</span> (result <span className="kw">is</span> <span className="type">VpnResult.Success</span>) {'{'}{'\n'}
    <span className="kw">val</span> primary  = result.data.server{'\n'}
    <span className="kw">val</span> fallback  = result.data.alternatives.<span className="fn">getOrNull</span>(<span className="num">0</span>){'\n'}
    <span className="kw">val</span> fallback2 = result.data.alternatives.<span className="fn">getOrNull</span>(<span className="num">1</span>){'\n'}
{'\n'}
    <span className="cmt">// Show top 3 options in your connection UI without extra calls</span>{'\n'}
    <span className="type">displayServerOptions</span>(<span className="fn">listOf</span>(primary) + result.data.alternatives.<span className="fn">take</span>(<span className="num">2</span>)){'\n'}
{'\n'}
    <span className="cmt">// Fallback if primary fails to connect</span>{'\n'}
    <span className="kw">try</span> {'{'}{'\n'}
        <span className="fn">connectTo</span>(primary){'\n'}
    {'}'} <span className="kw">catch</span> (e: <span className="type">Exception</span>) {'{'}{'\n'}
        fallback?.<span className="fn">let</span> {'{'} <span className="fn">connectTo</span>(it) {'}'}{'\n'}
    {'}'}{'\n'}
{'}'}</code></pre>

        <hr />

        <h2>QuickConnect Provider</h2>
        <p>For simple one-tap connection experiences:</p>
        <pre><code><span className="kw">val</span> quickConnect = sdk.<span className="fn">getQuickConnectProvider</span>(){'\n'}
{'\n'}
<span className="cmt">// Get the recommended server for display</span>{'\n'}
<span className="kw">val</span> recommended = quickConnect.<span className="fn">getRecommendedServer</span>(){'\n'}
{'\n'}
<span className="cmt">// One-tap connect</span>{'\n'}
quickConnect.<span className="fn">connect</span>(){'\n'}
{'\n'}
<span className="cmt">// Get display info</span>{'\n'}
<span className="kw">val</span> display = quickConnect.<span className="fn">getDisplayInfo</span>(){'\n'}
<span className="fn">println</span>(<span className="str">"${'{'}display.flagEmoji{'}'} ${'{'}display.locationText{'}'}"</span>)  <span className="cmt">// "🇺🇸 New York, US"</span></code></pre>

        <PageNav 
          prev={{ href: '/sdk/docs/v2/connection-lifecycle', title: 'Connection Lifecycle' }}
          next={{ href: '/sdk/docs/v2/error-handling', title: 'Error Handling' }} 
        />
      </SDKDocsLayout>
    </>
  );
}
