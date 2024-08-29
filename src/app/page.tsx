import BlogInterface from '@/components/BlogInterface';
import { getArticles } from '@/lib/api';
import getQueryClient from '@/lib/getQueryClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

export default async function PostsPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['posts'],
    queryFn: getArticles,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BlogInterface />
    </HydrationBoundary>
  );
}
