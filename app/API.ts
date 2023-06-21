//import { json } from "stream/consumers";
import { tokenToString } from "typescript";
import { ITask } from "./types/tasks";
import { Itoken } from "./types/token";

const baseUrl = "https://task-system.adaptable.app";

export const getAllTasks = async (token: string): Promise<ITask[]> => {
  try {
    const res = await fetch(`${baseUrl}/Tasks/search/byUserId`, {
      next: { revalidate: 0 },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const task = await res.json();
    //console.log(task)
    return task;
  } catch {
    return [];
  }
};

export const addTask = async (task: ITask, token: string): Promise<void> => {
  const res = await fetch(`${baseUrl}/Tasks`, {
    method: "Post",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  });
  // const newTask = await res.json();
  // return newTask;
};

export const editTask = async (task: ITask, token: string): Promise<void> => {
  console.log(task);
  const res = await fetch(`${baseUrl}/Tasks/${task._id}`, {
    next: { revalidate: 0 },
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  });
  // const updatedTask = await res.json();
  //  return updatedTask;
};

export const deleteTask = async (id: string, token: string): Promise<void> => {
  await fetch(`${baseUrl}/Tasks/${id}`, {
    //next:{revalidate: 0},
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const login = async (
  username: string,
  password: string
): Promise<Itoken | undefined> => {
  try {
    const res = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      next: { revalidate: 0 },
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const token = await res.json();
    localStorage.setItem("token", token.access_token);
    return token;
  } catch {
    return undefined;
  }
};

export const register = async (
  username: string,
  name: string,
  email: string,
  password: string
): Promise<boolean> => {
  try {
    const res = await fetch(`${baseUrl}/auth/register`, {
      method: "POST",
      next: { revalidate: 0 },
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ username, name, email, password }),
    });
    return res.status === 201;
  } catch {
    return false;
  }
};
