import { useEffect, useState } from 'react';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setLoading(false);
      });
  }, []);

  const handleToggle = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleAddTask = () => {
    if (newTask.trim() === '') return;
    const nextId = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
    const taskToAdd = {
      userId: 1,
      id: nextId,
      title: newTask,
      completed: false,
    };
    setTasks([taskToAdd, ...tasks]);
    setNewTask('');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <span className="text-lg text-gray-600">Carregando tarefas...</span>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6 mb-24">
      <h2 className="text-2xl font-bold mb-4 text-indigo-600">Tarefas</h2>
      <div className="flex mb-6 gap-2">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Nova tarefa..."
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          onClick={handleAddTask}
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-4 py-2 rounded-lg transition"
        >
          Adicionar
        </button>
      </div>
      <ul className="divide-y divide-gray-200">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`flex items-center py-3 px-2 ${
              task.completed ? 'bg-green-50' : ''
            }`}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggle(task.id)}
              className="accent-indigo-500 mr-3"
            />
            <span
              className={`flex-1 ${
                task.completed ? 'line-through text-gray-400' : 'text-gray-800'
              }`}
            >
              {task.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;