import { getPosts } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import ButtonAuth from "./components/btn-login";
import Posts from "./pages/posts";
import MyEditor from "./components/editor";

export default async function PostsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <ButtonAuth />
        <MyEditor />
        <Posts />
      </div>
    </HydrationBoundary>
  );
}
