import Link from 'next/link';

import { getTodoList } from '@/actions/todoApi';
import { TodoListClient } from '@/components/TodoListClient';

export default async function TodoListPage() {
  const res = await getTodoList();

  if (!res.data) {
    return (
      <main>
        <h1>Todo List</h1>
        <p>
          {res.errorCode}: {res.errorMessage}
        </p>
      </main>
    );
  }

  return (
    <main>
      <h1>Todo List</h1>
      <p>
        <Link href="/todo/create">Create Todo</Link>
      </p>
      <TodoListClient todos={res.data.todos} />
    </main>
  );
}
