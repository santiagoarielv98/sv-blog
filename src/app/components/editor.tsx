'use client'

import { createPost } from '@/lib/api'
import type { Post } from '@/types/post'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useSession } from 'next-auth/react'

function Tiptap() {
  const { data } = useSession()

  const queryClient = useQueryClient()

  const mutation = useMutation<Post, Error, Omit<Post, 'id'>>({
    mutationFn: (newPost) => createPost(newPost, data!.token!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    }
  })

  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
      }
    },
    content: `
    <h2>
      Hi there,
    </h2>
    <p>
      this is a basic <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
    </p>
    <ul>
      <li>
        That’s a bullet list with one …
      </li>
      <li>
        … or two list items.
      </li>
    </ul>
    <p>
      Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
    </p>
<pre><code class="language-css">body {
  display: none;
}</code></pre>
    <p>
      I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
    </p>
    <blockquote>
      Wow, that’s amazing. Good work, boy! 👏
      <br />
      — Mom
    </blockquote>
  `,
  })

  return <form
    onSubmit={(e) => {
      e.preventDefault()
      mutation.mutate({ title: 'New Post', content: editor!.getHTML() })
    }}
  >
    <EditorContent editor={editor} />
    <button
      disabled={mutation.isPending}
      type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Submit
    </button>

  </form>
}

export default Tiptap
