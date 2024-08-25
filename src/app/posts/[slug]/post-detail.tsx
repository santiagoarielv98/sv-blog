"use client";

import { getPost } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

function PostDetail() {
    const { slug } = useParams();

    const { data } = useQuery({
        queryKey: ["posts", slug],
        queryFn: () => getPost(slug as string),
    });

    if (!data) return <p>Not found</p>;

    return (
        <div>
            <h1>{data.title}</h1>
            <article
                className='prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none'
                dangerouslySetInnerHTML={{ __html: data.content! }}
            ></article>
        </div>
    )
}

export default PostDetail