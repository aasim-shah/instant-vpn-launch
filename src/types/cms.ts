// ─── CMS API Types ───────────────────────────────────────────────────────────
// Mirrors the CMS backend schemas for type-safe API consumption.

// ─── Enums / Unions ──────────────────────────────────────────────────────────

export type CMSStatus = 'draft' | 'published' | 'archived';

export type BlogCategory =
  | 'engineering'
  | 'security'
  | 'technical'
  | 'tutorial'
  | 'development'
  | 'monitoring'
  | 'company-news'
  | 'product-updates'
  | 'other';

export type NewsletterCategory =
  | 'product-updates'
  | 'company-news'
  | 'security'
  | 'technical'
  | 'features'
  | 'other';

export type FAQCategory =
  | 'general'
  | 'pricing'
  | 'technical'
  | 'security'
  | 'getting-started'
  | 'other';

// ─── Entity Interfaces ──────────────────────────────────────────────────────

export interface ICMSPage {
  _id: string;
  headerTitle: string;
  headerDescription: string;
  bodyContent: string;
  slug: string;
  status: CMSStatus;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  featuredImage?: string;
  order?: number;
  createdAt: string;
  updatedAt: string;
}

export interface IBlog {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  featuredImage?: string;
  author: {
    name: string;
    avatar?: string;
    bio?: string;
  };
  categories: BlogCategory[];
  tags: string[];
  status: CMSStatus;
  publishedAt?: string;
  readTime?: number;
  metaTitle?: string;
  metaDescription?: string;
  viewCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface INewsletter {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  featuredImage?: string;
  categories: NewsletterCategory[];
  tags: string[];
  status: CMSStatus;
  publishedAt?: string;
  metaTitle?: string;
  metaDescription?: string;
  viewCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface IFAQ {
  _id: string;
  question: string;
  answer: string;
  category: FAQCategory;
  order: number;
  status: CMSStatus;
  slug?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

// ─── API Response Types ─────────────────────────────────────────────────────

export interface CMSPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface CMSApiResponse<T> {
  success: boolean;
  body: T;
}

export interface CMSPaginatedResponse<T> {
  success: boolean;
  body: {
    data: T[];
    pagination: CMSPagination;
  };
}

export interface CMSErrorResponse {
  success: false;
  error: {
    message: string;
    code: string;
  };
}

// ─── Query Parameter Types ──────────────────────────────────────────────────

export interface CMSListParams {
  page?: number;
  limit?: number;
  status?: CMSStatus;
  search?: string;
}

export interface BlogListParams extends CMSListParams {
  category?: BlogCategory;
}

export interface FAQGroupedResponse {
  [category: string]: IFAQ[];
}
