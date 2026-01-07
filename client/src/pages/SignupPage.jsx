import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/useAuthstore';
import { User, Eye, EyeOff } from "lucide-react";
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';

const SignupPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmpassword, setShowConfirmpassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const { signup, isSigningup, checkAuth, authUser } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        const checkUserAuth = async () => {
            await checkAuth(); 
            if (authUser) {
                navigate('/');
            }
        };

        checkUserAuth();
    }, [checkAuth, authUser, navigate]);  

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (!formData.name) {
            toast.error("Username is required!");
            return;
        }

        await signup(formData);
        navigate("/");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-base-200">
            <div className="w-full max-w-md p-6 rounded-lg shadow-xl bg-base-100">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Username */}
                    <div>
                        <label className="block text-sm font-medium text-gray-1000">Username</label>
                        <div className="flex items-center border rounded-md p-2">
                            <User size={20} className="mr-2" />
                            <input
                                type="text"
                                placeholder="John Doe"
                                className="input input-bordered w-full"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-1000">Email</label>
                        <input
                            type="email"
                            placeholder="JohnDoe@google.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-1000">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="input input-bordered w-full pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(prev => !prev)}
                                className="absolute inset-y-0 right-2 flex items-center justify-center"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-1000">Confirm Password</label>
                        <div className="relative">
                            <input
                                type={showConfirmpassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                className="input input-bordered w-full pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmpassword(prev => !prev)}
                                className="absolute inset-y-0 right-2 flex items-center justify-center"
                            >
                                {showConfirmpassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        disabled={isSigningup} 
                        className={`btn btn-primary w-full ${isSigningup ? 'loading' : ''}`}
                    >
                        {isSigningup ? "Creating..." : "Sign Up"}
                    </button>

                    {/* Login Link */}
                    <p className="text-sm text-center mt-4 text-yellow-400">
                        Already have an account?{" "}
                        <Link to="/login" className="text-primary font-medium hover:underline">Log in</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
