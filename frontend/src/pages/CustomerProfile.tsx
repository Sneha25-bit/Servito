import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Phone,
  Mail,
  MapPin,
  User,
  Edit,
  Save,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Star,
} from "lucide-react";

export default function EditableCustomerProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [bookingHistory, setBookingHistory] = useState([]);
  const [activeTab, setActiveTab] = useState("all");

  // Fetch profile and bookings
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/customer/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
        setFormData({
          username: res.data.username || "",
          email: res.data.email || "",
          phone_no: res.data.phone_no || "",
          address: res.data.address || "",
          bio: res.data.bio || "",
          profileImage: res.data.profileImage || "",
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    const fetchBookings = async () => {
      // Replace with actual backend endpoint
      setBookingHistory([
        {
          id: 1,
          serviceName: "Kitchen Sink Repair",
          providerName: "Rajesh Kumar",
          category: "Plumbing",
          date: "2025-10-28",
          time: "10:30 AM",
          status: "completed",
          amount: "₹800",
          rating: 5,
          address: "Katargam, Surat",
        },
        {
          id: 2,
          serviceName: "AC Servicing",
          providerName: "Suresh Patel",
          category: "Appliance Repair",
          date: "2025-10-30",
          time: "02:00 PM",
          status: "pending",
          amount: "₹1,500",
          rating: null,
          address: "Katargam, Surat",
        },
        {
          id: 3,
          serviceName: "House Cleaning",
          providerName: "Mina Desai",
          category: "Cleaning",
          date: "2025-10-24",
          time: "09:00 AM",
          status: "completed",
          amount: "₹1,200",
          rating: 4,
          address: "Katargam, Surat",
        },
      ]);
    };

    fetchProfile();
    fetchBookings();
  }, []);

  if (loading) return <p className="text-gray-500">Loading profile...</p>;
  if (!profile) return <p className="text-red-500">Failed to load profile</p>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
  try {
    const token = localStorage.getItem("token");

    // 1. Update profile
    await axios.put(
      "http://localhost:5000/api/customer/profile",
      formData,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // 2. Refetch profile from backend to get latest data
    const res = await axios.get("http://localhost:5000/api/customer/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });

    // 3. Update state with fresh profile
    setProfile(res.data);
    setFormData({
      username: res.data.username || "",
      email: res.data.email || "",
      phone_no: res.data.phone_no || "",
      address: res.data.address || "",
      bio: res.data.bio || "",
      profileImage: res.data.profileImage || "",
    });

    setEditing(false); // Exit editing mode
  } catch (err) {
    console.error("Error updating profile:", err);
  }
};
  const filteredHistory =
    activeTab === "all"
      ? bookingHistory
      : bookingHistory.filter((b) => b.status === activeTab);

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Customer Profile</h1>
        <button
          className="flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100"
          onClick={() => {
            if (editing) handleSave();
            setEditing(!editing);
          }}
        >
          {editing ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
          {editing ? "Save Changes" : "Edit Profile"}
        </button>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Editable Profile Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <img
                src={
                  formData.profileImage ||
                  `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.username}`
                }
                alt={formData.username}
                className="w-32 h-32 rounded-full border-4 border-blue-500"
              />
              {editing && (
                <input
                  type="text"
                  name="profileImage"
                  value={formData.profileImage}
                  onChange={handleChange}
                  placeholder="Profile Image URL"
                  className="mt-2 w-full px-2 py-1 border rounded"
                />
              )}
            </div>

            {/* Profile Details */}
            <div className="flex-grow">
              <div className="mb-4">
                <h2 className="text-3xl font-bold text-gray-800">
                  {editing ? (
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="text-3xl font-bold border-b border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    profile.username
                  )}
                </h2>
                <p className="text-blue-600 font-medium flex items-center gap-2 mt-1">
                  <User className="w-4 h-4" /> Customer
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 text-gray-700">
                  <Phone className="w-5 h-5 text-blue-600" />
                  {editing ? (
                    <input
                      type="text"
                      name="phone_no"
                      value={formData.phone_no}
                      onChange={handleChange}
                      className="border-b border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    profile.phone_no
                  )}
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Mail className="w-5 h-5 text-blue-600" />
                  {editing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="border-b border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    profile.email
                  )}
                </div>
                <div className="flex items-start gap-3 text-gray-700 md:col-span-2">
                  <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  {editing ? (
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    profile.address
                  )}
                </div>
              </div>

              {/* Bio */}
              <div className="mt-4">
                <h3 className="font-medium text-gray-700 mb-1">Bio</h3>
                {editing ? (
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
                  />
                ) : (
                  <p className="text-gray-600">{profile.bio || "No bio provided."}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Booking History Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Booking History</h3>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6 border-b">
            {["all", "completed", "pending", "cancelled"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === tab
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)} (
                {tab === "all"
                  ? bookingHistory.length
                  : bookingHistory.filter((b) => b.status === tab).length}
                )
              </button>
            ))}
          </div>

          {/* Booking Cards */}
          <div className="space-y-4">
            {filteredHistory.map((booking) => (
              <div
                key={booking.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-grow">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800">
                          {booking.serviceName}
                        </h4>
                        <p className="text-gray-600">
                          Provider: {booking.providerName}
                        </p>
                        <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs mt-1">
                          {booking.category}
                        </span>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        {getStatusIcon(booking.status)}
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(booking.date).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {booking.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {booking.address}
                      </div>
                    </div>

                    {booking.rating && (
                      <div className="flex items-center gap-1 mt-2">
                        <span className="text-sm text-gray-600 mr-1">Your Rating:</span>
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < booking.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="text-sm text-gray-600 ml-1">({booking.rating}/5)</span>
                      </div>
                    )}
                  </div>

                  <div className="text-right md:text-left">
                    <p className="text-2xl font-bold text-gray-800">{booking.amount}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredHistory.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">No bookings found in this category</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
