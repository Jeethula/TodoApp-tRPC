import { trpc } from '../utils/trpc';

interface TodoItemProps {
  todo: { id: string; title: string; completed: boolean };
}

export default function TodoItem({ todo }: TodoItemProps) {
  const utils = trpc.useContext();
  
  const updateTodo = trpc.todo.update.useMutation({
    onSuccess: () => {
      utils.todo.getAll.invalidate();
    },
  });

  const deleteTodo = trpc.todo.delete.useMutation({
    onSuccess: () => {
      utils.todo.getAll.invalidate();
    },
  });

  return (
    <div className="flex items-center justify-between p-3 bg-gray-800 rounded-md">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => updateTodo.mutate({ id: todo.id, completed: !todo.completed })}
          className="mr-3 h-5 w-5 text-blue-600 rounded focus:ring-blue-500 "
        />
        <span className={`${todo.completed ? 'line-through text-gray-500' : 'text-gray-100'}`}>
          {todo.title}
        </span>
      </div>
      <button
        onClick={() => deleteTodo.mutate(todo.id)}
        className="text-red-500 hover:text-red-700 transition duration-200"
      >
        Delete
      </button>
    </div>
  );
}
