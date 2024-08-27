'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getPost } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { Calendar, Linkedin, Tag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { useEffect, useState } from 'react';

export default function BlogPostDetail() {
  const [content, setContent] = useState<MDXRemoteSerializeResult | null>(null);
  const { slug }: { slug: string } = useParams();

  const { data: post } = useQuery({
    queryKey: ['posts', slug],
    queryFn: () => getPost(slug as string),
  });

  useEffect(() => {
    if (post?.content) {
      serialize(post.content, { parseFrontmatter: true }).then(setContent);
    }
  }, [post?.content]);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <article className="md:w-2/3">
          <h1 className="text-4xl font-bold mb-4">{post?.title}</h1>
          <div className="flex items-center space-x-4 mb-6 text-muted-foreground">
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src={post?.author.profile_picture} alt="Author" />
                <AvatarFallback className="uppercase">
                  {post?.author.username.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <span>{post?.author.username}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span>
                {post?.created_at &&
                  new Date(post?.created_at).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
              </span>
            </div>
          </div>
          <Image
            width={800}
            height={400}
            src="https://picsum.photos/seed/picsum/200/300"
            alt="AI concept"
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
          <div className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none max-w-none">
            {content && <MDXRemote {...content} />}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {post?.tags.map((tag) => (
              <Button
                className="capitalize"
                variant="outline"
                size="sm"
                key={tag.id}
                asChild
              >
                <Link href={`/tags/${tag.name}`}>
                  <Tag className="h-4 w-4 mr-2" />
                  {tag.name}
                </Link>
              </Button>
            ))}
          </div>
          <div className="mt-8 border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Share this post</h3>
            <div className="flex space-x-4">
              {/* <Button variant="outline" size="icon">
                  <Facebook className="h-4 w-4" />
                  <span className="sr-only">Share on Facebook</span>
                </Button> */}
              {/* <Button variant="outline" size="icon">
                  <Twitter className="h-4 w-4" />
                  <span className="sr-only">Share on Twitter</span>
                </Button> */}
              <Button variant="outline" size="icon">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">Share on LinkedIn</span>
              </Button>
            </div>
          </div>
        </article>

        <aside className="md:w-1/3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About the Author</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/placeholder-user.jpg" alt="Author" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{post?.author.username}</h3>
                  <p className="text-sm text-muted-foreground">
                    {post?.author.email}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm">{post?.author.bio}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Related Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {[
                  'The Ethics of AI',
                  'Machine Learning Basics',
                  'AI in Healthcare',
                ].map((post, index) => (
                  <li key={index} className="flex items-center space-x-4">
                    <Image
                      width={80}
                      height={80}
                      // src={`/placeholder.svg?height=80&width=80&text=${index + 1}`}
                      src="https://picsum.photos/seed/picsum/80/80"
                      alt={post}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <h4 className="font-semibold">{post}</h4>
                      <p className="text-sm text-muted-foreground">
                        May {15 + index}, 2023
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </aside>
      </div>
    </main>
  );
}
