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
        <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <form onSubmit={handleSubmit} className="skeleton space-y-6 p-4 rounded-lg shadow-md max-w-md">
                    {/* Email */}
                    <div>
                        <label><span>Email</span></label>
                        <input
                            type="text"
                            placeholder='JohnDoe@google.com'
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label><span>Password</span></label>
                        <div className="flex items-center">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(prev => !prev)}
                                className="ml-2"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <button type="submit" disabled={isLoggingIn}>
                        {isLoggingIn ? "Loading..." : "Login"}
                    </button>

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
