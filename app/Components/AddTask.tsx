"use client";

import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";
import { FormEventHandler, useState } from "react";
import { addTask } from "../API";
import { useRouter } from "next/navigation";
//import{v4 as uuidv4} from 'uuid';
const AddTask = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const handleSubmitNew: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await addTask(
      {
        _id: "",
        title: newTaskValue,
        status: status,
        timeSpent: 0,
      },
      localStorage.getItem("token")!
    );
    setNewTaskValue("");
    setModalOpen(false);
    window.location.reload();
  };
  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="btn btn-primary w-full"
      >
        Add New Task <AiOutlinePlus className="ml-2" size={18} />
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmitNew}>
          <h3 className="font-bold text-lg">Add New Task</h3>
          <div className="modal-action">
            <input
              value={newTaskValue}
              onChange={(e) => setNewTaskValue(e.target.value)}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
            <input
              value={status}
              onChange={(e) => setStatus(e.target.value)}
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
    </div>
  );
};
export default AddTask;
