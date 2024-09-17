import { useRouter } from 'next/router';
import { trpc } from '../../utils/trpc';

export default function TodoDetail() {
  const router = useRouter();
  const { id } = router.query;
  const todoQuery = trpc.todo.getByid.useQuery(id as string, {
    enabled: !!id,
  });

  if (todoQuery.isLoading) return <div>Loading...</div>;
  if (todoQuery.error) return <div>Error: {todoQuery.error.message}</div>;

  const todo = todoQuery.data;

  return (
    <div>
      <h1>Todo Detail</h1>
      {todo ? (
        <>
          <h2>{todo.title}</h2>
          <p>Status: {todo.completed ? 'Completed' : 'Not completed'}</p>
        </>
      ) : (
        <p>Todo not found</p>
      )}
    </div>
  );
}
