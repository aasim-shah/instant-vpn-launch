import { SDKDocsLayout, PageNav, MermaidDiagram } from '@/components/SDKDocsLayout';
import { SEO } from '@/components/SEO';

export default function SDKDocsUIUtilities() {
  const providerArchitectureChart = `
graph LR
    subgraph Providers
        SLP["ServerListProvider"]
        LPP["LocationPickerProvider"]
        QC["QuickConnect"]
    end
    subgraph SDK["FyreWayClient"]
        ServerAPI["Server API"]
        LocationAPI["Location API"]
        SmartAPI["Smart Connect API"]
    end
    subgraph UI["Your UI"]
        List["Server List"]
        Picker["Location Picker"]
        Card["Quick Connect Card"]
    end
    ServerAPI --> SLP
    LocationAPI --> LPP
    SmartAPI --> QC
    SLP --> List
    LPP --> Picker
    QC --> Card
  `;

  return (
    <>
      <SEO 
        title="UI Utilities — FyreWay SDK Docs"
        description="Pre-formatted display models, server list providers, location pickers, and formatting utilities."
        canonical="/sdk/docs/ui-utilities"
      />
      <SDKDocsLayout title="UI Utilities">
        <h1>UI Utilities</h1>
        <p className="sdk-page-description">
          Pre-formatted display models, data providers, and formatters for building server lists, location pickers, and connection UIs rapidly.
        </p>

        <h2>Provider Architecture</h2>
        <MermaidDiagram chart={providerArchitectureChart} />

        <h3>Dual API Pattern</h3>
        <table>
          <thead>
            <tr>
              <th>Style</th>
              <th>Return type</th>
              <th>Use when</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Simple</strong></td>
              <td><code>T?</code> (null on error)</td>
              <td>Quick UIs where you just want data or nothing</td>
            </tr>
            <tr>
              <td><strong>Advanced</strong></td>
              <td><code>VpnResult&lt;T&gt;</code></td>
              <td>You need to handle and display specific errors</td>
            </tr>
          </tbody>
        </table>

        <hr />

        <h2>ServerListProvider</h2>
        <pre><code><span className="cmt">// All servers, sorted by recommendation score</span>{'\n'}
<span className="kw">val</span> servers = serverListProvider.<span className="fn">getServersForDisplay</span>(){'\n'}
{'\n'}
<span className="cmt">// Servers in a specific country</span>{'\n'}
<span className="kw">val</span> usServers = serverListProvider.<span className="fn">getCountryServers</span>(<span className="str">"US"</span>){'\n'}
{'\n'}
<span className="cmt">// Best single server</span>{'\n'}
<span className="kw">val</span> best = serverListProvider.<span className="fn">getBestServer</span>(){'\n'}
{'\n'}
<span className="cmt">// Top 5 fastest (by latency)</span>{'\n'}
<span className="kw">val</span> fastest = serverListProvider.<span className="fn">getFastestServers</span>(limit = <span className="num">5</span>)</code></pre>

        <h3>The ServerDisplayItem</h3>
        <p>Every field is ready to render — no formatting needed:</p>
        <pre><code><span className="kw">data class</span> <span className="type">ServerDisplayItem</span>({'\n'}
    <span className="kw">val</span> serverId: <span className="type">String</span>,{'\n'}
    <span className="kw">val</span> name: <span className="type">String</span>,               <span className="cmt">// "US East 01"</span>{'\n'}
    <span className="kw">val</span> flagEmoji: <span className="type">String</span>,          <span className="cmt">// "🇺🇸"</span>{'\n'}
    <span className="kw">val</span> locationDisplay: <span className="type">String</span>,    <span className="cmt">// "New York, US"</span>{'\n'}
    <span className="kw">val</span> loadDisplay: <span className="type">String</span>,        <span className="cmt">// "45%"</span>{'\n'}
    <span className="kw">val</span> loadLevel: <span className="type">LoadLevel</span>,       <span className="cmt">// LOW, MEDIUM, HIGH</span>{'\n'}
    <span className="kw">val</span> latencyDisplay: <span className="type">String</span>,     <span className="cmt">// "25ms"</span>{'\n'}
    <span className="kw">val</span> latencyLevel: <span className="type">LatencyLevel</span>, <span className="cmt">// EXCELLENT, GOOD, FAIR, POOR</span>{'\n'}
    <span className="kw">val</span> isOnline: <span className="type">Boolean</span>,{'\n'}
    <span className="kw">val</span> recommendationScore: <span className="type">Int</span>   <span className="cmt">// 0–100</span>{'\n'}
)</code></pre>

        <table>
          <thead>
            <tr>
              <th>Load Level</th>
              <th>Range</th>
              <th>Color</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>LOW</code></td>
              <td>0–40%</td>
              <td>🟢 Green</td>
            </tr>
            <tr>
              <td><code>MEDIUM</code></td>
              <td>41–70%</td>
              <td>🟡 Yellow</td>
            </tr>
            <tr>
              <td><code>HIGH</code></td>
              <td>71–100%</td>
              <td>🔴 Red</td>
            </tr>
          </tbody>
        </table>

        <hr />

        <h2>LocationPickerProvider</h2>
        <pre><code><span className="cmt">// Country picker</span>{'\n'}
<span className="kw">val</span> countries = locationPickerProvider.<span className="fn">getCountries</span>(){'\n'}
{'\n'}
<span className="cmt">// City picker (after country selection)</span>{'\n'}
<span className="kw">val</span> cities = locationPickerProvider.<span className="fn">getCities</span>(<span className="str">"US"</span>){'\n'}
{'\n'}
<span className="cmt">// Hierarchical tree</span>{'\n'}
<span className="kw">val</span> tree = locationPickerProvider.<span className="fn">getLocationTree</span>(){'\n'}
{'\n'}
<span className="cmt">// Search</span>{'\n'}
<span className="kw">val</span> results = locationPickerProvider.<span className="fn">searchLocations</span>(<span className="str">"New"</span>)</code></pre>

        <hr />

        <h2>Format Utilities</h2>
        <pre><code><span className="cmt">// Country flags</span>{'\n'}
<span className="type">CountryFlags</span>.<span className="fn">getFlag</span>(<span className="str">"US"</span>)     <span className="cmt">// "🇺🇸"</span>{'\n'}
<span className="type">CountryFlags</span>.<span className="fn">getFlag</span>(<span className="str">"GB"</span>)     <span className="cmt">// "🇬🇧"</span>{'\n'}
{'\n'}
<span className="cmt">// Server load</span>{'\n'}
<span className="type">ServerLoadFormatter</span>.<span className="fn">format</span>(<span className="num">0.45f</span>)        <span className="cmt">// "45%"</span>{'\n'}
<span className="type">ServerLoadFormatter</span>.<span className="fn">getLoadLevel</span>(<span className="num">0.3f</span>)   <span className="cmt">// LOW</span>{'\n'}
{'\n'}
<span className="cmt">// Latency</span>{'\n'}
<span className="type">LatencyFormatter</span>.<span className="fn">format</span>(<span className="num">25</span>)              <span className="cmt">// "25ms"</span></code></pre>

        <hr />

        <h2>Extension Functions</h2>
        <pre><code><span className="cmt">// Convert Server → display model</span>{'\n'}
<span className="kw">val</span> displayItem = server.<span className="fn">toDisplayItem</span>(){'\n'}
<span className="kw">val</span> displayItems = servers.<span className="fn">toDisplayItems</span>(){'\n'}
{'\n'}
<span className="cmt">// Group for pickers</span>{'\n'}
<span className="kw">val</span> countryItems = servers.<span className="fn">toCountryPickerItems</span>(){'\n'}
<span className="kw">val</span> cityItems = servers.<span className="fn">toCityPickerItems</span>(){'\n'}
{'\n'}
<span className="cmt">// Filter & sort</span>{'\n'}
<span className="kw">val</span> active = servers.<span className="fn">activeOnly</span>(){'\n'}
<span className="kw">val</span> sorted = servers.<span className="fn">sortByRecommendation</span>()</code></pre>

        <hr />

        <h2>Jetpack Compose Integration</h2>
        <pre><code><span className="ann">@Composable</span>{'\n'}
<span className="kw">fun</span> <span className="fn">ServerListScreen</span>() {'{'}{'\n'}
    <span className="kw">val</span> servers <span className="kw">by</span> viewModel.servers.<span className="fn">collectAsState</span>(){'\n'}
{'\n'}
    <span className="type">LazyColumn</span> {'{'}{'\n'}
        <span className="fn">items</span>(servers) {'{'} server -&gt;{'\n'}
            <span className="type">ServerRow</span>({'\n'}
                flagEmoji = server.flagEmoji,{'\n'}
                name = server.name,{'\n'}
                location = server.locationDisplay,{'\n'}
                load = server.loadDisplay,{'\n'}
                loadColor = <span className="kw">when</span> (server.loadLevel) {'{'}{'\n'}
                    <span className="type">LoadLevel</span>.LOW -&gt; <span className="type">Color</span>.Green{'\n'}
                    <span className="type">LoadLevel</span>.MEDIUM -&gt; <span className="type">Color</span>.Yellow{'\n'}
                    <span className="type">LoadLevel</span>.HIGH -&gt; <span className="type">Color</span>.Red{'\n'}
                {'}'}{'\n'}
            ){'\n'}
        {'}'}{'\n'}
    {'}'}{'\n'}
{'}'}</code></pre>

        <hr />

        <h2>Country Picker Example</h2>
        <pre><code><span className="ann">@Composable</span>{'\n'}
<span className="kw">fun</span> <span className="fn">CountryPicker</span>(onCountrySelected: (<span className="type">String</span>) -&gt; <span className="type">Unit</span>) {'{'}{'\n'}
    <span className="kw">val</span> countries <span className="kw">by</span> viewModel.countries.<span className="fn">collectAsState</span>(){'\n'}
{'\n'}
    <span className="type">LazyColumn</span> {'{'}{'\n'}
        <span className="fn">items</span>(countries) {'{'} country -&gt;{'\n'}
            <span className="type">Row</span>({'\n'}
                modifier = <span className="type">Modifier</span>{'\n'}
                    .<span className="fn">fillMaxWidth</span>(){'\n'}
                    .<span className="fn">clickable</span> {'{'} <span className="fn">onCountrySelected</span>(country.code) {'}'}{'\n'}
                    .<span className="fn">padding</span>(<span className="num">16</span>.dp){'\n'}
            ) {'{'}{'\n'}
                <span className="type">Text</span>(country.flagEmoji, fontSize = <span className="num">24</span>.sp){'\n'}
                <span className="type">Spacer</span>(<span className="type">Modifier</span>.<span className="fn">width</span>(<span className="num">12</span>.dp)){'\n'}
                <span className="type">Column</span> {'{'}{'\n'}
                    <span className="type">Text</span>(country.name, fontWeight = <span className="type">FontWeight</span>.Medium){'\n'}
                    <span className="type">Text</span>({'\n'}
                        <span className="str">"${'{'}country.serverCount{'}'} servers"</span>,{'\n'}
                        color = <span className="type">Color</span>.Gray,{'\n'}
                        fontSize = <span className="num">12</span>.sp{'\n'}
                    ){'\n'}
                {'}'}{'\n'}
            {'}'}{'\n'}
        {'}'}{'\n'}
    {'}'}{'\n'}
{'}'}</code></pre>

        <PageNav 
          prev={{ href: '/sdk/docs/error-handling', title: 'Error Handling' }}
          next={{ href: '/sdk/docs/configuration', title: 'Configuration' }} 
        />
      </SDKDocsLayout>
    </>
  );
}
