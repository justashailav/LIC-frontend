import { useState } from "react";
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

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const whatsappNumber = "917004942500";
    const text = `Hello, my name is ${formData.name}.
Phone: ${formData.phone}.
Message: ${formData.message}`;

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`,
      "_blank",
    );
  };

  return (
    <>
       <Helmet>
      <title>Contact | Tejkavi Future Insurance - LIC Advisor</title>

      <meta
        name="description"
        content="Contact Tejkavi Future Insurance, trusted LIC advisor in Jharkhand. Get guidance on life insurance, child plans, retirement solutions and claim support."
      />

      <meta
        name="keywords"
        content="Contact LIC Advisor, LIC Jharkhand, Insurance Advisor Ramgarh, Tejkavi Future Insurance"
      />

      <meta
        property="og:title"
        content="Contact Tejkavi Future Insurance"
      />

      <meta
        property="og:description"
        content="Get in touch for LIC plans, financial security and personalized insurance guidance."
      />
    </Helmet>
      <div className="w-full text-gray-800">
      {/* HEADER */}
      <motion.section
        className="bg-blue-50 py-12 sm:py-16 px-4 sm:px-6 md:px-20 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h1
          variants={fadeUp}
          className="text-3xl sm:text-4xl font-bold mb-4"
        >
          Get In Touch
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-gray-600 text-base sm:text-lg max-w-xl mx-auto"
        >
          Have questions about LIC plans? I’m here to help.
        </motion.p>
      </motion.section>

      {/* CONTACT SECTION */}
      <section className="px-4 sm:px-6 py-16 md:px-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-12">
          {/* LEFT - CONTACT INFO */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-xl sm:text-2xl font-bold">
              Contact Information
            </h2>

            <div className="space-y-6 text-gray-700 text-sm sm:text-base">
              <div>
                <p className="font-semibold">📞 Phone</p>
                <a
                  href="tel:9015118744"
                  className="text-blue-600 hover:underline"
                >
                  +91 7004942500
                </a>
              </div>

              <div>
                <p className="font-semibold">💬 WhatsApp</p>
                <a
                  href="https://wa.me/917004942500"
                  target="_blank"
                  rel="noreferrer"
                  className="text-green-600 hover:underline"
                >
                  Chat on WhatsApp
                </a>
              </div>

              <div>
                <p className="font-semibold">📧 Email</p>
                <a
                  href="mailto:your@email.com"
                  className="text-blue-600 hover:underline break-all"
                >
                  tejkavifuture@gmail.com
                </a>
              </div>

              <div>
                <p className="font-semibold">📍 Office Address</p>
                <p>Barki pona Ramgarh 825101, Jharkhand India</p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT - FORM */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-gray-50 p-6 sm:p-8 rounded-2xl shadow-lg"
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-6">
              Send a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                onChange={handleChange}
                className="w-full border p-3 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <input
                type="tel"
                name="phone"
                placeholder="Your Phone Number"
                required
                onChange={handleChange}
                className="w-full border p-3 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <textarea
                name="message"
                rows="4"
                placeholder="Your Message"
                required
                onChange={handleChange}
                className="w-full border p-3 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Send via WhatsApp
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>
      <Footer/>
    </div>
    </>
  );
};

export default Contact;
