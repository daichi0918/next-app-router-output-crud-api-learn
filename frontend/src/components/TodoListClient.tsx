'use client';

import Link from 'next/link';
import { useCallback, useState } from 'react';
import { StatusCodes } from 'http-status-codes';

import { deleteTodo } from '@/actions/todoApi';
import { TodoType } from '@/types/todo';

type TodoListClientProps = {
  todos: TodoType[];
};

export const TodoListClient = ({ todos }: TodoListClientProps) => {
  console.log('[Client Component] TodoListClient rendered');

  const [todoList, setTodoList] = useState(todos);

  const handleDeleteTodo = useCallback(async (id: string, title: string) => {
    if (!window.confirm(`Do you want to delete "${title}"?`)) {
      return;
    }

    console.log('[Client Component] delete button clicked:', { id, title });

    const res = await deleteTodo({ id });

    if (res.status !== StatusCodes.NO_CONTENT) {
      alert(`${res.status} ${res.errorCode}: ${res.errorMessage}`);
      return;
    }

    setTodoList((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  return (
    <ul>
      {todoList.map((todo) => (
        <li key={todo.id}>
          <Link href={`/todo/${todo.id}`}>
            <strong>{todo.title}</strong>
          </Link>
          <p>
            <Link href={`/todo/edit/${todo.id}`}>Edit</Link>
          </p>
          <button
            type="button"
            onClick={() => handleDeleteTodo(todo.id, todo.title)}
          >
            Delete
          </button>
          {todo.content && <p>{todo.content}</p>}
        </li>
      ))}
    </ul>
  );
};
