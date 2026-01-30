import React from "react";
import promoImg from "../../../assets/promo.png";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaShieldAlt, FaCheckCircle, FaArrowRight } from "react-icons/fa";

const Promo = () => {
  const features = [
    "Comprehensive Life Coverage",
    "Flexible Premium Options",
    "24/7 Expert Support",
    "Fast Claim Processing"
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-gray-50 overflow-hidden">
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
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold">
              <FaShieldAlt className="text-lg" />
              Protect What Matters Most
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Secure Your Family's Future with{" "}
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                LifeSure
              </span>
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed">
              Get peace of mind knowing your loved ones are financially protected.
              Our flexible plans cover you at every stage of life — with simple, transparent policies and expert guidance.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaCheckCircle className="text-white text-sm" />
                  </div>
                  <span className="text-gray-700 font-medium">{feature}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/allPolicies" className="flex-1">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  <span>Get a Free Quote</span>
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              <Link to="/allPolicies" className="flex-1">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all duration-300"
                >
                  Learn More
                </motion.button>
              </Link>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-sm"
                  >
                    {i}K
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">10,000+ Happy Customers</p>
                <p className="text-xs text-gray-500">Join our satisfied community</p>
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
            <div className="relative">
              <div className="absolute -top-8 -right-8 w-64 h-64 bg-gradient-to-br from-primary/20 to-blue-400/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-gradient-to-br from-accent/20 to-orange-400/20 rounded-full blur-3xl"></div>

              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
                src={promoImg}
                className="relative z-10 w-full max-w-lg mx-auto drop-shadow-2xl"
                alt="Life Insurance Promotion"
              />

              <div className="absolute top-1/4 -left-4 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-4 z-20">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <FaShieldAlt className="text-2xl text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">99.9%</p>
                    <p className="text-xs text-gray-600">Claims Approved</p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-1/4 -right-4 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-4 z-20">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">15+</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Years</p>
                    <p className="text-xs text-gray-600">of Excellence</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Promo;