import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sun, Moon, ArrowLeft, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import '@/styles/sdk-docs.css';

interface SDKDocsLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

const SDK_VERSIONS = [
  { id: 'v3', label: 'v3.0', badge: '' },
  { id: 'v2', label: 'v2.0', badge: '' },
] as const;

type SDKVersionId = typeof SDK_VERSIONS[number]['id'];

const NAV_SLUGS = [
  { slug: '',                   label: 'Overview',            num: '↗' },
  { slug: '/whats-new',         label: "What's New",          num: '★' },
  { slug: '/getting-started',   label: 'Getting Started',     num: '01' },
  { slug: '/server-discovery',  label: 'Server Discovery',    num: '02' },
  { slug: '/connection-lifecycle', label: 'Connection Lifecycle', num: '03' },
  { slug: '/smart-connect',     label: 'Smart Connect',       num: '04' },
  { slug: '/error-handling',    label: 'Error Handling',      num: '05' },
  { slug: '/ui-utilities',      label: 'UI Utilities',        num: '06' },
  { slug: '/configuration',     label: 'Configuration',       num: '07' },
];

function useSDKVersion() {
  const { pathname } = useLocation();
  const match = pathname.match(/^\/sdk\/docs\/(v\d+)(.*)/);
  const versionId = (match?.[1] ?? 'v3') as SDKVersionId;
  const slug = match?.[2] ?? '';
  const basePath = `/sdk/docs/${versionId}`;
  const versionMeta = SDK_VERSIONS.find(v => v.id === versionId) ?? SDK_VERSIONS[0];
  return { versionId, slug, basePath, versionMeta };
}

export function SDKDocsLayout({ children, title }: SDKDocsLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [versionDropdownOpen, setVersionDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { versionId, slug, basePath, versionMeta } = useSDKVersion();

  useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const toggleTheme = useCallback(() => {
    const html = document.documentElement;
    const newTheme = html.classList.contains('dark') ? 'light' : 'dark';
    html.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
    setIsDark(newTheme === 'dark');
  }, []);

  const closeSidebar = () => setSidebarOpen(false);

  const isActive = (href: string) => location.pathname === href;

  const handleVersionSwitch = (targetVersionId: SDKVersionId) => {
    setVersionDropdownOpen(false);
    navigate(`/sdk/docs/${targetVersionId}${slug}`);
  };

  const navItems = NAV_SLUGS.map(item => ({
    href: `${basePath}${item.slug}`,
    label: item.label,
    num: item.num,
  }));

  return (
    <div className="sdk-docs-wrapper">
      {/* Mobile Header */}
      <div className="sdk-mobile-header">
        <div className="sdk-mobile-header-left">
          <button className="sdk-hamburger" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
            <Menu size={22} />
          </button>
        </div>
        <Link to="/" className="sdk-mobile-logo">
          <img
            src={isDark ? "/white.png" : "/black.png"}
            alt="FyreWay"
            className="sdk-mobile-logo-img"
          />
          <span className="sdk-mobile-title">SDK Docs</span>
        </Link>
        <div className="sdk-mobile-header-right">
          <button
            className="sdk-hamburger"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>

      {/* Body: Sidebar + Main Content */}
      <div className="sdk-docs-body">
        {/* Sidebar Overlay */}
        <div
          className={`sdk-sidebar-overlay ${sidebarOpen ? 'open' : ''}`}
          onClick={closeSidebar}
        />

        {/* Sidebar */}
        <aside className={`sdk-sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div className="sdk-sidebar-header">
            <Link to="/" className="sdk-sidebar-logo-link">
              <img
                src={isDark ? "/white.png" : "/black.png"}
                className="sdk-sidebar-logo-img"
                alt="FyreWay Logo"
                width="32"
                height="32"
              />
            </Link>
            <span className="sdk-sidebar-brand">SDK Docs</span>

            {/* Version switcher */}
            <div className="sdk-version-switcher">
              <button
                className="sdk-version-btn"
                onClick={() => setVersionDropdownOpen(v => !v)}
                aria-haspopup="listbox"
                aria-expanded={versionDropdownOpen}
              >
                <span className="sdk-version-label">{versionMeta.label}</span>
                {versionMeta.badge && (
                  <span className="sdk-version-badge">{versionMeta.badge}</span>
                )}
                <ChevronDown size={12} className={`sdk-version-chevron ${versionDropdownOpen ? 'open' : ''}`} />
              </button>

              {versionDropdownOpen && (
                <>
                  <div
                    className="sdk-version-backdrop"
                    onClick={() => setVersionDropdownOpen(false)}
                  />
                  <ul className="sdk-version-dropdown" role="listbox">
                    {SDK_VERSIONS.map(v => (
                      <li key={v.id} role="option" aria-selected={v.id === versionId}>
                        <button
                          className={`sdk-version-option ${v.id === versionId ? 'active' : ''}`}
                          onClick={() => handleVersionSwitch(v.id)}
                        >
                          <span>{v.label}</span>
                          {v.badge && (
                            <span className="sdk-version-badge">{v.badge}</span>
                          )}
                          {v.id === versionId && <span className="sdk-version-check">✓</span>}
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>

          <nav className="sdk-sidebar-nav">
            <div className="sdk-sidebar-section">
              <div className="sdk-sidebar-section-title">Guide</div>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`sdk-sidebar-link ${isActive(item.href) ? 'active' : ''}`}
                  onClick={closeSidebar}
                >
                  <span className="nav-num">{item.num}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          <div className="sdk-sidebar-footer">
            © 2026 FyreWay · <Link to="/">fyreway.com</Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="sdk-main-content">
          <div className="sdk-top-bar">
            <div className="sdk-breadcrumb">
              <Link to="/">FyreWay</Link>
              <span className="sep">/</span>
              <Link to={basePath}>SDK Docs</Link>
              <span className="sep">/</span>
              <span>{title}</span>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft size={16} />
                  Back to Site
                </Button>
              </Link>
              <button
                onClick={toggleTheme}
                className="sdk-hamburger p-2 rounded-lg border border-border hover:bg-muted transition-colors"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </div>

          <div className="sdk-content">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

// Reusable components for SDK docs

interface CodeBlockProps {
  title?: string;
  children: React.ReactNode;
}

export function CodeBlock({ title, children }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const codeElement = document.querySelector(`[data-code-block="${title}"]`);
    if (codeElement) {
      await navigator.clipboard.writeText(codeElement.textContent || '');
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <>
      {title && (
        <div className="sdk-code-header">
          <span>{title}</span>
          <button className="sdk-copy-btn" onClick={handleCopy}>
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      )}
      <pre data-code-block={title}>
        <code>{children}</code>
      </pre>
    </>
  );
}

interface PageNavProps {
  prev?: { href: string; title: string };
  next?: { href: string; title: string };
}

export function PageNav({ prev, next }: PageNavProps) {
  return (
    <div className="sdk-page-nav">
      {prev ? (
        <Link to={prev.href}>
          <span className="nav-label">← Previous</span>
          <span className="nav-title">{prev.title}</span>
        </Link>
      ) : (
        <div />
      )}
      {next && (
        <Link to={next.href} className="next">
          <span className="nav-label">Next →</span>
          <span className="nav-title">{next.title}</span>
        </Link>
      )}
    </div>
  );
}

export function Badge({ children }: { children: React.ReactNode }) {
  return <span className="sdk-badge">{children}</span>;
}

export function MermaidDiagram({ chart }: { chart: string }) {
  const [rendered, setRendered] = useState(false);
  const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

  useEffect(() => {
    const loadMermaid = async () => {
      try {
        const mermaid = await import('mermaid');
        const isDark = document.documentElement.classList.contains('dark');

        mermaid.default.initialize({
          startOnLoad: false,
          theme: isDark ? 'dark' : 'default',
          themeVariables: {
            primaryColor: '#0891b2',
            primaryTextColor: '#fff',
            lineColor: '#64748b',
          },
        });

        const element = document.getElementById(id);
        if (element && !rendered) {
          const { svg } = await mermaid.default.render(`${id}-svg`, chart);
          element.innerHTML = svg;
          setRendered(true);
        }
      } catch (error) {
        console.error('Mermaid rendering error:', error);
      }
    };

    loadMermaid();
  }, [chart, id, rendered]);

  return (
    <div className="sdk-mermaid-wrapper">
      <div id={id} className="mermaid" />
    </div>
  );
}
