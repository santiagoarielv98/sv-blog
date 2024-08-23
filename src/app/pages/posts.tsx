// app/posts/posts.jsx
"use client";

import { getPosts } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export default function Posts() {
  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts(),
  });

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {data?.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
      <h1>Comments</h1>
      {/* <ul>
        {commentsData.map((comment) => (
          <li key={comment.id}>{comment.body}</li>
        ))}
      </ul> */}
    </div>
  );
}
