import type { Author } from './author';
import type { Tag } from './tags';
import type { User } from './user';

export interface Post {
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
}

export interface CreatePost {
  title: string;
  content: string;
}
