import MostUsedTags from '@/components/MostUsedTags';
import { getMostUsedTags } from '@/lib/api';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';


async function TagsPage() {

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['tags'],
        queryFn: getMostUsedTags,
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <MostUsedTags />
        </HydrationBoundary>)
}

export default TagsPage