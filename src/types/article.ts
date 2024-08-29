import type { CommentReactionType } from '@/lib/constants';

export interface Article {
  id: string;
  title: string;
  content: string;
  summary: string;
  thumbnail: null;
  slug: string;
  author: Author;
  totalReactions: number;
  reactions: Reaction[];
}

export interface Author {
  id: string;
  username: string;
  profile_picture: null;
  bio?: string;
}

export interface Reaction {
  reaction_type: CommentReactionType;
  articleId: string;
  count: string;
}
