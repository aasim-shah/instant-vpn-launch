import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContentCardProps {
  title: string;
  excerpt: string;
  href: string;
  image?: string;
  date?: string;
  readingTime?: string;
  category?: string;
  tags?: string[];
  author?: {
    name: string;
    avatar?: string;
  };
  className?: string;
}

export function ContentCard({
  title,
  excerpt,
  href,
  image,
  date,
  readingTime,
  category,
  tags,
  author,
  className,
}: ContentCardProps) {
  return (
    <Link to={href}>
      <Card className={cn(
        'group overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/10 hover:border-primary/50',
        className
      )}>
        {image && (
          <div className="aspect-video overflow-hidden">
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          </div>
        )}
        <CardHeader>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            {category && (
              <span className="px-3 py-1 text-xs rounded-full bg-primary/20 text-primary border border-primary/30">
                {category}
              </span>
            )}
            {tags && tags.slice(0, 2).map((tag) => (
              <span key={tag} className="px-3 py-1 text-xs rounded-full bg-muted/50 text-muted-foreground border border-border">
                {tag}
              </span>
            ))}
          </div>
          <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </CardTitle>
          <CardDescription className="line-clamp-3">{excerpt}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              {date && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{new Date(date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}</span>
                </div>
              )}
              {readingTime && (
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{readingTime}</span>
                </div>
              )}
            </div>
            <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
          </div>
          {author && (
            <div className="mt-4 flex items-center gap-2 pt-4 border-t">
              {author.avatar && (
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="h-8 w-8 rounded-full"
                />
              )}
              <span className="text-sm text-muted-foreground">{author.name}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href?: string;
  className?: string;
}

export function FeatureCard({ icon, title, description, href, className }: FeatureCardProps) {
  const content = (
    <Card className={cn(
      'group relative overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/10 hover:border-primary/50',
      href && 'cursor-pointer',
      className
    )}>
      <CardHeader>
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground">
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
      {href && (
        <CardContent>
          <div className="flex items-center gap-2 text-sm text-primary font-medium">
            Learn more
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </CardContent>
      )}
    </Card>
  );

  return href ? <Link to={href}>{content}</Link> : content;
}

interface HubCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  count?: string;
  className?: string;
}

export function HubCard({ icon, title, description, href, count, className }: HubCardProps) {
  return (
    <Link to={href}>
      <Card className={cn(
        'group relative overflow-hidden transition-all hover:shadow-xl hover:shadow-primary/20 hover:border-primary/50 h-full',
        className
      )}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <CardHeader className="relative">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110">
            {icon}
          </div>
          <CardTitle className="text-2xl group-hover:text-primary transition-colors">
            {title}
          </CardTitle>
          <CardDescription className="text-base">{description}</CardDescription>
        </CardHeader>
        <CardContent className="relative">
          <div className="flex items-center justify-between">
            {count && (
              <span className="text-sm text-muted-foreground">{count}</span>
            )}
            <div className="flex items-center gap-2 text-sm text-primary font-medium ml-auto">
              Explore
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
