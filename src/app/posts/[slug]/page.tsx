import BlogPostDetail from '@/components/BlogPostDetail';
import { getPost } from '@/lib/api';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

async function PostDetailPage({ params }: { params: { slug: string } }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['posts', params.slug],
    queryFn: () => getPost(params.slug),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BlogPostDetail slug={params.slug} />
    </HydrationBoundary>
  );
}

export default PostDetailPage;
