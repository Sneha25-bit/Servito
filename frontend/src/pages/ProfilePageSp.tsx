import React from "react";
import {
  User,
  Star,
  Phone,
  Mail,
  MapPin,
  Calendar,
  ArrowLeft,
  Edit3,
  Briefcase,
  Award,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function ProfilePageSP() {
  // Dummy SP data
  const provider = {
    name: "Rajesh Kumar",
    email: "rajesh.k@servito.com",
    phone: "+91 9876543210",
    address: "Varachha, Surat, Gujarat",
    serviceType: "Electrician",
    joinedDate: "January 2024",
    totalRequests: 56,
    completed: 49,
    rating: 4.7,
    profileImage: "https://api.dicebear.com/7.x/adventurer/svg?seed=Rajesh",
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
        <button className="hover:bg-blue-50 p-2 rounded-full transition">
          <Edit3 className="text-blue-600 cursor-pointer" />
        </button>
      </header>

      {/* ===== Main Section ===== */}
      <main className="max-w-4xl mx-auto py-10 px-6">
        <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center text-center hover:shadow-lg transition">
          {/* Profile Image */}
          <div className="relative">
            <img
              src={provider.profileImage}
              alt={provider.name}
              className="w-28 h-28 rounded-full border-4 border-blue-500 shadow-sm"
            />
            <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white rounded-full p-1 shadow">
              <User size={16} />
            </div>
          </div>

          {/* Name + Role */}
          <h2 className="text-2xl font-bold text-gray-800 mt-4">
            {provider.name}
          </h2>
          <p className="text-blue-600 font-medium mt-1">
            {provider.serviceType} Specialist
          </p>

          {/* Ratings */}
          <div className="flex items-center justify-center gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.round(provider.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-2 text-gray-700 font-medium">
              {provider.rating}/5
            </span>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-6 mt-8 w-full text-center border-t pt-6">
            <div>
              <p className="text-2xl font-bold text-blue-600">
                {provider.totalRequests}
              </p>
              <p className="text-gray-600 text-sm">Total Requests</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">
                {provider.completed}
              </p>
              <p className="text-gray-600 text-sm">Completed Jobs</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-500">
                {provider.rating.toFixed(1)}
              </p>
              <p className="text-gray-600 text-sm">Overall Rating</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="w-full mt-8 text-left space-y-4">
            <div className="flex items-center gap-3 border-b pb-3">
              <Mail className="text-blue-500" size={20} />
              <p className="text-gray-700 font-medium">{provider.email}</p>
            </div>
            <div className="flex items-center gap-3 border-b pb-3">
              <Phone className="text-blue-500" size={20} />
              <p className="text-gray-700 font-medium">{provider.phone}</p>
            </div>
            <div className="flex items-center gap-3 border-b pb-3">
              <MapPin className="text-blue-500" size={20} />
              <p className="text-gray-700 font-medium">{provider.address}</p>
            </div>
            <div className="flex items-center gap-3 border-b pb-3">
              <Calendar className="text-blue-500" size={20} />
              <p className="text-gray-700 font-medium">
                Joined {provider.joinedDate}
              </p>
            </div>
          </div>

          {/* Highlights / Achievements */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8 w-full">
            <div className="bg-blue-50 p-4 rounded-lg flex flex-col items-center">
              <Briefcase className="text-blue-600 mb-1" />
              <p className="text-gray-700 font-medium">5+ Years Experience</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg flex flex-col items-center">
              <Award className="text-blue-600 mb-1" />
              <p className="text-gray-700 font-medium">Certified Professional</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg flex flex-col items-center">
              <Star className="text-blue-600 mb-1" />
              <p className="text-gray-700 font-medium">Top Rated on Servito</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
