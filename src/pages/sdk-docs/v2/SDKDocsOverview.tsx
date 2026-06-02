import { SDKDocsLayout, PageNav, Badge, MermaidDiagram } from '@/components/SDKDocsLayout';
import { SEO } from '@/components/SEO';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function SDKDocsOverview() {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const architectureChart = `
graph TB
    subgraph YourApp["Your Android App"]
        UI["UI Layer<br/>(Compose / XML)"]
        VM["ViewModel"]
    end
    subgraph SDK["FyreWay VPN SDK"]
        Client["FyreWayClient<br/><i>Single entry point</i>"]
        DevAPI["Device API"]
        SrvAPI["Server API"]
        LocAPI["Location API"]
        ConnAPI["Connection API"]
        ProfAPI["Profile API"]
        SmartAPI["Smart Connect API"]
        Providers["UI Providers"]
        Utils["Utilities"]
    end
    Backend["FyreWay Backend<br/>(HTTPS)"]
    Tunnel["VPN Tunnel<br/><i>Your WireGuard/OpenVPN</i>"]
    UI --- VM
    VM --> Client
    Client --> DevAPI
    Client --> SrvAPI
    Client --> LocAPI
    Client --> ConnAPI
    Client --> ProfAPI
    Client --> SmartAPI
    Client --> Providers
    Client --> Utils
    SDK --> Backend
    VM --> Tunnel
  `;

  return (
    <>
      <SEO 
        title="FyreWay VPN SDK Documentation"
        description="Complete developer guide for FyreWay VPN SDK for Android. Build production-grade VPN apps fast with our comprehensive SDK."
        canonical="/sdk/docs/v2"
        jsonLd={{
          '@type': 'TechArticle',
          headline: 'FyreWay VPN SDK Developer Guide',
          description: 'Complete developer guide for FyreWay VPN SDK for Android',
          author: {
            '@type': 'Organization',
            name: 'FyreWay',
          },
          datePublished: '2026-03-01',
          dateModified: '2026-04-10',
        }}
      />
      <SDKDocsLayout title="Overview">
        <h1>FyreWay VPN SDK</h1>
        <p className="sdk-page-description">
          <Badge>SDK v1.2.0</Badge> &nbsp;·&nbsp; Last Updated: April 2026 &nbsp;·&nbsp; Min Android: API 21
        </p>

        <h2>What Is FyreWay VPN SDK?</h2>
        <p>
          FyreWay VPN SDK is a drop-in Android library that lets you ship a production-grade VPN app 
          without building the backend infrastructure yourself. The SDK handles:
        </p>

        <table>
          <thead>
            <tr>
              <th>Capability</th>
              <th>What it does for you</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Device Activation</strong></td>
              <td>Register devices, manage tokens, handle automatic refresh</td>
            </tr>
            <tr>
              <td><strong>Server Discovery</strong></td>
              <td>Browse, filter, and search VPN servers by country, city, region, protocol, tier, platform, and category</td>
            </tr>
            <tr>
              <td><strong>Smart Connect</strong></td>
              <td>One-call optimal server selection with strategies for streaming, gaming, P2P, low latency, and category-specific use cases</td>
            </tr>
            <tr>
              <td><strong>Profile Management</strong></td>
              <td>Create, store, export, and revoke WireGuard & OpenVPN profiles</td>
            </tr>
            <tr>
              <td><strong>Connection Reporting</strong></td>
              <td>Report connect/disconnect events for session tracking and analytics</td>
            </tr>
            <tr>
              <td><strong>UI Helpers</strong></td>
              <td>Pre-formatted display models, country flags, load/latency formatters, location pickers</td>
            </tr>
          </tbody>
        </table>

        <p>
          You bring your own VPN tunnel implementation (WireGuard/OpenVPN library of your choice). 
          The SDK manages everything around it — server selection, credential provisioning, session lifecycle, and analytics.
        </p>

        {/* Video Section */}
        <div className="sdk-video-section">
          <div className="sdk-video-section-label">
            <span className="sdk-vs-pill">▶ Watch</span>
            <span className="sdk-vs-title">SDK Co-Pilot — 2-minute overview</span>
          </div>
          <div className="sdk-video-player-wrap">
            <video
              controls
              preload="metadata"
              poster="/sdk-docs/resources/FyreWay VPN Android SDK Developer Guide.png"
            >
              <source src="/sdk-docs/resources/FyreWay_SDK__Your_Co-Pilot.mp4" type="video/mp4" />
              <p>
                Your browser doesn't support HTML5 video —{' '}
                <a href="/sdk-docs/resources/FyreWay_SDK__Your_Co-Pilot.mp4">download the video</a> instead.
              </p>
            </video>
          </div>
        </div>

        <hr />

        <h2>Supported VPN Protocols</h2>
        <table>
          <thead>
            <tr>
              <th>Protocol</th>
              <th>Config Format</th>
              <th>Default Port</th>
              <th>SDK Constant</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>WireGuard</strong></td>
              <td><code>.conf</code></td>
              <td>51820</td>
              <td><code>VpnProtocol.WIREGUARD</code></td>
            </tr>
            <tr>
              <td><strong>OpenVPN</strong></td>
              <td><code>.ovpn</code></td>
              <td>1194</td>
              <td><code>VpnProtocol.OPENVPN</code></td>
            </tr>
          </tbody>
        </table>
        <p>Both protocols are first-class citizens throughout the SDK — from server filtering to profile creation to connection reporting.</p>

        <hr />

        <h2>Architecture</h2>
        <p>The SDK sits between your app and the FyreWay backend. Your app never talks to the backend directly.</p>
        
        <MermaidDiagram chart={architectureChart} />

        <h3>Key Design Principles</h3>
        <ul>
          <li><strong>Singleton access</strong> — Initialize once, access anywhere via <code>FyreWaySDK.getInstance()</code></li>
          <li><strong>Coroutines-first</strong> — All network calls are <code>suspend</code> functions (Java wrapper with callbacks available)</li>
          <li><strong>Result type</strong> — Every operation returns <code>VpnResult&lt;T&gt;</code> (Success or Error) — no unchecked exceptions</li>
          <li><strong>Built-in caching</strong> — Server and location data is cached with configurable policies</li>
          <li><strong>Protocol agnostic</strong> — The same API surface works for WireGuard and OpenVPN</li>
        </ul>

        <hr />

        <h2>What the SDK Does NOT Do</h2>
        <p>The SDK is <strong>not</strong> a VPN tunnel. It does not:</p>
        <ul>
          <li>Establish or manage the OS-level VPN connection</li>
          <li>Implement the WireGuard or OpenVPN protocol</li>
          <li>Provide a <code>VpnService</code> implementation</li>
        </ul>
        <p>You are responsible for:</p>
        <ol>
          <li>Using a tunnel library (e.g., <code>wireguard-android</code>, <code>ics-openvpn</code>) to establish the actual VPN connection</li>
          <li>Using the profile/config returned by the SDK to configure the tunnel</li>
          <li>Calling <code>reportConnected()</code> / <code>reportDisconnected()</code> to keep the backend in sync</li>
        </ol>

        <hr />

        <h2>Requirements</h2>
        <table>
          <thead>
            <tr>
              <th>Requirement</th>
              <th>Minimum</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Android API level</td>
              <td>21 (Android 5.0)</td>
            </tr>
            <tr>
              <td>Kotlin</td>
              <td>1.9.21+</td>
            </tr>
            <tr>
              <td>Gradle</td>
              <td>8.0+</td>
            </tr>
            <tr>
              <td>Java</td>
              <td>8+</td>
            </tr>
            <tr>
              <td>Network</td>
              <td>HTTPS (Internet permission required)</td>
            </tr>
          </tbody>
        </table>

        <hr />

        <h2>Developer Resources</h2>
        <p>Download the full guide or browse the visual reference — everything you need to integrate quickly.</p>

        <div className="sdk-dev-resources">
          {/* Image preview */}
          <div className="sdk-dev-res-image">
            <button 
              className="sdk-img-preview-btn" 
              onClick={() => setLightboxOpen(true)}
              title="Click to enlarge"
            >
              <img
                src="/sdk-docs/resources/FyreWay VPN Android SDK Developer Guide.png"
                alt="FyreWay VPN Android SDK Developer Guide — visual overview"
                loading="lazy"
              />
              <span className="sdk-img-zoom-hint">🔍 Click to enlarge</span>
            </button>
            <div className="sdk-dev-res-img-caption">Visual Developer Guide</div>
          </div>

          {/* Download cards */}
          <div className="sdk-dev-res-downloads">
            <p className="sdk-dev-res-dl-label">Downloads</p>
            <a href="/sdk-docs/resources/FyreWay_VPN_SDK_Guide.pdf" target="_blank" className="sdk-dl-card">
              <span className="sdk-dl-icon">📄</span>
              <div>
                <div className="sdk-dl-name">Developer Guide</div>
                <div className="sdk-dl-meta">PDF · Full reference & API docs</div>
              </div>
              <span className="sdk-dl-arrow">↗</span>
            </a>
            <a href="/sdk-docs/resources/FyreWay_VPN_SDK_Guide.pdf" download className="sdk-dl-card sdk-dl-card-secondary">
              <span className="sdk-dl-icon">⬇</span>
              <div>
                <div className="sdk-dl-name">Download PDF</div>
                <div className="sdk-dl-meta">Save for offline reading</div>
              </div>
            </a>
            <a href="/sdk-docs/resources/FyreWay_VPN_SDK_Guide.pptx" download className="sdk-dl-card">
              <span className="sdk-dl-icon">📊</span>
              <div>
                <div className="sdk-dl-name">SDK Slide Deck</div>
                <div className="sdk-dl-meta">PPTX · Architecture & overview slides</div>
              </div>
              <span className="sdk-dl-arrow">⬇</span>
            </a>
            <a href="/sdk-docs/resources/FyreWay_SDK__Your_Co-Pilot.mp4" download className="sdk-dl-card">
              <span className="sdk-dl-icon">🎬</span>
              <div>
                <div className="sdk-dl-name">Co-Pilot Video</div>
                <div className="sdk-dl-meta">MP4 · Save the overview video</div>
              </div>
              <span className="sdk-dl-arrow">⬇</span>
            </a>
          </div>
        </div>

        {/* Lightbox */}
        {lightboxOpen && (
          <div className="sdk-lightbox open" onClick={() => setLightboxOpen(false)}>
            <button 
              className="sdk-lightbox-close" 
              onClick={(e) => { e.stopPropagation(); setLightboxOpen(false); }}
            >
              ✕
            </button>
            <img
              src="/sdk-docs/resources/FyreWay VPN Android SDK Developer Guide.png"
              alt="FyreWay VPN Android SDK Developer Guide — full size"
              className="sdk-lightbox-img"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}

        <hr />

        <h2>Guide Structure</h2>
        <table>
          <thead>
            <tr>
              <th>Document</th>
              <th>What you'll learn</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><Link to="/sdk/docs/v2/whats-new">What's New — April 2026</Link></td>
              <td>Full changelog and migration guide for SDK v1.2.0</td>
            </tr>
            <tr>
              <td><Link to="/sdk/docs/v2/getting-started">Getting Started</Link></td>
              <td>Install, configure, activate your first device</td>
            </tr>
            <tr>
              <td><Link to="/sdk/docs/v2/server-discovery">Server Discovery</Link></td>
              <td>Browse servers, filter by location/protocol, use caching</td>
            </tr>
            <tr>
              <td><Link to="/sdk/docs/v2/connection-lifecycle">Connection Lifecycle</Link></td>
              <td>End-to-end connect → use → disconnect flow</td>
            </tr>
            <tr>
              <td><Link to="/sdk/docs/v2/smart-connect">Smart Connect</Link></td>
              <td>One-call server selection with strategies</td>
            </tr>
            <tr>
              <td><Link to="/sdk/docs/v2/error-handling">Error Handling</Link></td>
              <td>VpnResult pattern, exception types, retry logic</td>
            </tr>
            <tr>
              <td><Link to="/sdk/docs/v2/ui-utilities">UI Utilities</Link></td>
              <td>Display models, providers, formatters for fast UI building</td>
            </tr>
            <tr>
              <td><Link to="/sdk/docs/v2/configuration">Configuration Reference</Link></td>
              <td>All config options, enums, and ProGuard rules</td>
            </tr>
          </tbody>
        </table>

        <PageNav 
          next={{ href: '/sdk/docs/v2/getting-started', title: 'Getting Started' }} 
        />
      </SDKDocsLayout>
    </>
  );
}
