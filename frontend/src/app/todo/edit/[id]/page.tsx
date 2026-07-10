import Link from 'next/link';
import { redirect } from 'next/navigation';

import { getTodo, updateTodo } from '@/actions/todoApi';

type TodoEditPageProps = {
  params: Promise<{ id: string }>;
};

export default async function TodoEditPage({ params }: TodoEditPageProps) {
  const { id } = await params;
  const res = await getTodo({ id });

  async function updateTodoAction(formData: FormData) {
    'use server';

    const title = String(formData.get('title') || '');
    const content = String(formData.get('content') || '');

    console.log('[Server Action] updateTodoAction submitted:', {
      id,
      title,
      content,
    });

    const updateRes = await updateTodo({
      id,
      title,
      content: content || undefined,
    });

    if (!updateRes.data) {
      throw new Error(
        `${updateRes.status} ${updateRes.errorCode}: ${updateRes.errorMessage}`
      );
    }

    redirect('/');
  }

  if (!res.data) {
    return (
      <main>
        <Link href="/">Back to Todo List</Link>
        <h1>Edit Todo</h1>
        <p>
          {res.errorCode}: {res.errorMessage}
        </p>
      </main>
    );
  }

  return (
    <main>
      <Link href="/">Back to Todo List</Link>
      <h1>Edit Todo</h1>
      <form action={updateTodoAction}>
        <p>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            required
            maxLength={10}
            defaultValue={res.data.title}
          />
        </p>
        <p>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            defaultValue={res.data.content || ''}
          />
        </p>
        <button type="submit">Edit Todo</button>
      </form>
    </main>
  );
}
