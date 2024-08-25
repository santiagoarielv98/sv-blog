import { getPost } from '@/lib/api';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import PostDetail from './post-detail';


async function PostDetailPage({ params }: { params: { slug: string } }) {

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["posts", params.slug],
        queryFn: () => getPost(params.slug),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div>
                <PostDetail />
            </div>
        </HydrationBoundary>)
}

export default PostDetailPage