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
          <li key={post.id}>
            <article className='prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none' dangerouslySetInnerHTML={{ __html: post.content }}></article>
          </li>
        ))}
      </ul>
      <h1>Comments</h1>

    </div >
  );
}
