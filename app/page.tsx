import { getAllTasks } from "./API";
import AddTask from "./Components/AddTask";
import TaskList from "./Components/TaskList";


export default async function Home() {
  const tasks=await getAllTasks()
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
