import { useState } from "react";
import SearchTask from "./SearchTask";
import TaskAction from "./TaskAction";
import TaskList from "./TaskList";
import AddTaskModal from "./AddTaskModal";
import NoTaskFound from "./NoTaskFound";

const TaskBoard = () => {
  const defaultTask = {
    id: crypto.randomUUID(),
    title: "Learn React",
    description: "I want to learn react",
    tags: ["web", "react", "js"],
    priority: "High",
    isFavorite: true,
  };

  // 🔥 Use two states
  const [allTasks, setAllTasks] = useState([defaultTask]);
  const [tasks, setTasks] = useState([defaultTask]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  const handleAddEditTask = (newTask, isAdd) => {
    let updated;
    if (isAdd) {
      updated = [...allTasks, newTask];
    } else {
      updated = allTasks.map((task) =>
        task.id === newTask.id ? newTask : task
      );
    }

    setAllTasks(updated);
    setTasks(updated);
    handleCloseClick();
  };

  const handleEditTask = (task) => {
    setTaskToUpdate(task);
    setShowAddModal(true);
  };

  const handleDeleteTask = (taskId) => {
    const updated = allTasks.filter((task) => task.id !== taskId);
    setAllTasks(updated);
    setTasks(updated);
  };

  const handleDeleteAllClick = () => {
    setAllTasks([]);
    setTasks([]);
  };

  const handleFavorite = (taskId) => {
    const updated = allTasks.map((task) =>
      task.id === taskId ? { ...task, isFavorite: !task.isFavorite } : task
    );
    setAllTasks(updated);
    setTasks(updated);
  };

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setTasks(allTasks); // empty search → show all
      return;
    }

    const filtered = allTasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setTasks(filtered);
  };

  const handleCloseClick = () => {
    setShowAddModal(false);
    setTaskToUpdate(null);
  };

  return (
    <section className="mb-20" id="tasks">
      {showAddModal && (
        <AddTaskModal
          onSave={handleAddEditTask}
          onCloseClick={handleCloseClick}
          taskToUpdate={taskToUpdate}
        />
      )}

      <div className="container">
        <div className="p-2 flex justify-end">
          <SearchTask onSearch={handleSearch} />
        </div>

        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskAction
            onAddClick={() => setShowAddModal(true)}
            onDeleteAllClick={handleDeleteAllClick}
          />

          {tasks.length > 0 ? (
            <TaskList
              tasks={tasks}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onFav={handleFavorite}
            />
          ) : (
            <NoTaskFound />
          )}
        </div>
      </div>
    </section>
  );
};

export default TaskBoard;
