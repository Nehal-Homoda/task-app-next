
"use client";
import React, { FormEventHandler, useState } from "react";
import { ITask } from "../types/tasks";
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteTask, editTask } from "../API";

interface TaskProps {
    task: ITask
}
const Tasks: React.FC<TaskProps> = ({ task }) => {
    const router = useRouter();
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
    const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
    const [taskToEdit, setTaskToEdit] = useState<string>(task.title);

    const handleSubmitEditTask: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        await editTask({
            _id:task._id ,
            title: taskToEdit,
            status: 'done',
            timeSpent: 40
        });
        setTaskToEdit("");
        setOpenModalEdit(false);
        router.refresh();
    };


    const HandleDeletTask = async (id: string) => {
        await deleteTask(id);
        setOpenModalDelete(false);
        router.refresh();
    }
    return (
        <tr key={task._id}>
            <td className="w-full">{task.title}</td>
            <td className="w-full">{task.status}</td>
            <td className="w-full">{task.timeSpent.toString()}</td>
            <td className="flex gap-5">
                <FiEdit onClick={() => setOpenModalEdit(true)} cursor="pointer" className="text-blue-500" size={25} />

                <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
                    <form onSubmit={handleSubmitEditTask}>
                        <h3 className='font-bold text-lg'>Add New Task</h3>
                        <div className='modal-action'>
                            <input
                                value={taskToEdit}
                                onChange={e => setTaskToEdit(e.target.value)}
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered w-full max-w-xs" />
                        </div>
                        <button type="submit" className='btn'>Submit</button>
                    </form>
                </Modal>






                <FiTrash2 onClick={() => setOpenModalDelete(true)} cursor="pointer" className="text-red-500" size={25} />
                <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
                    <h3 className="text-lg">Are you sure,Delete this task? ${task._id} </h3>
                    <div className="modal-action">
                        <button onClick={() => HandleDeletTask(task._id)} className="btn">Yes</button>

                    </div>
                </Modal>
            </td>
        </tr>

    );
};
export default Tasks;