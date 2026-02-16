import { getAllPlans, getPopularPlans } from "@/store/slices/planSlice";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HeroImage from "../assets/HeroImage.jpg";
import { motion} from "framer-motion";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const Home = () => {
  const scrollRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { plans, loading, error, popularPlans } = useSelector(
    (state) => state.plan,
  );

  useEffect(() => {
    dispatch(getAllPlans());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getPopularPlans());
  }, [dispatch]);
  const handleWhatsApp = (plan) => {
    const phoneNumber = "917004942500";
    const message = `Hello, I’m interested in the ${plan.title} plan. Please share more details.`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message,
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
   <>
      <Helmet>
      <title>Tejkavi Future Insurance | Trusted LIC Advisor in Jharkhand</title>

      <meta
        name="description"
        content="Trusted LIC Advisor in Jharkhand offering Life Insurance, Child Plans, Retirement and Savings solutions with complete claim support. Secure your family’s future today."
      />

      <meta
        name="keywords"
        content="LIC Advisor Jharkhand, Life Insurance, LIC Plans, Retirement Plan, Child Education Plan, Tejkavi Future Insurance"
      />

      <meta property="og:title" content="Tejkavi Future Insurance - LIC Advisor" />

      <meta
        property="og:description"
        content="Expert guidance on LIC policies with dedicated claim support and personalized advice."
      />

      <meta property="og:type" content="website" />
      <meta property="og:image" content="/HeroImage.jpg" />
    </Helmet>

     <motion.div variants={fadeUp} className="w-full text-gray-800">
      <section className="bg-gradient-to-r from-blue-50 to-blue-100 px-4 sm:px-6 py-16 md:px-20 md:py-20">
        <motion.div
          variants={fadeUp}
          className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center"
        >
          <motion.div
            className="text-center md:text-left"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.span
              variants={fadeUp}
              className="text-blue-600 font-semibold uppercase tracking-wide text-sm sm:text-base"
            >
              Trusted LIC Advisor
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-6 leading-tight"
            >
              Secure Your Family’s <br className="hidden sm:block" /> Financial
              Future Today
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-gray-600 mb-6 text-base sm:text-lg"
            >
              Expert guidance for Life Insurance, Child Plans & Retirement
              solutions tailored to your needs.
            </motion.p>

            <motion.ul
              variants={fadeUp}
              className="space-y-3 mb-8 text-left inline-block"
            >
              <li className="flex items-center gap-3">
                <motion.span variants={fadeUp} className="text-green-600">
                  ✔
                </motion.span>{" "}
                Personalized Policy Advice
              </li>
              <li className="flex items-center gap-3">
                <motion.span variants={fadeUp} className="text-green-600">
                  ✔
                </motion.span>{" "}
                Dedicated Claim Support
              </li>
              <li className="flex items-center gap-3">
                <motion.span variants={fadeUp} className="text-green-600">
                  ✔
                </motion.span>{" "}
                Long-term Relationship
              </li>
            </motion.ul>

            <motion.div
              variants={fadeUp}
              className="flex gap-4 flex-col sm:flex-row justify-center md:justify-start"
            >
              <a
                href="tel:7004942500"
                className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 sm:px-8 py-3 rounded-lg font-medium shadow text-center"
              >
                📞 Call Now
              </a>
              <a
                href="https://wa.me/917004942500"
                target="_blank"
                rel="noreferrer"
                className="bg-green-500 hover:bg-green-600 transition text-white px-6 sm:px-8 py-3 rounded-lg font-medium shadow text-center"
              >
                💬 WhatsApp Enquiry
              </a>
            </motion.div>
          </motion.div>

          <div className="flex justify-center">
            <div className="bg-white p-4 rounded-2xl shadow-xl">
              <motion.img
                src={HeroImage}
                alt="LIC Advisor"
                className="w-full max-w-xs sm:max-w-sm rounded-xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              />
            </div>
          </div>
        </motion.div>
      </section>
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="px-4 sm:px-6 py-16 md:px-20 md:py-20"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
          LIC Insurance Plans We Offer
        </h2>

        {loading && (
          <p className="text-center text-gray-500">Loading plans...</p>
        )}

        {error && <p className="text-center text-red-500">{error}</p>}

        <div className="relative">
          <div
            className="
        flex gap-4 overflow-x-auto pb-4
        snap-x snap-mandatory
        sm:grid sm:grid-cols-2
        md:grid-cols-4
        sm:overflow-visible
        sm:snap-none
        max-w-6xl mx-auto
      "
          >
            {plans.map((plan, index) => (
              <motion.div
                key={plan._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate(`/plans/${plan.slug}`)}
                className="
            snap-start
            min-w-[80%] sm:min-w-0
            cursor-pointer
            border rounded-2xl
            p-6 sm:p-8
            text-center
            bg-white
            shadow-sm
            hover:shadow-lg
            hover:-translate-y-1
          "
              >
               {plan.image && (
  <img
    src={plan.image}
    alt={plan.title}
    className="h-40 w-full object-cover rounded-xl mb-3"
  />
)}

                <h3 className="font-semibold text-lg mb-4">{plan.title}</h3>

                <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                  {plan.description}
                </p>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleWhatsApp(plan);
                  }}
                  className="text-green-600 font-medium hover:underline"
                >
                  Enquire Now →
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-gray-50 py-16 px-4 sm:px-6 md:px-20 md:py-20"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl sm:text-4xl font-bold text-gray-900">
              Our Popular Insurance Plans
            </h2>

            <div className="hidden md:flex gap-3">
              <button
                onClick={() =>
                  scrollRef.current.scrollBy({ left: -300, behavior: "smooth" })
                }
                className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-gray-200"
              >
                ←
              </button>

              <button
                onClick={() =>
                  scrollRef.current.scrollBy({ left: 300, behavior: "smooth" })
                }
                className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-gray-200"
              >
                →
              </button>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide
                 md:grid md:grid-cols-3 xl:grid-cols-6 md:overflow-visible"
          >
            {popularPlans
              ?.filter((plan) => plan.isActive)
              .map((plan, index) => (
                <motion.div
                  key={plan._id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className={`min-w-[260px] snap-start bg-gradient-to-b ${plan.popularBg}
                        rounded-3xl p-6 shadow`}
                >
                  <p className="text-sm text-gray-500">{plan.popularLabel}</p>

                  <h3 className="text-2xl font-bold mb-2">
                    {plan.popularValue}
                  </h3>

                  <button
                    onClick={() => handleWhatsApp(plan)}
                    className="w-full bg-pink-700 text-white py-3 rounded-full font-semibold"
                  >
                    {plan.popularButtonText}
                  </button>
                </motion.div>
              ))}
          </div>
        </div>
      </motion.section>

      {/* WHY CHOOSE US */}
      <motion.section
        className="bg-blue-50 px-6 py-20 md:px-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2
          className="text-3xl font-bold text-center mb-12"
          variants={fadeUp}
        >
          What Our Clients Say
        </motion.h2>

        <motion.div
          className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
        >
          {[
            {
              msg: "Very helpful and explained all LIC policies clearly. Claim process was smooth.",
              name: "Ramesh K.",
              city: "Delhi",
            },
            {
              msg: "Trustworthy advisor with great support even after policy purchase.",
              name: "Sunita S.",
              city: "Noida",
            },
          ].map((t, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ scale: 1.03 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300"
            >
              <p className="text-gray-600 mb-4">“{t.msg}”</p>
              <p className="font-semibold">
                – {t.name}, <span className="text-gray-500">{t.city}</span>
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* ABOUT */}
      {/* ================= Meet Advisor Section ================= */}
      <motion.section
        className="px-6 py-20 md:px-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.2 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 variants={fadeUp} className="text-3xl font-bold mb-6">
            Meet Your LIC Advisor
          </motion.h2>

          <motion.p variants={fadeUp} className="text-gray-600 text-lg mb-6">
            With years of experience as an LIC advisor, I help individuals and
            families choose the right insurance plans based on their financial
            goals and needs.
          </motion.p>

          <div className="grid sm:grid-cols-3 gap-6 mt-8">
            {[
              { title: "Experience", value: "5+ Years" },
              { title: "LIC Agent Code", value: "03824/512" },
              { title: "Service Area", value: "Jharkhand" },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300"
              >
                <p className="font-semibold">{item.title}</p>
                <p className="text-gray-600">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ================= Testimonials Section ================= */}
      <motion.section
        className="bg-blue-50 px-6 py-20 md:px-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2
          variants={fadeUp}
          className="text-3xl font-bold text-center mb-12"
        >
          What Our Clients Say
        </motion.h2>

        <motion.div
          className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8"
          transition={{ staggerChildren: 0.2 }}
        >
          {[
            {
              msg: "Very helpful and explained all LIC policies clearly. Claim process was smooth.",
              name: "Ramesh K.",
              city: "Delhi",
            },
            {
              msg: "Trustworthy advisor with great support even after policy purchase.",
              name: "Sunita S.",
              city: "Noida",
            },
          ].map((t, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ scale: 1.03 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300"
            >
              <p className="text-gray-600 mb-4">“{t.msg}”</p>
              <p className="font-semibold">
                – {t.name}, <span className="text-gray-500">{t.city}</span>
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
      <Footer/>
    </motion.div>
   </>
  );
};

export default Home;
