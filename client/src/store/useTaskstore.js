// import { axiosInstance } from "../lib/axios";
// import toast from "react-hot-toast";

// import { create } from "zustand";
// export const useTaskStore = create((set, get) => ({
//     tasks : [],
//     isAddingTask: false,
//     isFetchingTasks: false,

//     addTask: async (task) => {
//         try {
//             set({ isAddingTask: true });
//             const res = await axiosInstance.post("/api/task", { task });
//             console.log("response from backend:", res.data);
//             set((state) => ({ tasks: [...state.tasks, res.data.task] }));
//         } catch (error) {
//             console.error("error adding task", error);
//             toast.error("Could not add task");
//         } finally {
//             set({ isAddingTask: false });
//         }
//     },

//     fetchTasks: async () => {
//         try {
//             set({ isFetchingTasks: true });
//             const res = await axiosInstance.get("/tasks");
//             console.log("fetched tasks from backend:", res.data);
//             set({ tasks: res.data.tasks });
//         }   catch (error) {
//             console.error("error fetchining tasks",error);
//             toast.error("could not fetch tasks")
//         }finally{
//             set({isFetchingTasks:false});
//         }
//     }
// }));