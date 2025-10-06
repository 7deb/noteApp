import React, { useState, useEffect } from 'react'
import { useAuthStore } from '../store/useAuthstore';
import { User, Eye, EyeOff } from "lucide-react"
import toast from 'react-hot-toast';
import { Navigate, useNavigate, Link } from 'react-router-dom';

const SignupPage = () => {
    const [showPassword, setshowPassword] = useState(false);
    const [showConfirmpassword, setshowConfirmpassword] = useState(false);
    const [FormData, setFormData] = useState({
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

    const handlesubmit = async (e) => {
        e.preventDefault();

        if (FormData.password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }

        if (FormData.password !== FormData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (!FormData.name) {
            toast.error("Username is required!");
            return;
        }

        await signup(FormData);
        navigate("/");
    };

    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <form onSubmit={handlesubmit} className="skeleton space-y-6 p-4 rounded-lg shadow-md max-w-md">
                    {/* username */}
                    <div>
                        <label><span>Username</span></label>
                        <User />
                        <input
                            type='text'
                            placeholder='John Doe'
                            className='w-full input input-bordered  h-10'
                            value={FormData.name}
                            onChange={(e) => setFormData({ ...FormData, name: e.target.value })}
                        />
                    </div>

                    {/* email */}
                    <div>
                        <label><span>Email</span></label>
                        <input
                            type='text'
                            placeholder='JohnDoe@google.com'
                            value={FormData.email}
                            onChange={(e) => setFormData({ ...FormData, email: e.target.value })}
                        />
                    </div>

                    {/* password */}
                    <div>
                        <label><span>Password</span></label>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={FormData.password}
                            onChange={(e) => setFormData({ ...FormData, password: e.target.value })}
                        />
                        <button
                            type='button'
                            onClick={() => setshowPassword((prev) => !prev)}
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    {/* confirmedPassword */}
                    <div>
                        <label><span>Confirm Password</span></label>
                        <input
                            type={showConfirmpassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={FormData.confirmPassword}
                            onChange={(e) => setFormData({ ...FormData, confirmPassword: e.target.value })}
                        />
                        <button
                            type='button'
                            onClick={() => setshowConfirmpassword((prev) => !prev)}
                        >
                            {showConfirmpassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    <button type='submit' disabled={isSigningup}>
                        {isSigningup ? "Creating..." : "Sign Up"}
                    </button>
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
