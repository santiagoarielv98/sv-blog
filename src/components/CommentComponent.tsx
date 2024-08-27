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

interface Comment {
  id: number;
  author: string;
  content: string;
  likes: number;
  replies: Comment[];
}

const CommentComponent = ({ comment }: { comment: Comment }) => {
  // const [isReplying, setIsReplying] = useState(false);
  // const [replyContent, setReplyContent] = useState('');

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // if (replyContent.trim()) {
    // onReply(comment.id, replyContent);
    // setReplyContent('');
    // setIsReplying(false);
    // }
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
          // onClick={() => setIsReplying(!isReplying)}
          className="flex items-center gap-2"
        >
          <MessageCircle className="w-4 h-4" />
          Reply
        </Button>
      </CardFooter>
      {
        /* isReplying */ true && (
          <CardContent>
            <form onSubmit={handleReplySubmit} className="space-y-4">
              <Textarea
                placeholder="Write a reply..."
                // value={replyContent}
                // onChange={(e) => setReplyContent(e.target.value)}
                className="w-full"
              />
              <Button
                type="submit"
                size="sm"
                className="flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Post Reply
              </Button>
            </form>
          </CardContent>
        )
      }
      {comment.replies.length > 0 && (
        <CardContent>
          <div className="pl-6 border-l-2 border-muted">
            {comment.replies.map((reply) => (
              <CommentComponent
                key={reply.id}
                comment={reply}
                // onReply={onReply}
              />
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default CommentComponent;
