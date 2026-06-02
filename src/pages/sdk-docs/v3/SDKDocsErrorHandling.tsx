import { SDKDocsLayout, PageNav } from '@/components/SDKDocsLayout';
import { SEO } from '@/components/SEO';

export default function SDKDocsErrorHandling() {
  return (
    <>
      <SEO 
        title="Error Handling — FyreWay SDK Docs"
        description="VpnResult pattern, exception hierarchy, user-friendly error messages, retry strategies."
        canonical="/sdk/docs/v3/error-handling"
      />
      <SDKDocsLayout title="Error Handling">
        <h1>Error Handling</h1>
        <p className="sdk-page-description">
          Every SDK operation returns a <code>VpnResult&lt;T&gt;</code> — there are no unchecked exceptions. This makes error handling predictable and exhaustive.
        </p>

        <h2>The VpnResult Pattern</h2>
        <pre><code><span className="kw">sealed class</span> <span className="type">VpnResult</span>&lt;<span className="kw">out</span> <span className="type">T</span>&gt; {'{'}{'\n'}
    <span className="kw">data class</span> <span className="type">Success</span>&lt;<span className="type">T</span>&gt;({'\n'}
        <span className="kw">val</span> data: <span className="type">T</span>,{'\n'}
        <span className="kw">val</span> statusCode: <span className="type">Int</span> = <span className="num">200</span>,{'\n'}
        <span className="kw">val</span> fromCache: <span className="type">Boolean</span> = <span className="kw">false</span>{'\n'}
    ) : <span className="type">VpnResult</span>&lt;<span className="type">T</span>&gt;(){'\n'}
{'\n'}
    <span className="kw">data class</span> <span className="type">Error</span>({'\n'}
        <span className="kw">val</span> exception: <span className="type">FyreWayException</span>,{'\n'}
        <span className="kw">val</span> statusCode: <span className="type">Int</span>? = <span className="kw">null</span>{'\n'}
    ) : <span className="type">VpnResult</span>&lt;<span className="type">Nothing</span>&gt;(){'\n'}
{'}'}</code></pre>

        <h3>Convenience Methods</h3>
        <pre><code><span className="kw">val</span> result = sdk.<span className="fn">getServers</span>(){'\n'}
{'\n'}
result.<span className="fn">getOrNull</span>()                <span className="cmt">// T?</span>{'\n'}
result.<span className="fn">getOrThrow</span>()               <span className="cmt">// T (throws on error)</span>{'\n'}
result.<span className="fn">getOrDefault</span>(fallback)     <span className="cmt">// T</span>{'\n'}
{'\n'}
result{'\n'}
    .<span className="fn">onSuccess</span> {'{'} data -&gt; <span className="fn">displayServers</span>(data.servers) {'}'}{'\n'}
    .<span className="fn">onError</span> {'{'} exception -&gt; <span className="fn">showError</span>(exception) {'}'}</code></pre>

        <hr />

        <h2>Exception Hierarchy</h2>
        <table>
          <thead>
            <tr>
              <th>Exception</th>
              <th>HTTP</th>
              <th>When it occurs</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>NetworkException</code></td>
              <td>—</td>
              <td>No internet, timeout</td>
              <td>Show retry button</td>
            </tr>
            <tr>
              <td><code>AuthenticationException</code></td>
              <td>401</td>
              <td>Token expired or invalid</td>
              <td>Re-call <code>activateDevice()</code></td>
            </tr>
            <tr>
              <td><code>RateLimitException</code></td>
              <td>429</td>
              <td>Too many requests</td>
              <td>Wait <code>retryAfterSeconds</code></td>
            </tr>
            <tr>
              <td><code>ServerNotFoundException</code></td>
              <td>—</td>
              <td>Server unavailable</td>
              <td>Try different server</td>
            </tr>
            <tr>
              <td><code>NoServersAvailableException</code></td>
              <td>—</td>
              <td>No servers match criteria</td>
              <td>Broaden filters</td>
            </tr>
            <tr>
              <td><code>ServerException</code></td>
              <td>5xx</td>
              <td>Backend error</td>
              <td>Retry after delay</td>
            </tr>
            <tr>
              <td><code>ValidationException</code></td>
              <td>400</td>
              <td>Invalid request parameters</td>
              <td>Fix input data</td>
            </tr>
            <tr>
              <td><code>NotInitializedException</code></td>
              <td>—</td>
              <td>SDK not initialized</td>
              <td>Call <code>FyreWaySDK.initialize()</code></td>
            </tr>
            <tr>
              <td><code>ProtocolNotSupportedException</code></td>
              <td>—</td>
              <td>Server doesn't support protocol</td>
              <td>Use compatible server</td>
            </tr>
            <tr>
              <td><code>ServiceUnavailableException</code></td>
              <td>503</td>
              <td>Backend maintenance</td>
              <td>Retry later</td>
            </tr>
            <tr>
              <td><code>InvalidFilterValueException</code></td>
              <td>400</td>
              <td>Filter value not in registry constants after auto-retry</td>
              <td>Reload filter picker from fresh constants</td>
            </tr>
          </tbody>
        </table>

        <hr />

        <h2>The ErrorMessageMapper</h2>
        <p>
          The SDK source code in this repository includes <code>ErrorMessageMapper</code> under <code>com.fyreway.vpn.sdk.util</code>.
          It maps <code>FyreWayException</code> types to user-friendly strings, titles, suggested actions, and retryability hints.
        </p>
        <pre><code><span className="kw">when</span> (<span className="kw">val</span> result = sdk.<span className="fn">getServers</span>()) {'{'}{'\n'}
    <span className="kw">is</span> <span className="type">VpnResult.Error</span> -&gt; {'{'}{'\n'}
        <span className="kw">val</span> message = <span className="type">ErrorMessageMapper</span>.<span className="fn">getMessage</span>(result.exception){'\n'}
        <span className="cmt">// "No internet connection. Please check your network."</span>{'\n'}
{'\n'}
        <span className="kw">val</span> title = <span className="type">ErrorMessageMapper</span>.<span className="fn">getTitle</span>(result.exception){'\n'}
        <span className="cmt">// "Connection Error"</span>{'\n'}
{'\n'}
        <span className="kw">val</span> action = <span className="type">ErrorMessageMapper</span>.<span className="fn">getSuggestedAction</span>(result.exception){'\n'}
        <span className="cmt">// "Check your internet connection and try again"</span>{'\n'}
{'\n'}
        <span className="kw">val</span> retryable = <span className="type">ErrorMessageMapper</span>.<span className="fn">isRetryable</span>(result.exception){'\n'}
    {'}'}{'\n'}
    <span className="kw">is</span> <span className="type">VpnResult.Success</span> -&gt; {'{'} <span className="cmt">/* ... */</span> {'}'}{'\n'}
{'}'}</code></pre>

        <hr />

        <h2>Handling Specific Exceptions</h2>
        <pre><code><span className="kw">when</span> (<span className="kw">val</span> result = sdk.<span className="fn">smartConnect</span>()) {'{'}{'\n'}
    <span className="kw">is</span> <span className="type">VpnResult.Success</span> -&gt; {'{'}{'\n'}
        <span className="fn">connectToServer</span>(result.data.server){'\n'}
    {'}'}{'\n'}
    <span className="kw">is</span> <span className="type">VpnResult.Error</span> -&gt; {'{'}{'\n'}
        <span className="kw">when</span> (result.exception) {'{'}{'\n'}
            <span className="kw">is</span> <span className="type">NetworkException</span> -&gt; {'{'}{'\n'}
                <span className="fn">showOfflineMessage</span>(){'\n'}
                <span className="fn">enableRetryButton</span>(){'\n'}
            {'}'}{'\n'}
            <span className="kw">is</span> <span className="type">AuthenticationException</span> -&gt; {'{'}{'\n'}
                <span className="cmt">// Token expired, re-activate</span>{'\n'}
                sdk.<span className="fn">activateDevice</span>(<span className="str">"1.0.0"</span>){'\n'}
            {'}'}{'\n'}
            <span className="kw">is</span> <span className="type">RateLimitException</span> -&gt; {'{'}{'\n'}
                <span className="kw">val</span> waitSecs = result.exception.retryAfterSeconds{'\n'}
                <span className="fn">scheduleRetry</span>(waitSecs){'\n'}
            {'}'}{'\n'}
            <span className="kw">is</span> <span className="type">NoServersAvailableException</span> -&gt; {'{'}{'\n'}
                <span className="cmt">// Returned when /optimal returns 503 (no servers match filters)</span>{'\n'}
                <span className="fn">showNoServersMessage</span>(){'\n'}
                <span className="fn">suggestBroadenFilters</span>(){'\n'}
            {'}'}{'\n'}
            <span className="kw">is</span> <span className="type">InvalidFilterValueException</span> -&gt; {'{'}{'\n'}
                <span className="cmt">// Filter value invalid even after auto-retry + constants refresh</span>{'\n'}
                <span className="kw">val</span> badParam = result.exception.paramName    <span className="cmt">// e.g. "tier"</span>{'\n'}
                <span className="kw">val</span> badVal   = result.exception.invalidValue  <span className="cmt">// e.g. "gold"</span>{'\n'}
                <span className="fn">showFilterError</span>(<span className="str">"Unknown ${'$'}{'{'}badParam{'}'} value '${'$'}{'{'}badVal{'}'}'. Please reselect."</span>){'\n'}
                <span className="fn">reloadFilterPickerFromConstants</span>(){'\n'}
            {'}'}{'\n'}
            <span className="kw">else</span> -&gt; {'{'}{'\n'}
                <span className="fn">showGenericError</span>(<span className="type">ErrorMessageMapper</span>.<span className="fn">getMessage</span>(result.exception)){'\n'}
            {'}'}{'\n'}
        {'}'}{'\n'}
    {'}'}{'\n'}
{'}'}</code></pre>

        <hr />

        <h2>Troubleshooting — activation security failures</h2>
        <p>
          If <code>activateDevice()</code> fails unexpectedly, the SDK configuration and the Layer 0 authentication mode are common causes.
          The SDK supports <code>SdkAuthMode.TOTP</code>, <code>CHALLENGE</code>, and <code>PLAY_INTEGRITY</code>.
        </p>
        <ul>
          <li>
            <strong>TOTP clock skew</strong>: TOTP uses time windows. If the device time is incorrect, activation can fail. The SDK logs TOTP window details during activation to help diagnose this.
          </li>
          <li>
            <strong>Missing secrets / customer ID</strong>: in production builds, <code>FyreWayConfig.Builder.build()</code> validates that required security fields are present.
          </li>
          <li>
            <strong>Play Integrity prerequisites</strong>: Play Integrity mode requires Android <code>Context</code> and the Play Integrity dependency in the app. If the dependency is missing or the app is not distributed via Google Play, the SDK surfaces an error indicating Play Integrity is unavailable.
          </li>
        </ul>

        <h2>Classification Filter Errors</h2>
        <p>
          When you pass a <code>tier</code>, <code>protocol</code>, <code>platform</code>, or <code>category</code> filter value the backend doesn't recognise, the SDK performs an automatic recovery sequence before surfacing an error to your code.
        </p>
        <table>
          <thead>
            <tr>
              <th>HTTP Code</th>
              <th>Trigger</th>
              <th>SDK Automatic Action</th>
              <th>What you see</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>400</code></td>
              <td>Invalid <code>tier</code> / <code>protocol</code> / <code>platform</code> / <code>category</code> value</td>
              <td>Refresh constants, retry request once</td>
              <td>Success (if retry works) or <code>InvalidFilterValueException</code></td>
            </tr>
            <tr>
              <td><code>503</code> from <code>/optimal</code></td>
              <td>No servers match the filter combination</td>
              <td>None — map to exception</td>
              <td><code>NoServersAvailableException</code></td>
            </tr>
            <tr>
              <td><code>503</code> from other endpoints</td>
              <td>Backend maintenance or overload</td>
              <td>None</td>
              <td><code>ServiceUnavailableException</code></td>
            </tr>
            <tr>
              <td><code>404</code> from ranking</td>
              <td>Country/city has no servers</td>
              <td>None</td>
              <td><code>ServerNotFoundException</code></td>
            </tr>
          </tbody>
        </table>

        <pre><code><span className="cmt">// The SDK handles this transparently — you only see the final result</span>{'\n'}
<span className="kw">val</span> result = sdk.<span className="fn">getServers</span>(filter = <span className="type">ServerFilter</span>(tier = userSelectedTier)){'\n'}
{'\n'}
<span className="kw">when</span> (result) {'{'}{'\n'}
    <span className="kw">is</span> <span className="type">VpnResult.Success</span> -&gt; <span className="fn">displayServers</span>(result.data.servers)         <span className="cmt">// May have been a retry</span>{'\n'}
    <span className="kw">is</span> <span className="type">VpnResult.Error</span>   -&gt; {'{'}{'\n'}
        <span className="kw">if</span> (result.exception <span className="kw">is</span> <span className="type">InvalidFilterValueException</span>) {'{'}{'\n'}
            <span className="cmt">// Force fresh constants and rebuild the UI picker</span>{'\n'}
            sdk.<span className="fn">getRegistryConstants</span>(forceRefresh = <span className="kw">true</span>){'\n'}
        {'}'}{'\n'}
    {'}'}{'\n'}
{'}'}</code></pre>

        <hr />

        <h2>Retry Logic</h2>
        <pre><code><span className="kw">suspend fun</span> &lt;<span className="type">T</span>&gt; <span className="fn">retryWithBackoff</span>({'\n'}
    times: <span className="type">Int</span> = <span className="num">3</span>,{'\n'}
    initialDelay: <span className="type">Long</span> = <span className="num">1000</span>,{'\n'}
    maxDelay: <span className="type">Long</span> = <span className="num">10000</span>,{'\n'}
    factor: <span className="type">Double</span> = <span className="num">2.0</span>,{'\n'}
    block: <span className="kw">suspend</span> () -&gt; <span className="type">VpnResult</span>&lt;<span className="type">T</span>&gt;{'\n'}
): <span className="type">VpnResult</span>&lt;<span className="type">T</span>&gt; {'{'}{'\n'}
    <span className="kw">var</span> currentDelay = initialDelay{'\n'}
    <span className="kw">repeat</span>(times - <span className="num">1</span>) {'{'}{'\n'}
        <span className="kw">val</span> result = <span className="fn">block</span>(){'\n'}
        <span className="kw">if</span> (result <span className="kw">is</span> <span className="type">VpnResult.Success</span>) <span className="kw">return</span> result{'\n'}
        <span className="kw">if</span> (!<span className="type">ErrorMessageMapper</span>.<span className="fn">isRetryable</span>((result <span className="kw">as</span> <span className="type">VpnResult.Error</span>).exception)) {'{'}{'\n'}
            <span className="kw">return</span> result{'\n'}
        {'}'}{'\n'}
        <span className="fn">delay</span>(currentDelay){'\n'}
        currentDelay = (currentDelay * factor).<span className="fn">toLong</span>().<span className="fn">coerceAtMost</span>(maxDelay){'\n'}
    {'}'}{'\n'}
    <span className="kw">return</span> <span className="fn">block</span>(){'\n'}
{'}'}{'\n'}
{'\n'}
<span className="cmt">// Usage</span>{'\n'}
<span className="kw">val</span> result = <span className="fn">retryWithBackoff</span> {'{'} sdk.<span className="fn">getServers</span>() {'}'}</code></pre>

        <hr />

        <h2>Best Practices</h2>
        <table>
          <thead>
            <tr>
              <th>✅ Do</th>
              <th>❌ Don't</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Handle every <code>VpnResult.Error</code></td>
              <td>Ignore errors silently</td>
            </tr>
            <tr>
              <td>Use <code>ErrorMessageMapper</code> for user-facing text</td>
              <td>Show raw exception messages to users</td>
            </tr>
            <tr>
              <td>Check <code>isRetryable()</code> before retrying</td>
              <td>Retry non-retryable errors endlessly</td>
            </tr>
            <tr>
              <td>Use <code>viewModelScope.launch</code> for SDK calls</td>
              <td>Use <code>runBlocking</code> on the main thread</td>
            </tr>
            <tr>
              <td>Re-authenticate on <code>AuthenticationException</code></td>
              <td>Assume tokens never expire</td>
            </tr>
          </tbody>
        </table>

        <hr />

        <h2>Logging Errors</h2>
        <pre><code><span className="kw">when</span> (<span className="kw">val</span> result = sdk.<span className="fn">someOperation</span>()) {'{'}{'\n'}
    <span className="kw">is</span> <span className="type">VpnResult.Error</span> -&gt; {'{'}{'\n'}
        <span className="type">Log</span>.<span className="fn">e</span>({'\n'}
            <span className="str">"VPN"</span>,{'\n'}
            <span className="str">"Operation failed: ${'{'}result.exception.javaClass.simpleName{'}'}"</span>,{'\n'}
            result.exception{'\n'}
        ){'\n'}
{'\n'}
        <span className="cmt">// Optional: Send to crash reporting</span>{'\n'}
        <span className="type">Crashlytics</span>.<span className="fn">recordException</span>(result.exception){'\n'}
    {'}'}{'\n'}
    <span className="kw">is</span> <span className="type">VpnResult.Success</span> -&gt; {'{'} <span className="cmt">/* ... */</span> {'}'}{'\n'}
{'}'}</code></pre>

        <PageNav 
          prev={{ href: '/sdk/docs/v3/smart-connect', title: 'Smart Connect' }}
          next={{ href: '/sdk/docs/v3/ui-utilities', title: 'UI Utilities' }} 
        />
      </SDKDocsLayout>
    </>
  );
}
