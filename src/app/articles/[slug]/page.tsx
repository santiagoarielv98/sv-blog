import BlogPostDetail from '@/components/BlogPostDetail';
import { getArticle } from '@/lib/api';
import getQueryClient from '@/lib/getQueryClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

async function PostDetailPage({ params }: { params: { slug: string } }) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['posts', params.slug],
    queryFn: () => getArticle(params.slug),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BlogPostDetail slug={params.slug} />
    </HydrationBoundary>
  );
}

export default PostDetailPage;
