# VPN Landing Page for Sales

A modern, responsive landing page for VPN services with comprehensive infrastructure management capabilities. Built with React, TypeScript, and Vite for optimal performance.

## 🌟 Features

### Landing Page
- **Modern Hero Section**: Eye-catching hero with CTA buttons
- **Feature Highlights**: Showcase VPN benefits and key features
- **Use Cases Section**: Real-world scenarios for VPN usage
- **How It Works**: Step-by-step guide to using the service
- **Pricing Plans**: Multiple subscription tiers with comparisons
- **Server Demographics**: Global server locations and statistics
- **FAQ Section**: Common questions and answers
- **Call-to-Action Sections**: Multiple conversion opportunities
- **Dark Mode Support**: Theme toggle for user preference
- **Fully Responsive**: Optimized for mobile, tablet, and desktop

### Infrastructure Management
- **Redis Sentinel Clusters**: Deploy and manage high-availability Redis clusters
- **VPN Server Deployment**: Manage WireGuard-based VPN infrastructure
- **Kafka Clusters**: Support for distributed message streaming
- **Multi-Cloud Support**: DigitalOcean integration
- **Real-Time Deployment Tracking**: Monitor infrastructure provisioning
- **Role-Based Access Control**: Secure multi-organization support
- **TLS/SSL Management**: Certificate handling for secure connections

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.3.1
- **Language**: TypeScript 5.8
- **Build Tool**: Vite 5.4
- **Styling**: Tailwind CSS 3.4
- **UI Components**: Shadcn/ui + Radix UI
- **Routing**: React Router DOM 6.30
- **State Management**: TanStack React Query 5.83
- **Form Handling**: React Hook Form 7.61 + Zod validation
- **Icons**: Lucide React 0.462
- **Charts**: Recharts 2.15
- **Theme Support**: Next Themes 0.3
- **Notifications**: Sonner 1.7
- **Package Manager**: Bun

## 📋 Prerequisites

- **Node.js**: v18.0.0 or higher
- **Bun**: v1.0.0 or higher (optional, can use npm/yarn)
- **Git**: For version control

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd vpn-landing-for-sales
```

### 2. Install Dependencies

Using Bun:
```bash
bun install
```

Or using npm:
```bash
npm install
```

### 3. Start Development Server

```bash
bun dev
# or
npm run dev
```

The application will be available at `http://localhost:8080`

### 4. Build for Production

```bash
bun run build
# or
npm run build
```

### 5. Preview Production Build

```bash
bun run preview
# or
npm run preview
```


## 🎨 Styling & Theming

### Tailwind CSS

The project uses Tailwind CSS for utility-first styling. Configuration is in `tailwind.config.ts`.

### Dark Mode

Dark mode support is built-in using `next-themes`. Toggle is available in the header via `ThemeToggle.tsx`.

### Custom Colors

Modify the theme colors in `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      // Your custom colors here
    }
  }
}
```

## 🔧 Available Scripts

### Development

```bash
# Start dev server
bun dev

# Start with component tagging (for Lovable integration)
bun run dev

# Linting
bun run lint

# Linting with auto-fix
bun run lint --fix
```

### Production

```bash
# Build optimized production bundle
bun run build

# Build for development with component tagging
bun run build:dev

# Preview production build locally
bun run preview
```

## 📦 Deployment

### Deploy to Vercel

The project includes a `vercel.json` configuration file for proper routing handling on Vercel.

#### Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Git Repository**: Push your code to GitHub/GitLab/Bitbucket
3. **Environment Variables**: Configure if needed

#### Deployment Steps

1. **Push to Git**:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Select your Git repository
   - Vercel auto-detects Vite configuration
   - Click "Deploy"

3. **Environment Variables** (if needed):
   - Add in Vercel Project Settings → Environment Variables
   - Redeploy to apply changes

4. **Custom Domain** (optional):
   - Project Settings → Domains
   - Add your custom domain
   - Follow DNS configuration steps

#### Important: Client-Side Routing Setup

⚠️ **Critical for React Router**: The `vercel.json` file is included to handle client-side routing:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This ensures that all routes (like `/infrastructure`) are properly handled by React Router instead of returning 404 errors.

**If you encounter 404 errors after deployment**, ensure:
1. `vercel.json` is committed to your repository
2. Vercel has redeployed after the file was added
3. Cache is cleared (CTRL+SHIFT+R or CMD+SHIFT+R)

### Other Hosting Options

#### Netlify

1. Connect GitHub repository at [netlify.com](https://netlify.com)
2. Set build command: `bun run build` (or `npm run build`)
3. Set publish directory: `dist`
4. Add `_redirects` file (Netlify equivalent):

```
/*    /index.html    200
```

#### Traditional Hosting (Apache/Nginx)

1. Build: `bun run build`
2. Upload `dist/` folder contents to your server
3. Configure web server to rewrite all routes to `index.html`

**Apache `.htaccess`**:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

**Nginx**:
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

## 🗂️ Pages & Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `Index.tsx` | Landing page with all sections |
| `/infrastructure` | `Infrastructure.tsx` | Infrastructure management dashboard |
| `*` | `NotFound.tsx` | 404 Not Found page |

## 🎯 Infrastructure Management

For detailed documentation about infrastructure features, Redis clusters, VPN servers, and Kafka management, see [INFRASTRUCTURE_DOCUMENTATION.md](./INFRASTRUCTURE_DOCUMENTATION.md).

### Quick Infrastructure Features

- **Deploy Redis Clusters**: High-availability Redis with Sentinel support
- **Manage VPN Servers**: WireGuard-based VPN infrastructure
- **Real-Time Progress**: Monitor deployments with live progress tracking
- **Multi-Region Support**: Deploy across multiple cloud regions
- **RBAC**: Role-based access control for security

## 🧪 Development Guidelines

### Component Best Practices

1. **Use TypeScript**: Always define prop types
   ```typescript
   interface Props {
     title: string;
     onClick: () => void;
   }
   
   const MyComponent: React.FC<Props> = ({ title, onClick }) => {
     return <button onClick={onClick}>{title}</button>;
   };
   ```

2. **Use Hooks**: Leverage custom hooks for reusable logic
   ```typescript
   const MyComponent = () => {
     const { isMobile } = useIsMobile();
     return isMobile ? <MobileView /> : <DesktopView />;
   };
   ```

3. **Shadcn Components**: Use pre-built UI components
   ```typescript
   import { Button } from "@/components/ui/button";
   
   <Button variant="outline">Click me</Button>
   ```

### Code Quality

- **Linting**: Run `bun run lint` before commits
- **Type Safety**: Enable strict TypeScript checks
- **Naming Conventions**:
  - Components: PascalCase (`MyComponent.tsx`)
  - Utils: camelCase (`myUtility.ts`)
  - Constants: UPPER_SNAKE_CASE (`API_URL`)

## 🔐 Security

- **Input Validation**: Zod for schema validation
- **XSS Protection**: React's built-in XSS protection
- **Environment Variables**: Use `.env` for sensitive data
- **HTTPS**: Always use HTTPS in production
- **CORS**: Configure proper CORS headers on backend

## 🐛 Troubleshooting

### Common Issues

#### 404 Error on Routes After Deployment

**Problem**: Routes like `/infrastructure` return 404

**Solution**: 
- Ensure `vercel.json` is committed
- Check that rewrites are configured correctly
- Clear browser cache and redeploy

#### Styles Not Loading

**Problem**: Tailwind CSS styles missing

**Solution**:
- Restart dev server: `bun dev`
- Clear `.next` or `dist` folder
- Check `tailwind.config.ts` for proper file paths

#### Theme Not Persisting

**Problem**: Dark mode preference not saved

**Solution**:
- Check browser LocalStorage is enabled
- Verify `next-themes` provider is wrapping app
- Check console for errors

#### Build Fails with TypeScript Errors

**Problem**: `bun run build` fails

**Solution**:
```bash
# Run linting
bun run lint --fix

# Check TypeScript
bunx tsc --noEmit

# Clean and rebuild
rm -rf dist node_modules
bun install
bun run build
```

## 📚 Resources

### Documentation
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Vite Guide](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Shadcn/ui](https://ui.shadcn.com)
- [React Router](https://reactrouter.com)

### Infrastructure
- [DigitalOcean Docs](https://docs.digitalocean.com)
- [Redis Sentinel](https://redis.io/docs/management/sentinel)
- [WireGuard](https://www.wireguard.com)
- [Kafka Documentation](https://kafka.apache.org/documentation)

## 🤝 Contributing

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature
   ```

2. **Make your changes** and commit:
   ```bash
   git commit -am "Add your feature"
   ```

3. **Push to branch**:
   ```bash
   git push origin feature/your-feature
   ```

4. **Submit a Pull Request** with detailed description

## 📝 License

This project is proprietary. All rights reserved.

## 📞 Support

For issues, questions, or suggestions:

1. Check [INFRASTRUCTURE_DOCUMENTATION.md](./INFRASTRUCTURE_DOCUMENTATION.md) for detailed guides
2. Review common troubleshooting section above
3. Check browser console for errors
4. Contact the development team

## 🗂️ Environment Variables

Create a `.env` file if needed (example):

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_INFRASTRUCTURE_API_BASE_URL=http://localhost:3001/api
```

Available variables are prefixed with `VITE_` and are exposed to the frontend.

## 📦 Dependencies Overview

| Package | Version | Purpose |
|---------|---------|---------|
| react | 18.3.1 | UI library |
| typescript | 5.8 | Type safety |
| vite | 5.4.19 | Build tool |
| tailwindcss | 3.4.17 | Styling |
| react-router-dom | 6.30.1 | Client-side routing |
| @tanstack/react-query | 5.83.0 | Data fetching |
| react-hook-form | 7.61.1 | Form management |
| zod | 3.25.76 | Validation |
| recharts | 2.15.4 | Charts/graphs |

See `package.json` for the complete dependency list.

---

**Last Updated**: December 18, 2025  
**Version**: 1.0.0  
**Status**: Production Ready ✅