import Link from 'next/link';

import { getTodo } from '@/actions/todoApi';

type TodoDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function TodoDetailPage({ params }: TodoDetailPageProps) {
  const { id } = await params;
  console.log('[RSC] TodoDetailPage rendered on server:', { id });

  const res = await getTodo({ id });
  console.log('[RSC] getTodo result:', res);

  if (!res.data) {
    return (
      <main>
        <Link href="/">Back to Todo List</Link>
        <h1>Todo Detail</h1>
        <p>
          {res.errorCode}: {res.errorMessage}
        </p>
      </main>
    );
  }

  return (
    <main>
      <Link href="/">Back to Todo List</Link>
      <h1>Todo Detail</h1>
      <dl>
        <dt>Title</dt>
        <dd>{res.data.title}</dd>
        <dt>Content</dt>
        <dd>{res.data.content || 'No content'}</dd>
      </dl>
    </main>
  );
}
