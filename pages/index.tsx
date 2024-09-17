import { useState } from "react";
import { trpc } from "../utils/trpc";
import TodoItem from "../components/TodoItem";

export default function Home() {
  const [newTodo, setNewTodo] = useState("");
  const utils = trpc.useContext();

  const todos = trpc.todo.getAll.useQuery();
  const createTodo = trpc.todo.create.useMutation({
    onSuccess: () => {
      utils.todo.getAll.invalidate();
      setNewTodo("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      createTodo.mutate({ title: newTodo });
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-900 text-gray-100 py-8">
    <div className="max-w-md mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Todo List</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo"
            className="flex-grow p-2 border border-gray-700 rounded-l-md bg-gray-800 text-gray-100 focus:outline-none focus:border-blue-500"
          />
          <button 
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition duration-200"
          >
            Add
          </button>
        </div>
      </form>
      <div className="space-y-2">
        {todos.isLoading && <p className="text-center">Loading...</p>}
        {todos.error && <p className="text-center text-red-500">Error: {todos.error.message}</p>}
        {todos.data?.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  </div>
  );
}
