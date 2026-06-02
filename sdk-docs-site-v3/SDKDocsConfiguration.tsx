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
        <h3>Correction — production security fields are required</h3>
        <p>
          The SDK configuration in this repository includes a mandatory “Layer 0” SDK authentication gate.
          In non-debug builds (or when <code>forceSecurityInDebug</code> is enabled), the SDK validates that you provided
          <code>sdkAuthMode</code> and <code>customerId</code> (and the mode-specific secret when required). If they are missing,
          <code>FyreWayConfig.Builder.build()</code> throws at startup.
        </p>
        <p>
          If you are following an older integration that only sets <code>baseUrl</code>, keep the existing config table below,
          but treat it as incomplete for production.
        </p>

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

        <h2 id="security">Security (Layer 0) — SDK authentication mode</h2>
        <p>
          The SDK supports three Layer 0 authentication modes via <code>SdkAuthMode</code>: <code>TOTP</code>, <code>CHALLENGE</code>, and <code>PLAY_INTEGRITY</code>.
          These headers are applied to the device activation call (<code>POST /devices/activate</code>) by an internal interceptor.
        </p>

        <h3>Required fields by mode</h3>
        <table>
          <thead>
            <tr>
              <th>Mode</th>
              <th>Required config fields</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>SdkAuthMode.TOTP</code></td>
              <td><code>sdkAuthMode</code>, <code>customerId</code>, <code>sdkTotpSeed</code></td>
              <td>
                Uses a 6-digit TOTP token. Clock skew can cause activation failures. The SDK logs TOTP window details during activation.
              </td>
            </tr>
            <tr>
              <td><code>SdkAuthMode.CHALLENGE</code></td>
              <td><code>sdkAuthMode</code>, <code>customerId</code>, <code>sdkHmacSecret</code></td>
              <td>
                Uses a server-provided nonce signed with HMAC-SHA256.
              </td>
            </tr>
            <tr>
              <td><code>SdkAuthMode.PLAY_INTEGRITY</code></td>
              <td><code>sdkAuthMode</code>, <code>customerId</code></td>
              <td>
                Requires Android <code>Context</code> at SDK initialization time.
                <strong>Needs manual verification:</strong> ensure your app includes the Play Integrity dependency and is distributed via Google Play as required.
              </td>
            </tr>
          </tbody>
        </table>

        <h3>Example — production configuration (TOTP)</h3>
        <p>
          This is a minimal example that includes the production-required fields for TOTP mode. Adjust the mode and secrets to match your backend setup.
        </p>
        <pre><code><span className="type">FyreWaySDK</span>.<span className="fn">initialize</span>(<span className="kw">applicationContext</span>) {'{'}{'\n'}
    baseUrl = <span className="type">BuildConfig</span>.API_BASE_URL{'\n'}
{'\n'}
    sdkAuthMode(<span className="type">SdkAuthMode</span>.TOTP){'\n'}
    customerId(<span className="type">BuildConfig</span>.CUSTOMER_ID){'\n'}
    sdkTotpSeed(<span className="type">BuildConfig</span>.SDK_TOTP_SEED){'\n'}
{'\n'}
    <span className="cmt">// Make the SDK aware of build type so production validation behaves as expected</span>{'\n'}
    isDebugBuild(<span className="type">BuildConfig</span>.DEBUG){'\n'}
{' }'}</code></pre>
        <p>
          <strong>Needs manual verification:</strong> secure storage and distribution of TOTP/HMAC secrets differs by organization. Do not hardcode production secrets in source control.
        </p>

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
            <tr>
              <td><code>AMNEZIA</code></td>
              <td><code>"amnezia"</code></td>
              <td><code>.conf</code></td>
              <td>51820</td>
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

        <h2>ServerFilter</h2>
        <p>
          Used to narrow server discovery results. All fields are optional — combine freely. Pass to <code>getServers()</code>, <code>getRankedServersInCity()</code>, <code>getBestServersInCountry()</code>, and <code>getRecommendedServers()</code>.
        </p>
        <table>
          <thead>
            <tr>
              <th>Field</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>country</code></td>
              <td><code>String?</code></td>
              <td>ISO country code, e.g. <code>"US"</code></td>
            </tr>
            <tr>
              <td><code>city</code></td>
              <td><code>String?</code></td>
              <td>City name, e.g. <code>"New York"</code></td>
            </tr>
            <tr>
              <td><code>region</code></td>
              <td><code>String?</code></td>
              <td>Physical province/state name, e.g. <code>"Virginia"</code> — not a cloud region code</td>
            </tr>
            <tr>
              <td><code>status</code></td>
              <td><code>String?</code></td>
              <td><code>"active"</code> | <code>"maintenance"</code> | <code>"offline"</code></td>
            </tr>
            <tr>
              <td><code>tier</code></td>
              <td><code>String?</code></td>
              <td>Tier ID from registry constants, e.g. <code>"free"</code>, <code>"premium"</code></td>
            </tr>
            <tr>
              <td><code>protocol</code></td>
              <td><code>String?</code></td>
              <td>Protocol ID from registry constants, e.g. <code>"wireguard"</code>, <code>"openvpn-udp"</code></td>
            </tr>
            <tr>
              <td><code>platform</code></td>
              <td><code>String?</code></td>
              <td>Platform ID from registry constants, e.g. <code>"android"</code>, <code>"ios"</code></td>
            </tr>
            <tr>
              <td><code>category</code></td>
              <td><code>String?</code></td>
              <td>Category ID from registry constants, e.g. <code>"streaming"</code>, <code>"gaming"</code></td>
            </tr>
          </tbody>
        </table>

        <pre><code><span className="cmt">// Single-field factory methods</span>{'\n'}
<span className="type">ServerFilter</span>.<span className="fn">byCountry</span>(<span className="str">"US"</span>){'\n'}
<span className="type">ServerFilter</span>.<span className="fn">byCity</span>(<span className="str">"US"</span>, <span className="str">"New York"</span>){'\n'}
<span className="type">ServerFilter</span>.<span className="fn">byRegion</span>(<span className="str">"Virginia"</span>){'\n'}
<span className="type">ServerFilter</span>.<span className="fn">byTier</span>(<span className="str">"premium"</span>){'\n'}
<span className="type">ServerFilter</span>.<span className="fn">byProtocol</span>(<span className="str">"wireguard"</span>){'\n'}
<span className="type">ServerFilter</span>.<span className="fn">byPlatform</span>(<span className="str">"android"</span>){'\n'}
<span className="type">ServerFilter</span>.<span className="fn">byCategory</span>(<span className="str">"streaming"</span>)</code></pre>

        <hr />

        <h2>RegistryConstants</h2>
        <p>
          Retrieved via <code>sdk.getRegistryConstants()</code>. This is the source of truth for all valid <code>tier</code>, <code>protocol</code>, <code>platform</code>, and <code>category</code> filter values. The SDK caches the result for 24 hours and refreshes automatically on startup and after any 400 invalid-enum error.
        </p>
        <table>
          <thead>
            <tr>
              <th>Field</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>accessTiers</code></td>
              <td><code>List&lt;AccessTier&gt;</code></td>
              <td>Valid tier IDs and display names, ordered by level. Use <code>AccessTier.id</code> as the filter value.</td>
            </tr>
            <tr>
              <td><code>services</code></td>
              <td><code>List&lt;ServiceProtocol&gt;</code></td>
              <td>Valid protocol IDs and display names. Use <code>ServiceProtocol.id</code> as the filter value.</td>
            </tr>
            <tr>
              <td><code>platforms</code></td>
              <td><code>List&lt;Platform&gt;</code></td>
              <td>Valid platform IDs and display names.</td>
            </tr>
            <tr>
              <td><code>categories</code></td>
              <td><code>List&lt;Category&gt;</code></td>
              <td>Valid category IDs, display names, and optional descriptions.</td>
            </tr>
          </tbody>
        </table>

        <pre><code><span className="cmt">// Regular fetch (uses 24 h cache)</span>{'\n'}
sdk.<span className="fn">getRegistryConstants</span>(){'\n'}
{'\n'}
<span className="cmt">// Force fresh fetch (e.g. after InvalidFilterValueException)</span>{'\n'}
sdk.<span className="fn">getRegistryConstants</span>(forceRefresh = <span className="kw">true</span>){'\n'}
{'\n'}
<span className="cmt">// Access cached constants synchronously (may be null before first fetch)</span>{'\n'}
<span className="kw">val</span> tiers     = sdk.<span className="fn">getRegistryConstants</span>().<span className="fn">getOrNull</span>()?.accessTiers{'\n'}
<span className="kw">val</span> protocols = sdk.<span className="fn">getRegistryConstants</span>().<span className="fn">getOrNull</span>()?.services{'\n'}
<span className="kw">val</span> categories = sdk.<span className="fn">getRegistryConstants</span>().<span className="fn">getOrNull</span>()?.categories</code></pre>

        <hr />

        <h2>UserServerPreferences</h2>
        <p>
          Set once on <code>sdk.userPreferences</code> to propagate the user's tier, protocol, and category to all discovery calls without repeating them in every ViewModel.
        </p>
        <table>
          <thead>
            <tr>
              <th>Field</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>tier</code></td>
              <td><code>String</code></td>
              <td><code>"free"</code></td>
              <td>User's subscription tier — update after login or plan change</td>
            </tr>
            <tr>
              <td><code>preferredProtocol</code></td>
              <td><code>String?</code></td>
              <td><code>null</code></td>
              <td>User's last selected protocol ID</td>
            </tr>
            <tr>
              <td><code>platform</code></td>
              <td><code>String</code></td>
              <td><code>"android"</code></td>
              <td>Auto-set; override if building a cross-platform wrapper</td>
            </tr>
            <tr>
              <td><code>preferredCategory</code></td>
              <td><code>String?</code></td>
              <td><code>null</code></td>
              <td>User's saved use-case preference (streaming, gaming, etc.)</td>
            </tr>
          </tbody>
        </table>

        <pre><code><span className="cmt">// Set after login / subscription confirmed</span>{'\n'}
sdk.userPreferences = <span className="type">UserServerPreferences</span>({'\n'}
    tier              = account.subscriptionTier,   <span className="cmt">// e.g. "premium"</span>{'\n'}
    preferredProtocol = prefs.<span className="fn">getString</span>(<span className="str">"protocol"</span>, <span className="kw">null</span>),{'\n'}
    preferredCategory = prefs.<span className="fn">getString</span>(<span className="str">"category"</span>, <span className="kw">null</span>){'\n'}
){'\n'}
{'\n'}
<span className="cmt">// Reset on logout</span>{'\n'}
sdk.userPreferences = <span className="type">UserServerPreferences</span>.<span className="fn">default</span>()</code></pre>

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
          <li><code>sdk.getRegistryConstants()</code> called at startup to populate filter UIs</li>
          <li><code>sdk.userPreferences</code> set after login with the user's subscription tier</li>
          <li>Filter picker UIs driven by <code>getRegistryConstants()</code> — no hardcoded tier/protocol/category strings</li>
          <li><code>NoServersAvailableException</code> handled in every <code>smartConnect()</code> / <code>getOptimalServer()</code> call</li>
          <li><code>InvalidFilterValueException</code> handled wherever classification filters are used</li>
          <li>Connection state reported (<code>reportConnected</code> / <code>reportDisconnected</code>)</li>
          <li>All <code>VpnResult.Error</code> cases handled with user-friendly messages via <code>ErrorMessageMapper</code></li>
          <li>ProGuard rules included (auto via consumer rules in AAR)</li>
          <li>Analytics consent implemented if required by your privacy policy</li>
          <li><code>sdk.shutdown()</code> called on app termination</li>
        </ul>

        <PageNav 
          prev={{ href: '/sdk/docs/ui-utilities', title: 'UI Utilities' }}
        />
      </SDKDocsLayout>
    </>
  );
}
