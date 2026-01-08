import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';

export const useTaskStore = create((set) => ({
  tasks: [],
  isFetchingTasks: false,
  isAddingTask: false,

  fetchTasks: async () => {
    try {
      set({ isFetchingTasks: true });
      const res = await axiosInstance.get('/task/me');
      set({ tasks: res.data });
    } catch (err) {
      console.error('Fetch tasks failed', err);
    } finally {
      set({ isFetchingTasks: false });
    }
  },
  // addTask: async (title) => {
  //   if (!title.trim()) return;

  //   try {
  //     set({ isAddingTask: true });

  //     // 🔥 when backend POST exists, uncomment this
  //     // const res = await axiosInstance.post('/task', { title });

  //     set((state) => ({
  //       tasks: [
  //         ...state.tasks,
  //         {
  //           id: Date.now(), // temp id
  //           title,
  //           completed: false,
  //         },
  //       ],
  //     }));
  //   } catch (err) {
  //     console.error('Add task failed', err);
  //   } finally {
  //     set({ isAddingTask: false });
  //   }
  // },
}));
