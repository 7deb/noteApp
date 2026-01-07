import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/useAuthstore';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const Loginpage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { login, isLoggingIn, checkAuth, authUser } = useAuthStore();
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

        try {
            await login(formData); 
            navigate("/");
        } catch (error) {
            toast.error("Login failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-base-200">
            <div className="w-full max-w-md p-6 rounded-lg shadow-xl bg-base-100">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-1000">Email</label>
                        <input
                            type="text"
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
                                className="input input-bordered w-full pr-10"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        disabled={isLoggingIn} 
                        className={`btn btn-primary w-full ${isLoggingIn ? 'loading' : ''}`}
                    >
                        {isLoggingIn ? "Loading..." : "Login"}
                    </button>

                    {/* Sign Up Link */}
                    <p className="text-sm text-center mt-4 text-yellow-400">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-primary font-medium hover:underline">Sign up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Loginpage;
