//import { json } from "stream/consumers";
import { tokenToString } from "typescript";
import { ITask } from "./types/tasks";

const baseUrl = 'https://task-system.adaptable.app';

export const getAllTasks = async (): Promise<ITask[]> => {
    try {
        const res = await fetch(`${baseUrl}/Tasks/search/byUserId`, {
            next: { revalidate: 0 },
            headers: {

                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik5laGFsIiwic3ViIjoiNjQ5MDdjNWU1NGJlOTU4ZGRhNTExNzJmIiwiaWF0IjoxNjg3MjYzMDQ3LCJleHAiOjE2ODk4NTUwNDd9.ZNuhBcGdJEjnTv6uSo3eW02fVumK7cTfM_F7W1crwQU"
            }
        });
        const task = await res.json();
        //console.log(task)
        return task;
    } catch {
        return [];
    }

}


export const addTask = async (task: ITask): Promise<void> => {

    const res = await fetch(`${baseUrl}/Tasks`,
        {
            method: 'Post',
            headers: {
                'content-type': 'application/json',
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik5laGFsIiwic3ViIjoiNjQ5MDdjNWU1NGJlOTU4ZGRhNTExNzJmIiwiaWF0IjoxNjg3MjYzMDQ3LCJleHAiOjE2ODk4NTUwNDd9.ZNuhBcGdJEjnTv6uSo3eW02fVumK7cTfM_F7W1crwQU"

            },
            body: JSON.stringify(task)
        })
    // const newTask = await res.json();
    // return newTask;
}


export const editTask = async (task: ITask): Promise<void> => {
    console.log(task);
    const res = await fetch(`${baseUrl}/Tasks/${task._id}`, {
        next: { revalidate: 0 },
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik5laGFsIiwic3ViIjoiNjQ5MDdjNWU1NGJlOTU4ZGRhNTExNzJmIiwiaWF0IjoxNjg3MjYzMDQ3LCJleHAiOjE2ODk4NTUwNDd9.ZNuhBcGdJEjnTv6uSo3eW02fVumK7cTfM_F7W1crwQU"

        },
        body: JSON.stringify(task)
    })
    // const updatedTask = await res.json();
    //  return updatedTask;
}

export const deleteTask = async (id: string): Promise<void> => {

    await fetch(`${baseUrl}/Tasks/${id}`, {
        //next:{revalidate: 0},
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik5laGFsIiwic3ViIjoiNjQ5MDdjNWU1NGJlOTU4ZGRhNTExNzJmIiwiaWF0IjoxNjg3MjYzMDQ3LCJleHAiOjE2ODk4NTUwNDd9.ZNuhBcGdJEjnTv6uSo3eW02fVumK7cTfM_F7W1crwQU"

        }
    })

}


export const login = async (username: string, password: string): Promise<ITask[]> => {
    try {
        const res = await fetch(`${baseUrl}/auth/login`, {
            method:"POST",
            next: { revalidate: 0 },
            headers: {
                
                'content-type': 'application/json',
            },
            body: JSON.stringify({username,password})
        });

        const token= await res.json();
        localStorage.setItem("token",token.access_token)
        return token;
    } catch {
        return [];
    }

}



