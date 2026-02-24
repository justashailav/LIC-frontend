import { getAllPlans } from "@/store/slices/planSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "./Footer";
import { Helmet } from "react-helmet";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Plans = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { plans = [], loading, error } = useSelector((state) => state.plan);
  console.log(plans);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    dispatch(getAllPlans());
  }, [dispatch]);

  // Categories
  const categories = [
    "All",
    "Endowment Plan",
    "Money Back Plan",
    "Children Plan",
    "Single Premium Plan",
    "Term Insurance Plan",
    "Health Plan",
    "Pension Plan",
  ];

  // Safe Filter
  const filteredPlans =
    selectedCategory === "All"
      ? plans
      : plans.filter(
          (plan) =>
            plan.category &&
            plan.category.toLowerCase() === selectedCategory.toLowerCase(),
        );

  return (
    <>
      <Helmet>
        <title>LIC Insurance Plans | Tejkavi Future Insurance</title>
      </Helmet>

      <div className="bg-gray-50 min-h-screen">
        {/* HEADER */}
        <motion.section
          className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            className="max-w-6xl mx-auto text-center"
            variants={fadeUp}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              LIC Insurance Plans
            </h1>
            <p className="text-gray-700 max-w-3xl mx-auto">
              Explore a wide range of LIC insurance plans designed to secure
              your family’s future.
            </p>
          </motion.div>
        </motion.section>

        {/* CONTENT */}
        <section className="px-6 py-20">
          <div className="max-w-6xl mx-auto">
            {/* CATEGORY FILTER */}
            <div className="mb-12">
              {/* Mobile Scrollable */}
              <div className="flex md:hidden overflow-x-auto no-scrollbar gap-3 pb-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 flex-shrink-0
          ${
            selectedCategory === cat
              ? "bg-blue-600 text-white shadow-md"
              : "bg-white border border-gray-300 text-gray-600"
          }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Desktop Centered */}
              <div className="hidden md:flex flex-wrap justify-center gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
          ${
            selectedCategory === cat
              ? "bg-blue-600 text-white shadow-md"
              : "bg-white border border-gray-300 text-gray-600 hover:bg-blue-50"
          }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* LOADING */}
            {loading && (
              <p className="text-center text-gray-500">Loading plans...</p>
            )}

            {/* ERROR */}
            {error && <p className="text-center text-red-500">{error}</p>}

            {/* PLANS GRID */}
            {!loading && (
              <motion.div
                className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredPlans.map((plan) => (
                  <motion.div
                    key={plan._id}
                    variants={fadeUp}
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 180 }}
                    className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition overflow-hidden flex flex-col cursor-pointer"
                    onClick={() => navigate(`/plans/${plan.slug}`)}
                  >
                    {/* IMAGE */}
                    {plan.image && (
                      <div className="relative w-full h-48 overflow-hidden">
                        <img
                          src={plan.image}
                          alt={plan.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                    )}

                    {/* CONTENT */}
                    <div className="p-6 flex flex-col flex-1">
                      {/* CATEGORY BADGE */}
                      <span className="text-xs font-medium text-blue-600 mb-2">
                        {plan.category}
                      </span>

                      <h2 className="text-lg font-semibold mb-3 text-gray-900">
                        {plan.title}
                      </h2>

                      <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-1">
                        {plan.description}
                      </p>

                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-sm text-gray-500">
                          Learn more
                        </span>

                        <span className="text-blue-600 font-medium">
                          View Plan →
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* EMPTY STATE */}
            {!loading && filteredPlans.length === 0 && (
              <p className="text-center text-gray-500 mt-8">
                No plans available in this category.
              </p>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Plans;
