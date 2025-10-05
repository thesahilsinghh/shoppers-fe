import { useState,useEffect,useContext } from "react";
// import { ThemeContext } from '../context/ThemeContext';
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail,Loader2 } from "lucide-react";
import toast from 'react-hot-toast';
// import { axiosInstance } from '../lib/axios';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false)
    // const { user } = useContext(ThemeContext)
    useEffect(() => {
        // user[1]("")
        localStorage.removeItem("user")
    }, [])

    const navigate = useNavigate()
    const handleSubmit = async (e:any) => {
        e.preventDefault();
        setLoading(true)
        // axiosInstance.post("/login", formData,)
        //     .then(res => {
        //         console.log(res.data)
        //         if (res.data.success) {
        //             toast.success("Logged in successfully");
        //             user[1](res.data.loggedInUser.name)
        //             localStorage.setItem("user",res.data.loggedInUser.name)
        //             navigate("/transactions", { replace: true })
        //             setFormData({
        //                 email: "",
        //                 password: ""
        //             })
        //         }
        //     })
        //     .catch(err => console.log(err))
        //     .finally(()=>setLoading(false))
    };
    return (
        <div className="flex flex-col w-lg h-full justify-center items-center p-6 sm:p-12">
            <div className="w-full max-w-md space-y-8">


                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Email</span>
                        </label>
                        <div className="relative">
                            <div className="absolute z-10 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-base-content/40" />
                            </div>
                            <input
                                type="email"
                                className={`input input-bordered w-full pl-10`}
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Password</span>
                        </label>
                        <div className="relative">
                            <div className="absolute z-10 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-base-content/40" />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                className={`input input-bordered w-full pl-10`}
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                            <button
                                type="button"
                                className="absolute z-10 inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5 text-base-content/40" />
                                ) : (
                                    <Eye className="h-5 w-5 text-base-content/40" />
                                )}
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                        {
                            loading ?
                                <Loader2 className="h-5 w-5 animate-spin" /> : "Log in"
                        }
                    </button>
                </form>

                <div className="text-center">
                    <p className="text-base-content/60">
                        Don&apos;t have an account?{" "}
                        <Link to="/signup" className="link link-primary">
                            Create account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login