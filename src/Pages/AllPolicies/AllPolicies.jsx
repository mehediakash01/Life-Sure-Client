import React, { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import debounce from "lodash/debounce";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../Components/Loading/Loading";
import { useNavigate } from "react-router";
import { FaLongArrowAltRight, FaShieldAlt, FaSearch, FaFilter } from "react-icons/fa";
import { MdFilterList } from "react-icons/md";

const AllPolicies = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentPage(1);
  }, [search, category]);

  const debouncedSearch = useMemo(
    () =>
      debounce((value) => {
        setSearch(value);
      }, 800),
    []
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    debouncedSearch(e.target.value);
  };

  const { data: policies = [], isLoading } = useQuery({
    queryKey: ["policies", search, category],
    queryFn: async () => {
      const res = await axiosSecure.get("/policies", {
        params: { search, category },
      });
      return res.data;
    },
  });

  const totalPages = Math.ceil(policies.length / itemsPerPage);
  const currentItems = policies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-gray-50 py-16">
      <div className="w-11/12 max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-blue-600 rounded-2xl shadow-lg mb-6 transform hover:rotate-12 transition-transform duration-300">
            <FaShieldAlt className="text-4xl text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-4">
            Insurance Policies
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore our comprehensive range of insurance plans tailored to your needs
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch">
            <div className="flex-1 relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400 text-xl group-focus-within:text-primary transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search by title or category..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="input input-bordered w-full pl-12 pr-4 bg-gray-50 border-gray-200 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSearch("");
                  }}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            <div className="flex-1 relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaFilter className="text-gray-400 text-lg group-focus-within:text-accent transition-colors" />
              </div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="select select-bordered w-full pl-12 pr-4 bg-gray-50 border-gray-200 focus:bg-white focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all appearance-none cursor-pointer"
              >
                <option value="">All Categories</option>
                <option value="Term Life">📋 Term Life</option>
                <option value="Senior">👴 Senior</option>
                <option value="Whole Life">🏠 Whole Life</option>
                <option value="Child">👶 Child</option>
              </select>
            </div>
          </div>

          {(search || category) && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold text-gray-600 flex items-center gap-1">
                  <MdFilterList className="text-lg" />
                  Active Filters:
                </span>
                {search && (
                  <span className="inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                    Search: "{search}"
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        setSearch("");
                      }}
                      className="ml-1 hover:bg-primary/20 rounded-full p-0.5"
                    >
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </span>
                )}
                {category && (
                  <span className="inline-flex items-center gap-1 bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">
                    Category: {category}
                    <button
                      onClick={() => setCategory("")}
                      className="ml-1 hover:bg-accent/20 rounded-full p-0.5"
                    >
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </span>
                )}
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSearch("");
                    setCategory("");
                  }}
                  className="text-sm text-gray-500 hover:text-gray-700 underline ml-2"
                >
                  Clear all
                </button>
              </div>
            </div>
          )}
        </div>

        {!isLoading && policies.length > 0 && (
          <div className="mb-6 flex items-center justify-between">
            <p className="text-gray-600 font-medium">
              Showing <span className="text-primary font-bold">{currentItems.length}</span> of{" "}
              <span className="text-primary font-bold">{policies.length}</span> policies
            </p>
            <p className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </p>
          </div>
        )}

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
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {currentItems.map((policy, i) => (
            <motion.div
              key={policy._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.05 }}
              className="group h-full"
            >
              <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden h-full flex flex-col transition-all duration-500">
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

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h2 className="text-white font-bold text-xl line-clamp-1">{policy.title}</h2>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
                    {policy.description}
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(0,52,120,0.15)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate(`/policies/${policy._id}`)}
                    className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-accent hover:to-orange-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn relative overflow-hidden mt-auto"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-accent to-orange-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                    <span className="relative flex items-center justify-center gap-2">
                      <span>View Details</span>
                      <FaLongArrowAltRight className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </span>
                  </motion.button>
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

        {policies.length === 0 && !isLoading && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
              <FaShieldAlt className="text-5xl text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Policies Found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSearch("");
                setCategory("");
              }}
              className="btn bg-primary hover:bg-blue-600 text-white border-0 px-8"
            >
              Clear Filters
            </button>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2">
            <button
              className="btn btn-sm bg-white border-2 border-gray-300 hover:border-primary hover:bg-primary hover:text-white transition-all disabled:opacity-50"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              ⬅ Prev
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`btn btn-sm ${
                  currentPage === i + 1
                    ? "bg-gradient-to-r from-primary to-blue-600 text-white border-0"
                    : "bg-white border-2 border-gray-300 hover:border-primary hover:bg-primary/10"
                } transition-all`}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="btn btn-sm bg-white border-2 border-gray-300 hover:border-primary hover:bg-primary hover:text-white transition-all disabled:opacity-50"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next ➡
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPolicies;