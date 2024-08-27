'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getMostUsedTags } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { Tag, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function MostUsedTags() {
  const { data: tags = [] } = useQuery({
    queryKey: ['tags'],
    queryFn: getMostUsedTags,
  });
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Most Used Tags</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Tag className="mr-2" />
              Tag Cloud
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {[
                { name: 'Technology', size: 'text-2xl', weight: 'font-bold' },
                { name: 'AI', size: 'text-xl', weight: 'font-semibold' },
                { name: 'Programming', size: 'text-lg', weight: 'font-medium' },
                {
                  name: 'Web Development',
                  size: 'text-base',
                  weight: 'font-normal',
                },
                {
                  name: 'Data Science',
                  size: 'text-xl',
                  weight: 'font-semibold',
                },
                {
                  name: 'Machine Learning',
                  size: 'text-lg',
                  weight: 'font-medium',
                },
                {
                  name: 'Cybersecurity',
                  size: 'text-base',
                  weight: 'font-normal',
                },
                {
                  name: 'Cloud Computing',
                  size: 'text-lg',
                  weight: 'font-medium',
                },
                { name: 'IoT', size: 'text-base', weight: 'font-normal' },
                {
                  name: 'Blockchain',
                  size: 'text-base',
                  weight: 'font-normal',
                },
              ].map((tag, index) => (
                <Link
                  key={index}
                  href={`/tag/${tag.name.toLowerCase().replace(' ', '-')}`}
                  className={`${tag.size} ${tag.weight} hover:text-primary transition-colors duration-200`}
                >
                  {tag.name}
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2" />
              Trending Tags
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {tags.map((tag, index) => (
                <li key={index} className="flex items-center">
                  <span className="text-primary font-semibold mr-2">
                    {index + 1}.
                  </span>
                  <Link
                    href={`/tag/${tag.name.toLowerCase().replace(' ', '-')}`}
                    className="hover:underline"
                  >
                    {tag.name}
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">
        Recent Posts by Popular Tags
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[
          { title: 'Introduction to Machine Learning', tag: 'AI' },
          { title: 'Building Responsive Websites', tag: 'Web Development' },
          { title: 'Cybersecurity Best Practices', tag: 'Cybersecurity' },
          { title: 'The Future of Cloud Computing', tag: 'Cloud Computing' },
          { title: 'Data Science in Finance', tag: 'Data Science' },
          { title: 'Getting Started with IoT', tag: 'IoT' },
        ].map((post, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <div className="flex justify-between items-center">
                <Button variant="outline" size="sm">
                  Read More
                </Button>
                <span className="text-sm text-muted-foreground">
                  Tag: {post.tag}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
