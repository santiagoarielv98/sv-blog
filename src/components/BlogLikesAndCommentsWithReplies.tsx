'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, Send, ThumbsUp } from 'lucide-react';
import { useState } from 'react';

interface Comment {
  id: number;
  author: string;
  content: string;
  likes: number;
  replies: Comment[];
}

const CommentComponent = ({
  comment,
  onReply,
}: {
  comment: Comment;
  onReply: (parentId: number, content: string) => void;
}) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (replyContent.trim()) {
      onReply(comment.id, replyContent);
      setReplyContent('');
      setIsReplying(false);
    }
  };

  return (
    <Card className="mb-4 max-sm:border-none">
      <CardHeader className="max-sm:px-0">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage
              src={`https://api.dicebear.com/6.x/initials/svg?seed=${comment.author}`}
              alt={comment.author}
            />
            <AvatarFallback>
              {comment.author
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-sm font-medium">
              {comment.author}
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="max-sm:px-0">
        <p className="text-sm text-muted-foreground">{comment.content}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <ThumbsUp className="w-4 h-4" />
          <span>{comment.likes}</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsReplying(!isReplying)}
          className="flex items-center gap-2"
        >
          <MessageCircle className="w-4 h-4" />
          Reply
        </Button>
      </CardFooter>
      {isReplying && (
        <CardContent>
          <form onSubmit={handleReplySubmit} className="space-y-4">
            <Textarea
              placeholder="Write a reply..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              className="w-full"
            />
            <Button type="submit" size="sm" className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              Post Reply
            </Button>
          </form>
        </CardContent>
      )}
      {comment.replies.length > 0 && (
        <CardContent>
          <div className="pl-6 border-l-2 border-muted">
            {comment.replies.map((reply) => (
              <CommentComponent
                key={reply.id}
                comment={reply}
                onReply={onReply}
              />
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default function BlogLikesAndCommentsWithReplies() {
  const [likes, setLikes] = useState(42);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState<Comment[]>([
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
  ]);
  const [newComment, setNewComment] = useState('');

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const newCommentObj: Comment = {
        id: Math.max(0, ...comments.map((c) => c.id)) + 1,
        author: 'Current User',
        content: newComment,
        likes: 0,
        replies: [],
      };
      setComments([...comments, newCommentObj]);
      setNewComment('');
    }
  };

  const handleReply = (parentId: number, content: string) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: [
            ...comment.replies,
            {
              id: Math.max(0, ...comment.replies.map((r) => r.id)) + 1,
              author: 'Current User',
              content: content,
              likes: 0,
              replies: [],
            },
          ],
        };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  return (
    <div className="mt-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Likes and Comments</span>
            <Button
              variant={liked ? 'default' : 'outline'}
              size="sm"
              onClick={handleLike}
              className="flex items-center gap-2"
            >
              <ThumbsUp className="w-4 h-4" />
              <span>{likes}</span>
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCommentSubmit} className="space-y-4">
            <Textarea
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full"
            />
            <Button type="submit" className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              Post Comment
            </Button>
          </form>
          <div className="mt-8 space-y-6">
            {comments.map((comment) => (
              <CommentComponent
                key={comment.id}
                comment={comment}
                onReply={handleReply}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
