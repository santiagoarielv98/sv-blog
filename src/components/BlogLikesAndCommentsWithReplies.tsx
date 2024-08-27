'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { getPost } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { Send, ThumbsUp } from 'lucide-react';
import { useParams } from 'next/navigation';
import CommentComponent from './CommentComponent';

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
  const { slug } = useParams();

  const { data: post } = useQuery({
    queryKey: ['posts', slug],
    queryFn: () => getPost(slug as string),
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
            <Button size="sm" className="flex items-center gap-2">
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
