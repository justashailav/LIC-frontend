import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Img1 from "../assets/Event1.jpg";
import Img2 from "../assets/Event2.jpg";
import Img3 from "../assets/Event3.jpg";
import Img4 from "../assets/Event4.jpg";
import Img5 from "../assets/Event5.jpg";
import Footer from "./Footer";

const images = [Img1, Img2, Img3, Img4, Img5];

const Achievements = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [zoomed, setZoomed] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);

  const closeLightbox = () => {
    setSelectedIndex(null);
    setZoomed(false);
  };

  const showNext = () =>
    setSelectedIndex((prev) => (prev + 1) % images.length);

  const showPrev = () =>
    setSelectedIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );

  /* ================= AUTO SLIDESHOW ================= */
  useEffect(() => {
    if (selectedIndex === null || !autoPlay) return;

    const interval = setInterval(() => {
      showNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [selectedIndex, autoPlay]);

  /* ================= KEYBOARD SUPPORT ================= */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="w-full bg-white text-gray-800">

      {/* HEADER */}
      <section className="bg-blue-50 py-16 px-6 md:px-20 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold">
          My Achievements
        </h1>
      </section>

      {/* MASONRY GALLERY */}
      <section className="px-6 py-20 md:px-20">
        <div className="max-w-6xl mx-auto columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">

          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="break-inside-avoid cursor-pointer"
              onClick={() => setSelectedIndex(index)}
            >
              {/* PARALLAX HOVER EFFECT */}
              <motion.div
                whileHover={{ scale: 1.05, rotateX: 3, rotateY: -3 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="overflow-hidden rounded-3xl shadow-xl"
              >
                <img
                  src={img}
                  alt="Achievement"
                  loading="lazy"
                  className="w-full object-cover"
                />
              </motion.div>
            </motion.div>
          ))}

        </div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 backdrop-blur-lg bg-black/70 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white text-3xl font-bold"
            >
              ✕
            </button>

            {/* IMAGE COUNTER */}
            <div className="absolute top-6 left-6 text-white text-sm bg-black/40 px-3 py-1 rounded-full">
              {selectedIndex + 1} / {images.length}
            </div>

            {/* PREV */}
            <button
              onClick={() => {
                setAutoPlay(false);
                showPrev();
              }}
              className="absolute left-6 text-white text-4xl"
            >
              ‹
            </button>

            {/* NEXT */}
            <button
              onClick={() => {
                setAutoPlay(false);
                showNext();
              }}
              className="absolute right-6 text-white text-4xl"
            >
              ›
            </button>

            {/* IMAGE */}
            <motion.img
              key={selectedIndex}
              src={images[selectedIndex]}
              alt="Full View"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{
                scale: zoomed ? 1.8 : 1,
                opacity: 1,
              }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3 }}
              drag={!zoomed ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(e, info) => {
                if (info.offset.x > 100) showPrev();
                if (info.offset.x < -100) showNext();
              }}
              onDoubleClick={() => setZoomed(!zoomed)}
              className="max-h-[90vh] max-w-full rounded-2xl shadow-2xl cursor-zoom-in active:cursor-grabbing"
            />
          </motion.div>
        )}
      </AnimatePresence>
      <Footer/>
    </div>
  );
};

export default Achievements;
