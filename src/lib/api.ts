import type { Post } from "../types/post";

export function getPosts(): Promise<Post[]> {
  return fetch("https://jsonplaceholder.typicode.com/posts").then((res) =>
    res.json()
  );
}
