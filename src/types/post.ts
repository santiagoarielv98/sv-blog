import type { Author } from './author';
import type { Comment } from './comments';
import type { Tag } from './tags';
import type { User } from './user';

export interface PostDetail {
  id: string;
  title: string;
  summary: string;
  content: string;
  published: boolean;
  publishedAt: string;
  slug: string;
  user: User;
  tags: Tag[];
  author: Author;
  created_at: string;
  thumbnail: string;
  likesCount: number;
  liked: number;
  comments: Comment[];
}

export interface CreatePost {
  title: string;
  summary: string;
  content: string;
  thumbnail?: string;
  published?: boolean;
}
