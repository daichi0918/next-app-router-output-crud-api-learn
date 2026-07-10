'use client';

type TodoDetailErrorProps = {
  error: Error;
  reset: () => void;
};

export default function TodoDetailError({
  error,
  reset,
}: TodoDetailErrorProps) {
  console.error('[Client Error Boundary] TodoDetailError:', error);

  return (
    <main>
      <h1>Todo Detail Error</h1>
      <p>{error.message}</p>
      <button type="button" onClick={reset}>
        Retry
      </button>
    </main>
  );
}
