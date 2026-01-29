import { FaShieldAlt, FaMoneyBillWave, FaUndo, FaBriefcase, FaCheckCircle, FaAward } from "react-icons/fa";
import { motion } from "framer-motion";

const WhyChooseUs = () => {
  const features = [
    {
      id: "01",
      title: "100% Safe Your Money",
      desc: "Your investments and policies are fully protected with our trusted insurance system, ensuring long-term financial security for you and your family.",
      icon: <FaShieldAlt className="w-6 h-6" />,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      id: "02",
      title: "Anytime Money Back",
      desc: "We offer a hassle-free money-back guarantee. If you're not satisfied, you can withdraw your funds anytime with complete transparency.",
      icon: <FaUndo className="w-6 h-6" />,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
    },
    {
      id: "03",
      title: "Professional Company",
      desc: "Our team consists of experienced professionals who provide expert advice and world-class insurance solutions tailored to your needs.",
      icon: <FaBriefcase className="w-6 h-6" />,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  const stats = [
    { value: "10K+", label: "Happy Clients" },
    { value: "95%", label: "Success Rate" },
    { value: "15+", label: "Years Experience" },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-11/12 max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <FaAward className="text-lg" />
              Why Choose Us
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Why you should choose{" "}
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                our insurance
              </span>{" "}
              policy.
            </h2>

            <p className="text-gray-600 text-lg mb-10 leading-relaxed">
              We combine industry expertise, innovative solutions, and personalized service to deliver insurance plans that truly protect what matters most to you.
            </p>

            <div className="space-y-6 mb-12">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ x: 8 }}
                  className="group"
                >
                  <div className="flex items-start gap-5 p-6 bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300">
                    <div className="flex flex-col items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} text-white flex items-center justify-center font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        {feature.id}
                      </div>
                      <div className={`w-12 h-12 ${feature.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <div className={`bg-gradient-to-br ${feature.color} bg-clip-text text-transparent`}>
                          {feature.icon}
                        </div>
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <FaCheckCircle className="text-2xl text-primary" />
                </div>
                <h4 className="text-xl font-bold text-gray-800">Customer Trust</h4>
              </div>
              <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden mb-3">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "90%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="bg-gradient-to-r from-primary to-blue-600 h-4 rounded-full relative"
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-lg"></div>
                </motion.div>
              </div>
              <p className="text-gray-600 font-medium">
                Trusted by <span className="text-primary font-bold">90%</span> of our clients worldwide
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://wp.validthemes.net/urane/wp-content/uploads/2024/10/5-3.jpg"
                alt="Team working"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

              <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <FaCheckCircle className="text-2xl text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">99.9%</p>
                    <p className="text-xs text-gray-600">Claims Approved</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-xl shadow-lg p-4 text-center border border-gray-100 hover:border-primary transition-all"
                >
                  <p className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-600 font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 bg-gradient-to-r from-primary to-blue-600 rounded-2xl shadow-xl p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-2">
                  <FaAward className="text-3xl" />
                  <h4 className="text-xl font-bold">Award Winning Service</h4>
                </div>
                <p className="text-white/90 text-sm">
                  Recognized as the Best Insurance Provider 2024
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;