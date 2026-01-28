import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  article?: {
    publishedTime?: string;
    author?: string;
    tags?: string[];
  };
  jsonLd?: object;
}

export function SEO({
  title,
  description,
  canonical,
  ogType = 'website',
  ogImage = '/og-image.png',
  article,
  jsonLd,
}: SEOProps) {
  const siteUrl = 'https://fyreway.com';
  const fullTitle = `${title} | Fyreway`;
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : undefined;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Primary Meta Tags
    updateMetaTag('title', fullTitle);
    updateMetaTag('description', description);

    // Open Graph
    updateMetaTag('og:type', ogType, true);
    updateMetaTag('og:title', fullTitle, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', fullOgImage, true);
    updateMetaTag('og:site_name', 'Fyreway', true);
    if (fullCanonical) {
      updateMetaTag('og:url', fullCanonical, true);
    }

    // Twitter
    updateMetaTag('twitter:card', 'summary_large_image', true);
    updateMetaTag('twitter:title', fullTitle, true);
    updateMetaTag('twitter:description', description, true);
    updateMetaTag('twitter:image', fullOgImage, true);

    // Article Meta Tags
    if (article) {
      if (article.publishedTime) {
        updateMetaTag('article:published_time', article.publishedTime, true);
      }
      if (article.author) {
        updateMetaTag('article:author', article.author, true);
      }
    }

    // Canonical link
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = fullCanonical!;
    }

    // JSON-LD Structured Data
    if (jsonLd) {
      let script = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        ...jsonLd,
      });
    }
  }, [fullTitle, description, fullCanonical, ogType, fullOgImage, article, jsonLd]);

  return null;
}

// JSON-LD Schema Helpers
export const organizationSchema = {
  '@type': 'Organization',
  name: 'Fyreway',
  url: 'https://fyreway.com',
  logo: 'https://fyreway.com/logo.png',
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
    item: `https://fyreway.com${item.url}`,
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
  name: 'Fyreway',
  applicationCategory: 'DeveloperApplication',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description: 'VPN backend infrastructure platform for developers and SaaS teams',
  operatingSystem: 'Web, iOS, Android',
};
