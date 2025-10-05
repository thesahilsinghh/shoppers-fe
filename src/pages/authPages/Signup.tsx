import { useState, useEffect } from "react"
import { Eye, EyeOff, Lock, Mail, User, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    console.log("working")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const handleSubmit = (e:any) => {
        e.preventDefault();
        setLoading(true)
        // axiosInstance.post("/signup", formData)
        //     .then(res => {
        //         console.log(res)
        //         toast.success("Account created successfully");
        //         navigate("/login")
        //         setFormData({
        //             name: "",
        //             email: "",
        //             password: "",
        //         })

        //     })
        //     .catch(err => console.error(err))
        //     .finally(() => setLoading(false))

        // const success = validateForm();

        // if (success === true) signup(formData);
    };
    return (
        <div className="flex flex-col  md:w-lg md:h-full md:justify-center md:items-center p-6 sm:p-12 ">
            <div className="w-full  space-y-8">



                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Name</span>
                        </label>
                        <div className="relative">
                            <div className="absolute z-10 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="size-5 text-base-content/40" />
                            </div>
                            <input
                                type="text"
                                className={`input input-bordered w-full pl-10`}
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Email</span>
                        </label>
                        <div className="relative ">
                            <div className="absolute inset-y-0 z-10 left-0 pl-3 flex items-center pointer-events-none ">

                                <Mail className="size-5 text-base-content/40" />
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
                                <Lock className="size-5 text-base-content/40" />
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
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff className="size-5 text-base-content/40" />
                                ) : (
                                    <Eye className="size-5 text-base-content/40" />
                                )}
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Create Account"}
                    </button>
                </form>

                <div className="text-center">
                    <p className="text-base-content/60">
                        Already have an account?{" "}
                        <Link to="/login" className="link link-primary">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}


export default Signup