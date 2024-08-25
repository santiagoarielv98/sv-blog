// app/posts/posts.jsx
"use client";

import { getPosts } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import Lista from "../components/lista";

export default function Posts() {
  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts(),
  });

  return (
    <ul>
      {data?.map((post) => (
        <Lista key={post.id} post={post} />
      ))}
    </ul>
  );
}
