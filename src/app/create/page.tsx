import dynamic from 'next/dynamic';
// import RichTextBlogEditor from '@/components/RichTextBlogEditor';

const RichTextBlogEditor = dynamic(
  () => import('@/components/RichTextBlogEditor'),
  { ssr: false },
);

function CreatePostPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Blog Post</h1>
      <RichTextBlogEditor />
    </main>
  );
}

export default CreatePostPage;
