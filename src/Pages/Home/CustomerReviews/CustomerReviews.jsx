import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import { FaQuoteLeft, FaStar, FaUserCircle } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../Components/Loading/Loading";
import { Stars } from "./Stars";
import { motion } from "framer-motion";

const CustomerReviews = () => {
  const axiosSecure = useAxiosSecure();

  const { data: reviewData = [], isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reviews");
      return res.data.map((r) => ({
        id: r._id,
        user_photoURL: r.photo,
        userName: r.name,
        review: r.message.slice(0, 90),
        rating: parseFloat(r.rating),
      }));
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
            <FaQuoteLeft className="text-4xl text-white" />
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            Customer <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Testimonials</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Don't just take our word for it. Hear what our satisfied customers have to say about their experience with LifeSure
          </p>
        </div>

        <Swiper
          modules={[Navigation, Autoplay, EffectCoverflow]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            slideShadows: false,
          }}
          loop={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          navigation
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          className="!pb-12"
        >
          {reviewData.map((item, index) => (
            <SwiperSlide key={item.id} className="!w-96">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="h-full"
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl border border-gray-100 transition-all duration-500 p-8 h-full flex flex-col relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="absolute top-6 left-6 opacity-10 group-hover:opacity-20 transition-opacity">
                    <FaQuoteLeft className="text-6xl text-primary" />
                  </div>

                  <div className="relative z-10 flex flex-col items-center text-center mb-6">
                    <div className="relative mb-4">
                      <img
                        src={item.user_photoURL}
                        alt={item.userName}
                        className="w-20 h-20 rounded-full border-4 border-primary/20 shadow-lg object-cover"
                      />
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center border-4 border-white shadow-md">
                        <FaStar className="text-xs text-white" />
                      </div>
                    </div>

                    <h3 className="font-bold text-xl text-gray-900 mb-1">
                      {item.userName}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">Verified Customer</p>
                    
                    <div className="mb-4">
                      <Stars rating={item.rating} />
                    </div>
                  </div>

                  <div className="relative z-10 flex-grow">
                    <p className="text-gray-700 leading-relaxed italic">
                      "{item.review}..."
                    </p>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 text-center border border-gray-100 hover:shadow-xl transition-all"
          >
            <div className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent mb-2">
              10,000+
            </div>
            <p className="text-gray-600 font-medium">Happy Customers</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 text-center border border-gray-100 hover:shadow-xl transition-all"
          >
            <div className="text-4xl font-bold bg-gradient-to-r from-accent to-orange-600 bg-clip-text text-transparent mb-2">
              4.9/5
            </div>
            <p className="text-gray-600 font-medium">Average Rating</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 text-center border border-gray-100 hover:shadow-xl transition-all"
          >
            <div className="text-4xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent mb-2">
              98%
            </div>
            <p className="text-gray-600 font-medium">Satisfaction Rate</p>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: #003478;
          background: white;
          width: 48px;
          height: 48px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 20px;
          font-weight: bold;
        }
        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: #003478;
          color: white;
          transform: scale(1.1);
        }
      `}</style>
    </section>
  );
};

export default CustomerReviews;