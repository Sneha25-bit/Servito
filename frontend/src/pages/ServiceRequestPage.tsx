import React, { useState, useEffect } from "react";
import axios from "axios";
import { CheckCircle, Wrench, Home, Paintbrush, Zap, Wallet } from "lucide-react";
import Footer from "../components/Footer";
import Header from "@/components/Header";

export default function ServiceRequestPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    address: "",
    description: "",
    budget: "", // 💰 Added new field
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Autofill logged-in user's info
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get("http://localhost:5000/api/customer/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { username, email, phone_no, budget } = res.data;
        setFormData((prev) => ({
          ...prev,
          name: username || "",
          email: email || "",
          phone: phone_no || "",
          budget: budget || "", // autofill if exists
        }));
      } catch (err) {
        console.error("❌ Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, []);

  // Handle input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle submit
  const handleSubmit = async () => {
    if (Object.values(formData).some((field) => field.toString().trim() === "")) {
      alert("⚠️ Please fill all fields including your budget before submitting.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("🔒 Please log in to submit a service request.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/api/requests", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("✅ Request submitted:", response.data);
      setSubmitted(true);
      alert("✅ Your service request has been submitted successfully!");

      setTimeout(() => setSubmitted(false), 5000);
      setFormData({
        name: "",
        email: "",
        phone: "",
        serviceType: "",
        address: "",
        description: "",
        budget: "",
      });
    } catch (err: any) {
      console.error("❌ Error submitting request:", err);
      alert(err.response?.data?.message || "Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-100 font-[Poppins]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Poppins:wght@300;400;500;600&display=swap');
        .brand-title { font-family: 'Playfair Display', serif; letter-spacing: 2px; }
        .elegant-text { font-family: 'Poppins', sans-serif; }
        .glass-effect { background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.3); }
        .input-elegant { transition: all 0.3s ease; }
        .input-elegant:focus { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(14,165,233,0.25); }
      `}</style>

      <Header />

      <main className="flex-grow pt-24">
        <section className="max-w-6xl mx-auto px-4 py-12">
          {/* ===== Service Categories ===== */}
          <div className="mb-12 text-center">
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              {[
                { icon: <Home size={32} className="text-white" />, label: "Home Services", gradient: "from-sky-500 to-cyan-600" },
                { icon: <Zap size={32} className="text-white" />, label: "Electrical", gradient: "from-cyan-500 to-blue-600" },
                { icon: <Paintbrush size={32} className="text-white" />, label: "Painting", gradient: "from-blue-500 to-sky-600" },
                { icon: <Wrench size={32} className="text-white" />, label: "Repairs", gradient: "from-sky-600 to-indigo-600" },
              ].map((service, index) => (
                <div
                  key={index}
                  className="glass-effect rounded-2xl p-6 shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1"
                >
                  <div
                    className={`bg-gradient-to-br ${service.gradient} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}
                  >
                    {service.icon}
                  </div>
                  <p className="elegant-text font-medium text-gray-700">{service.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ===== Request Form ===== */}
          <div className="glass-effect rounded-3xl shadow-2xl p-10 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-5xl font-bold brand-title bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent mb-3">
                Request a Service
              </h2>
              <p className="elegant-text text-gray-600 text-lg">
                Tell us what you need, and we'll connect you with the best professionals.
              </p>
            </div>

            {submitted && (
              <div className="bg-gradient-to-r from-teal-400 to-emerald-500 text-white px-6 py-4 rounded-2xl mb-8 flex items-center shadow-lg">
                <CheckCircle className="mr-3" size={24} />
                <span className="elegant-text font-medium">
                  Request submitted successfully! We will contact you soon.
                </span>
              </div>
            )}

            <div className="space-y-6 elegant-text">
              {/* Basic Inputs */}
              {[
                { label: "Full Name", name: "name", type: "text", placeholder: "Enter your full name" },
                { label: "Email Address", name: "email", type: "email", placeholder: "your@email.com" },
                { label: "Phone Number", name: "phone", type: "tel", placeholder: "(123) 456-7890" },
              ].map((field, idx) => (
                <div key={idx}>
                  <label className="block text-gray-700 font-semibold mb-3 text-lg">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={(formData as any)[field.name]}
                    onChange={handleInputChange}
                    className="input-elegant w-full px-6 py-4 border-2 border-sky-200 rounded-2xl focus:outline-none focus:border-sky-500 bg-white"
                    placeholder={field.placeholder}
                  />
                </div>
              ))}

              {/* Service Type */}
              <div>
                <label className="block text-gray-700 font-semibold mb-3 text-lg">Service Type</label>
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleInputChange}
                  className="input-elegant w-full px-6 py-4 border-2 border-sky-200 rounded-2xl focus:outline-none focus:border-sky-500 bg-white"
                >
                  <option value="">Select a service</option>
                  <option value="plumbing">Plumbing</option>
                  <option value="electrical">Electrical</option>
                  <option value="carpentry">Carpentry</option>
                  <option value="painting">Painting</option>
                  <option value="hvac">HVAC</option>
                  <option value="cleaning">Cleaning</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Address */}
              <div>
                <label className="block text-gray-700 font-semibold mb-3 text-lg">Service Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="input-elegant w-full px-6 py-4 border-2 border-sky-200 rounded-2xl focus:outline-none focus:border-sky-500 bg-white"
                  placeholder="Enter service location"
                />
              </div>

              {/* 💰 Budget */}
              <div>
                <label className="block text-gray-700 font-semibold mb-3 text-lg flex items-center gap-2">
                  <Wallet className="text-sky-600" /> Estimated Budget (₹)
                </label>
                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="input-elegant w-full px-6 py-4 border-2 border-sky-200 rounded-2xl focus:outline-none focus:border-sky-500 bg-white"
                  placeholder="Enter your expected budget (e.g., 2000)"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-gray-700 font-semibold mb-3 text-lg">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={5}
                  className="input-elegant w-full px-6 py-4 border-2 border-sky-200 rounded-2xl focus:outline-none focus:border-sky-500 bg-white resize-none"
                  placeholder="Describe the service you need in detail..."
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full text-white py-5 rounded-2xl font-semibold text-lg transition shadow-xl hover:shadow-2xl transform hover:-translate-y-1 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-sky-600 to-cyan-500 hover:from-sky-700 hover:to-cyan-600"
                }`}
              >
                {loading ? "Submitting..." : "Submit Request"}
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
