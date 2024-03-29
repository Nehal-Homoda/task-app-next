"use client";
import React, { FormEventHandler, useState } from "react";
import { ITask } from "../types/tasks";
import { FiEdit, FiInfo, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteTask, editTask } from "../API";

interface TaskProps {
  task: ITask;
}
const Tasks: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.title);

  const handleSubmitEditTask: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTask(
      {
        _id: task._id,
        title: taskToEdit,
        status: "done",
        timeSpent: 40,
      },
      localStorage.getItem("token")!
    );
    setTaskToEdit("");
    setOpenModalEdit(false);
    window.location.reload();
  };

  const HandleDeletTask = async (id: string) => {
    await deleteTask(id, localStorage.getItem("token")!);
    setOpenModalDelete(false);
    window.location.reload();
  };

  const openDetails = async () => {
    window.location.href = window.location.origin + `/details?taskId=${task._id}`;
  };
  return (
    <tr key={task._id}>
      <td className="w-full">{task.title}</td>
      <td className="w-full">{task.status}</td>
      <td className="w-full">{task.timeSpent.toString()}</td>
      <td className="flex gap-5">
        <FiInfo
          onClick={() => openDetails()}
          cursor="pointer"
          className="text-blue-500"
          size={25}
        />
        <FiEdit
          onClick={() => setOpenModalEdit(true)}
          cursor="pointer"
          className="text-blue-500"
          size={25}
        />

        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmitEditTask}>
            <h3 className="font-bold text-lg">Add New Task</h3>
            <div className="modal-action">
              <input
                value={taskToEdit}
                onChange={(e) => setTaskToEdit(e.target.value)}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <button type="submit" className="btn">
              Submit
            </button>
          </form>
        </Modal>

        <FiTrash2
          onClick={() => setOpenModalDelete(true)}
          cursor="pointer"
          className="text-red-500"
          size={25}
        />
        <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
          <h3 className="text-lg">Are you sure,Delete this task?</h3>
          <div className="modal-action">
            <button onClick={() => HandleDeletTask(task._id)} className="btn">
              Yes
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};
export default Tasks;
