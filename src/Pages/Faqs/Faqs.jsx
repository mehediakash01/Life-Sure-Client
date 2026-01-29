import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaThumbsUp, FaQuestionCircle, FaSearch, FaHeadset, FaEnvelope, FaPhone } from "react-icons/fa";
import { MdHelpOutline, MdSupportAgent } from "react-icons/md";
import Swal from "sweetalert2";
import { useState } from "react";
import { motion } from "framer-motion";

const Faqs = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const { data: faqs = [], refetch } = useQuery({
    queryKey: ['faqs'],
    queryFn: async () => {
      const res = await axiosSecure.get('/faqs');
      return res.data;
    }
  });

  const handleHelpful = async (id) => {
    try {
      const res = await axiosSecure.patch(`/faqs/${id}/helpful`);
      if (res.data?.message) {
        Swal.fire({
          title: "Thank You!",
          text: "Your feedback helps us improve.",
          icon: "success",
          confirmButtonColor: "#003478"
        });
        refetch();
      }
    } catch (error) {
      console.error("Voting error:", error);
    }
  };

  const categories = ["All", "Policies", "Claims", "Coverage", "Billing", "General"];
  
  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-blue-600 rounded-2xl shadow-lg mb-6 transform hover:rotate-12 transition-transform duration-300">
            <FaQuestionCircle className="text-4xl text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Find answers to common questions about our insurance policies, claims process, and coverage options.
            Can't find what you're looking for? Our support team is here to help.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
              <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400 text-xl" />
                </div>
                <input
                  type="text"
                  placeholder="Search your question..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input input-bordered w-full pl-12 pr-4 bg-gray-50 border-gray-200 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                      activeCategory === cat
                        ? "bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg"
                        : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {filteredFaqs.length > 0 ? (
                <div className="space-y-4">
                  {filteredFaqs.map((faq, index) => (
                    <motion.div
                      key={faq._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="collapse collapse-arrow bg-white shadow-lg rounded-xl border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                    >
                      <input type="checkbox" name="faq-accordion" />
                      <div className="collapse-title font-semibold text-gray-800 flex items-start gap-3 pr-12">
                        <span className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm mt-0.5">
                          {index + 1}
                        </span>
                        <span className="flex-1">{faq.question}</span>
                      </div>
                      <div className="collapse-content">
                        <div className="pt-2 pb-4 space-y-4">
                          <p className="text-gray-600 leading-relaxed pl-11">
                            {faq.answer}
                          </p>
                          <div className="flex items-center gap-3 pl-11">
                            <button
                              onClick={() => handleHelpful(faq._id)}
                              className="btn btn-sm bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0 shadow-md transform hover:scale-105 transition-all duration-300"
                            >
                              <FaThumbsUp className="mr-1" /> 
                              Helpful ({faq.helpfulCount || 0})
                            </button>
                            <span className="text-xs text-gray-500">
                              Was this answer helpful?
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white rounded-2xl">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
                    <FaQuestionCircle className="text-5xl text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">No Results Found</h3>
                  <p className="text-gray-600 mb-6">Try different keywords or contact our support team</p>
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setActiveCategory("All");
                    }}
                    className="btn bg-primary hover:bg-blue-600 text-white border-0"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <MdHelpOutline className="text-2xl text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Need More Help?</h3>
              </div>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                Our support team is available 24/7 to assist you with any questions or concerns.
              </p>
              <div className="space-y-3">
                <a
                  href="tel:+1234567890"
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                >
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FaPhone className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Call Us</p>
                    <p className="font-semibold text-gray-800">+880-1234-567890</p>
                  </div>
                </a>
                <a
                  href="mailto:support@insurance.com"
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FaEnvelope className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email Us</p>
                    <p className="font-semibold text-gray-800">support@insurance.com</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary to-blue-600 rounded-2xl shadow-xl p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/20 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                  <MdSupportAgent className="text-3xl text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Live Chat Support</h3>
                <p className="text-white/90 text-sm mb-6">
                  Connect with our team instantly for real-time assistance.
                </p>
                <button className="btn bg-white text-primary hover:bg-gray-100 border-0 w-full font-bold transform hover:scale-105 transition-all duration-300">
                  <FaHeadset className="mr-2" />
                  Start Chat
                </button>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-100">
              <h3 className="font-bold text-lg text-gray-800 mb-4">Quick Links</h3>
              <div className="space-y-2">
                {[
                  "Policy Documents",
                  "Claims Process",
                  "Coverage Calculator",
                  "Find an Agent",
                  "Customer Portal"
                ].map((link, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-primary/10 hover:text-primary transition-all group"
                  >
                    <span className="text-sm font-medium">{link}</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl shadow-xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-accent/20 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Still Have Questions?
            </h3>
            <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
              Our insurance experts are ready to provide personalized guidance and support for all your insurance needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn bg-accent hover:bg-orange-600 text-white border-0 px-8 py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 font-bold">
                Schedule Consultation
              </button>
              <button className="btn bg-white text-primary hover:bg-gray-100 border-0 px-8 py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 font-bold">
                View All Resources
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faqs;