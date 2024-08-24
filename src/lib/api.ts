import type { Post } from "../types/post";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export function getPosts(): Promise<Post[]> {
  return fetch(`${baseUrl}/posts`).then((res) => res.json());
}


export function createPost(post: Omit<Post, 'id'>, token: string): Promise<Post> {
  return fetch(`${baseUrl}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(post),
  }).then((res) => res.json());
}