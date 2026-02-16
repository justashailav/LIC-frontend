import { getAllPlans } from "@/store/slices/planSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "./Footer";

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

  const { plans, loading, error } = useSelector((state) => state.plan);

  useEffect(() => {
    dispatch(getAllPlans());
  }, [dispatch]);

  return (
    <>
       <Helmet>
      <title>LIC Insurance Plans | Tejkavi Future Insurance</title>

      <meta
        name="description"
        content="Explore LIC insurance plans including life insurance, child education plans, retirement and savings solutions. Get expert guidance from a trusted LIC advisor in Jharkhand."
      />

      <meta
        name="keywords"
        content="LIC Insurance Plans, Best LIC Plans, LIC Advisor Jharkhand, LIC Policies, Life Insurance Plans"
      />

      <meta
        property="og:title"
        content="LIC Insurance Plans - Tejkavi Future Insurance"
      />

      <meta
        property="og:description"
        content="Browse LIC plans designed to secure your family’s financial future."
      />

      <meta property="og:type" content="website" />
    </Helmet>
      <div className="bg-gray-50 min-h-screen">
      {/* HEADER */}
      <motion.section
        className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div className="max-w-6xl mx-auto text-center" variants={fadeUp}>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            LIC Insurance Plans
          </h1>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Explore a wide range of LIC insurance plans designed to secure your
            family’s future, savings, and retirement goals.
          </p>
        </motion.div>
      </motion.section>

      {/* CONTENT */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          {loading && (
            <p className="text-center text-gray-500">Loading plans...</p>
          )}

          {error && <p className="text-center text-red-500">{error}</p>}

          {/* PLANS GRID */}
          <motion.div
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {plans.map((plan) => (
              <motion.div
                key={plan._id}
                variants={fadeUp}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition cursor-pointer"
                onClick={() => navigate(`/plans/${plan.slug}`)}
              >
                <h2 className="text-xl font-semibold mb-3 text-gray-900">
                  {plan.title}
                </h2>

                <p className="text-gray-600 mb-6 line-clamp-3">
                  {plan.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Learn more</span>

                  <span className="text-blue-600 font-medium">View Plan →</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* EMPTY STATE */}
          {!loading && plans.length === 0 && (
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-center text-gray-500 mt-8"
            >
              No plans available at the moment.
            </motion.p>
          )}
        </div>
      </section>
      <Footer/>
    </div>
    </>
  );
};

export default Plans;
