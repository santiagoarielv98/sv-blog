import type { User } from "./user";

export interface Post {
  id: string;
  title: string;
  content: string;
  published: boolean;
  publishedAt: string;
  slug: string;
  user: User
}

export interface CreatePost {
  title: string;
  content: string;
}