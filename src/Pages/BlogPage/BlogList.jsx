import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { FaNewspaper, FaArrowRight, FaCalendarAlt, FaEye } from "react-icons/fa";
import Loading from "../../Components/Loading/Loading";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const BlogList = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/blogs");
      return res.data;
    },
  });

  const handleReadMore = async (id) => {
    try {
      await axiosSecure.patch(`/blogs/${id}/visit`);
      navigate(`/blogs/${id}`);
    } catch (err) {
      toast.error("Failed to update view count");
      navigate(`/blogs/${id}`);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-gray-50 py-16">
      <div className="w-11/12 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-blue-600 rounded-2xl shadow-lg mb-6 transform hover:rotate-12 transition-transform duration-300">
            <FaNewspaper className="text-4xl text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Our <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Blog</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore expert insights, industry trends, and helpful tips to guide your insurance decisions
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {blogs.map((blog) => (
            <motion.div
              key={blog._id}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="group h-full"
            >
              <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden h-full flex flex-col transition-all duration-500">
                <div className="relative h-52 overflow-hidden">
                  <motion.div
                    className="w-full h-full"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                  {blog.visits && (
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1">
                      <FaEye className="text-primary" />
                      {blog.visits}
                    </div>
                  )}

                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 text-white/90 text-xs mb-2">
                      <FaCalendarAlt />
                      <span>
                        {new Date(blog.publishDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-bold text-xl text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                    {blog.title}
                  </h3>

                  <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3 flex-grow">
                    {blog.content}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 mb-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={blog.authorImage}
                        alt={blog.author}
                        className="w-10 h-10 rounded-full border-2 border-primary/20"
                      />
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{blog.author}</p>
                        <p className="text-xs text-gray-500">Author</p>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleReadMore(blog._id)}
                    className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary text-white font-bold py-3 px-4 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn mt-auto"
                  >
                    <span>Read Article</span>
                    <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </motion.button>
                </div>

                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(0, 52, 120, 0.1) 0%, rgba(249, 115, 22, 0.1) 100%)",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {blogs.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
              <FaNewspaper className="text-5xl text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Blogs Found</h3>
            <p className="text-gray-600 mb-6">Check back soon for new articles and insights</p>
          </div>
        )}

        <div className="mt-16 bg-gradient-to-r from-primary to-blue-600 rounded-2xl shadow-xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-accent/20 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Stay Updated with Our Newsletter
            </h3>
            <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
              Get the latest insurance insights, tips, and industry news delivered straight to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-xl border-0 focus:ring-2 focus:ring-white/50 outline-none"
              />
              <button className="btn bg-accent hover:bg-orange-600 text-white border-0 px-8 py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 font-bold">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogList;