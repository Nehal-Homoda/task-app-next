"use client";
import { FormEventHandler, useEffect, useState } from "react";
import { editTask, getTaskById, login, register } from "../API";
import { useRouter } from "next/navigation";
import { ITask } from "../types/tasks";
var t: any;
const Details = () => {
  const [task, setTask] = useState<ITask>({
    title: "",
    timeSpent: 0,
    status: "",
    _id: "",
  });

  let [timer, setTimer] = useState<number>(0);
  let [startDisabled, setStartDisabled] = useState<boolean>(false);
  let [stopDisabled, setStopDisabled] = useState<boolean>(true);
  const urlParams = new URLSearchParams(window.location.search);
  const taskId = urlParams.get("taskId");

  const fillTask = async () => {
    var fetchedTask = await getTaskById(
      taskId!,
      localStorage.getItem("token")!
    );

    setTask(fetchedTask);
  };

  useEffect(() => {
    fillTask();
  });

  const startTimer = () => {
    setStartDisabled(true);
    setStopDisabled(false);
    t = setInterval(() => {
      setTimer(timer++);
    }, 1000);
  };

  const stopTimer = async () => {
    setStartDisabled(false);
    setStopDisabled(true);
    clearInterval(t);
    await editTask(
      {
        _id: task._id,
        title: task.title,
        status: task.status,
        timeSpent: timer,
      },
      localStorage.getItem("token")!
    );
    window.location.href = "/";
  };

  //convert seconds into hours, minutes and seconds
  const convertSeconds = (s: number) => {
    var hours = Math.floor(s / 3600);
    var minutes = Math.floor((s - hours * 3600) / 60);
    var seconds = s - hours * 3600 - minutes * 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="card-container">
      <div className="w-full m-auto p-4 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col items-center pb-10">
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {convertSeconds(timer)}
          </h5>
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {task.title}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {task.status}
          </span>

          <div className="flex mt-4 space-x-3 md:mt-6">
            <button
              disabled={startDisabled}
              onClick={startTimer}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              start timer
            </button>
            <button
              disabled={stopDisabled}
              onClick={stopTimer}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
            >
              stop timer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
