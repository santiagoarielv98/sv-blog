// app/posts/posts.jsx
'use client';

import { getArticles } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

export default function Posts() {
  const { data } = useQuery({
    queryKey: ['posts'],
    queryFn: () => getArticles(),
  });

  return (
    <ul>
      {data?.map((post) => (
        <Link
          key={post.id}
          href={`posts/${post.slug}`}
          className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          {/* <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src="/docs/images/blog/image-4.jpg" alt="" /> */}
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {post.title}
            </h5>
          </div>
        </Link>
      ))}
    </ul>
  );
}
