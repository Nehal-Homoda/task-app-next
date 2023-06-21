"use client";
import { useEffect, useState } from "react";
import { getAllTasks } from "../API";
import AddTask from "./AddTask";
import TaskList from "./TaskList";



export default async function Core() {
    const [tasks,setTasks]=useState <any>([])
    const fillData=async ()=>{
        const ts=await getAllTasks()
        setTasks(ts);
    }
//  useEffect(()=>{
//   fillData();
//   console.log(localStorage.getItem("token"))
//   },[])
  if(typeof window!=='undefined')
  
 // const tasks=await getAllTasks()
  return (
    <main className="max-w-4xl mx-auto mt-4" >
   <div className="text-center my-5 flex-col gap-4">
<h1 className="text-2xl font-bold ">Task Managment System</h1>
<AddTask/>
   </div>
   <TaskList tasks={tasks}/>
    </main>
  )
}
