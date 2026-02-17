import { clearPlanState, getPlanBySlug } from "@/store/slices/planSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Footer from "./Footer";
import { Helmet } from "react-helmet";

export default function PlanDetails() {
  const { slug } = useParams();
  const dispatch = useDispatch();

  const { singlePlan, loading, error } = useSelector((state) => state.plan);

  useEffect(() => {
    dispatch(getPlanBySlug(slug));
    return () => dispatch(clearPlanState());
  }, [dispatch, slug]);

  const handleWhatsApp = () => {
    const phoneNumber = "917004942500";
    const message = `Hello, I’m interested in the ${singlePlan?.title} plan. Please share details.`;

    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  /* ================= STATES ================= */
  if (loading)
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
        Loading plan details...
      </div>
    );

  if (error)
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-red-500">
        {error}
      </div>
    );

  if (!singlePlan) return null;

  /* ================= UI ================= */
  return (
    <>
      <Helmet>
        <title>{singlePlan.title} | LIC Plan - Tejkavi Future Insurance</title>

        <meta
          name="description"
          content={
            singlePlan.description?.slice(0, 150) ||
            "LIC insurance plan details, benefits and eligibility. Get expert guidance from a trusted LIC advisor."
          }
        />

        <meta
          name="keywords"
          content={`${singlePlan.title}, LIC Plan, Life Insurance, LIC Advisor Jharkhand`}
        />

        <meta
          property="og:title"
          content={`${singlePlan.title} - LIC Plan Details`}
        />

        <meta
          property="og:description"
          content={singlePlan.description?.slice(0, 150)}
        />

        <meta property="og:type" content="article" />
      </Helmet>

      <div>
        <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-20 py-10 sm:py-14 p-4">
          {/* HERO */}
          {/* HERO */}
          <div className="mb-8 sm:mb-14">
            <p className="text-xs font-semibold text-[#B11226] tracking-wide uppercase mb-2">
              LIC Insurance Plan
            </p>

            <h1 className="text-2xl sm:text-4xl font-bold mb-4">
              {singlePlan.title}
            </h1>

            {/* PLAN IMAGE */}
            {singlePlan.image && (
              <div className="w-full mb-6 rounded-2xl overflow-hidden shadow-md bg-gray-100 flex justify-center items-center">
                <img
                  src={singlePlan.image}
                  alt={singlePlan.title}
                  className="max-h-[500px] w-auto object-contain"
                />
              </div>
            )}

            <p className="text-gray-600 text-sm sm:text-lg leading-relaxed">
              {singlePlan.description}
            </p>
          </div>

          {/* CONTENT */}
          <div className="grid lg:grid-cols-3 gap-10">
            {/* LEFT CONTENT */}
            <div className="lg:col-span-2 space-y-10">
              {/* BENEFITS */}
              {singlePlan.benefits?.length > 0 && (
                <div>
                  <h2 className="text-lg sm:text-2xl font-semibold mb-4">
                    Why choose this plan
                  </h2>

                  <ul className="space-y-3">
                    {singlePlan.benefits.map((benefit, index) => (
                      <li
                        key={index}
                        className="flex gap-3 text-gray-700 text-sm sm:text-base"
                      >
                        <span className="text-green-600 mt-1">✔</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* WHO SHOULD BUY */}
              {singlePlan.whoShouldBuy && (
                <div>
                  <h2 className="text-lg sm:text-2xl font-semibold mb-3">
                    Who is this plan best for?
                  </h2>

                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                    {singlePlan.whoShouldBuy}
                  </p>
                </div>
              )}
            </div>

            {/* DESKTOP CTA */}
            <div className="hidden lg:block lg:sticky lg:top-28 h-fit">
              <div className="border border-gray-200 rounded-2xl p-6 bg-white">
                <h3 className="text-lg font-semibold mb-2">
                  Get personalised details
                </h3>

                <p className="text-gray-600 text-sm mb-6">
                  Talk to an LIC advisor to understand premium, eligibility and
                  coverage.
                </p>

                <button
                  onClick={handleWhatsApp}
                  className="w-full bg-[#25D366] text-white py-3 rounded-xl font-medium"
                >
                  Chat on WhatsApp
                </button>
              </div>
            </div>
          </div>

          {/* MOBILE FIXED CTA (ONLY ONE CTA) */}
          <div className="fixed bottom-0 inset-x-0 lg:hidden bg-white px-4 py-3">
            <button
              onClick={handleWhatsApp}
              className="w-full bg-[#25D366] text-white py-3 rounded-xl font-semibold"
            >
              Chat on WhatsApp
            </button>
          </div>

          {/* EXTRA SPACE so content not hidden behind CTA */}
          <div className="h-20 lg:hidden" />
        </section>
        <Footer />
      </div>
    </>
  );
}
