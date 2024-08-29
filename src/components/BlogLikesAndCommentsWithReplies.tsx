'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { createComment, getArticle, likePost, unlikePost } from '@/lib/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Send, ThumbsUp } from 'lucide-react';
import { useParams } from 'next/navigation';
import CommentComponent from './CommentComponent';
import type { PostDetail } from '@/types/post';
import type { CreateComment } from '@/types/comments';

export default function BlogLikesAndCommentsWithReplies() {
  const { slug }: { slug: string } = useParams();

  const queryClient = useQueryClient();

  const { data: post } = useQuery({
    queryKey: ['posts', slug],
    queryFn: () => getArticle(slug as string),
  });

  const { mutate: likePostMutation, isPending } = useMutation({
    // mutationFn: (id: string) => likePost(id),
    mutationFn: ({ id, liked }: { id: string; liked: boolean }) =>
      liked ? unlikePost(id) : likePost(id),
    onMutate: async ({ liked }) => {
      await queryClient.cancelQueries({ queryKey: ['posts', slug] });

      const previousPost = queryClient.getQueryData<PostDetail>(['posts', slug]);

      queryClient.setQueryData(['posts', slug], (old: PostDetail) => {
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

  const { mutate: createCommentMutation, isPending: isCreatePending } =
    useMutation({
      mutationFn: (comment: CreateComment) => createComment(post!.id, comment),
    });

  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const content = formData.get('content') as string;

    createCommentMutation({ content, parent_id: null });
    e.currentTarget.reset();
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
            <Textarea
              placeholder="Write a comment..."
              className="w-full"
              name="content"
            />
            <Button
              type="submit"
              className="flex items-center gap-2"
              disabled={isCreatePending}
            >
              <Send className="w-4 h-4" />
              Post Comment
            </Button>
          </form>
          <div className="mt-8 space-y-6">
            {post?.comments?.map((comment) => (
              <CommentComponent
                key={comment.id}
                comment={comment}
                onReply={createCommentMutation}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
