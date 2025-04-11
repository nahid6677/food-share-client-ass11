import React, { useContext } from 'react';
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Swal from 'sweetalert2';

const Login = () => {
    const { signInEmailPass, signInPopup, githubPupop, setLoading } = useContext(AuthContext);
    const navigate = useNavigate()
    const handleLogin = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const initialData = Object.fromEntries(formData.entries())
        const email = initialData.username;
        const password = initialData.password
        console.log(email, password)
        signInEmailPass(email, password)
            .then(result => {
                // console.log(result.user)
                if (result.user) {
                    setLoading(false)
                    e.target.reset()
                    navigate("/")
                }
            })
            .catch(err =>{
                setLoading(false)
                Swal.fire({
                    title: err,
                    icon: "warning",
                    draggable: true
                  });
            })
    }
    const handleGooglePupop = () => {
        signInPopup()
            .then(result => {
                // console.log(result)
                if (result.user) {
                    setLoading(false)
                    navigate("/")
                }
            })
            .catch(err =>{
                setLoading(false)
                Swal.fire({
                    title: err,
                    icon: "warning",
                    draggable: true
                  });
            })
    }
    const handleGithubPopup = () => {

    }
    return (
        <div className="flex justify-center mt-20">
            <div className="w-full max-w-md p-8 space-y-3 rounded-xl dark:bg-gray-50 dark:text-gray-800">
                <h1 className="text-2xl font-bold text-center">Login</h1>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-1 text-sm">
                        <label htmlFor="username" className="block dark:text-gray-600">Username</label>
                        <input type="email" name="username" id="username" placeholder="Username" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" />
                    </div>
                    <div className="space-y-1 text-sm">
                        <label htmlFor="password" className="block dark:text-gray-600">Password</label>
                        <input type="password" name="password" id="password" placeholder="Password" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" />
                        <div className="flex justify-end text-xs dark:text-gray-600">
                            <a rel="noopener noreferrer" href="#">Forgot Password?</a>
                        </div>
                    </div>
                    <button className="block w-full p-3 text-center rounded-sm dark:text-gray-50 dark:bg-violet-600">Login</button>
                </form>
                <div className="flex items-center pt-4 space-x-1">
                    <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
                    <p className="px-3 text-sm dark:text-gray-600">Login with social accounts</p>
                    <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
                </div>
                <div className="flex justify-center space-x-4">
                    <button onClick={handleGooglePupop} aria-label="Log in with Google" className="p-3 rounded-sm">
                        <FaGoogle className="w-5 h-5 fill-current" />
                    </button>
                    <button aria-label="Log in with Twitter" className="p-3 rounded-sm">
                        <FaFacebook className="w-5 h-5 fill-current" />
                    </button>
                    <button onClick={handleGithubPopup} aria-label="Log in with GitHub" className="p-3 rounded-sm">
                        <FaGithub className="w-5 h-5 fill-current" />
                    </button>
                </div>
                <p className="text-xs text-center sm:px-6 dark:text-gray-600">Don't have an account?
                    <Link to={"/signup"} className="underline dark:text-gray-800">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;