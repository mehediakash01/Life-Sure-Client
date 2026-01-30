import React from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../Components/Loading/Loading";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import { FaCalendarAlt, FaEye, FaEnvelope, FaArrowLeft, FaNewspaper, FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const BlogDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    data: blog,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/blogs/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  if (isLoading) return <Loading />;
  if (isError || !blog)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FaNewspaper className="text-6xl text-gray-400 mx-auto mb-4" />
          <p className="text-xl text-gray-600">Failed to load blog</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/blogs")}
          className="btn bg-white border-2 border-gray-300 hover:border-primary hover:bg-primary hover:text-white transition-all mb-8 flex items-center gap-2"
        >
          <FaArrowLeft />
          Back to Blogs
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
        >
          <div className="relative h-96 overflow-hidden">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

            <div className="absolute bottom-0 left-0 right-0 p-8">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight"
              >
                {blog.title}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap items-center gap-6 text-white/90"
              >
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-accent" />
                  <span className="text-sm font-medium">
                    {moment(blog.publishDate).format("MMMM Do, YYYY")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FaEye className="text-accent" />
                  <span className="text-sm font-medium">{blog.totalVisit || 0} views</span>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <div className="flex items-center gap-4 mb-8 p-6 bg-gradient-to-r from-primary/5 to-blue-50 rounded-2xl border border-primary/10">
              <img
                src={blog.authorImage || "https://i.ibb.co/z4scJgP/user.png"}
                alt={blog.author}
                className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <FaUserCircle className="text-primary" />
                  <p className="font-bold text-lg text-gray-900">{blog.author}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaEnvelope className="text-accent" />
                  <span>{blog.authorEmail}</span>
                </div>
              </div>
            </div>

            <div className="h-1 bg-gradient-to-r from-primary via-accent to-blue-600 rounded-full mb-8"></div>

            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg">
                {blog.content}
              </div>
            </div>

            <div className="mt-12 pt-8 border-t-2 border-dashed border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-primary/5 to-blue-50 rounded-2xl p-6 border border-primary/10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <FaEye className="text-2xl text-primary" />
                    </div>
                    <h3 className="font-bold text-lg text-gray-800">Article Stats</h3>
                  </div>
                  <p className="text-gray-600">
                    This article has been viewed{" "}
                    <span className="font-bold text-primary">{blog.totalVisit || 0}</span> times
                  </p>
                </div>

                <div className="bg-gradient-to-br from-accent/5 to-orange-50 rounded-2xl p-6 border border-accent/10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                      <FaCalendarAlt className="text-2xl text-accent" />
                    </div>
                    <h3 className="font-bold text-lg text-gray-800">Published</h3>
                  </div>
                  <p className="text-gray-600">
                    {moment(blog.publishDate).format("MMMM Do, YYYY")} at{" "}
                    {moment(blog.publishDate).format("h:mm A")}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/blogs")}
                className="flex-1 bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FaArrowLeft />
                Back to All Blogs
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all duration-300"
              >
                Share Article
              </motion.button>
            </div>
          </div>
        </motion.div>

        <div className="mt-12 bg-gradient-to-r from-primary to-blue-600 rounded-2xl shadow-xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-accent/20 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Enjoyed This Article?
            </h3>
            <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
              Explore more expert insights and helpful tips from our blog
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/blogs")}
              className="btn bg-accent hover:bg-orange-600 text-white border-0 px-8 py-3 rounded-xl shadow-lg font-bold"
            >
              Read More Articles
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;