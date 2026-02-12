import { useQuery } from '@tanstack/react-query';
import {
  blogService,
  newsletterService,
  faqService,
  cmsPageService,
} from '@/services/cmsService';
import type { BlogListParams, CMSListParams } from '@/types/cms';

// ─── Cache Keys ─────────────────────────────────────────────────────────────

export const cmsKeys = {
  blogs: {
    all: ['cms', 'blogs'] as const,
    list: (params?: BlogListParams) => ['cms', 'blogs', 'list', params] as const,
    detail: (slug: string) => ['cms', 'blogs', 'detail', slug] as const,
    categories: () => ['cms', 'blogs', 'categories'] as const,
    tags: () => ['cms', 'blogs', 'tags'] as const,
    related: (id: string) => ['cms', 'blogs', 'related', id] as const,
  },
  newsletters: {
    all: ['cms', 'newsletters'] as const,
    list: (params?: CMSListParams) => ['cms', 'newsletters', 'list', params] as const,
    latest: () => ['cms', 'newsletters', 'latest'] as const,
    detail: (slug: string) => ['cms', 'newsletters', 'detail', slug] as const,
    categories: () => ['cms', 'newsletters', 'categories'] as const,
    tags: () => ['cms', 'newsletters', 'tags'] as const,
  },
  faqs: {
    all: ['cms', 'faqs'] as const,
    list: () => ['cms', 'faqs', 'list'] as const,
    grouped: () => ['cms', 'faqs', 'grouped'] as const,
    categories: () => ['cms', 'faqs', 'categories'] as const,
  },
  pages: {
    all: ['cms', 'pages'] as const,
    list: () => ['cms', 'pages', 'list'] as const,
    detail: (slug: string) => ['cms', 'pages', 'detail', slug] as const,
  },
} as const;

// ─── Blog Hooks ─────────────────────────────────────────────────────────────

export function usePublishedBlogs(params: BlogListParams = {}) {
  return useQuery({
    queryKey: cmsKeys.blogs.list(params),
    queryFn: () => blogService.getPublishedBlogs(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000,   // 30 minutes cache
  });
}

export function useBlogBySlug(slug: string) {
  return useQuery({
    queryKey: cmsKeys.blogs.detail(slug),
    queryFn: () => blogService.getBlogBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
}

export function useBlogCategories() {
  return useQuery({
    queryKey: cmsKeys.blogs.categories(),
    queryFn: () => blogService.getCategories(),
    staleTime: 15 * 60 * 1000, // categories change rarely
  });
}

export function useBlogTags() {
  return useQuery({
    queryKey: cmsKeys.blogs.tags(),
    queryFn: () => blogService.getTags(),
    staleTime: 15 * 60 * 1000,
  });
}

export function useRelatedBlogs(id: string) {
  return useQuery({
    queryKey: cmsKeys.blogs.related(id),
    queryFn: () => blogService.getRelatedBlogs(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

// ─── Newsletter Hooks ───────────────────────────────────────────────────────

export function usePublishedNewsletters(params: CMSListParams = {}) {
  return useQuery({
    queryKey: cmsKeys.newsletters.list(params),
    queryFn: () => newsletterService.getPublishedNewsletters(params),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}

export function useLatestNewsletter() {
  return useQuery({
    queryKey: cmsKeys.newsletters.latest(),
    queryFn: () => newsletterService.getLatestNewsletter(),
    staleTime: 5 * 60 * 1000,
  });
}

export function useNewsletterBySlug(slug: string) {
  return useQuery({
    queryKey: cmsKeys.newsletters.detail(slug),
    queryFn: () => newsletterService.getNewsletterBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
}

export function useNewsletterCategories() {
  return useQuery({
    queryKey: cmsKeys.newsletters.categories(),
    queryFn: () => newsletterService.getCategories(),
    staleTime: 15 * 60 * 1000,
  });
}

// ─── FAQ Hooks ──────────────────────────────────────────────────────────────

export function usePublishedFAQs() {
  return useQuery({
    queryKey: cmsKeys.faqs.list(),
    queryFn: () => faqService.getPublishedFAQs(),
    staleTime: 10 * 60 * 1000, // FAQs change infrequently
    gcTime: 60 * 60 * 1000,
  });
}

export function useGroupedFAQs() {
  return useQuery({
    queryKey: cmsKeys.faqs.grouped(),
    queryFn: () => faqService.getGroupedFAQs(),
    staleTime: 10 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });
}

// ─── CMS Pages Hooks ────────────────────────────────────────────────────────

export function usePublishedPages() {
  return useQuery({
    queryKey: cmsKeys.pages.list(),
    queryFn: () => cmsPageService.getPublishedPages(),
    staleTime: 10 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });
}

export function useCMSPageBySlug(slug: string) {
  return useQuery({
    queryKey: cmsKeys.pages.detail(slug),
    queryFn: () => cmsPageService.getPageBySlug(slug),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000,
  });
}
