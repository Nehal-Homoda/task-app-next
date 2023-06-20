import { ITask } from "../types/tasks";
import React from "react";
import Tasks from "./Tasks";
//import Tasks from "./tasks";

interface TaskListProps{
    tasks:ITask[]
}


const TaskList:React.FC<TaskListProps>=({tasks})=>{
    return (<div className="overflow-x-auto">
        <table className="table">
            {/* head */}
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Time Spent</th>
                </tr>
            </thead>
            <tbody>
               {tasks.map((task)=>(
               <Tasks  key={task._id} task={task}/>
               ))}
                
            </tbody>
        </table>
    </div>
    );
};
export default TaskList;