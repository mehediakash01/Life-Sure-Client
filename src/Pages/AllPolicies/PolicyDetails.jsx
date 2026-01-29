import React from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../Components/Loading/Loading";
import { FaShieldAlt, FaCalendarAlt, FaUsers, FaCheckCircle, FaDollarSign, FaPhoneAlt } from "react-icons/fa";
import { MdVerified } from "react-icons/md";

const PolicyDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: policy, isLoading } = useQuery({
    queryKey: ["policy", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/policies/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-2xl shadow-lg mb-4">
            <FaShieldAlt className="text-3xl text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2">
            Policy Details
          </h1>
          <p className="text-gray-600">Complete information about your insurance coverage</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Image Section */}
          <div className="w-full lg:w-5/12">
            <div className="sticky top-6">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                <img
                  src={policy.image}
                  alt={policy.title}
                  className="w-full h-[450px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                
                {/* Overlay Badge */}
                <div className="absolute top-6 left-6 bg-accent text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 font-bold">
                  <MdVerified className="text-xl" />
                  <span>Verified Policy</span>
                </div>

                {/* Bottom Title */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h2 className="text-white font-bold text-2xl mb-2">{policy.title}</h2>
                  <p className="text-white/90 text-sm">{policy.category}</p>
                </div>
              </div>

              {/* Quick Stats Card */}
              <div className="mt-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-100">
                <h3 className="font-bold text-lg text-primary mb-4 flex items-center gap-2">
                  <FaDollarSign className="text-accent" />
                  Quick Overview
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-primary/5 rounded-xl">
                    <span className="text-sm text-gray-600 font-medium">Base Premium</span>
                    <span className="text-lg font-bold text-primary">${policy.basePremium?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-accent/5 rounded-xl">
                    <span className="text-sm text-gray-600 font-medium">Coverage</span>
                    <span className="text-sm font-bold text-accent">{policy.coverage}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Info Section */}
          <div className="w-full lg:w-7/12">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-100">
              {/* Title Section */}
              <div className="mb-6">
                <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3">
                  {policy.title}
                </h1>
                <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                  {policy.category}
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 my-6"></div>

              {/* Description */}
              <div className="mb-8">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {policy.description}
                </p>
              </div>

              {/* Key Information */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                  <h2 className="text-2xl font-bold text-primary">Key Information</h2>
                </div>

                <div className="space-y-4">
                  {/* Eligibility */}
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <FaUsers className="text-primary text-xl" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1">Eligibility</h3>
                      <p className="text-sm text-gray-600">
                        Individuals aged <span className="font-bold text-primary">{policy.minAge}</span> to{" "}
                        <span className="font-bold text-primary">{policy.maxAge}</span> years
                      </p>
                    </div>
                  </div>

                  {/* Premium Calculation */}
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <FaDollarSign className="text-accent text-xl" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1">Premium Calculation Logic</h3>
                      <p className="text-sm text-gray-600">
                        Premiums are calculated based on age, gender, coverage amount, policy duration, and smoker status
                      </p>
                    </div>
                  </div>

                  {/* Term Length */}
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <FaCalendarAlt className="text-blue-600 text-xl" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1">Term Length Options</h3>
                      <p className="text-sm text-gray-600">
                        Available for <span className="font-bold text-blue-600">{policy.duration}</span>
                      </p>
                    </div>
                  </div>

                  {/* Coverage */}
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <FaCheckCircle className="text-green-600 text-xl" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1">Coverage</h3>
                      <p className="text-sm text-gray-600">
                        <span className="font-bold text-green-600">{policy.coverage}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                  className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary text-white font-bold py-4 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 group"
                  onClick={() => navigate(`/quote/${policy._id}`)}
                >
                  <FaDollarSign className="text-xl group-hover:rotate-12 transition-transform" />
                  <span>Get Instant Quote</span>
                </button>

                <button
                  className="w-full bg-gradient-to-r from-accent to-orange-600 hover:from-orange-600 hover:to-accent text-white font-bold py-4 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 group"
                  onClick={() => navigate(`/quote/${policy._id}`)}
                >
                  <FaPhoneAlt className="text-xl group-hover:rotate-12 transition-transform" />
                  <span>Book Agent Consultation</span>
                </button>
              </div>

              {/* Trust Badge */}
              <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl border border-primary/20">
                <div className="flex items-center gap-3">
                  <FaShieldAlt className="text-primary text-2xl" />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">100% Secure & Trusted</p>
                    <p className="text-xs text-gray-600">Your information is protected with industry-standard encryption</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Benefits Section */}
        <div className="mt-12 bg-gradient-to-r from-primary to-blue-600 rounded-2xl shadow-xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-accent/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Get Protected?
            </h3>
            <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust us with their insurance needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate(`/quote/${policy._id}`)}
                className="btn bg-accent hover:bg-orange-600 text-white border-0 px-8 py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 font-bold"
              >
                Get Started Now
              </button>
              <button className="btn bg-white text-primary hover:bg-gray-100 border-0 px-8 py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 font-bold">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyDetails;