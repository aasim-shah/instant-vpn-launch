# Blog System — Complete Developer Documentation

> A comprehensive guide for understanding and replicating the blog system used in this application in any new React/Vite project.

---

## Table of Contents

1. [Overview](#1-overview)
2. [Architecture Diagram](#2-architecture-diagram)
3. [MongoDB Models (Backend)](#3-mongodb-models-backend)
4. [API Flow](#4-api-flow)
5. [Frontend: Blog Listing Page (`/blog`)](#5-frontend-blog-listing-page-blog)
6. [Frontend: Blog Detail Page (`/blog/:slug`)](#6-frontend-blog-detail-page-blogslug)
7. [Content Management Flow](#7-content-management-flow)
8. [Reusability Guide — Files to Copy](#8-reusability-guide--files-to-copy)
9. [Migration Guide — Step-by-Step](#9-migration-guide--step-by-step)

---

## 1. Overview

The blog system follows a **frontend-CMS decoupled architecture**:

- The **frontend** (React + Vite + TypeScript) is a pure consumer — it fetches, caches, and displays blog content.
- The **backend CMS API** (separate Node.js/Express service) owns the MongoDB data and exposes public REST endpoints.
- The frontend **never writes** to the CMS; all content is managed through the backend's admin interface.

### Tech stack summary

| Layer | Technology |
|---|---|
| Frontend framework | React 18 + Vite 5 |
| Routing | React Router DOM v6 |
| Data fetching / caching | TanStack React Query v5 |
| HTTP client | Axios v1 |
| Styling | Tailwind CSS v3 + shadcn/ui |
| Backend CMS | Node.js / Express (separate repo) |
| Database | MongoDB (accessed only through CMS API) |
| SEO | Custom imperative `<SEO>` component |

### Key design decisions

- **All blog routes are lazy-loaded** (`React.lazy`) so they add zero weight to the initial bundle.
- **React Query** handles caching, background refetching, and stale-while-revalidate patterns — no manual `useEffect` data fetching.
- **SEO meta tags are written imperatively** via `document.head` manipulation, not via a `<Helmet>` library, keeping the dependency count low.
- **Image URLs from the API are relative paths**; a `getAbsoluteImageUrl()` helper converts them to absolute URLs before storing them in React Query's cache.

---

## 2. Architecture Diagram

```
Browser
  │
  ├─ /blog          → BlogListing.tsx
  │                     └─ usePublishedBlogs()  ──► GET /api/v1/cms/blogs/public?page=&limit=&search=&category=
  │                     └─ useBlogCategories()  ──► GET /api/v1/cms/blogs/public/categories
  │
  └─ /blog/:slug    → BlogDetail.tsx
                        └─ useBlogBySlug(slug)   ──► GET /api/v1/cms/blogs/public/:slug
                        └─ useRelatedBlogs(id)   ──► GET /api/v1/cms/blogs/public/:id/related


React Query Cache (in-memory)
  ├─ ['cms','blogs','list', params]   stale: 5 min  gc: 30 min
  ├─ ['cms','blogs','detail', slug]   stale: 5 min
  ├─ ['cms','blogs','categories']     stale: 15 min
  └─ ['cms','blogs','related', id]    stale: 5 min


CMS REST API  (https://infra-api-prod.fyreway.com)
  └─ MongoDB
       └─ blogs collection
```

---

## 3. MongoDB Models (Backend)

> The frontend never connects to MongoDB directly. These schemas are inferred from the TypeScript types in `src/types/cms.ts`, which mirror the backend models exactly.

### 3.1 Blog Schema

```javascript
// backend/models/Blog.js  (inferred schema)
const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subTitle: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,       // enforced by unique index
      lowercase: true,
      trim: true,
      // e.g. "building-scalable-vpn-infrastructure"
    },
    summary: {
      type: String,
      required: true,
      // Short excerpt shown on listing cards and in <meta description>
    },
    content: {
      type: String,
      required: true,
      // Full HTML string — rendered with dangerouslySetInnerHTML
    },
    featuredImage: {
      type: String,
      // Stored as a relative path, e.g. "/uploads/blogs/hero.png"
      // The frontend converts this to an absolute URL
    },
    author: {
      name:   { type: String, required: true },
      avatar: { type: String },   // relative path or absolute URL
      bio:    { type: String },
    },
    categories: {
      type: [String],
      enum: [
        'engineering', 'security', 'technical', 'tutorial',
        'development', 'monitoring', 'company-news', 'product-updates', 'other',
      ],
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
      index: true,        // queried on every listing request
    },
    publishedAt: {
      type: Date,
      // Set when status transitions to 'published'
    },
    readTime: {
      type: Number,
      // Minutes — calculated by the CMS admin or set manually
    },
    metaTitle: {
      type: String,
      // Overrides title in <title> tag if set
    },
    metaDescription: {
      type: String,
      // Overrides summary in <meta description> if set
    },
    viewCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,   // adds createdAt + updatedAt automatically
  }
);

// Indexes
BlogSchema.index({ slug: 1 }, { unique: true });
BlogSchema.index({ status: 1, publishedAt: -1 });   // listing queries
BlogSchema.index({ categories: 1 });                // category filter
BlogSchema.index({ tags: 1 });                      // tag filter

module.exports = mongoose.model('Blog', BlogSchema);
```

### 3.2 Field reference

| Field | Type | Required | Notes |
|---|---|---|---|
| `_id` | ObjectId | auto | MongoDB primary key |
| `title` | String | yes | Displayed as `<h1>` on detail page |
| `subTitle` | String | no | Optional subtitle rendered below the title |
| `slug` | String | yes | Unique URL identifier; used in `/blog/:slug` |
| `summary` | String | yes | Short excerpt for cards and `<meta description>` |
| `content` | String | yes | Full HTML body, rendered with `dangerouslySetInnerHTML` |
| `featuredImage` | String | no | Relative or absolute image URL |
| `author.name` | String | yes | Displayed on cards and detail header |
| `author.avatar` | String | no | Relative or absolute avatar URL |
| `author.bio` | String | no | Not currently rendered on the frontend |
| `categories` | String[] | no | Constrained enum; first value used as card badge |
| `tags` | String[] | no | Free-form; used for filtering and `<meta keywords>` |
| `status` | String | yes | `draft` / `published` / `archived` |
| `publishedAt` | Date | no | Set on publish; used as the display date |
| `readTime` | Number | no | Minutes; displayed on cards and detail header |
| `metaTitle` | String | no | Overrides `title` in SEO head if present |
| `metaDescription` | String | no | Overrides `summary` in SEO head if present |
| `viewCount` | Number | no | Analytics; not currently rendered on the frontend |
| `createdAt` | Date | auto | Mongoose timestamp |
| `updatedAt` | Date | auto | Mongoose timestamp |

### 3.3 Status lifecycle

```
draft  ──publish──►  published  ──archive──►  archived
  ▲                      │
  └──── unpublish ────────┘
```

Only documents with `status: 'published'` are returned by the public API endpoints.

---

## 4. API Flow

### 4.1 Base URL configuration

The frontend derives all CMS endpoints from a single environment variable:

```
VITE_INFRASTRUCTURE_API_BASE_URL=https://infra-api-prod.yourapp.com
```

All CMS routes are prefixed with `/api/v1/cms`.

```
CMS_API_BASE = ${VITE_INFRASTRUCTURE_API_BASE_URL}/api/v1
CMS_PREFIX   = ${CMS_API_BASE}/cms
IMAGE_BASE   = ${VITE_INFRASTRUCTURE_API_BASE_URL}   (no /api/v1 suffix)
```

### 4.2 Blog endpoints

#### `GET /api/v1/cms/blogs/public`

Returns paginated published blogs.

**Query parameters**

| Parameter | Type | Default | Description |
|---|---|---|---|
| `page` | number | 1 | Page number (1-based) |
| `limit` | number | 20 | Results per page (frontend uses 50) |
| `search` | string | — | Full-text search across title / content |
| `category` | string | — | Filter to a single category slug |
| `status` | string | `published` | Always `published` on public endpoint |

**Request example**
```
GET /api/v1/cms/blogs/public?page=1&limit=50&category=security
```

**Response shape**
```json
{
  "success": true,
  "body": {
    "data": [
      {
        "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
        "title": "VPN Backend Security: Best Practices",
        "subTitle": "A deep dive into securing your infrastructure",
        "slug": "vpn-backend-security-best-practices",
        "summary": "Short excerpt shown on listing card...",
        "content": "<h2>Introduction</h2><p>...</p>",
        "featuredImage": "/uploads/blogs/vpn-security.png",
        "author": { "name": "Alice Smith", "avatar": "/uploads/avatars/alice.png", "bio": null },
        "categories": ["security"],
        "tags": ["vpn", "security", "infrastructure"],
        "status": "published",
        "publishedAt": "2026-01-15T10:00:00.000Z",
        "readTime": 8,
        "metaTitle": null,
        "metaDescription": null,
        "viewCount": 432,
        "createdAt": "2026-01-10T08:00:00.000Z",
        "updatedAt": "2026-01-15T10:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 50,
      "total": 24,
      "totalPages": 1
    }
  }
}
```

---

#### `GET /api/v1/cms/blogs/public/:slug`

Returns a single published blog by its slug.

**Request example**
```
GET /api/v1/cms/blogs/public/vpn-backend-security-best-practices
```

**Response shape**
```json
{
  "success": true,
  "body": { /* same IBlog object as above */ }
}
```

**404 behavior**: Returns `{ "success": false, "error": { "message": "Not found", "code": "NOT_FOUND" } }`. The frontend redirects to `/blog` on error.

---

#### `GET /api/v1/cms/blogs/public/categories`

Returns all category slugs that have at least one published blog.

**Response shape**
```json
{
  "success": true,
  "body": ["engineering", "security", "technical", "tutorial"]
}
```

---

#### `GET /api/v1/cms/blogs/public/tags`

Returns all tags that appear in at least one published blog.

**Response shape**
```json
{
  "success": true,
  "body": ["vpn", "wireguard", "openvpn", "security", "infrastructure"]
}
```

---

#### `GET /api/v1/cms/blogs/public/:id/related`

Returns up to 3 related published blogs for a given blog `_id`. The backend determines relatedness by matching categories and tags.

**Request example**
```
GET /api/v1/cms/blogs/public/64f1a2b3c4d5e6f7a8b9c0d1/related
```

**Response shape**
```json
{
  "success": true,
  "body": [ /* array of up to 3 IBlog objects */ ]
}
```

---

### 4.3 HTTP client (`src/lib/api.ts`)

All requests go through a shared Axios instance:

- **Base URL**: `VITE_INFRASTRUCTURE_API_BASE_URL`
- **Timeout**: 30 seconds
- **Auth**: Injects `Authorization: Bearer <token>` from `localStorage.auth_token` on every request (blogs are public endpoints, so the token is optional here)
- **Interceptors**: Logs requests/responses in development; handles 401 (clears token), 403, 404, 500 with console errors

### 4.4 Image URL transformation

The CMS API stores images as relative paths (e.g. `/uploads/blogs/hero.png`). The frontend's `cmsService` converts these to absolute URLs before caching them in React Query:

```typescript
// src/services/cmsService.ts
const IMAGE_BASE_URL = CMS_API_BASE.replace(/\/api\/v\d+$/, '');
// → "https://infra-api-prod.yourapp.com"

function getAbsoluteImageUrl(imagePath?: string): string | undefined {
  if (!imagePath) return undefined;
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;   // already absolute — pass through
  }
  const normalizedPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  return `${IMAGE_BASE_URL}${normalizedPath}`;
}
```

This transformation is applied to `featuredImage` and `author.avatar` for every blog returned.

---

## 5. Frontend: Blog Listing Page (`/blog`)

**File**: `src/pages/BlogListing.tsx`

### 5.1 Component hierarchy

```
BlogListing
  ├─ <Header />
  ├─ <main>
  │   ├─ Hero section  (static HTML)
  │   ├─ Filter section
  │   │   ├─ <Input> (search)
  │   │   ├─ Sort buttons (Newest / Oldest)
  │   │   └─ Category pill buttons (from useBlogCategories)
  │   └─ Posts grid
  │       └─ <ContentCard /> × N  (one per filtered post)
  └─ <Footer />
```

### 5.2 Data fetching

```typescript
// Search and category params are sent to the API — server-side filtering
const { data, isLoading, isError } = usePublishedBlogs({
  page: 1,
  limit: 50,
  search: searchQuery || undefined,      // sent when non-empty
  category: selectedCategory || undefined,
});

// Categories come from a separate cached endpoint
const { data: categoriesResponse } = useBlogCategories();
```

**React Query cache keys:**
- Blog list: `['cms', 'blogs', 'list', { page, limit, search, category }]`
- Categories: `['cms', 'blogs', 'categories']`

Changing `search` or `category` state generates a new cache key, triggering a fresh fetch (or returning a cached result if the same params were used before).

### 5.3 Filtering and sorting

| Feature | Where it happens |
|---|---|
| Search | Server-side — passed as `?search=` query param |
| Category filter | Server-side — passed as `?category=` query param |
| Sort (newest/oldest) | Client-side — `useMemo` sorts the returned array by `publishedAt ?? createdAt` |

Sorting is done client-side because the API does not expose a sort direction parameter.

### 5.4 Loading and error states

- **Loading**: renders 6 skeleton cards (`<Skeleton>` from shadcn/ui)
- **Error**: renders an `<AlertCircle>` icon with a "Retry" button that calls `window.location.reload()`
- **Empty**: renders a "No articles found" message with a "Clear Filters" button

### 5.5 Card rendering

Each post is passed to `<ContentCard>` with these props:

```typescript
<ContentCard
  title={post.title}
  subTitle={post.subTitle}
  excerpt={post.summary}
  href={`/blog/${post.slug}`}
  image={post.featuredImage}           // already absolute URL
  date={post.publishedAt || post.createdAt}
  readingTime={post.readTime ? `${post.readTime} min read` : undefined}
  category={post.categories?.[0]}      // only the first category is shown
  tags={post.tags}                     // CardComponent shows max 2 tags
  author={post.author}
/>
```

### 5.6 SEO

The `/blog` route has its SEO injected in `App.tsx` via the `withSEO()` wrapper before `<BlogListing>` renders. Individual blog pages handle their own SEO inside the component.

```typescript
// App.tsx
<Route path="/blog" element={withSEO({
  title: "VPN Infrastructure Blog",
  description: "Technical articles, best practices, and engineering insights...",
  canonical: "/blog",
  keywords: ["VPN blog", "VPN infrastructure articles", "WireGuard", ...],
}, <BlogListing />)} />
```

---

## 6. Frontend: Blog Detail Page (`/blog/:slug`)

**File**: `src/pages/BlogDetail.tsx`

### 6.1 Component hierarchy

```
BlogDetail
  ├─ <SEO />            (dynamic — injected from post data)
  ├─ <Header />
  ├─ <main>
  │   ├─ Header section
  │   │   ├─ Back to Blog button
  │   │   ├─ Category + tag pills
  │   │   ├─ <h1> title
  │   │   ├─ subTitle paragraph
  │   │   └─ Author / date / readTime meta row
  │   ├─ Featured image  (conditional)
  │   ├─ Content section
  │   │   ├─ Summary blockquote   (conditional)
  │   │   ├─ <div class="cms-content" dangerouslySetInnerHTML />
  │   │   └─ Sidebar
  │   │       └─ Share card  (Twitter / LinkedIn / Facebook)
  │   └─ Related articles section  (conditional — only if relatedPosts.length > 0)
  │       └─ <Card> × relatedPosts  (up to 3)
  └─ <Footer />
```

### 6.2 Data fetching

```typescript
const { slug } = useParams<{ slug: string }>();

// Primary post data
const { data: blogResponse, isLoading, isError } = useBlogBySlug(slug || '');
const post = blogResponse?.body;

// Related posts — only fires when post._id is available
const { data: relatedResponse } = useRelatedBlogs(post?._id || '');
const relatedPosts = relatedResponse?.body ?? [];
```

`useRelatedBlogs` has `enabled: !!id` so it waits until the primary post is loaded before issuing the second request.

### 6.3 Slug handling and redirects

```typescript
// If the post is not found and not still loading, redirect to /blog
if (!isLoading && !post && !isError) {
  return <Navigate to="/blog" replace />;
}
```

The slug comes directly from the URL parameter. The API matches it against the `slug` field in MongoDB.

### 6.4 SEO metadata generation

```typescript
const metaTitle       = post.metaTitle || post.title;
const metaDescription = post.metaDescription || post.summary || post.subTitle || `Read ${post.title}`;

<SEO
  title={metaTitle}
  description={metaDescription}
  canonical={`/blog/${post.slug}`}
  ogType="article"
  ogImage={post.featuredImage || '/image3.png'}
  keywords={post.tags}
  article={{
    publishedTime: publishedDate,
    modifiedTime: post.updatedAt,
    author: post.author?.name,
    tags: post.tags,
  }}
  jsonLd={{
    '@type': 'BlogPosting',
    headline: post.title,
    description: metaDescription,
    image: post.featuredImage,
    datePublished: publishedDate,
    dateModified: post.updatedAt,
    author: { '@type': 'Person', name: post.author?.name },
    publisher: organizationSchema,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://yourapp.com/blog/${post.slug}`,
    },
    keywords: post.tags.join(', '),
  }}
/>
```

The `<SEO>` component writes all of this imperatively to `document.head` inside a `useEffect`, cleaning up old tags on each render.

### 6.5 Content rendering

```tsx
<div
  className="cms-content"
  dangerouslySetInnerHTML={{ __html: post.content }}
/>
```

The `.cms-content` CSS class (defined in `src/styles/cms-content.css`) re-applies typography styles that Tailwind's base reset strips out. Import this file in the detail page:

```typescript
import '@/styles/cms-content.css';
```

### 6.6 Social sharing

```typescript
const shareUrl  = `https://yourapp.com/blog/${slug}`;
const shareText = post.title;

const urls = {
  twitter:  `https://twitter.com/intent/tweet?text=...&url=...`,
  linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=...`,
  facebook: `https://www.facebook.com/sharer/sharer.php?u=...`,
};

window.open(urls[platform], '_blank', 'width=600,height=400');
```

---

## 7. Content Management Flow

### 7.1 Creating and publishing a blog

1. Author logs into the CMS admin panel (separate application, not this repo).
2. Fills in: title, slug (auto-generated from title), subTitle, summary, content (rich-text editor output as HTML), categories, tags, featuredImage (file upload), author details, readTime, metaTitle, metaDescription.
3. Saves as `status: 'draft'`.
4. Previews the post.
5. Clicks **Publish** → backend sets `status: 'published'` and `publishedAt: new Date()`.
6. The published post appears in `GET /api/v1/cms/blogs/public` on the next API call (React Query's 5-minute stale time means it may take up to 5 minutes to appear for existing visitors without a page refresh).

### 7.2 Draft vs published states

| Status | Visible on public API | Notes |
|---|---|---|
| `draft` | No | Only accessible through the CMS admin |
| `published` | Yes | Returned by all `/public` endpoints |
| `archived` | No | Hidden from public; kept in the database |

### 7.3 Image handling

- Images are uploaded to the CMS backend, which saves them under a path like `/uploads/blogs/<filename>`.
- The backend stores the relative path in the `featuredImage` field.
- The frontend's `getAbsoluteImageUrl()` prepends the API origin so the browser can load the image.
- There is no CDN layer in the current setup; images are served directly from the API server. Adding a CDN (e.g., Cloudflare, Vercel Blob) is a recommended improvement.

### 7.4 Slug generation

Slugs are generated on the backend from the title:

```
"VPN Backend Security: Best Practices for 2026"
  → "vpn-backend-security-best-practices-for-2026"
```

The slug is:
- Lowercased
- Non-alphanumeric characters replaced with hyphens
- Stored in a `unique` index to prevent duplicates
- Never changed after first publish (changing it would break existing URLs)

### 7.5 Categories and tags

- **Categories** are a constrained enum enforced at the schema level.  
  Adding a new category requires a backend schema change.
- **Tags** are free-form strings — any value is accepted.  
  The `/categories` and `/tags` endpoints derive their lists dynamically by aggregating all distinct values from published blogs.

---

## 8. Reusability Guide — Files to Copy

### 8.1 Core files (copy these verbatim)

| File | Purpose |
|---|---|
| `src/types/cms.ts` | TypeScript interfaces for all CMS entities and API responses |
| `src/services/cmsService.ts` | Blog service methods + image URL helper + `buildQueryString` |
| `src/hooks/use-cms.ts` | React Query hooks with cache keys and stale times |
| `src/components/SEO.tsx` | Imperative SEO component + JSON-LD schema helpers |
| `src/styles/cms-content.css` | Typography styles for HTML content rendered from CMS |
| `src/lib/api.ts` | Axios instance with auth interceptor |
| `src/lib/utils.ts` | `cn()` class name helper (required by shadcn components) |

### 8.2 Page files (copy and adapt)

| File | What to change |
|---|---|
| `src/pages/BlogListing.tsx` | Update hero copy; adjust `limit` if desired |
| `src/pages/BlogDetail.tsx` | Update `shareUrl` domain; update `organizationSchema` reference |
| `src/components/ContentCards.tsx` | Cosmetic changes only; the `ContentCard` export is what matters |

### 8.3 Project-specific values to replace

Search for these strings and update them in your new project:

| String | Replace with |
|---|---|
| `https://fyreway.com` | Your production domain |
| `FyreWay` | Your site/brand name |
| `fyreway` | Your Twitter/GitHub/LinkedIn handle |
| `infra-api-prod.fyreway.com` | Your CMS API domain |
| `/image3.png` | Your default OG fallback image |
| `VITE_INFRASTRUCTURE_API_BASE_URL` | Keep the same env var name, or rename it throughout |

### 8.4 Required npm dependencies

```bash
# Runtime
npm install axios @tanstack/react-query react-router-dom lucide-react

# shadcn/ui components (used by blog pages)
npx shadcn@latest add card button input skeleton

# Tailwind (if not already installed)
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

The `<SEO>` component has no external dependencies — it uses only the native DOM API.

---

## 9. Migration Guide — Step-by-Step

Follow these steps to implement the same blog system in a completely new React + Vite application.

---

### Step 1 — Database setup (backend)

1. Create a MongoDB database (local, Atlas, or any provider).
2. Note the connection string: `mongodb+srv://user:pass@cluster.mongodb.net/yourdb`.
3. No collection needs to be created manually — Mongoose creates it on first write.

---

### Step 2 — Model creation (backend)

In your Express/Node.js API, create `models/Blog.js` using the schema from [Section 3.1](#31-blog-schema).

Add the related API routes shown in [Section 4.2](#42-blog-endpoints). The minimum implementation for a public blog API:

```javascript
// routes/cms/blogs.js  (Express)
const router = require('express').Router();
const Blog = require('../../models/Blog');

// GET /public  — paginated list
router.get('/public', async (req, res) => {
  const { page = 1, limit = 20, search, category } = req.query;
  const query = { status: 'published' };
  if (search) query.$text = { $search: search };
  if (category) query.categories = category;

  const [data, total] = await Promise.all([
    Blog.find(query)
      .sort({ publishedAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .lean(),
    Blog.countDocuments(query),
  ]);

  res.json({
    success: true,
    body: {
      data,
      pagination: { page: Number(page), limit: Number(limit), total, totalPages: Math.ceil(total / limit) },
    },
  });
});

// GET /public/categories
router.get('/public/categories', async (req, res) => {
  const cats = await Blog.distinct('categories', { status: 'published' });
  res.json({ success: true, body: cats });
});

// GET /public/tags
router.get('/public/tags', async (req, res) => {
  const tags = await Blog.distinct('tags', { status: 'published' });
  res.json({ success: true, body: tags });
});

// GET /public/:slugOrId/related
router.get('/public/:id/related', async (req, res) => {
  const blog = await Blog.findById(req.params.id).lean();
  if (!blog) return res.status(404).json({ success: false });
  const related = await Blog.find({
    _id: { $ne: blog._id },
    status: 'published',
    $or: [{ categories: { $in: blog.categories } }, { tags: { $in: blog.tags } }],
  }).limit(3).lean();
  res.json({ success: true, body: related });
});

// GET /public/:slug  — must come LAST
router.get('/public/:slug', async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug, status: 'published' }).lean();
  if (!blog) return res.status(404).json({ success: false, error: { message: 'Not found', code: 'NOT_FOUND' } });
  res.json({ success: true, body: blog });
});

module.exports = router;
```

Mount it at `app.use('/api/v1/cms/blogs', require('./routes/cms/blogs'))`.

---

### Step 3 — Frontend project setup

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
npm install axios @tanstack/react-query react-router-dom lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npx shadcn@latest init
npx shadcn@latest add card button input skeleton
```

---

### Step 4 — Copy core files

```bash
# From this repo into your new project:
cp src/types/cms.ts          my-app/src/types/cms.ts
cp src/services/cmsService.ts my-app/src/services/cmsService.ts
cp src/hooks/use-cms.ts      my-app/src/hooks/use-cms.ts
cp src/components/SEO.tsx    my-app/src/components/SEO.tsx
cp src/styles/cms-content.css my-app/src/styles/cms-content.css
cp src/lib/api.ts            my-app/src/lib/api.ts
cp src/lib/utils.ts          my-app/src/lib/utils.ts
cp src/components/ContentCards.tsx my-app/src/components/ContentCards.tsx
cp src/pages/BlogListing.tsx my-app/src/pages/BlogListing.tsx
cp src/pages/BlogDetail.tsx  my-app/src/pages/BlogDetail.tsx
```

---

### Step 5 — Environment variables

Create `.env` in the project root:

```
VITE_INFRASTRUCTURE_API_BASE_URL=https://your-api.yourapp.com
```

For local development:

```
VITE_INFRASTRUCTURE_API_BASE_URL=http://localhost:4000
```

---

### Step 6 — Routing setup

Wrap your app in `QueryClientProvider` and add blog routes to your router.

```tsx
// src/main.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
```

```tsx
// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const BlogListing = lazy(() => import('./pages/BlogListing'));
const BlogDetail  = lazy(() => import('./pages/BlogDetail'));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/blog"       element={<BlogListing />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          {/* your other routes */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

---

### Step 7 — SEO setup

Update the brand constants at the top of `src/components/SEO.tsx`:

```typescript
const siteUrl  = 'https://yourapp.com';
const siteName = 'Your App Name';
const defaultOgImage = '/og-default.png';
```

Update the `organizationSchema` export to reflect your brand.

For blog list SEO, pass an SEO config at the route level (see the `withSEO` pattern in `App.tsx`) or render `<SEO>` directly inside `BlogListing`.

---

### Step 8 — Content CSS

Import the CMS content stylesheet in `BlogDetail.tsx`:

```typescript
import '@/styles/cms-content.css';
```

The `.cms-content` class expects your Tailwind config to expose CSS custom properties for `--foreground`, `--primary`, `--muted`, `--border`, and `--muted-foreground`. These are provided automatically if you used `npx shadcn@latest init`.

---

### Step 9 — Deployment considerations

| Concern | Recommendation |
|---|---|
| **SPA routing** | Configure your host to serve `index.html` for all routes (Vercel does this automatically; for Nginx add `try_files $uri /index.html`) |
| **CORS** | Add your frontend domain to the CMS API's CORS allowed origins |
| **Image serving** | Consider proxying uploaded images through a CDN to avoid serving large files from the API server |
| **Environment variables** | `VITE_*` variables are inlined at build time — never put secrets here |
| **SEO crawlability** | This is a client-rendered SPA; Googlebot can execute JavaScript, but consider SSR (Next.js) or prerendering if SEO is critical |
| **Cache headers** | Set long `Cache-Control` headers on the API for the `/categories` and `/tags` endpoints since they rarely change |
| **Rate limiting** | Add rate limiting to the CMS API's public blog endpoints to prevent scraping |

---

*This documentation was generated from the live codebase on 2026-06-06.*
