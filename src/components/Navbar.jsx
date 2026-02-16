import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/LogoImg.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const clickCount = useRef(0);
  const navigate = useNavigate();

  const handleLogoClick = () => {
  let count = parseInt(localStorage.getItem("logoClicks") || "0");

  count += 1;

  if (count === 5) {
    localStorage.setItem("logoClicks", "0");
    navigate("/admin-login");
  } else {
    localStorage.setItem("logoClicks", count.toString());
  }
};



  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-20">
          <div className="flex items-center justify-between h-16">

            {/* LOGO */}
            <div
              onClick={handleLogoClick}
              className="flex items-center gap-3 cursor-pointer"
            >
              <img
                src={Logo}
                alt="LIC Advisor Logo"
                className="h-16 w-auto object-contain"
              />
              <span className="text-xl font-semibold text-blue-700 tracking-wide">
                Tejkavi Future Insurance
              </span>
            </div>

            {/* DESKTOP MENU */}
            <div className="hidden md:flex items-center gap-8 font-medium">
              <Link to="/" className="hover:text-blue-600">Home</Link>
              <Link to="/plans" className="hover:text-blue-600">Plans</Link>
              <Link to="/about" className="hover:text-blue-600">About</Link>
              <Link to="/achievements" className="hover:text-blue-600">Achievements</Link>
              <Link to="/contact" className="hover:text-blue-600">Contact</Link>

              <a
                href="tel:7004942500"
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Call Now
              </a>
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              className="md:hidden text-3xl text-gray-800 focus:outline-none"
              onClick={() => setOpen(true)}
            >
              ☰
            </button>
          </div>
        </div>
      </nav>

      {/* OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300
        ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setOpen(false)}
      />

      {/* MOBILE SLIDE MENU */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-2xl
        transform transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 h-16 border-b">
          <div
            onClick={handleLogoClick}
            className="flex items-center gap-3 cursor-pointer"
          >
            <img
              src={Logo}
              alt="LIC Advisor Logo"
              className="h-16 w-auto object-contain"
            />
          </div>

          <button
            className="text-3xl text-gray-800"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* LINKS */}
        <div className="px-6 py-6 space-y-5 font-medium">
          <Link to="/" onClick={() => setOpen(false)} className="block hover:text-blue-600">Home</Link>
          <Link to="/plans" onClick={() => setOpen(false)} className="block hover:text-blue-600">Plans</Link>
          <Link to="/about" onClick={() => setOpen(false)} className="block hover:text-blue-600">About</Link>
          <Link to="/achievements" onClick={() => setOpen(false)} className="block hover:text-blue-600">Achievements</Link>
          <Link to="/contact" onClick={() => setOpen(false)} className="block hover:text-blue-600">Contact</Link>

          <a
            href="tel:9015118744"
            className="block text-center bg-blue-600 text-white py-3 rounded-xl font-semibold mt-6"
          >
            📞 Call Now
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
