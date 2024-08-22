import BlogPost from "./components/BlogPost";
import Categories from "./components/Categories";
import Pagination from "./components/Pagination";
import PostFilter from "./components/PostFilter";
import RecentPost from "./components/RecentPost";
import UsersList from "./components/UsersList";
import { posts } from "./data";

export default function Home() {
  return (
    <div className="flex justify-between container mx-auto">
      <div className="w-full lg:w-8/12">
        <div className="flex items-center justify-between max-w-4xl">
          <h1 className="text-xl font-bold text-gray-700 md:text-2xl">Post</h1>
          <PostFilter></PostFilter>
        </div>
        <div className="mt-6 space-y-6">
          {posts.map((post) => (
            <BlogPost key={post.id} post={post} />
          ))}
        </div>
        <div className="mt-8">
          <Pagination />
        </div>
      </div>
      <div className="w-4/12 hidden lg:block">
        <div className="px-8">
          <h1 className="mb-4 text-xl font-bold text-gray-700">Authors</h1>
          <UsersList />
        </div>
        <div className="mt-10 px-8">
          <h1 className="mb-4 text-xl font-bold text-gray-700">Categories</h1>
          <Categories />
        </div>
        <div className="mt-10 px-8">
          <h1 className="mb-4 text-xl font-bold text-gray-700">Recent Post</h1>
          <RecentPost />
        </div>
      </div>
    </div>
  );
}
