import Link from 'next/link';
import { redirect } from 'next/navigation';

import { createTodo } from '@/actions/todoApi';

async function createTodoAction(formData: FormData) {
  'use server';

  const title = String(formData.get('title') || '');
  const content = String(formData.get('content') || '');

  console.log('[Server Action] createTodoAction submitted:', {
    title,
    content,
  });

  const res = await createTodo({
    title,
    content: content || undefined,
  });

  if (!res.data) {
    throw new Error(`${res.status} ${res.errorCode}: ${res.errorMessage}`);
  }

  redirect('/');
}

export default function TodoCreatePage() {
  return (
    <main>
      <Link href="/">Back to Todo List</Link>
      <h1>Create Todo</h1>
      <form action={createTodoAction}>
        <p>
          <label htmlFor="title">Title</label>
          <input id="title" name="title" required maxLength={10} />
        </p>
        <p>
          <label htmlFor="content">Content</label>
          <textarea id="content" name="content" />
        </p>
        <button type="submit">Create Todo</button>
      </form>
    </main>
  );
}
