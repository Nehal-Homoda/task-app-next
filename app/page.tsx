import { getAllTasks } from "./API";
import AddTask from "./Components/AddTask";
import Core from "./Components/Core";
import TaskList from "./Components/TaskList";


export default async function Home() {
  return (
    <main className="max-w-4xl mx-auto mt-4" >
      <Core />
    </main>
  )
}
