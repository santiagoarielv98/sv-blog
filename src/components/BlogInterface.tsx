'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { getPosts } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { Search } from 'lucide-react';
import Link from 'next/link';

export default function BlogInterface() {
  const { data: articles = [] } = useQuery({
    queryKey: ['posts'],
    queryFn: () => getPosts(),
  });
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          <h2 className="text-3xl font-bold mb-6">Latest Posts</h2>
          <div className="space-y-6">
            {articles.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{post.summary}</p>
                </CardContent>
                <CardFooter className="justify-between">
                  <Button variant="outline" asChild>
                    <Link href={`/posts/${post.slug}`}>Read More</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <aside className="md:w-1/3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Search</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="flex w-full max-w-sm items-center space-x-2">
                <Input type="search" placeholder="Search posts..." />
                <Button type="submit" size="icon">
                  <Search className="h-4 w-4" />
                  <span className="sr-only">Search</span>
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:underline">
                    Technology
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Travel
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Food
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Lifestyle
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:underline">
                    10 Tips for Productive Work
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Best Summer Destinations
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Easy Recipes for Beginners
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>
        </aside>
      </div>
    </main>
  );
}
