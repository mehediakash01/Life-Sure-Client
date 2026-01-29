import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { FaNewspaper, FaArrowRight, FaCalendarAlt, FaUser } from "react-icons/fa";
import Loading from "../../../Components/Loading/Loading";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const LatestBlogs = () => {
  const axiosSecure = useAxiosSecure();

  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ["latestBlogs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/blogs/latest");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-11/12 max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-blue-600 rounded-2xl shadow-lg mb-6 transform hover:rotate-12 transition-transform duration-300">
            <FaNewspaper className="text-4xl text-white" />
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            Latest <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Blogs & Articles</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Stay informed and inspired with expert insights, industry trends, and helpful tips from our team
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

                  <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    New
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 text-white/90 text-xs mb-2">
                      <FaCalendarAlt />
                      <span>{new Date(blog.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
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

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
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

                  <Link
                    to={`/blogs/${blog._id}`}
                    className="mt-4"
                  >
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary text-white font-bold py-3 px-4 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                    >
                      <span>Read Article</span>
                      <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </motion.button>
                  </Link>
                </div>

                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: "linear-gradient(135deg, rgba(0, 52, 120, 0.1) 0%, rgba(249, 115, 22, 0.1) 100%)",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 text-center">
          <Link to="/blogs">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary text-white border-0 px-8 py-3 rounded-xl shadow-lg font-bold text-lg"
            >
              View All Articles
              <FaArrowRight className="ml-2" />
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestBlogs;