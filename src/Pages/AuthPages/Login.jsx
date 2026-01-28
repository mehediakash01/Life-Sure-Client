import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";
import loginImg from "../../assets/login.png";
import GoBack from "../../Components/Back/GoBack";
import { useForm } from "react-hook-form";
import useAuthContext from "../../Hooks/useAuthContext";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { MdEmail, MdLock, MdLogin } from "react-icons/md";

const Login = () => {
  const { loginUser } = useAuthContext();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const from = location.state || '/';
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;

    loginUser(email, password)
      .then((result) => {
        console.log(result.user);
        toast.success("Login successful!");
        axiosSecure.patch(`/users/last-login/${email}`, {
          lastLogin: new Date().toISOString(),
        });
        navigate(from); 
      })
      .catch((err) => {
        toast.error(err.message || "Login failed!");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 flex justify-center items-center p-4 relative overflow-hidden">
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-6xl mx-auto relative z-10">
        <GoBack />
        
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-gray-100 mt-4">
          <div className="flex flex-col md:flex-row">
            
            <div className="w-full md:w-1/2 p-8 md:p-12">
           
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-600 rounded-2xl shadow-lg mb-4">
                  <MdLogin className="text-3xl text-white" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-2">
                  Welcome Back
                </h1>
                <p className="text-gray-600">Sign in to continue your journey</p>
              </div>

            
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <MdEmail className="text-gray-400 text-xl" />
                    </div>
                    <input
                      type="email"
                      {...register("email", { required: "Email is required" })}
                      className={`input input-bordered w-full pl-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all ${
                        errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''
                      }`}
                      placeholder="john@example.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <span className="text-xs">⚠️</span> {errors.email.message}
                    </p>
                  )}
                </div>

              
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <MdLock className="text-gray-400 text-xl" />
                    </div>
                    <input
                      type="password"
                      {...register("password", {
                        required: "Password is required",
                      })}
                      className={`input input-bordered w-full pl-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all ${
                        errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''
                      }`}
                      placeholder="Enter your password"
                    />
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <span className="text-xs">⚠️</span> {errors.password.message}
                    </p>
                  )}
                </div>

             
                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <MdLogin className="text-xl" />
                  <span>Sign In</span>
                </button>

                
                <div className="text-center">
                  <p className="text-gray-600 text-sm">
                    Don't have an account?{" "}
                    <Link
                      to="/auth/register"
                      className="text-teal-600 hover:text-teal-700 font-semibold hover:underline transition-colors"
                    >
                      Create Account
                    </Link>
                  </p>
                </div>
              </form>



            
              <SocialLogin />
            </div>

            
            <div className="w-full md:w-1/2 bg-gradient-to-br from-teal-50 to-blue-50 flex justify-center items-center p-8 md:p-12 relative overflow-hidden">
         
              <div className="absolute top-0 right-0 w-40 h-40 bg-teal-200 rounded-full blur-3xl opacity-30"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-200 rounded-full blur-3xl opacity-30"></div>
              
              
              <div className="relative z-10 flex flex-col items-center">
                <img 
                  className="w-full max-w-md drop-shadow-2xl transform hover:scale-105 transition-transform duration-500" 
                  src={loginImg} 
                  alt="Login Visual" 
                />
                <div className="mt-8 text-center">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Your Adventure Awaits
                  </h3>
                  <p className="text-gray-600 max-w-sm">
                    Discover amazing destinations and create unforgettable memories with us
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Login;