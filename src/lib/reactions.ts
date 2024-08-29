import { CommentReactionType } from './constants';

import { ThumbsUp, ThumbsDown, Heart, Smile, Angry } from 'lucide-react';

export const REACTIONTYPES = {
  [CommentReactionType.LIKE]: { label: 'Like', icon: ThumbsUp },
  [CommentReactionType.DISLIKE]: { label: 'Dislike', icon: ThumbsDown },
  [CommentReactionType.LOVE]: { label: 'Love', icon: Heart },
  [CommentReactionType.FUNNY]: { label: 'Funny', icon: Smile },
  [CommentReactionType.ANGRY]: { label: 'Angry', icon: Angry },
};
