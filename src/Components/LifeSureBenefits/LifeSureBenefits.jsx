import React from "react";
import { motion } from "framer-motion";
import {
  FaCalculator,
  FaUserShield,
  FaLaptop,
  FaCreditCard,
  FaRegClock,
  FaUserCircle,
  FaCheckCircle,
} from "react-icons/fa";

const benefits = [
  {
    title: "Instant Quote Calculation",
    icon: <FaCalculator className="w-8 h-8" />,
    description: "Get personalized insurance quotes instantly using our smart quote engine.",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    title: "Expert Agent Support",
    icon: <FaUserShield className="w-8 h-8" />,
    description: "Licensed agents are ready to help you make the best decision.",
    color: "from-primary to-blue-600",
    bgColor: "bg-primary/5",
    iconColor: "text-primary",
  },
  {
    title: "100% Online Application",
    icon: <FaLaptop className="w-8 h-8" />,
    description: "Complete your insurance application entirely online in minutes.",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    title: "Secure Online Payments",
    icon: <FaCreditCard className="w-8 h-8" />,
    description: "Make safe and encrypted payments through trusted gateways.",
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
  },
  {
    title: "Real-Time Claim Tracking",
    icon: <FaRegClock className="w-8 h-8" />,
    description: "Track your insurance claims live and stay informed at every step.",
    color: "from-accent to-orange-600",
    bgColor: "bg-accent/5",
    iconColor: "text-accent",
  },
  {
    title: "Personalized Dashboard Access",
    icon: <FaUserCircle className="w-8 h-8" />,
    description: "Manage policies, track quotes, and more with your custom dashboard.",
    color: "from-teal-500 to-teal-600",
    bgColor: "bg-teal-50",
    iconColor: "text-teal-600",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0 },
};

const LifeSureBenefits = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-gray-50">
      <div className="w-11/12 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-blue-600 rounded-2xl shadow-lg mb-6 transform hover:rotate-12 transition-transform duration-300">
            <FaCheckCircle className="text-4xl text-white" />
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            Why Choose <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">LifeSure</span>?
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Discover the unique benefits that make LifeSure your trusted partner in securing your future.
            From tailored life insurance plans to expert guidance and hassle-free claims, 
            we provide peace of mind and protection for you and your loved ones—every step of the way.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative group"
            >
              <div className="h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-500 overflow-hidden p-8">
                <div className={`w-16 h-16 ${benefit.bgColor} rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                  <div className={benefit.iconColor}>
                    {benefit.icon}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-300">
                  {benefit.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>

                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${benefit.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>

                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 bg-gradient-to-r from-primary to-blue-600 rounded-2xl shadow-xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-accent/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Experience These Benefits?
            </h3>
            <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust LifeSure for their insurance needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn bg-accent hover:bg-orange-600 text-white border-0 px-8 py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 font-bold">
                Get Started Now
              </button>
              <button className="btn bg-white text-primary hover:bg-gray-100 border-0 px-8 py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 font-bold">
                Talk to an Expert
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LifeSureBenefits;