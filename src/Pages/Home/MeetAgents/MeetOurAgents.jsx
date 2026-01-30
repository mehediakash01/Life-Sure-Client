import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../Components/Loading/Loading";
import { motion } from "framer-motion";
import { FaUserTie, FaAward, FaStar, FaLinkedin, FaEnvelope } from "react-icons/fa";

const MeetOurAgents = () => {
  const axiosSecure = useAxiosSecure();

  const { data: agents = [], isLoading } = useQuery({
    queryKey: ["featured-agents"],
    queryFn: async () => {
      const res = await axiosSecure.get("/featured-agents");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  const staticAgents = [
    {
      _id: "static-1",
      name: "Alice Johnson",
      photoURL: "https://randomuser.me/api/portraits/women/25.jpg",
      experience: "5+ years",
      specialties: "Term Life, Health Insurance",
    },
    {
      _id: "static-2",
      name: "Bob Smith",
      photoURL: "https://randomuser.me/api/portraits/men/10.jpg",
      experience: "3+ years",
      specialties: "Senior Plans, Retirement Plans",
    },
  ];

  const displayAgents = [...agents, ...staticAgents];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-11/12 max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-blue-600 rounded-2xl shadow-lg mb-6 transform hover:rotate-12 transition-transform duration-300">
            <FaUserTie className="text-4xl text-white" />
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            Meet Our <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Expert Agents</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Your trusted partners in navigating your insurance journey with expertise, dedication, and personalized care
          </p>
        </div>

        <Swiper
          modules={[Pagination, Autoplay]}
          slidesPerView={4}
          spaceBetween={24}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 16 },
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
            1280: { slidesPerView: 4, spaceBetween: 24 },
          }}
          className="!pb-16"
        >
          {displayAgents.map((agent, index) => (
            <SwiperSlide key={agent._id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="h-full"
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 overflow-hidden transition-all duration-500 group h-full flex flex-col">
                  <div className="relative">
                    <div className="aspect-square overflow-hidden bg-gradient-to-br from-primary/5 to-blue-50">
                      <img
                        src={agent.photoURL}
                        alt={agent.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>

                    <div className="absolute top-4 right-4 bg-gradient-to-br from-accent to-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                      <FaStar className="text-xs" />
                      Featured
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <button className="flex-1 bg-white/95 backdrop-blur-sm text-primary hover:bg-primary hover:text-white p-2 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm font-semibold">
                        <FaEnvelope />
                        Contact
                      </button>
                      <button className="w-10 h-10 bg-white/95 backdrop-blur-sm text-primary hover:bg-primary hover:text-white rounded-lg transition-colors flex items-center justify-center">
                        <FaLinkedin />
                      </button>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                      {agent.name}
                    </h3>

                    <div className="space-y-3 mb-4 flex-grow">
                      <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-xl">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FaAward className="text-primary text-sm" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-medium">Experience</p>
                          <p className="text-sm font-semibold text-gray-800">
                            {agent.experience || "3+ years"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 bg-accent/5 rounded-xl">
                        <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FaStar className="text-accent text-sm" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-medium">Specialties</p>
                          <p className="text-sm font-semibold text-gray-800">
                            {agent.specialties || "Term Life, Senior Plans"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <button className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary text-white font-bold py-3 rounded-xl shadow-lg transition-all duration-300 transform group-hover:scale-105 mt-auto">
                      Schedule Meeting
                    </button>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-16 bg-gradient-to-r from-primary to-blue-600 rounded-2xl shadow-xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-accent/20 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Need Expert Guidance?
            </h3>
            <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
              Connect with one of our experienced agents for personalized insurance advice tailored to your needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn bg-accent hover:bg-orange-600 text-white border-0 px-8 py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 font-bold">
                Book Consultation
              </button>
              <button className="btn bg-white text-primary hover:bg-gray-100 border-0 px-8 py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 font-bold">
                View All Agents
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .swiper-pagination-bullet {
          background: #003478;
          opacity: 0.3;
          width: 10px;
          height: 10px;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
          background: linear-gradient(135deg, #003478 0%, #F97316 100%);
          width: 24px;
          border-radius: 5px;
        }
      `}</style>
    </section>
  );
};

export default MeetOurAgents;