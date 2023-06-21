"use client";
import { useEffect, useState } from "react";
import { getAllTasks } from "../API";
import AddTask from "./AddTask";
import TaskList from "./TaskList";
import { ITask } from "../types/tasks";

export default function Core() {
  if (!localStorage.getItem("token")) {
    window.location.href = "/signin";
  }
  const [tasks, setTasks] = useState<ITask[]>([]);
  const fillData = async () => {
    const fetchedTasks = await getAllTasks(localStorage.getItem("token")!);
    setTasks(fetchedTasks);
  };
  useEffect(() => {
    fillData();
  }, []);
  return (
    <main className="max-w-4xl mx-auto mt-4">
      <div className="text-center my-5 flex-col gap-4">
        <h1 className="text-2xl font-bold ">Task Managment System</h1>
        <AddTask />
      </div>
      <TaskList tasks={tasks} />
    </main>
  );
}
