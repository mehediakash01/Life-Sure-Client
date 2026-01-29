import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { FaArrowRightLong, FaShieldCat, FaStar } from "react-icons/fa6";
import { motion } from "framer-motion";
import Loading from "../../Components/Loading/Loading";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const PopularPolicies = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: policies = [], isLoading } = useQuery({
    queryKey: ["popularPolicies"],
    queryFn: async () => {
      const res = await axiosSecure.get("/popular-policies");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-gray-50 py-16">
      <div className="w-11/12 max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#003478] to-[#0052b4] rounded-2xl shadow-lg mb-6 transform hover:rotate-12 transition-transform duration-300">
            <FaShieldCat className="text-4xl text-white" />
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-[#003478] mb-4">
            Popular Policies
          </h2>
          <p className="mt-3 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore the most trusted and frequently chosen insurance plans by our customers.
            <br />
            Find the one that suits your needs best.
          </p>
        </div>

        {/* Policies Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {policies.map((policy, index) => (
            <motion.div
              key={policy._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
              className="group h-full"
            >
              <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden h-full flex flex-col transition-all duration-500">
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden">
                  <motion.div
                    className="w-full h-full"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <img
                      src={policy.image}
                      alt={policy.title}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

                  {/* Popular Badge */}
                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                    className="absolute top-3 left-0 bg-[#F97316] text-white text-xs font-bold px-4 py-1.5 rounded-r-full shadow-lg flex items-center gap-1.5"
                  >
                    <FaStar className="text-sm" />
                    <span>Popular</span>
                  </motion.div>

                  {/* Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h2 className="text-white font-bold text-xl line-clamp-2 leading-tight">
                      {policy.title}
                    </h2>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col">
                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
                    {policy.description}
                  </p>

                  {/* Features Badge */}
                  <div className="mb-4">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#003478]/10 to-[#0052b4]/10 rounded-xl px-3 py-2 border border-[#003478]/10">
                      <div className="w-8 h-8 bg-[#003478]/20 rounded-lg flex items-center justify-center">
                        <FaShieldCat className="text-[#003478] text-sm" />
                      </div>
                      <span className="text-xs text-[#003478] font-semibold">
                        Comprehensive Coverage
                      </span>
                    </div>
                  </div>

                 
                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(0,52,120,0.15)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate(`/policies/${policy._id}`)}
                    className="w-full bg-gradient-to-r from-[#003478] to-[#0052b4] hover:from-[#0052b4] hover:to-[#003478] text-white font-bold py-3 px-4 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn relative overflow-hidden mt-auto"
                  >
                   
                    <span className="absolute inset-0 bg-gradient-to-r from-[#F97316] to-[#ea580c] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                    
                  
                    <span className="relative flex items-center justify-center gap-2">
                      <span>Learn More</span>
                      <FaArrowRightLong className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </span>
                  </motion.button>
                </div>

                {/* Hover Border Glow */}
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
          <div className="bg-gradient-to-r from-[#003478] to-[#0052b4] rounded-2xl shadow-xl p-8 md:p-12 relative overflow-hidden">
       
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#F97316]/20 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Need Help Choosing?
              </h3>
              <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
                Our insurance experts are here to guide you through finding the perfect policy for your needs.
              </p>
              <button className="btn bg-[#F97316] hover:bg-[#ea580c] text-white border-0 px-8 py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 font-bold">
                Contact Us Today
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularPolicies;