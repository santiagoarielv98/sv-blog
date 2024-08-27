import type { CreatePost, Post } from "../types/post";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function getPosts(): Promise<Post[]> {
  return fetch(`${baseUrl}/articles`).then((res) => res.json());
}

export async function getPost(slug: string): Promise<Post> {
  return fetch(`${baseUrl}/articles/${slug}`).then((res) => res.json());
}

export async function createPost(
  post: CreatePost,
  token: string,
): Promise<Post> {
  return fetch(`${baseUrl}/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(post),
  }).then((res) => res.json());
}

export async function deletePost(id: string, token: string): Promise<void> {
  return fetch(`${baseUrl}/articles/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
}

export async function getMostUsedTags(): Promise<
  { name: string; count: number }[]
> {
  return fetch(`${baseUrl}/tags/most-used`).then((res) => res.json());
}
