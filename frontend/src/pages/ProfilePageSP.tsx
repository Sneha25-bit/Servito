import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/auth";
import {
  ArrowLeft,
  Edit3,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Award,
} from "lucide-react";

export default function ProfilePageSP() {
  const [provider, setProvider] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const navigate = useNavigate();

  // Fetch provider profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Session expired. Please log in again.");
          navigate("/login");
          return;
        }
        const { data } = await api.get("/provider/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProvider(data);
        setFormData({
          username: data.username || "",
          phone_no: data.phone_no || "",
          address: data.address || "",
          service_info: data.service_info || "",
          experience: data.experience || "",
          education: data.education || "",
          dob: data.dob ? new Date(data.dob).toISOString().split("T")[0] : "",
        });
      } catch (err) {
        console.error("Profile fetch error:", err);
        alert("Failed to load profile details.");
      }
    };
    fetchProfile();
  }, [navigate]);

  if (!provider)
    return <p className="p-10 text-center text-gray-600">Loading profile...</p>;

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save updates
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("Session expired. Please login again.");

      const payload = { ...formData };

      const { data } = await api.put("/provider/update", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProvider(data.provider);
      setEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Update error:", err.response || err);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-[Poppins]">
      {/* ===== Header ===== */}
      <header className="bg-white shadow-sm sticky top-0 z-20 flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <Link to="/dashboard">
            <ArrowLeft className="text-gray-600 hover:text-blue-600 cursor-pointer" />
          </Link>
          <h2 className="text-xl font-semibold text-gray-800">My Profile</h2>
        </div>

        {/* ✏️ Edit/Save Button */}
        <button
          onClick={editing ? handleSave : () => setEditing(true)}
          className="hover:bg-blue-50 p-2 rounded-full transition"
        >
          {editing ? "💾" : <Edit3 className="text-blue-600 cursor-pointer" />}
        </button>
      </header>

      {/* ===== Main Section ===== */}
      <main className="max-w-4xl mx-auto py-10 px-6">
        <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center text-center hover:shadow-lg transition">
          {/* Profile Avatar */}
          <img
            src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${provider.username}`}
            alt={provider.username}
            className="w-28 h-28 rounded-full border-4 border-blue-500 shadow-sm"
          />

          {/* Name + Service Info */}
          {editing ? (
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="border rounded px-2 py-1 mt-4 w-64 text-center font-bold text-gray-800"
            />
          ) : (
            <h2 className="text-2xl font-bold text-gray-800 mt-4">{provider.username}</h2>
          )}

          {editing ? (
            <input
              type="text"
              name="service_info"
              value={formData.service_info}
              onChange={handleChange}
              className="border rounded px-2 py-1 mt-1 w-64 text-center text-blue-600 font-medium"
            />
          ) : (
            <p className="text-blue-600 font-medium mt-1">
              {provider.service_info || "Service Provider"}
            </p>
          )}

          {/* Contact Information */}
          <div className="w-full mt-8 text-left space-y-4">
            {/* Email (readonly) */}
            <div className="flex items-center gap-3 border-b pb-3">
              <Mail className="text-blue-500" size={20} />
              <p className="text-gray-700 font-medium">{provider.email}</p>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3 border-b pb-3">
              <Phone className="text-blue-500" size={20} />
              {editing ? (
                <input
                  type="text"
                  name="phone_no"
                  value={formData.phone_no}
                  onChange={handleChange}
                  className="border rounded px-2 py-1 w-full"
                />
              ) : (
                <p className="text-gray-700 font-medium">{provider.phone_no}</p>
              )}
            </div>

            {/* Address */}
            <div className="flex items-center gap-3 border-b pb-3">
              <MapPin className="text-blue-500" size={20} />
              {editing ? (
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="border rounded px-2 py-1 w-full"
                />
              ) : (
                <p className="text-gray-700 font-medium">{provider.address}</p>
              )}
            </div>

            {/* DOB */}
            <div className="flex items-center gap-3 border-b pb-3">
              <Calendar className="text-blue-500" size={20} />
              {editing ? (
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="border rounded px-2 py-1 w-full"
                />
              ) : (
                <p className="text-gray-700 font-medium">
                  Joined{" "}
                  {new Date(provider.joinedDate).toLocaleDateString("en-GB", {
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              )}
            </div>
          </div>

          {/* Highlights / Achievements */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8 w-full">
            {/* Experience */}
            <div className="bg-blue-50 p-4 rounded-lg flex flex-col items-center">
              <Briefcase className="text-blue-600 mb-1" />
              {editing ? (
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="border rounded px-2 py-1 w-full text-center"
                />
              ) : (
                <p className="text-gray-700 font-medium">
                  {provider.experience?.trim() || "Experience not set"}
                </p>
              )}
            </div>

            {/* Education */}
            <div className="bg-blue-50 p-4 rounded-lg flex flex-col items-center">
              <Award className="text-blue-600 mb-1" />
              {editing ? (
                <input
                  type="text"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  className="border rounded px-2 py-1 w-full text-center"
                />
              ) : (
                <p className="text-gray-700 font-medium">
                  {provider.education?.trim() || "No Education Info"}
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
