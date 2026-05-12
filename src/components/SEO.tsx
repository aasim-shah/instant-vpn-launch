import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  ogImageAlt?: string;
  keywords?: string | string[];
  robots?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    tags?: string[];
  };
  jsonLd?: object;
}

const siteUrl = 'https://fyreway.com';
const siteName = 'FyreWay';
const defaultOgImage = '/image3.png';

const toAbsoluteUrl = (value: string) => {
  if (value.startsWith('http://') || value.startsWith('https://')) {
    return value;
  }

  return `${siteUrl}${value.startsWith('/') ? value : `/${value}`}`;
};

const withBrandSuffix = (title: string) => {
  if (title.endsWith(`| ${siteName}`)) {
    return title;
  }

  return `${title} | ${siteName}`;
};

export function SEO({
  title,
  description,
  canonical,
  ogType = 'website',
  ogImage = defaultOgImage,
  ogImageAlt,
  keywords,
  robots = 'index, follow',
  twitterCard = 'summary_large_image',
  article,
  jsonLd,
}: SEOProps) {
  const fullTitle = withBrandSuffix(title);
  const canonicalPath = canonical || window.location.pathname;
  const fullCanonical = toAbsoluteUrl(canonicalPath);
  const fullOgImage = toAbsoluteUrl(ogImage);
  const keywordContent = Array.isArray(keywords) ? keywords.join(', ') : keywords;

  useEffect(() => {
    document.querySelectorAll('[data-seo-managed="true"]').forEach((element) => {
      element.remove();
    });

    document.title = fullTitle;

    const setMetaTag = (attribute: 'name' | 'property', name: string, content?: string) => {
      if (!content) return;

      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        document.head.appendChild(element);
      }

      element.setAttribute(attribute, name);
      element.setAttribute('content', content);
      element.setAttribute('data-seo-managed', 'true');
    };

    const appendMetaTag = (attribute: 'name' | 'property', name: string, content?: string) => {
      if (!content) return;

      const element = document.createElement('meta');
      element.setAttribute(attribute, name);
      element.setAttribute('content', content);
      element.setAttribute('data-seo-managed', 'true');
      document.head.appendChild(element);
    };

    setMetaTag('name', 'title', fullTitle);
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'keywords', keywordContent);
    setMetaTag('name', 'robots', robots);

    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:url', fullCanonical);
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:image', fullOgImage);
    setMetaTag('property', 'og:image:alt', ogImageAlt || title);
    setMetaTag('property', 'og:site_name', siteName);
    setMetaTag('property', 'og:locale', 'en_US');

    setMetaTag('name', 'twitter:card', twitterCard);
    setMetaTag('name', 'twitter:url', fullCanonical);
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', fullOgImage);
    setMetaTag('name', 'twitter:image:alt', ogImageAlt || title);

    if (article) {
      appendMetaTag('property', 'article:published_time', article.publishedTime);
      appendMetaTag('property', 'article:modified_time', article.modifiedTime);
      appendMetaTag('property', 'article:author', article.author);
      article.tags?.forEach((tag) => appendMetaTag('property', 'article:tag', tag));
    }

    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      document.head.appendChild(link);
    }

    link.rel = 'canonical';
    link.href = fullCanonical;
    link.setAttribute('data-seo-managed', 'true');

    if (jsonLd) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo-managed', 'true');
      script.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        ...jsonLd,
      });
      document.head.appendChild(script);
    }
  }, [fullTitle, description, fullCanonical, ogType, fullOgImage, ogImageAlt, title, keywordContent, robots, twitterCard, article, jsonLd]);

  return null;
}

// JSON-LD Schema Helpers
export const organizationSchema = {
  '@type': 'Organization',
  name: 'FyreWay',
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  description: 'VPN backend infrastructure platform for developers and SaaS teams',
  sameAs: [
    'https://twitter.com/fyreway',
    'https://github.com/fyreway',
    'https://linkedin.com/company/fyreway',
  ],
};

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${siteUrl}${item.url}`,
  })),
});

export const articleSchema = (article: {
  title: string;
  description: string;
  datePublished: string;
  author: string;
  image?: string;
}) => ({
  '@type': 'Article',
  headline: article.title,
  description: article.description,
  datePublished: article.datePublished,
  author: {
    '@type': 'Person',
    name: article.author,
  },
  publisher: organizationSchema,
  ...(article.image && { image: article.image }),
});

export const faqSchema = (faqs: { question: string; answer: string }[]) => ({
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

export const reviewSchema = (review: {
  author: string;
  rating: number;
  reviewBody: string;
  datePublished: string;
}) => ({
  '@type': 'Review',
  author: {
    '@type': 'Person',
    name: review.author,
  },
  reviewRating: {
    '@type': 'Rating',
    ratingValue: review.rating,
    bestRating: 5,
  },
  reviewBody: review.reviewBody,
  datePublished: review.datePublished,
});

export const productSchema = {
  '@type': 'SoftwareApplication',
  name: 'FyreWay',
  applicationCategory: 'DeveloperApplication',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description: 'VPN backend infrastructure platform for developers and SaaS teams',
  operatingSystem: 'Web, iOS, Android',
};
