'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { getPost, likePost, unlikePost } from '@/lib/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Send, ThumbsUp } from 'lucide-react';
import { useParams } from 'next/navigation';
import CommentComponent from './CommentComponent';
import type { Post } from '@/types/post';

const comments = [
  {
    id: 1,
    author: 'Alice Johnson',
    content: 'Great article! I learned a lot from this.',
    likes: 5,
    replies: [],
  },
  {
    id: 2,
    author: 'Bob Smith',
    content:
      'I have a question about the third point. Can you elaborate more on that?',
    likes: 2,
    replies: [],
  },
  {
    id: 3,
    author: 'Charlie Brown',
    content: 'This is exactly what I was looking for. Thanks for sharing!',
    likes: 8,
    replies: [],
  },
];

export default function BlogLikesAndCommentsWithReplies() {
  const { slug }: { slug: string } = useParams();

  const queryClient = useQueryClient();

  const { data: post } = useQuery({
    queryKey: ['posts', slug],
    queryFn: () => getPost(slug as string),
  });

  const { mutate: likePostMutation, isPending } = useMutation({
    // mutationFn: (id: string) => likePost(id),
    mutationFn: ({ id, liked }: { id: string; liked: boolean }) =>
      liked ? unlikePost(id) : likePost(id),
    onMutate: async ({ liked }) => {
      await queryClient.cancelQueries({ queryKey: ['posts', slug] });

      const previousPost = queryClient.getQueryData<Post>(['posts', slug]);

      queryClient.setQueryData(['posts', slug], (old: Post) => {
        return {
          ...old,
          // liked:number
          liked: liked ? 0 : 1,
          likesCount: liked ? old.likesCount - 1 : old.likesCount + 1,
        };
      });

      return { previousPost };
    },
    onError: (err, newTodo, context) => {
      console.error(err);
      queryClient.setQueryData(['posts', slug], context?.previousPost);
    },
    onSettled: (newPost, error, variables, context) => {
      if (error) {
        queryClient.setQueryData(['posts', slug], context?.previousPost);
      }
    },
  });

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="mt-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Likes and Comments</span>
            <Button
              disabled={isPending}
              size="sm"
              className="flex items-center gap-2"
              variant={post?.liked ? 'default' : 'ghost'}
              onClick={() =>
                likePostMutation({ id: post!.id, liked: Boolean(post!.liked) })
              }
            >
              <ThumbsUp className="w-4 h-4" />
              <span>{post!.likesCount}</span>
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCommentSubmit} className="space-y-4">
            <Textarea placeholder="Write a comment..." className="w-full" />
            <Button type="submit" className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              Post Comment
            </Button>
          </form>
          <div className="mt-8 space-y-6">
            {comments.map((comment) => (
              <CommentComponent key={comment.id} comment={comment} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
