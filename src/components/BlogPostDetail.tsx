import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getArticle } from '@/lib/api';
import getQueryClient from '@/lib/getQueryClient';
import { Calendar } from 'lucide-react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import BlogLikesAndCommentsWithReplies from './BlogLikesAndCommentsWithReplies';
import { REACTIONTYPES } from '@/lib/reactions';
import { Button } from './ui/button';

export default async function BlogPostDetail({ slug }: { slug: string }) {
  const queryClient = getQueryClient();

  const post = await queryClient.fetchQuery({
    queryKey: ['posts', slug],
    queryFn: () => getArticle(slug as string),
  });

  console.log(post);

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
                {new Date().toLocaleDateString('en-US', {
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
          <div className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl sm:m-5 focus:outline-none max-w-none">
            {<MDXRemote source={post.content} />}
          </div>
          <div className="mt-8 border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Reactions</h3>
            <div className="flex items-center space-x-4">
              {post?.reactions.map(
                ({ type: reaction_type, count, isReacted }) => {
                  const ReactionIcon = REACTIONTYPES[reaction_type].icon;
                  return (
                    <Button
                      variant={isReacted ? 'default' : 'ghost'}
                      size="icon"
                      key={reaction_type}
                    >
                      <ReactionIcon className="h-4 w-4 mr-1" />
                      <span>{count}</span>
                    </Button>
                  );
                },
              )}
            </div>
          </div>
          <div className="mt-8 border-t pt-6">
            <BlogLikesAndCommentsWithReplies />
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
