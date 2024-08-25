export interface Post {
  id: number;
  title: string;
  content: string;
  published: boolean;
  publishedAt: string;
  slug: string;
}

export interface CreatePost {
  title: string;
  content: string;
}