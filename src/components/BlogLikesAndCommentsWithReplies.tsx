'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { createComment, getArticle } from '@/lib/api';
import type { CreateComment } from '@/types/comments';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Send } from 'lucide-react';
import { useParams } from 'next/navigation';
import CommentComponent from './CommentComponent';

export default function BlogLikesAndCommentsWithReplies() {
  const { slug }: { slug: string } = useParams();

  const { data: post } = useQuery({
    queryKey: ['posts', slug],
    queryFn: () => getArticle(slug as string),
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
