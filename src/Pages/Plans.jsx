import {
  createPlan,
  deletePlan,
  getAllPlans,
  updatePlan,
} from "@/store/slices/planSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Modal = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[95%] max-w-lg rounded-xl p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 text-xl"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default function AdminPlans() {
  const dispatch = useDispatch();
  const {
    plans = [],
    loading,
    error,
    message,
  } = useSelector((state) => state.plan);

  const [openModal, setOpenModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    benefits: "",
    whoShouldBuy: "",
    order: 0,
    category: "",

    // ⭐ Popular fields
    isPopular: false,
    popularLabel: "",
    popularValue: "",
    popularButtonText: "View Plans",
    popularBg: "from-gray-50 to-white",
    image: null,
  });

  useEffect(() => {
    dispatch(getAllPlans());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const handleImageChange = (e) => {
    setForm({
      ...form,
      image: e.target.files[0],
    });
  };

  const handleEdit = (plan) => {
    setEditingId(plan._id);
    setForm({
      title: plan.title,
      slug: plan.slug,
      description: plan.description,
      benefits: plan.benefits || "",
      whoShouldBuy: plan.whoShouldBuy || "",
      order: plan.order || 0,
      category: plan.category || "",

      isPopular: plan.isPopular || false,
      popularLabel: plan.popularLabel || "",
      popularValue: plan.popularValue || "",
      popularButtonText: plan.popularButtonText || "View Plans",
      popularBg: plan.popularBg || "from-gray-50 to-white",
      image: null,
    });
    setOpenModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this plan?")) {
      dispatch(deletePlan(id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("slug", form.slug);
    formData.append("description", form.description);
    formData.append("order", form.order);
    formData.append("category", form.category); // ✅ ADD THIS
    formData.append("isPopular", form.isPopular);
    formData.append("popularLabel", form.popularLabel);
    formData.append("popularValue", form.popularValue);
    formData.append("popularButtonText", form.popularButtonText);
    formData.append("popularBg", form.popularBg);

    // Convert arrays properly
    const benefitsArray =
      typeof form.benefits === "string"
        ? form.benefits.split(",").map((b) => b.trim())
        : form.benefits;

    const whoShouldBuyArray =
      typeof form.whoShouldBuy === "string"
        ? form.whoShouldBuy.split(",").map((w) => w.trim())
        : form.whoShouldBuy;

    formData.append("benefits", JSON.stringify(benefitsArray));
    formData.append("whoShouldBuy", JSON.stringify(whoShouldBuyArray));

    // 🔥 Single Image
    if (form.image) {
      formData.append("image", form.image);
    }

    if (editingId) {
      dispatch(updatePlan({ id: editingId, data: formData }));
    } else {
      dispatch(createPlan(formData));
    }

    setOpenModal(false);
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Insurance Plans
            </h1>
            <p className="text-gray-500 text-sm">
              Manage all available insurance plans
            </p>
          </div>

          <button
            onClick={() => {
              setEditingId(null);
              setForm({
                title: "",
                slug: "",
                description: "",
                benefits: "",
                whoShouldBuy: "",
                order: 0,
                category: "",
                isPopular: false,
                popularLabel: "",
                popularValue: "",
                popularButtonText: "View Plans",
                popularBg: "from-gray-50 to-white",
                image: null,
              });
              setOpenModal(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg transition"
          >
            + Add New Plan
          </button>
        </div>

        {/* MESSAGES */}
        {error && (
          <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4 text-red-600">
            {error}
          </div>
        )}
        {message && (
          <div className="mb-6 rounded-lg bg-green-50 border border-green-200 p-4 text-green-600">
            {message}
          </div>
        )}

        {/* PLAN CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan._id}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition p-5 flex flex-col"
            >
              <div className="mb-2 flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {plan.title}
                  </h2>
                  <p className="text-xs text-gray-400">/{plan.slug}</p>
                </div>

                {plan.isPopular && (
                  <span className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-full">
                    ⭐ Popular
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-600 flex-1 line-clamp-3">
                {plan.description}
              </p>
              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => handleEdit(plan)}
                  className="flex-1 py-2 rounded-lg border border-blue-500 text-blue-600 hover:bg-blue-50 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(plan._id)}
                  className="flex-1 py-2 rounded-lg border border-red-500 text-red-600 hover:bg-red-50 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* MODAL */}
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <h2 className="text-2xl font-bold mb-2">
            {editingId ? "Edit Plan" : "Create New Plan"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="title"
              placeholder="Plan Title"
              value={form.title}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-3"
              required
            />
            <input
              name="slug"
              placeholder="Slug"
              value={form.slug}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-3"
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-3"
            />
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full rounded-lg border px-4 py-3"
            >
              <option value="">Select Plan Type</option>
              <option value="Endowment Plan">Endowment Plan</option>
              <option value="Money Back Plan">Money Back Plan</option>
              <option value="Children Plan">Children Plan</option>
              <option value="Single Premium Plan">Single Premium Plan</option>
              <option value="Term Insurance Plan">Term Insurance Plan</option>
              <option value="Health Plan">Health Plan</option>
              <option value="Pension Plan">Pension Plan</option>
            </select>
            <div>
              <label className="block mb-1 font-medium">Plan Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full rounded-lg border px-4 py-3"
              />
            </div>
            {form.image && (
              <img
                src={URL.createObjectURL(form.image)}
                alt="Preview"
                className="mt-3 h-32 rounded-lg object-cover"
              />
            )}

            <textarea
              name="benefits"
              placeholder="Benefits (comma separated)"
              value={form.benefits}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-lg border px-4 py-3"
            />

            <textarea
              name="whoShouldBuy"
              placeholder="Who should buy this plan? (comma separated)"
              value={form.whoShouldBuy}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-lg border px-4 py-3"
            />

            {/* POPULAR TOGGLE */}
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isPopular"
                checked={form.isPopular}
                onChange={handleChange}
              />
              <span className="font-medium">Mark as Popular</span>
            </label>

            {form.isPopular && (
              <>
                <input
                  name="popularLabel"
                  placeholder="Popular Label (Sum Assured)"
                  value={form.popularLabel}
                  onChange={handleChange}
                  className="w-full rounded-lg border px-4 py-3"
                />
                <input
                  name="popularValue"
                  placeholder="Popular Value (₹2 Crore)"
                  value={form.popularValue}
                  onChange={handleChange}
                  className="w-full rounded-lg border px-4 py-3"
                />
                <input
                  name="popularButtonText"
                  placeholder="Button Text"
                  value={form.popularButtonText}
                  onChange={handleChange}
                  className="w-full rounded-lg border px-4 py-3"
                />
                <input
                  name="popularBg"
                  placeholder="Gradient (from-green-50 to-white)"
                  value={form.popularBg}
                  onChange={handleChange}
                  className="w-full rounded-lg border px-4 py-3"
                />
              </>
            )}

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => setOpenModal(false)}
                className="px-6 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
}
