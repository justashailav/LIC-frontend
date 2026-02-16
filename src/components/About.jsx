import React from "react";
import ProfileImg from "../assets/ProfileImg.jpg";
import OfficeImg from "../assets/OfficeImg.jpg";
import AwardImg from "../assets/AwardsImg.jpg";
import SeminarImg from "../assets/SeminarImg.jpeg";
import { motion } from "framer-motion";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function About() {
  return (
    <>
    <Helmet>
        <title>About | Tejkavi Future Insurance - LIC Advisor</title>
        <meta
          name="description"
          content="Meet your trusted LIC advisor in Jharkhand. 5+ years experience, 200+ happy clients, personalized insurance and claim support assistance."
        />
        <meta
          name="keywords"
          content="LIC Advisor Jharkhand, Life Insurance, LIC Plans, Tejkavi Future Insurance"
        />
        <meta property="og:title" content="About Tejkavi Future Insurance" />
        <meta
          property="og:description"
          content="Professional LIC advisor providing life, child, retirement & savings plans with full claim support."
        />
      </Helmet>
      <div className="w-full text-gray-800">
      {/* HERO ABOUT SECTION */}
      <motion.section
        className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-16 md:px-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div variants={fadeLeft} className="flex justify-center">
            <div className="bg-white p-6 rounded-3xl shadow-2xl">
              <img
                src={SeminarImg}
                alt="LIC Advisor"
                className="w-full max-w-sm rounded-2xl object-cover"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div variants={fadeRight}>
            <h1 className="text-4xl font-bold mb-6">
              Meet Your Trusted LIC Advisor
            </h1>

            <p className="text-gray-600 text-lg mb-6">
              With years of experience as an LIC advisor, I have been committed
              to helping individuals and families make informed financial
              decisions. My goal is to provide clear guidance, honest advice,
              and customized insurance solutions that align perfectly with your
              long-term financial goals and responsibilities.
            </p>

            <p className="text-gray-600 text-lg">
              From life insurance and child education plans to retirement and
              savings solutions, I ensure every client receives personalized
              service and full assistance throughout the policy journey —
              including documentation support and claim settlement guidance.
              Your family’s financial security and peace of mind are always my
              top priorities.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* STATS SECTION */}
      <motion.section
        className="px-6 py-16 md:px-20 bg-gray-50"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "5+", label: "Years Experience" },
            { value: "200+", label: "Happy Clients" },
            { value: "100%", label: "Claim Support Assistance" },
            { value: "Jharkhand", label: "Service Area" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition"
            >
              <h3 className="text-3xl font-bold text-blue-600">{stat.value}</h3>
              <p className="text-gray-600 mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* PROFESSIONAL GALLERY */}
      <motion.section
        className="px-6 py-20 md:px-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            variants={fadeUp}
            className="text-3xl font-bold text-center mb-12"
          >
            A Glimpse of My Professional Journey
          </motion.h2>

          <motion.div
            className="grid sm:grid-cols-2 md:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {[OfficeImg, AwardImg, ProfileImg].map((img, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                whileHover={{ scale: 1.05 }}
                className="overflow-hidden rounded-3xl shadow-lg"
              >
                <img
                  src={img}
                  alt="Professional Work"
                  className="w-full object-cover"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CALL TO ACTION */}
      <motion.section
        className="bg-blue-600 text-white text-center px-6 py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-4">
          Secure Your Family’s Future Today
        </h2>

        <p className="mb-6 text-lg">
          Get expert guidance on the best LIC plans tailored for you.
        </p>

        <motion.a
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          href="https://wa.me/917004942500"
          target="_blank"
          rel="noreferrer"
          className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-100 transition"
        >
          💬 Chat on WhatsApp
        </motion.a>
      </motion.section>
      <Footer/>
    </div>
    </>
  );
}
