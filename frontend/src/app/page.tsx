import Link from 'next/link';

import { getTodoList } from '@/actions/todoApi';

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
      <ul>
        {res.data.todos.map((todo) => (
          <li key={todo.id}>
            <Link href={`/todo/${todo.id}`}>
              <strong>{todo.title}</strong>
            </Link>
            {todo.content && <p>{todo.content}</p>}
          </li>
        ))}
      </ul>
    </main>
  );
}
