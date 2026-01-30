import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import news from "../../../assets/news.png";
import { motion } from "framer-motion";
import { FaEnvelope, FaUser, FaPaperPlane, FaBell } from "react-icons/fa";

const NewsletterForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const AxiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    try {
      const res = await AxiosSecure.post("/newsletter", data);
      if (res.data.insertedId) {
        Swal.fire({
          title: "Thank You!",
          text: "You've subscribed successfully!",
          icon: "success",
          confirmButtonColor: "#003478"
        });
        reset();
      }
    } catch (err) {
      Swal.fire({
        title: "Oops!",
        text: err.response?.data?.message || "Subscription failed",
        icon: "error",
        confirmButtonColor: "#003478"
      });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-11/12 max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-bold mb-6">
              <FaBell className="text-lg" />
              Stay Updated
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Get Policy <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">News & Updates</span>
            </h1>

            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Get simple tips, helpful blogs, and the latest policy updates straight to your inbox. 
              Stay informed and make smarter decisions about your insurance coverage.
            </p>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-100">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaUser className="text-gray-400 text-lg" />
                    </div>
                    <input
                      type="text"
                      placeholder="John Doe"
                      {...register("name", { required: "Name is required" })}
                      className={`input input-bordered w-full pl-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all ${
                        errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''
                      }`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <span className="text-xs">⚠️</span> {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaEnvelope className="text-gray-400 text-lg" />
                    </div>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Please enter a valid email"
                        }
                      })}
                      className={`input input-bordered w-full pl-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all ${
                        errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <span className="text-xs">⚠️</span> {errors.email.message}
                    </p>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  <FaPaperPlane className="group-hover:translate-x-1 transition-transform" />
                  Subscribe Now
                </motion.button>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">100% Privacy Guaranteed</p>
                    <p className="text-xs text-gray-600 mt-1">
                      We respect your privacy. Unsubscribe at any time.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-4 text-center border border-gray-100">
                <p className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent mb-1">
                  5K+
                </p>
                <p className="text-xs text-gray-600">Subscribers</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-4 text-center border border-gray-100">
                <p className="text-2xl font-bold bg-gradient-to-r from-accent to-orange-600 bg-clip-text text-transparent mb-1">
                  Weekly
                </p>
                <p className="text-xs text-gray-600">Updates</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-4 text-center border border-gray-100">
                <p className="text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent mb-1">
                  Free
                </p>
                <p className="text-xs text-gray-600">Forever</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -top-8 -right-8 w-64 h-64 bg-gradient-to-br from-primary/20 to-blue-400/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-gradient-to-br from-accent/20 to-orange-400/20 rounded-full blur-3xl"></div>

            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
              src={news}
              className="relative z-10 w-full max-w-lg mx-auto drop-shadow-2xl"
              alt="Newsletter illustration"
            />

            <div className="absolute top-1/4 -left-4 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-4 z-20">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center">
                  <FaEnvelope className="text-2xl text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Newsletter</p>
                  <p className="text-lg font-bold text-gray-900">Weekly Tips</p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-1/4 -right-4 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-4 z-20">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-accent to-orange-600 rounded-xl flex items-center justify-center">
                  <FaBell className="text-2xl text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Instant</p>
                  <p className="text-lg font-bold text-gray-900">Updates</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterForm;