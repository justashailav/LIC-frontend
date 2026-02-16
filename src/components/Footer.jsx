import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-gray-900 text-gray-300 px-6 py-12 md:px-20"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">LIC Advisor</h3>
          <p className="text-sm">
            Helping you secure your future with trusted LIC insurance plans
            tailored to your financial goals.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>

          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white transition duration-200">
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/plans"
                className="hover:text-white transition duration-200"
              >
                Plans
              </Link>
            </li>

            <li>
              <Link
                to="/about"
                className="hover:text-white transition duration-200"
              >
                About
              </Link>
            </li>

            <li>
              <Link
                to="/contact"
                className="hover:text-white transition duration-200"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-white font-semibold mb-4">Services</h4>
          <ul className="space-y-2 text-sm">
            <li>Life Insurance</li>
            <li>Retirement Planning</li>
            <li>Child Education Plans</li>
            <li>Health Insurance</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-4">Contact</h4>
          <div className="space-y-3 text-sm">
            <p className="flex items-center gap-2">
              <Phone size={16} /> +91 7004942500
            </p>
            <p className="flex items-center gap-2">
              <Mail size={16} /> tejkavifuture@gmail.com
            </p>
            <p className="flex items-center gap-2">
              <MapPin size={16} /> Barki pona Ramgarh 825101, Jharkhand India
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm">
        © {new Date().getFullYear()} Tejkavi Future Insurance. All Rights
        Reserved.
      </div>
    </motion.footer>
  );
};

export default Footer;
