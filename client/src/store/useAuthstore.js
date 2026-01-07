import { create } from 'zustand'; 
import {axiosInstance} from '../lib/axios';
import toast from 'react-hot-toast';

export const useAuthStore = create((set, get) => ({
    isLoggingIn: false,
    isSigningup: false,
    authUser: null,
    isCheckingAuth: true,

    signup: async (formData) => {
        try {
            set({ isSigningup: true });
            const res = await axiosInstance.post("/user/signup", formData);
            console.log("response from backend:", res.data);
            set({ authUser: res.data.user });
        } catch (error) {
            console.error("error signing up", error);
            toast.error("Could not signup");
        } finally {
            set({ isSigningup: false });
        }
    },

    login: async (formData) => {
        try {
            set({ isLoggingIn: true });
            const res = await axiosInstance.post("/user/login", formData);
            console.log("response from backend", res.data);
            set({ authUser: res.data.user });
        } catch (error) {
            console.error("error logging in", error);
            toast.error("Could not login");
        } finally {
            set({ isLoggingIn: false });
        }
    },

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/user');
            set({ authUser: res.data.user });
        } catch (error) {
            console.error("error in checkAuth", error);
        }  finally{
            set ({isCheckingAuth: false})
        }
    }
}));
