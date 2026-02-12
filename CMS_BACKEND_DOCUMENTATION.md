# CMS Backend Documentation

## Overview

The CMS (Content Management System) module provides a comprehensive backend solution for managing website content for fyreway.com. It enables administrators to create, update, publish, and archive various types of content that are served to the public website via APIs.

## Architecture

### Module Location

```
/src/modules/cms/
```

### Directory Structure

```
cms/
├── index.ts                    # Module exports
├── cms.route.ts                # Route aggregator (public & admin)
├── types.ts                    # TypeScript interfaces & types
├── controllers/
│   ├── index.ts
│   ├── cmsPage.controller.ts   # Static pages controller
│   ├── blog.controller.ts      # Blog posts controller
│   ├── newsletter.controller.ts # Newsletters controller
│   └── faq.controller.ts       # FAQs controller
├── services/
│   ├── index.ts
│   ├── cmsPage.service.ts      # Static pages business logic
│   ├── blog.service.ts         # Blog posts business logic
│   ├── newsletter.service.ts   # Newsletters business logic
│   └── faq.service.ts          # FAQs business logic
├── models/
│   ├── index.ts
│   ├── cmsPage.model.ts        # MongoDB schema for pages
│   ├── blog.model.ts           # MongoDB schema for blogs
│   ├── newsletter.model.ts     # MongoDB schema for newsletters
│   └── faq.model.ts            # MongoDB schema for FAQs
├── routes/
│   ├── index.ts
│   ├── cmsPage.route.ts        # Page routes
│   ├── blog.route.ts           # Blog routes
│   ├── newsletter.route.ts     # Newsletter routes
│   └── faq.route.ts            # FAQ routes
└── validation/
    └── index.ts                # Zod validation schemas
```

---

## Content Types

### 1. CMS Pages

Static pages like Privacy Policy, Terms & Conditions, About Us, etc.

### 2. Blogs

Blog posts with author information, categories, tags, and SEO metadata.

### 3. Newsletters

Newsletter content with categories and tags for subscriber communications.

### 4. FAQs

Frequently Asked Questions with categories and drag-drop reordering support.

---

## Status System

All content types support three statuses:

| Status      | Description                                      |
| ----------- | ------------------------------------------------ |
| `draft`     | Content is being worked on, not visible publicly |
| `published` | Content is live and visible on the website       |
| `archived`  | Content is hidden but preserved for reference    |

---

## API Endpoints

### Base URL

```
/api/v1/cms
```

### Route Organization

- **Public Routes**: No authentication required (for website consumption)
- **Admin Routes**: Authentication required (for dashboard management)

---

## CMS Pages API

### Public Endpoints

| Method | Endpoint              | Description                 |
| ------ | --------------------- | --------------------------- |
| `GET`  | `/pages/public`       | Get all published CMS pages |
| `GET`  | `/pages/public/:slug` | Get published page by slug  |

### Admin Endpoints (Protected)

| Method   | Endpoint            | Description                                   |
| -------- | ------------------- | --------------------------------------------- |
| `GET`    | `/pages`            | Get all CMS pages (with pagination & filters) |
| `GET`    | `/pages/:id`        | Get CMS page by ID                            |
| `POST`   | `/pages`            | Create a new CMS page                         |
| `PUT`    | `/pages/:id`        | Update a CMS page                             |
| `PATCH`  | `/pages/:id/status` | Update page status                            |
| `DELETE` | `/pages/:id`        | Delete a CMS page                             |

### CMS Page Schema

```typescript
interface ICMSPage {
    _id: string
    headerTitle: string // Required, max 200 chars
    headerDescription: string // Required, max 500 chars
    bodyContent: string // Required, HTML content
    slug: string // Required, unique, max 100 chars
    status: 'draft' | 'published' | 'archived'
    metaTitle?: string // SEO title, max 100 chars
    metaDescription?: string // SEO description, max 300 chars
    metaKeywords?: string[] // SEO keywords
    featuredImage?: string // Image URL
    order?: number // Display order
    createdAt: Date
    updatedAt: Date
}
```

### Request/Response Examples

**Create CMS Page**

```json
POST /api/v1/cms/pages
{
    "headerTitle": "Privacy Policy",
    "headerDescription": "Learn how we protect your data",
    "bodyContent": "<h1>Privacy Policy</h1><p>Content here...</p>",
    "slug": "privacy-policy",
    "status": "draft",
    "metaTitle": "Privacy Policy | Fyreway",
    "metaDescription": "Our commitment to protecting your privacy"
}
```

**Response**

```json
{
    "success": true,
    "body": {
        "_id": "...",
        "headerTitle": "Privacy Policy",
        ...
    }
}
```

---

## Blogs API

### Public Endpoints

| Method | Endpoint                    | Description                |
| ------ | --------------------------- | -------------------------- |
| `GET`  | `/blogs/public`             | Get all published blogs    |
| `GET`  | `/blogs/public/categories`  | Get all blog categories    |
| `GET`  | `/blogs/public/tags`        | Get all blog tags          |
| `GET`  | `/blogs/public/:slug`       | Get published blog by slug |
| `GET`  | `/blogs/public/:id/related` | Get related blogs          |

### Admin Endpoints (Protected)

| Method   | Endpoint            | Description                               |
| -------- | ------------------- | ----------------------------------------- |
| `GET`    | `/blogs`            | Get all blogs (with pagination & filters) |
| `GET`    | `/blogs/categories` | Get all blog categories                   |
| `GET`    | `/blogs/:id`        | Get blog by ID                            |
| `POST`   | `/blogs`            | Create a new blog                         |
| `PUT`    | `/blogs/:id`        | Update a blog                             |
| `PATCH`  | `/blogs/:id/status` | Update blog status                        |
| `DELETE` | `/blogs/:id`        | Delete a blog                             |

### Blog Schema

```typescript
interface IBlog {
    _id: string
    title: string // Required
    slug: string // Required, unique
    summary: string // Required, brief description
    content: string // Required, HTML content
    featuredImage?: string // Image URL
    author: {
        name: string // Required
        avatar?: string // Author image URL
        bio?: string // Author biography
    }
    categories: BlogCategory[] // Array of categories
    tags: string[] // Array of tags
    status: 'draft' | 'published' | 'archived'
    publishedAt?: Date // Auto-set when published
    readTime?: number // Estimated read time in minutes
    metaTitle?: string
    metaDescription?: string
    viewCount?: number // Auto-incremented
    createdAt: Date
    updatedAt: Date
}

type BlogCategory =
    | 'engineering'
    | 'security'
    | 'technical'
    | 'tutorial'
    | 'development'
    | 'monitoring'
    | 'company-news'
    | 'product-updates'
    | 'other'
```

### Query Parameters

| Parameter  | Type   | Description                  |
| ---------- | ------ | ---------------------------- |
| `page`     | number | Page number (default: 1)     |
| `limit`    | number | Items per page (default: 10) |
| `status`   | string | Filter by status             |
| `category` | string | Filter by category           |
| `search`   | string | Search in title/content      |

---

## Newsletters API

### Public Endpoints

| Method | Endpoint                         | Description                      |
| ------ | -------------------------------- | -------------------------------- |
| `GET`  | `/newsletters/public`            | Get all published newsletters    |
| `GET`  | `/newsletters/public/latest`     | Get latest newsletter            |
| `GET`  | `/newsletters/public/categories` | Get all newsletter categories    |
| `GET`  | `/newsletters/public/tags`       | Get all newsletter tags          |
| `GET`  | `/newsletters/public/:slug`      | Get published newsletter by slug |

### Admin Endpoints (Protected)

| Method   | Endpoint                  | Description              |
| -------- | ------------------------- | ------------------------ |
| `GET`    | `/newsletters`            | Get all newsletters      |
| `GET`    | `/newsletters/:id`        | Get newsletter by ID     |
| `POST`   | `/newsletters`            | Create a new newsletter  |
| `PUT`    | `/newsletters/:id`        | Update a newsletter      |
| `PATCH`  | `/newsletters/:id/status` | Update newsletter status |
| `DELETE` | `/newsletters/:id`        | Delete a newsletter      |

### Newsletter Schema

```typescript
interface INewsletter {
    _id: string
    title: string // Required
    slug: string // Required, unique
    summary: string // Required
    content: string // Required, HTML content
    featuredImage?: string
    categories: NewsletterCategory[]
    tags: string[]
    status: 'draft' | 'published' | 'archived'
    publishedAt?: Date
    metaTitle?: string
    metaDescription?: string
    viewCount?: number
    createdAt: Date
    updatedAt: Date
}

type NewsletterCategory = 'product-updates' | 'company-news' | 'security' | 'technical' | 'features' | 'other'
```

---

## FAQs API

### Public Endpoints

| Method | Endpoint                  | Description                      |
| ------ | ------------------------- | -------------------------------- |
| `GET`  | `/faqs/public`            | Get all published FAQs (ordered) |
| `GET`  | `/faqs/public/grouped`    | Get FAQs grouped by category     |
| `GET`  | `/faqs/public/categories` | Get all FAQ categories           |

### Admin Endpoints (Protected)

| Method   | Endpoint           | Description            |
| -------- | ------------------ | ---------------------- |
| `GET`    | `/faqs`            | Get all FAQs           |
| `GET`    | `/faqs/categories` | Get all FAQ categories |
| `GET`    | `/faqs/:id`        | Get FAQ by ID          |
| `POST`   | `/faqs`            | Create a new FAQ       |
| `PUT`    | `/faqs/:id`        | Update a FAQ           |
| `PATCH`  | `/faqs/:id/status` | Update FAQ status      |
| `DELETE` | `/faqs/:id`        | Delete a FAQ           |
| `POST`   | `/faqs/reorder`    | Reorder FAQs           |

### FAQ Schema

```typescript
interface IFAQ {
    _id: string
    question: string // Required, max 500 chars
    answer: string // Required, HTML content
    category: FAQCategory // Default: 'general'
    order: number // Display order
    status: 'draft' | 'published' | 'archived'
    slug?: string // Optional URL slug
    tags?: string[]
    createdAt: Date
    updatedAt: Date
}

type FAQCategory = 'general' | 'pricing' | 'technical' | 'security' | 'getting-started' | 'other'
```

### Reorder FAQs Request

```json
POST /api/v1/cms/faqs/reorder
{
    "orders": [
        { "id": "faq_id_1", "order": 1 },
        { "id": "faq_id_2", "order": 2 },
        { "id": "faq_id_3", "order": 3 }
    ]
}
```

---

## Validation

All endpoints use Zod validation schemas. Example:

```typescript
const createBlogSchema = z.object({
    title: z.string().min(1).max(200),
    slug: z.string().min(1).max(100),
    summary: z.string().min(1).max(500),
    content: z.string().min(1),
    featuredImage: z.string().url().optional(),
    author: z.object({
        name: z.string().min(1),
        avatar: z.string().url().optional(),
        bio: z.string().max(500).optional()
    }),
    categories: z.array(z.enum([...])).optional(),
    tags: z.array(z.string()).optional(),
    status: z.enum(['draft', 'published', 'archived']).optional(),
    readTime: z.number().optional(),
    metaTitle: z.string().max(100).optional(),
    metaDescription: z.string().max(300).optional()
});
```

---

## Response Format

### Success Response

```json
{
    "success": true,
    "body": { ... }
}
```

### Paginated Response

```json
{
    "success": true,
    "body": {
        "data": [...],
        "pagination": {
            "page": 1,
            "limit": 10,
            "total": 50,
            "totalPages": 5
        }
    }
}
```

### Error Response

```json
{
    "success": false,
    "error": {
        "message": "Error description",
        "code": "ERROR_CODE"
    }
}
```

---

## MongoDB Indexes

Each model includes optimized indexes for common queries:

- **Text indexes**: For full-text search on title/content fields
- **Status index**: For filtering by status
- **Category index**: For filtering by category
- **Slug index**: For unique slug lookups (sparse)
- **Order index**: For FAQ ordering

---

## Authentication

- **Public routes**: No authentication required
- **Admin routes**: Require valid JWT token via `AuthMiddleware`

The routes are organized in `v1Routes.ts`:

```typescript
// Public CMS routes (no auth)
Router.use('/cms', publicCMSRoutes)

// Protected CMS routes (auth required)
Router.use(authenticate)
Router.use('/cms', adminCMSRoutes)
```

---

## Usage Examples

### Fetching Published Blogs for Website

```bash
GET /api/v1/cms/blogs/public?page=1&limit=10&category=engineering
```

### Creating a Blog Post (Admin)

```bash
POST /api/v1/cms/blogs
Authorization: Bearer <token>
Content-Type: application/json

{
    "title": "Getting Started with VPN Security",
    "slug": "getting-started-vpn-security",
    "summary": "Learn the basics of VPN security...",
    "content": "<article>...</article>",
    "author": {
        "name": "John Doe",
        "bio": "Security Engineer"
    },
    "categories": ["security", "tutorial"],
    "tags": ["vpn", "security", "beginner"],
    "status": "draft"
}
```

### Publishing Content

```bash
PATCH /api/v1/cms/blogs/:id/status
Authorization: Bearer <token>
Content-Type: application/json

{
    "status": "published"
}
```

---

## File Locations

| Component   | Path                            |
| ----------- | ------------------------------- |
| Models      | `/src/modules/cms/models/`      |
| Services    | `/src/modules/cms/services/`    |
| Controllers | `/src/modules/cms/controllers/` |
| Routes      | `/src/modules/cms/routes/`      |
| Validation  | `/src/modules/cms/validation/`  |
| Types       | `/src/modules/cms/types.ts`     |

---

## Related Documentation

- [CMS Implementation Summary](./CMS_IMPLEMENTATION_SUMMARY.md)
- [API Testing Guide](./API_TESTING_GUIDE.md)
