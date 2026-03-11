import { SDKDocsLayout, PageNav } from '@/components/SDKDocsLayout';
import { SEO } from '@/components/SEO';

export default function SDKDocsConfiguration() {
  return (
    <>
      <SEO 
        title="Configuration Reference — FyreWay SDK Docs"
        description="Complete reference for FyreWay SDK configuration options, enums, ProGuard rules."
        canonical="/sdk/docs/configuration"
      />
      <SDKDocsLayout title="Configuration">
        <h1>Configuration Reference</h1>
        <p className="sdk-page-description">
          Complete reference for all SDK configuration options, enums, and build settings.
        </p>

        <h2>FyreWayConfig</h2>
        <p>Pass to <code>FyreWaySDK.initialize()</code>. Only <code>baseUrl</code> is required.</p>
        <table>
          <thead>
            <tr>
              <th>Parameter</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>baseUrl</code></td>
              <td><code>String</code></td>
              <td><strong>required</strong></td>
              <td>Backend API base URL</td>
            </tr>
            <tr>
              <td><code>enableLogging</code></td>
              <td><code>Boolean</code></td>
              <td><code>false</code></td>
              <td>Enable HTTP logging. <strong>Disable in production.</strong></td>
            </tr>
            <tr>
              <td><code>logLevel</code></td>
              <td><code>LogLevel</code></td>
              <td><code>BODY</code></td>
              <td>Detail level of HTTP logs</td>
            </tr>
            <tr>
              <td><code>connectTimeout</code></td>
              <td><code>Long</code></td>
              <td><code>30000</code></td>
              <td>Connection timeout (ms)</td>
            </tr>
            <tr>
              <td><code>readTimeout</code></td>
              <td><code>Long</code></td>
              <td><code>30000</code></td>
              <td>Read timeout (ms)</td>
            </tr>
            <tr>
              <td><code>writeTimeout</code></td>
              <td><code>Long</code></td>
              <td><code>30000</code></td>
              <td>Write timeout (ms)</td>
            </tr>
            <tr>
              <td><code>maxRetries</code></td>
              <td><code>Int</code></td>
              <td><code>3</code></td>
              <td>Auto-retries on network failure</td>
            </tr>
            <tr>
              <td><code>retryDelayMs</code></td>
              <td><code>Long</code></td>
              <td><code>1000</code></td>
              <td>Delay between retries (ms)</td>
            </tr>
            <tr>
              <td><code>cachePolicy</code></td>
              <td><code>CachePolicy</code></td>
              <td><code>CACHE_FIRST</code></td>
              <td>Default caching behavior</td>
            </tr>
            <tr>
              <td><code>analyticsConfig</code></td>
              <td><code>AnalyticsConfig</code></td>
              <td>defaults</td>
              <td>Analytics configuration</td>
            </tr>
          </tbody>
        </table>

        <hr />

        <h2>AnalyticsConfig</h2>
        <table>
          <thead>
            <tr>
              <th>Parameter</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>enabled</code></td>
              <td><code>Boolean</code></td>
              <td><code>true</code></td>
              <td>Master switch</td>
            </tr>
            <tr>
              <td><code>batchSize</code></td>
              <td><code>Int</code></td>
              <td><code>50</code></td>
              <td>Events per batch (1–100)</td>
            </tr>
            <tr>
              <td><code>flushInterval</code></td>
              <td><code>Long</code></td>
              <td><code>60000</code></td>
              <td>Auto-flush interval (ms)</td>
            </tr>
            <tr>
              <td><code>includeConnectionEvents</code></td>
              <td><code>Boolean</code></td>
              <td><code>true</code></td>
              <td>Track connection events</td>
            </tr>
            <tr>
              <td><code>includeApiCalls</code></td>
              <td><code>Boolean</code></td>
              <td><code>true</code></td>
              <td>Track API performance</td>
            </tr>
            <tr>
              <td><code>includeUserActions</code></td>
              <td><code>Boolean</code></td>
              <td><code>true</code></td>
              <td>Track UI interactions</td>
            </tr>
          </tbody>
        </table>

        <pre><code><span className="cmt">// Runtime update</span>{'\n'}
sdk.<span className="fn">updateAnalyticsConfig</span>(<span className="type">AnalyticsConfig</span>(enabled = <span className="kw">false</span>)){'\n'}
{'\n'}
<span className="cmt">// Manual flush</span>{'\n'}
sdk.<span className="fn">flushAnalytics</span>()</code></pre>

        <hr />

        <h2>Enums Reference</h2>

        <h3>VpnProtocol</h3>
        <table>
          <thead>
            <tr>
              <th>Value</th>
              <th>Identifier</th>
              <th>Extension</th>
              <th>Port</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>WIREGUARD</code></td>
              <td><code>"wireguard"</code></td>
              <td><code>.conf</code></td>
              <td>51820</td>
            </tr>
            <tr>
              <td><code>OPENVPN</code></td>
              <td><code>"openvpn"</code></td>
              <td><code>.ovpn</code></td>
              <td>1194</td>
            </tr>
          </tbody>
        </table>

        <h3>SelectionStrategy</h3>
        <table>
          <thead>
            <tr>
              <th>Value</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>BALANCED</code></td>
              <td>Weighted mix of load, latency, capacity (default)</td>
            </tr>
            <tr>
              <td><code>LOWEST_LOAD</code></td>
              <td>Fewest active connections</td>
            </tr>
            <tr>
              <td><code>LOWEST_LATENCY</code></td>
              <td>Lowest ping time</td>
            </tr>
            <tr>
              <td><code>HIGHEST_CAPACITY</code></td>
              <td>Most available slots</td>
            </tr>
            <tr>
              <td><code>CLOSEST_LOCATION</code></td>
              <td>Geographic proximity</td>
            </tr>
          </tbody>
        </table>

        <h3>CachePolicy</h3>
        <table>
          <thead>
            <tr>
              <th>Value</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>CACHE_FIRST</code></td>
              <td>Use cache if available; network when empty</td>
            </tr>
            <tr>
              <td><code>NETWORK_FIRST</code></td>
              <td>Try network first; fall back to cache</td>
            </tr>
            <tr>
              <td><code>CACHE_ONLY</code></td>
              <td>Only cache — fail if not cached</td>
            </tr>
            <tr>
              <td><code>NETWORK_ONLY</code></td>
              <td>Always network — never cache</td>
            </tr>
          </tbody>
        </table>

        <h3>ConnectionState</h3>
        <table>
          <thead>
            <tr>
              <th>Value</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>CONNECTED</code></td>
              <td>Connected to VPN server</td>
            </tr>
            <tr>
              <td><code>DISCONNECTED</code></td>
              <td>Not connected</td>
            </tr>
            <tr>
              <td><code>CONNECTING</code></td>
              <td>Connection in progress</td>
            </tr>
            <tr>
              <td><code>DISCONNECTING</code></td>
              <td>Disconnection in progress</td>
            </tr>
          </tbody>
        </table>

        <hr />

        <h2>ProGuard / R8 Rules</h2>
        <pre><code><span className="cmt"># FyreWay VPN SDK</span>{'\n'}
-keep public class com.fyreway.vpn.sdk.** {'{'} public *; {'}'}{'\n'}
-keep class com.fyreway.vpn.sdk.model.** {'{'} *; {'}'}{'\n'}
-keep class com.fyreway.vpn.sdk.exception.** {'{'} *; {'}'}{'\n'}
{'\n'}
<span className="cmt"># Moshi</span>{'\n'}
-keep class com.squareup.moshi.** {'{'} *; {'}'}{'\n'}
{'\n'}
<span className="cmt"># OkHttp</span>{'\n'}
-dontwarn okhttp3.**{'\n'}
-dontwarn okio.**</code></pre>

        <hr />

        <h2>SDK Lifecycle Methods</h2>
        <table>
          <thead>
            <tr>
              <th>Method</th>
              <th>When to call</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>FyreWaySDK.initialize {'{ }'}</code></td>
              <td>Once in <code>Application.onCreate()</code></td>
            </tr>
            <tr>
              <td><code>FyreWaySDK.getInstance()</code></td>
              <td>Anywhere after initialization</td>
            </tr>
            <tr>
              <td><code>FyreWaySDK.isInitialized()</code></td>
              <td>Before <code>getInstance()</code> if unsure</td>
            </tr>
            <tr>
              <td><code>sdk.shutdown()</code></td>
              <td>When app is terminating</td>
            </tr>
          </tbody>
        </table>

        <hr />

        <h2>Production Checklist</h2>
        <ul className="sdk-checklist">
          <li>SDK initialized in <code>Application.onCreate()</code></li>
          <li><code>enableLogging = false</code> in release builds</li>
          <li><code>baseUrl</code> loaded from <code>BuildConfig</code>, not hardcoded</li>
          <li>Device activation called on first launch</li>
          <li>Proactive token refresh running (automatic after activation)</li>
          <li>Connection state reported (<code>reportConnected</code> / <code>reportDisconnected</code>)</li>
          <li>All <code>VpnResult.Error</code> cases handled with user-friendly messages</li>
          <li>ProGuard rules included (auto via consumer rules)</li>
          <li>Analytics consent implemented if required by privacy policy</li>
          <li><code>sdk.shutdown()</code> called on app termination</li>
        </ul>

        <PageNav 
          prev={{ href: '/sdk/docs/ui-utilities', title: 'UI Utilities' }}
        />
      </SDKDocsLayout>
    </>
  );
}
