import type { Article, ArticleDetail } from '@/types/article';
import type { CreateComment } from '@/types/comments';
import type { CreatePost, PostDetail } from '../types/post';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

async function httpGet(input: RequestInfo, init?: RequestInit) {
  return fetch(input, init).then((res) => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res;
  });
}

export async function getArticles(): Promise<Article[]> {
  return httpGet(`${baseUrl}/articles`).then((res) => res.json());
}

export async function getArticle(slug: string): Promise<ArticleDetail> {
  return httpGet(`${baseUrl}/articles/${slug}`).then((res) => res.json());
}

export async function createPost(
  post: CreatePost,
  /* token: string, */
): Promise<PostDetail> {
  return httpGet(`${baseUrl}/articles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      /* Authorization: `Bearer ${token}`, */
    },
    body: JSON.stringify(post),
  }).then((res) => res.json());
}

export async function deletePost(id: string, token: string): Promise<void> {
  return httpGet(`${baseUrl}/articles/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
}

export async function getMostUsedTags(): Promise<
  { name: string; count: number }[]
> {
  return httpGet(`${baseUrl}/tags/most-used`).then((res) => res.json());
}

export async function likePost(id: string): Promise<PostDetail> {
  return httpGet(`${baseUrl}/articles/${id}/like`, {
    method: 'POST',
    /*  headers: {
      Authorization: `Bearer ${token}`,
    }, */
  }).then((res) => (res.ok ? res.json() : Promise.reject(res)));
}

export async function unlikePost(id: string): Promise<PostDetail> {
  return httpGet(`${baseUrl}/articles/${id}/unlike`, {
    method: 'DELETE',
    /* headers: {
      Authorization: `Bearer ${token}`,
    }, */
  }).then((res) => (res.ok ? res.json() : Promise.reject(res)));
}

export async function createComment(
  postId: string,
  comment: CreateComment,
  /* token: string, */
): Promise<void> {
  return httpGet(`${baseUrl}/articles/${postId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      /* Authorization: `Bearer ${token}`, */
    },
    body: JSON.stringify(comment),
  }).then((res) => res.json());
}
