import Link from 'next/link';

export default function TodoDetailNotFound() {
  return (
    <main>
      <Link href="/">Back to Todo List</Link>
      <h1>Todo Not Found</h1>
      <p>The requested todo could not be found.</p>
    </main>
  );
}
