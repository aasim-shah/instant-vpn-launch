import { api } from '@/lib/api';
import type {
  IBlog,
  INewsletter,
  IFAQ,
  ICMSPage,
  CMSApiResponse,
  CMSPaginatedResponse,
  BlogListParams,
  CMSListParams,
  FAQGroupedResponse,
} from '@/types/cms';

// ─── Configuration ──────────────────────────────────────────────────────────

const CMS_API_BASE =
  import.meta.env.VITE_INFRASTRUCTURE_API_BASE_URL + "api/v1" ||
  'https://infra-api.fyreway.com/api/v1';
// "http://192.168.18.68:4000/api/v1";

const CMS_PREFIX = `${CMS_API_BASE}/cms`;

// Extract base URL without /api/v1 for image paths
const IMAGE_BASE_URL = CMS_API_BASE.replace(/\/api\/v\d+$/, '');

// ─── Helpers ────────────────────────────────────────────────────────────────

/**
 * Convert relative image paths to absolute URLs using the API base
 */
function getAbsoluteImageUrl(imagePath?: string): string | undefined {
  if (!imagePath) return undefined;
  // If already absolute URL, return as-is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  // Prepend base URL to relative path
  const normalizedPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  return `${IMAGE_BASE_URL}${normalizedPath}`;
}

function buildQueryString(params: object): string {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value));
    }
  });
  const qs = searchParams.toString();
  return qs ? `?${qs}` : '';
}

// ─── Blog Service ───────────────────────────────────────────────────────────

export const blogService = {
  /** Get all published blogs with optional pagination / filters */
  async getPublishedBlogs(params: BlogListParams = {}) {
    const qs = buildQueryString(params);
    const { data } = await api.get<CMSPaginatedResponse<IBlog>>(
      `${CMS_PREFIX}/blogs/public${qs}`,
    );
    // Transform image URLs to absolute paths
    if (data.body?.data) {
      data.body.data = data.body.data.map(blog => ({
        ...blog,
        featuredImage: getAbsoluteImageUrl(blog.featuredImage),
        author: {
          ...blog.author,
          avatar: getAbsoluteImageUrl(blog.author.avatar),
        },
      }));
    }
    return data;
  },

  /** Get a single published blog by slug */
  async getBlogBySlug(slug: string) {
    const { data } = await api.get<CMSApiResponse<IBlog>>(
      `${CMS_PREFIX}/blogs/public/${slug}`,
    );
    // Transform image URLs to absolute paths
    if (data.body) {
      data.body.featuredImage = getAbsoluteImageUrl(data.body.featuredImage);
      if (data.body.author?.avatar) {
        data.body.author.avatar = getAbsoluteImageUrl(data.body.author.avatar);
      }
    }
    return data;
  },

  /** Get all blog categories */
  async getCategories() {
    const { data } = await api.get<CMSApiResponse<string[]>>(
      `${CMS_PREFIX}/blogs/public/categories`,
    );
    return data;
  },

  /** Get all blog tags */
  async getTags() {
    const { data } = await api.get<CMSApiResponse<string[]>>(
      `${CMS_PREFIX}/blogs/public/tags`,
    );
    return data;
  },

  /** Get related blogs for a given blog ID */
  async getRelatedBlogs(id: string) {
    const { data } = await api.get<CMSApiResponse<IBlog[]>>(
      `${CMS_PREFIX}/blogs/public/${id}/related`,
    );
    // Transform image URLs to absolute paths
    if (data.body) {
      data.body = data.body.map(blog => ({
        ...blog,
        featuredImage: getAbsoluteImageUrl(blog.featuredImage),
        author: {
          ...blog.author,
          avatar: getAbsoluteImageUrl(blog.author.avatar),
        },
      }));
    }
    return data;
  },
};

// ─── Newsletter Service ─────────────────────────────────────────────────────

export const newsletterService = {
  /** Get all published newsletters */
  async getPublishedNewsletters(params: CMSListParams = {}) {
    const qs = buildQueryString(params);
    const { data } = await api.get<CMSPaginatedResponse<INewsletter>>(
      `${CMS_PREFIX}/newsletters/public${qs}`,
    );
    // Transform image URLs to absolute paths
    if (data.body?.data) {
      data.body.data = data.body.data.map(newsletter => ({
        ...newsletter,
        featuredImage: getAbsoluteImageUrl(newsletter.featuredImage),
      }));
    }
    return data;
  },

  /** Get the latest newsletter */
  async getLatestNewsletter() {
    const { data } = await api.get<CMSApiResponse<INewsletter>>(
      `${CMS_PREFIX}/newsletters/public/latest`,
    );
    // Transform image URLs to absolute paths
    if (data.body) {
      data.body.featuredImage = getAbsoluteImageUrl(data.body.featuredImage);
    }
    return data;
  },

  /** Get a single newsletter by slug */
  async getNewsletterBySlug(slug: string) {
    const { data } = await api.get<CMSApiResponse<INewsletter>>(
      `${CMS_PREFIX}/newsletters/public/${slug}`,
    );
    // Transform image URLs to absolute paths
    if (data.body) {
      data.body.featuredImage = getAbsoluteImageUrl(data.body.featuredImage);
    }
    return data;
  },

  /** Get all newsletter categories */
  async getCategories() {
    const { data } = await api.get<CMSApiResponse<string[]>>(
      `${CMS_PREFIX}/newsletters/public/categories`,
    );
    return data;
  },

  /** Get all newsletter tags */
  async getTags() {
    const { data } = await api.get<CMSApiResponse<string[]>>(
      `${CMS_PREFIX}/newsletters/public/tags`,
    );
    return data;
  },
};

// ─── FAQ Service ────────────────────────────────────────────────────────────

export const faqService = {
  /** Get all published FAQs (ordered) */
  async getPublishedFAQs() {
    const { data } = await api.get<CMSApiResponse<IFAQ[]>>(
      `${CMS_PREFIX}/faqs/public`,
    );
    return data;
  },

  /** Get FAQs grouped by category */
  async getGroupedFAQs() {
    const { data } = await api.get<CMSApiResponse<FAQGroupedResponse>>(
      `${CMS_PREFIX}/faqs/public/grouped`,
    );
    return data;
  },

  /** Get all FAQ categories */
  async getCategories() {
    const { data } = await api.get<CMSApiResponse<string[]>>(
      `${CMS_PREFIX}/faqs/public/categories`,
    );
    return data;
  },
};

// ─── CMS Pages Service ──────────────────────────────────────────────────────

export const cmsPageService = {
  /** Get all published CMS pages */
  async getPublishedPages() {
    const { data } = await api.get<CMSPaginatedResponse<ICMSPage>>(
      `${CMS_PREFIX}/pages/public`,
    );
    return data;
  },

  /** Get a single published CMS page by slug */
  async getPageBySlug(slug: string) {
    const { data } = await api.get<CMSApiResponse<ICMSPage>>(
      `${CMS_PREFIX}/pages/public/${slug}`,
    );
    return data;
  },
};
