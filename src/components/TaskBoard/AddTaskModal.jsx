import React, { useState } from "react";

const AddTaskModal = ({ onSave, taskToUpdate,  onCloseClick}) => {
  const [task, setTask] = useState(taskToUpdate || {
    id: crypto.randomUUID(),
    title: "",
    description: "",
    tags: [],
    priority: "",
    isFavorite: false,
  });

  const [isAdd, setIsAdd] = useState(Object.is(taskToUpdate, null));
  const handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    if (name === "tags") {
      value = value.split(",");
    }

    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(task);       
  };

  return (
    <>
      <div className="bg-black bg-opacity-70 h-full z-10 absolute top-0 left-0"></div>

      <form
        onSubmit={handleSubmit}
        className="mx-auto my-10 w-full max-w-[740px] rounded-xl border border-[#FEFBFB]/[36%] bg-[#191D26] p-9 z-10 absolute top-1/4 left-1/3"
      >
        <h2 className="mb-9 text-center text-2xl font-bold text-white">
            {isAdd ? "Add Task" : "Edit Task"}
            </h2>

        <div className="space-y-9 text-white lg:space-y-10">
          <div>
            <label>Title</label>
            <input
              className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Description</label>
            <textarea
              className="block min-h-[120px] w-full rounded-md bg-[#2D323F] px-3 py-2.5"
              name="description"
              value={task.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="md:grid grid-cols-2 gap-4">
            <div>
              <label>Tags</label>
              <input
                className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                name="tags"
                value={task.tags.join(",")}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Priority</label>
              <select
                className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                name="priority"
                value={task.priority}
                onChange={handleChange}
                required
              >
                <option value="">Select Priority</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-between">
          <button type="button" className="bg-red-600 px-4 py-2 rounded" onClick={onCloseClick}>
            Close
          </button>

          <button type="submit" className="bg-blue-600 px-4 py-2 rounded" onClick={()=> onSave(task, isAdd)}>
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default AddTaskModal;
