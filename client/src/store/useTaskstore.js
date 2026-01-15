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

  addTask: async (title) => {
  if (!title.trim()) return;

  try {
    set({ isAddingTask: true });

    const res = await axiosInstance.post('/task', {
      title,
      description: '',
    });

    set((state) => ({
      tasks: [res.data, ...state.tasks],
    }));
  } catch (err) {
    console.error('Add task failed', err);
  } finally {
    set({ isAddingTask: false });
  }
},


  removeTask: async (id) => {
    try {
      await axiosInstance.delete(`/task/${id}`);

      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
      }));
    } catch (err) {
      console.error('Delete task failed', err);
    }
  },
}));
