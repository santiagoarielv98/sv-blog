'use client';

import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Color } from '@tiptap/extension-color';
import Dropcursor from '@tiptap/extension-dropcursor';

import Image from '@tiptap/extension-image';
import ListItem from '@tiptap/extension-list-item';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import { EditorProvider, useCurrentEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  Eye,
  Image as ImageIcon,
  Save,
  // iconos para el editor
  Bold,
  Italic,
  Strikethrough,
  Code,
  List,
  ListOrdered,
  Undo,
  Redo,
  Minus,
  Quote,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Text,
} from 'lucide-react';
import { useState } from 'react';

const MenuBar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        pressed={editor.isActive('bold')}
      >
        <Bold />
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        pressed={editor.isActive('italic')}
      >
        <Italic />
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        pressed={editor.isActive('strike')}
      >
        <Strikethrough />
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        pressed={editor.isActive('code')}
      >
        <Code />
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
      >
        Clear marks
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().clearNodes().run()}
      >
        Clear nodes
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().setParagraph().run()}
        pressed={editor.isActive('paragraph')}
      >
        <Text />
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        pressed={editor.isActive('heading', { level: 1 })}
      >
        H1
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        pressed={editor.isActive('heading', { level: 2 })}
      >
        H2
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        pressed={editor.isActive('heading', { level: 3 })}
      >
        H3
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        pressed={editor.isActive('heading', { level: 4 })}
      >
        H4
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        pressed={editor.isActive('heading', { level: 5 })}
      >
        H5
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        pressed={editor.isActive('heading', { level: 6 })}
      >
        H6
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        pressed={editor.isActive('bulletList')}
      >
        <List />
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        pressed={editor.isActive('orderedList')}
      >
        <ListOrdered />
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        pressed={editor.isActive('codeBlock')}
      >
        <Code />
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        pressed={editor.isActive('blockquote')}
      >
        <Quote />
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <Minus />
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().setHardBreak().run()}
      >
        Hard break
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <Undo />
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <Redo />
      </Toggle>
      {/* align */}
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        pressed={editor.isActive('textAlign', 'left')}
      >
        <AlignLeft />
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        pressed={editor.isActive('textAlign', 'center')}
      >
        <AlignCenter />
      </Toggle>
      <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        pressed={editor.isActive('textAlign', 'right')}
      >
        <AlignRight />
      </Toggle>

      {/* <Toggle
        variant="outline"
        onClick={() => editor.chain().focus().setColor('#958DF1').run()}
        className={
          editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : ''
        }
      >
        Purple
      </Toggle> */}
    </div>
  );
};

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
  ListItem,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
    alignments: ['left', 'center', 'right'],
  }),
  Dropcursor,
  TaskItem,
  TaskList,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  Image,
];

export default function RichTextBlogEditor() {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Blog Post</h1>

      <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Enter your blog post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-xl font-semibold"
          />
          <Card>
            <CardContent className="p-4">
              <EditorProvider
                editorProps={{
                  attributes: {
                    class:
                      'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
                  },
                }}
                slotBefore={<MenuBar />}
                extensions={extensions}
                content={content}
                immediatelyRender
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Publishing Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="draft" />
                <Label htmlFor="draft">Save as draft</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="comments" />
                <Label htmlFor="comments">Allow comments</Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  placeholder="Enter tags separated by commas"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
              </div>
              <div className="flex space-x-2">
                <Button className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" className="w-full">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Featured Image</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-40 bg-muted rounded-lg">
                <ImageIcon className="w-8 h-8 text-muted-foreground" />
              </div>
              <Button variant="outline" className="w-full mt-4">
                Upload Image
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

const content = `
<h2>
  Hi there,
</h2>
 <table style="width:100%">
<tr>
  <th>Firstname</th>
  <th>Lastname</th>
  <th>Age</th>
</tr>
<tr>
  <td>Jill</td>
  <td>Smith</td>
  <td>50</td>
</tr>
<tr>
  <td>Eve</td>
  <td>Jackson</td>
  <td>94</td>
</tr>
<tr>
  <td>John</td>
  <td>Doe</td>
  <td>80</td>
</tr>
</table>
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
`;
