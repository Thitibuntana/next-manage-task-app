"use client";

import Image from "next/image";
import logo from "./../../assets/images/logo.png";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Task = {
  id: string;
  title: string;
  detail: string;
  is_completed: boolean;
  created_at: string;
  update_at: string;
  image_url: string;
};

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const { data, error } = await supabase
        .from("task_tb")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        alert("ERROR DETECTED");
        console.log(error.message);
        return;
      } else {
        setTasks(data as Task[]);
      }
    };

    fetchTasks();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center w-3/4 mt-10 mx-auto">
        <Image src={logo} alt="logo" width={115} height={115} />
        <h1 className="text-2xl font-bold mt-2">Task Manager</h1>
        <h1 className="text-sm">Record all of your tasks!</h1>

        <div className="w-full flex justify-end mt-10">
          <Link
            href="/addtask"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded"
          >
            Add Task
          </Link>
        </div>

        <div className="mt-5 overflow-x-auto w-full">
          <table className="min-w-full border border-black text-sm text-center">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-black p-2">Image</th>
                <th className="border border-black p-2">Task</th>
                <th className="border border-black p-2">Details</th>
                <th className="border border-black p-2">Status</th>
                <th className="border border-black p-2">Created on</th>
                <th className="border border-black p-2">Last Configuration</th>
                <th className="border border-black p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <tr key={task.id}>
                    <td className="border border-black p-2">
                      {task.image_url ? (
                        <Image
                          src={task.image_url}
                          alt={task.title}
                          width={50}
                          height={50}
                          className="object-cover rounded"
                        />
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="border border-black p-2">{task.title}</td>
                    <td className="border border-black p-2">{task.detail}</td>
                    <td
                      className={`border border-black p-2 font-bold ${
                        task.is_completed ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {task.is_completed ? "Completed" : "Pending"}
                    </td>
                    <td className="border border-black p-2">
                      {new Date(task.created_at).toLocaleString()}
                    </td>
                    <td className="border border-black p-2">
                      {task.update_at
                        ? new Date(task.update_at).toLocaleString()
                        : "-"}
                    </td>
                    <td className="border border-black p-2 space-x-2">
                      <Link
                        href={`/edit/${task.id}`}
                        className="text-black py-1 px-3 rounded"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="border border-black p-2">
                    No tasks available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Link
          href={`/`}
          className="text-blue-700 font-bold py-1 px-3 mt-5 rounded"
        >
          Go back to the starting page
        </Link>
      </div>
    </>
  );
}
