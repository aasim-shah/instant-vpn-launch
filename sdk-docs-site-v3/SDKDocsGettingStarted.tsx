import { SDKDocsLayout, CodeBlock, PageNav, MermaidDiagram } from '@/components/SDKDocsLayout';
import { SEO } from '@/components/SEO';

export default function SDKDocsGettingStarted() {
  const activationFlowChart = `
sequenceDiagram
    participant App as Your App
    participant SDK as FyreWay SDK
    participant Store as Secure Storage
    participant API as Backend API
    App->>SDK: activateDevice("1.0.0")
    SDK->>API: POST /devices/activate
    API-->>SDK: deviceId, token, refreshToken
    SDK->>Store: Store credentials
    SDK->>SDK: Start proactive token refresh
    SDK-->>App: VpnResult.Success(DeviceCredentials)
  `;

  const tokenLifecycleChart = `
graph LR
    A[activateDevice] --> B[Token stored]
    B --> C{Expiring within 24h?}
    C -- Yes --> D[refreshToken]
    D --> B
    C -- No --> E[Wait 5 min]
    E --> C
  `;

  return (
    <>
      <SEO 
        title="Getting Started — FyreWay SDK Docs"
        description="Install, configure, and activate the FyreWay VPN SDK for Android in under 5 minutes."
        canonical="/sdk/docs/getting-started"
      />
      <SDKDocsLayout title="Getting Started">
        <h1>Getting Started</h1>
        <p className="sdk-page-description">Time to first API call: <strong>~5 minutes</strong></p>

        <h2 id="dependency">1. Add the Dependency</h2>

        <div className="sdk-code-header"><span>build.gradle.kts — Project</span></div>
        <pre><code><span className="fn">repositories</span> {'{'}{'\n'}
    <span className="fn">google</span>(){'\n'}
    <span className="fn">mavenCentral</span>(){'\n'}
    <span className="fn">maven</span> {'{'} url = <span className="fn">uri</span>(<span className="str">"https://maven.fyreway.com/releases"</span>) {'}'}{'\n'}
{'}'}</code></pre>

        <div className="sdk-code-header"><span>build.gradle.kts — App module</span></div>
        <pre><code><span className="fn">dependencies</span> {'{'}{'\n'}
    <span className="cmt">// FyreWay VPN SDK</span>{'\n'}
    <span className="fn">implementation</span>(<span className="str">"com.fyreway.vpn:fyreway-vpn-sdk:1.1.0"</span>){'\n'}
{'\n'}
    <span className="cmt">// Required</span>{'\n'}
    <span className="fn">implementation</span>(<span className="str">"org.jetbrains.kotlinx:kotlinx-coroutines-android:1.7.3"</span>){'\n'}
    <span className="fn">implementation</span>(<span className="str">"androidx.lifecycle:lifecycle-viewmodel-ktx:2.6.2"</span>){'\n'}
    <span className="fn">implementation</span>(<span className="str">"androidx.lifecycle:lifecycle-runtime-ktx:2.6.2"</span>){'\n'}
{'}'}</code></pre>

        <h3>Updated note — dependency coordinates and version</h3>
        <p>
          The Gradle coordinate shown above (<code>com.fyreway.vpn:fyreway-vpn-sdk</code>) matches the naming used throughout this documentation.
          However, the SDK module version in this repository is <code>1.1.1</code> (see <code>fyreway-vpn-sdk/build.gradle.kts</code>),
          and the website currently references <code>1.1.0</code> and <code>1.2.0</code> in different places.
        </p>
        <p>
          <strong>Needs manual verification:</strong> confirm the Maven repository URL and the currently published artifact version(s),
          then update your app dependency version accordingly.
        </p>

        <p>If you're using an AAR file directly:</p>
        <pre><code><span className="fn">dependencies</span> {'{'}{'\n'}
    <span className="fn">implementation</span>(<span className="fn">files</span>(<span className="str">"libs/fyreway-vpn-sdk-release.aar"</span>)){'\n'}
{'}'}</code></pre>

        <hr />

        <h2 id="manifest">2. Update AndroidManifest.xml</h2>
        <div className="sdk-code-header"><span>AndroidManifest.xml</span></div>
        <pre><code>&lt;<span className="kw">manifest</span> xmlns:android=<span className="str">"http://schemas.android.com/apk/res/android"</span>&gt;{'\n'}
{'\n'}
    <span className="cmt">&lt;!-- Required --&gt;</span>{'\n'}
    &lt;<span className="kw">uses-permission</span> android:name=<span className="str">"android.permission.INTERNET"</span> /&gt;{'\n'}
    &lt;<span className="kw">uses-permission</span> android:name=<span className="str">"android.permission.ACCESS_NETWORK_STATE"</span> /&gt;{'\n'}
{'\n'}
    &lt;<span className="kw">application</span>{'\n'}
        android:name=<span className="str">".MyApplication"</span>{'\n'}
        ... &gt;{'\n'}
        <span className="cmt">&lt;!-- Your activities --&gt;</span>{'\n'}
    &lt;/<span className="kw">application</span>&gt;{'\n'}
&lt;/<span className="kw">manifest</span>&gt;</code></pre>

        <h3>Correction — additional permission used by the SDK</h3>
        <p>
          The SDK module manifest in this repository also includes <code>android.permission.ACCESS_WIFI_STATE</code>
          (see <code>fyreway-vpn-sdk/src/main/AndroidManifest.xml</code>). If you maintain permissions manually (or if manifest merging is restricted),
          ensure this permission is present.
        </p>
        <div className="sdk-code-header"><span>AndroidManifest.xml — add if missing</span></div>
        <pre><code>&lt;<span className="kw">uses-permission</span> android:name=<span className="str">"android.permission.ACCESS_WIFI_STATE"</span> /&gt;</code></pre>

        <hr />

        <h2 id="initialize">3. Initialize the SDK</h2>
        <p>Initialize <strong>once</strong> in your <code>Application.onCreate()</code>. Never initialize in an Activity or Fragment.</p>

        <div className="sdk-code-header"><span>Kotlin</span></div>
        <pre><code><span className="kw">class</span> <span className="type">MyApplication</span> : <span className="type">Application</span>() {'{'}{'\n'}
    <span className="kw">override fun</span> <span className="fn">onCreate</span>() {'{'}{'\n'}
        <span className="kw">super</span>.<span className="fn">onCreate</span>(){'\n'}
{'\n'}
        <span className="type">FyreWaySDK</span>.<span className="fn">initialize</span> {'{'}{'\n'}
            baseUrl = <span className="str">"https://your-api-server.com"</span>    <span className="cmt">// Required</span>{'\n'}
            enableLogging = <span className="type">BuildConfig</span>.DEBUG            <span className="cmt">// Disable in production</span>{'\n'}
            logLevel = <span className="type">LogLevel</span>.BASIC                    <span className="cmt">// NONE, BASIC, HEADERS, BODY</span>{'\n'}
            connectTimeout = <span className="num">30_000L</span>{'\n'}
            readTimeout = <span className="num">30_000L</span>{'\n'}
            writeTimeout = <span className="num">30_000L</span>{'\n'}
            maxRetries = <span className="num">3</span>{'\n'}
            cachePolicy = <span className="type">CachePolicy</span>.CACHE_FIRST{'\n'}
            analyticsConfig = <span className="type">AnalyticsConfig</span>({'\n'}
                enabled = <span className="kw">true</span>,{'\n'}
                batchSize = <span className="num">50</span>,{'\n'}
                flushInterval = <span className="num">60_000L</span>{'\n'}
            ){'\n'}
        {'}'}{'\n'}
    {'}'}{'\n'}
{'}'}</code></pre>

        <div className="sdk-code-header"><span>Java</span></div>
        <pre><code><span className="kw">public class</span> <span className="type">MyApplication</span> <span className="kw">extends</span> <span className="type">Application</span> {'{'}{'\n'}
    <span className="ann">@Override</span>{'\n'}
    <span className="kw">public void</span> <span className="fn">onCreate</span>() {'{'}{'\n'}
        <span className="kw">super</span>.<span className="fn">onCreate</span>();{'\n'}
{'\n'}
        <span className="type">FyreWayConfig</span> config = <span className="kw">new</span> <span className="type">FyreWayConfig</span>.<span className="type">Builder</span>(){'\n'}
            .<span className="fn">baseUrl</span>(<span className="str">"https://your-api-server.com"</span>){'\n'}
            .<span className="fn">enableLogging</span>(<span className="type">BuildConfig</span>.DEBUG){'\n'}
            .<span className="fn">logLevel</span>(<span className="type">LogLevel</span>.BASIC){'\n'}
            .<span className="fn">build</span>();{'\n'}
{'\n'}
        <span className="type">FyreWaySDK</span>.<span className="fn">initialize</span>(config);{'\n'}
    {'}'}{'\n'}
{'}'}</code></pre>

        <blockquote>
          <strong>Important:</strong> <code>baseUrl</code> is the only required parameter. All others have sensible defaults. Never hardcode your production URL — use <code>BuildConfig</code> fields.
        </blockquote>

        <h3>Correction — recommended initialization uses Android Context</h3>
        <p>
          In the SDK source code in this repository, the Android-recommended initializer takes an Android <code>Context</code>:
          <code>FyreWaySDK.initialize(context, config)</code> or <code>FyreWaySDK.initialize(context) {'{'} ... {'}'}</code>.
          A no-context initializer also exists for backward compatibility / JVM tests, but some security and device-fingerprint features depend on Android APIs.
        </p>
        <div className="sdk-code-header"><span>Kotlin — with Context (recommended)</span></div>
        <pre><code><span className="kw">class</span> <span className="type">MyApplication</span> : <span className="type">Application</span>() {'{'}{'\n'}
    <span className="kw">override fun</span> <span className="fn">onCreate</span>() {'{'}{'\n'}
        <span className="kw">super</span>.<span className="fn">onCreate</span>(){'\n'}
{'\n'}
        <span className="type">FyreWaySDK</span>.<span className="fn">initialize</span>(<span className="kw">this</span>) {'{'}{'\n'}
            baseUrl = <span className="str">"https://your-api-server.com"</span>{'\n'}
            <span className="cmt">// See the next section for required production security fields</span>{'\n'}
        {'}'}{'\n'}
    {'}'}{'\n'}
{' }'}</code></pre>

        <h3>Correction — production security configuration is required</h3>
        <p>
          The current SDK implementation validates a "Layer 0" SDK authentication mode at configuration build time.
          In non-debug builds (unless you intentionally bypass security for internal testing), you must provide:
          <code>sdkAuthMode</code> and <code>customerId</code>, plus the mode-specific secret when required.
        </p>
        <div className="sdk-code-header"><span>Kotlin — minimal production config example (TOTP)</span></div>
        <pre><code><span className="type">FyreWaySDK</span>.<span className="fn">initialize</span>(<span className="kw">this</span>) {'{'}{'\n'}
    baseUrl = <span className="type">BuildConfig</span>.API_BASE_URL{'\n'}
{'\n'}
    <span className="cmt">// Layer 0 (SDK Key Gate) — required in production</span>{'\n'}
    sdkAuthMode(<span className="type">SdkAuthMode</span>.TOTP){'\n'}
    customerId(<span className="type">BuildConfig</span>.CUSTOMER_ID){'\n'}
    sdkTotpSeed(<span className="type">BuildConfig</span>.SDK_TOTP_SEED){'\n'}
{'\n'}
    <span className="cmt">// Optional: enable certificate pinning in production</span>{'\n'}
    enableCertPinning(!<span className="type">BuildConfig</span>.DEBUG){'\n'}
    isDebugBuild(<span className="type">BuildConfig</span>.DEBUG){'\n'}
{' }'}</code></pre>
        <p>
          <strong>Needs manual verification:</strong> choose the correct <code>SdkAuthMode</code> for your deployment (TOTP, CHALLENGE, or PLAY_INTEGRITY),
          and confirm how you distribute and protect secrets like <code>sdkTotpSeed</code>/<code>sdkHmacSecret</code>.
        </p>

        <hr />

        <h2 id="activate">4. Activate the Device</h2>
        <p>Device activation registers this device with the backend and returns authentication credentials. Call it once on first launch — the SDK stores credentials securely and reuses them.</p>

        <MermaidDiagram chart={activationFlowChart} />

        <div className="sdk-code-header"><span>Kotlin</span></div>
        <pre><code><span className="kw">class</span> <span className="type">MainViewModel</span> : <span className="type">ViewModel</span>() {'{'}{'\n'}
    <span className="kw">private val</span> sdk = <span className="type">FyreWaySDK</span>.<span className="fn">getInstance</span>(){'\n'}
{'\n'}
    <span className="kw">fun</span> <span className="fn">activate</span>() {'{'}{'\n'}
        viewModelScope.<span className="fn">launch</span> {'{'}{'\n'}
            <span className="kw">when</span> (<span className="kw">val</span> result = sdk.<span className="fn">activateDevice</span>(appVersion = <span className="str">"1.0.0"</span>)) {'{'}{'\n'}
                <span className="kw">is</span> <span className="type">VpnResult.Success</span> -&gt; {'{'}{'\n'}
                    <span className="kw">val</span> deviceId = result.data.deviceId{'\n'}
                    <span className="cmt">// Device is ready — you can now call any SDK API</span>{'\n'}
                {'}'}{'\n'}
                <span className="kw">is</span> <span className="type">VpnResult.Error</span> -&gt; {'{'}{'\n'}
                    <span className="kw">val</span> message = <span className="type">ErrorMessageMapper</span>.<span className="fn">getMessage</span>(result.exception){'\n'}
                    <span className="cmt">// Show user-friendly error</span>{'\n'}
                {'}'}{'\n'}
            {'}'}{'\n'}
        {'}'}{'\n'}
    {'}'}{'\n'}
{'}'}</code></pre>

        <div className="sdk-code-header"><span>Java</span></div>
        <pre><code><span className="type">FyreWayJavaClient</span> client = <span className="type">FyreWayJavaClient</span>.<span className="fn">initialize</span>();{'\n'}
{'\n'}
client.<span className="fn">activateDevice</span>(<span className="str">"1.0.0"</span>, <span className="kw">new</span> <span className="type">FyreWayCallback</span>&lt;<span className="type">DeviceCredentials</span>&gt;() {'{'}{'\n'}
    <span className="ann">@Override</span>{'\n'}
    <span className="kw">public void</span> <span className="fn">onSuccess</span>(<span className="type">DeviceCredentials</span> <span className="param">credentials</span>) {'{'}{'\n'}
        <span className="cmt">// Device is ready</span>{'\n'}
    {'}'}{'\n'}
{'\n'}
    <span className="ann">@Override</span>{'\n'}
    <span className="kw">public void</span> <span className="fn">onError</span>(<span className="type">Exception</span> <span className="param">exception</span>, <span className="type">Integer</span> <span className="param">statusCode</span>) {'{'}{'\n'}
        <span className="cmt">// Handle error</span>{'\n'}
    {'}'}{'\n'}
{'}'});</code></pre>

        <hr />

        <h2 id="auth">5. Check Authentication State</h2>
        <pre><code><span className="kw">val</span> sdk = <span className="type">FyreWaySDK</span>.<span className="fn">getInstance</span>(){'\n'}
{'\n'}
<span className="kw">if</span> (sdk.<span className="fn">isAuthenticated</span>()) {'{'}{'\n'}
    <span className="cmt">// Proceed with API calls</span>{'\n'}
{'}'} <span className="kw">else</span> {'{'}{'\n'}
    <span className="cmt">// Need to activate device first</span>{'\n'}
    sdk.<span className="fn">activateDevice</span>(<span className="str">"1.0.0"</span>){'\n'}
{'}'}</code></pre>

        <hr />

        <h2 id="token">6. Token Lifecycle</h2>
        <p>The SDK manages token refresh automatically. After activation, a background job checks every 5 minutes and refreshes the token before it expires.</p>

        <MermaidDiagram chart={tokenLifecycleChart} />

        <table>
          <thead>
            <tr>
              <th>Method</th>
              <th>When to use</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>startProactiveTokenRefresh()</code></td>
              <td>Called automatically after activation. Call manually only if you previously stopped it.</td>
            </tr>
            <tr>
              <td><code>stopProactiveTokenRefresh()</code></td>
              <td>Call before logout or when you no longer need the SDK.</td>
            </tr>
            <tr>
              <td><code>refreshToken()</code></td>
              <td>Manual one-time refresh. Rarely needed — the SDK handles this.</td>
            </tr>
          </tbody>
        </table>

        <hr />

        <h2 id="logout">7. Logout</h2>
        <pre><code>sdk.<span className="fn">logout</span>()  <span className="cmt">// Clears all credentials and stops token refresh</span></code></pre>
        <p>After logout, you must call <code>activateDevice()</code> again before using any API.</p>

        <hr />

        <h2 id="minimal">Minimal Working Example</h2>
        <div className="sdk-code-header"><span>Kotlin — Complete</span></div>
        <pre><code><span className="cmt">// Application.kt</span>{'\n'}
<span className="kw">class</span> <span className="type">MyApp</span> : <span className="type">Application</span>() {'{'}{'\n'}
    <span className="kw">override fun</span> <span className="fn">onCreate</span>() {'{'}{'\n'}
        <span className="kw">super</span>.<span className="fn">onCreate</span>(){'\n'}
        <span className="type">FyreWaySDK</span>.<span className="fn">initialize</span> {'{'}{'\n'}
            baseUrl = <span className="str">"https://your-api-server.com"</span>{'\n'}
        {'}'}{'\n'}
    {'}'}{'\n'}
{'}'}{'\n'}
{'\n'}
<span className="cmt">// MainViewModel.kt</span>{'\n'}
<span className="kw">class</span> <span className="type">MainViewModel</span> : <span className="type">ViewModel</span>() {'{'}{'\n'}
    <span className="kw">private val</span> sdk = <span className="type">FyreWaySDK</span>.<span className="fn">getInstance</span>(){'\n'}
{'\n'}
    <span className="kw">init</span> {'{'} <span className="fn">activate</span>() {'}'}{'\n'}
{'\n'}
    <span className="kw">private fun</span> <span className="fn">activate</span>() = viewModelScope.<span className="fn">launch</span> {'{'}{'\n'}
        <span className="kw">if</span> (!sdk.<span className="fn">isAuthenticated</span>()) {'{'}{'\n'}
            sdk.<span className="fn">activateDevice</span>(<span className="str">"1.0.0"</span>){'\n'}
        {'}'}{'\n'}
    {'}'}{'\n'}
{'\n'}
    <span className="kw">fun</span> <span className="fn">getServers</span>() = viewModelScope.<span className="fn">launch</span> {'{'}{'\n'}
        <span className="kw">when</span> (<span className="kw">val</span> result = sdk.<span className="fn">getServers</span>()) {'{'}{'\n'}
            <span className="kw">is</span> <span className="type">VpnResult.Success</span> -&gt; {'{'}{'\n'}
                <span className="kw">val</span> servers = result.data.servers{'\n'}
                <span className="cmt">// Display servers to user</span>{'\n'}
            {'}'}{'\n'}
            <span className="kw">is</span> <span className="type">VpnResult.Error</span> -&gt; {'{'} <span className="cmt">/* Handle error */</span> {'}'}{'\n'}
        {'}'}{'\n'}
    {'}'}{'\n'}
{'}'}</code></pre>

        <PageNav 
          prev={{ href: '/sdk/docs/whats-new', title: "What's New" }}
          next={{ href: '/sdk/docs/server-discovery', title: 'Server Discovery' }} 
        />
      </SDKDocsLayout>
    </>
  );
}
