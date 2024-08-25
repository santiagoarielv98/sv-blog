"use client";

import { deletePost, getPost } from '@/lib/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';

function PostDetail() {
    const queryClient = useQueryClient();
    const { data: sessionData } = useSession()
    const router = useRouter();

    const { slug }: { slug: string } = useParams();

    const mutation = useMutation({
        mutationFn: () => deletePost(data!.id, sessionData!.token!),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["posts"],
            });
            router.push("/");
        },

    });

    const { data } = useQuery({
        queryKey: ["posts", slug],
        queryFn: () => getPost(slug as string),
    });
    if (!data) return <p>Not found</p>;

    return (
        <div>
            {
                sessionData && sessionData.user && sessionData.user.email === data.user.email && (
                    <button
                        disabled={mutation.isPending}
                        onClick={() => {
                            mutation.mutate();
                        }}
                    >
                        Delete
                    </button>
                )
            }

            <h1>{data.title}</h1>
            <article
                className='prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none'
                dangerouslySetInnerHTML={{ __html: data.content! }}
            ></article>
        </div>
    )
}

export default PostDetail