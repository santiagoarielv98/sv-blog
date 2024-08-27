import MostUsedTags from '@/components/MostUsedTags';
import { getMostUsedTags } from '@/lib/api';
import getQueryClient from '@/lib/getQueryClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

async function TagsPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['tags'],
    queryFn: getMostUsedTags,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MostUsedTags />
    </HydrationBoundary>
  );
}

export default TagsPage;
