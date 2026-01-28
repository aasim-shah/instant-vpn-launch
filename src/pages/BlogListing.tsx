import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ContentCard } from '@/components/ContentCards';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { blogPosts } from '@/content/blogData';

export default function BlogListing() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  // Get unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(blogPosts.map(post => post.category)));
    return cats.sort();
  }, []);

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let posts = [...blogPosts];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      posts = posts.filter(
        post =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Apply category filter
    if (selectedCategory) {
      posts = posts.filter(post => post.category === selectedCategory);
    }

    // Apply sort
    posts.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    return posts;
  }, [searchQuery, selectedCategory, sortOrder]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-32 pb-20 border-b border-border">
          <div className="hero-grid absolute inset-0" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="h-[400px] w-[400px] rounded-full bg-primary/10 blur-[100px] animate-pulse-glow" />
          </div>
          
          <div className="container relative mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Blogs & <span className="gradient-text">Tech News</span>
              </h1>
              
              <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
                Technical articles, best practices, and insights from our engineering team 
                about VPN infrastructure, security, and performance.
              </p>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 border-b border-border bg-card/50 sticky top-0 z-10 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>

              {/* Sort */}
              <div className="flex gap-2">
                <Button
                  variant={sortOrder === 'newest' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSortOrder('newest')}
                >
                  Newest
                </Button>
                <Button
                  variant={sortOrder === 'oldest' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSortOrder('oldest')}
                >
                  Oldest
                </Button>
              </div>
            </div>

            {/* Categories */}
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 text-sm rounded-full transition-all ${
                  selectedCategory === null
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'bg-muted/50 text-muted-foreground border border-border hover:bg-muted hover:border-border/80'
                }`}
              >
                All
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 text-sm rounded-full transition-all ${
                    selectedCategory === category
                      ? 'bg-primary/20 text-primary border border-primary/30'
                      : 'bg-muted/50 text-muted-foreground border border-border hover:bg-muted hover:border-border/80'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            {filteredPosts.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.map(post => (
                  <ContentCard
                    key={post.slug}
                    title={post.title}
                    excerpt={post.excerpt}
                    href={`/blog/${post.slug}`}
                    image={post.image}
                    date={post.date}
                    readingTime={post.readingTime}
                    category={post.category}
                    tags={post.tags}
                    author={post.author}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-lg text-muted-foreground">
                  No articles found matching your criteria.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory(null);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
