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
  totalComments: number;
  tags: Tag[];
  reactions: Reaction[];
}

export interface Tag {
  id: string;
  name: string;
}

export interface Author {
  id: string;
  username: string;
  profile_picture: string;
  email: string;
  bio?: string;
}

export interface Reaction {
  type: CommentReactionType;
  articleId: string;
  count: string;
  isReacted?: boolean;
}

export interface ArticleDetail {
  id: string;
  title: string;
  content: string;
  summary: string;
  thumbnail: null;
  slug: string;
  author: Author;
  reactions: Reaction[];
}
