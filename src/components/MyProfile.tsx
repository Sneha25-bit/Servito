import React from "react";
import { ArrowLeft, User, Star, Briefcase, GraduationCap, Building } from "lucide-react";
import { useNavigate } from "react-router-dom"; // 🟢 for navigation

const MyProfile = () => {
  const navigate = useNavigate(); // 🟢

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <User className="h-7 w-7" /> My Profile
          </h1>
          <button
            onClick={() => navigate("/dashboard")} // 🟢 Back to Dashboard
            className="flex items-center gap-2 px-4 py-2 bg-white text-indigo-600 font-semibold rounded-lg shadow hover:bg-indigo-50 transition"
          >
            <ArrowLeft className="h-5 w-5" /> Back
          </button>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left section */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                S
              </div>
              <div>
                <h2 className="text-2xl font-bold">SVNIT Stationary</h2>
                <p className="text-gray-500">Service Provider ID: SP12345</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-yellow-500 text-lg">
              <Star className="fill-yellow-400" />
              <Star className="fill-yellow-400" />
              <Star className="fill-yellow-400" />
              <Star className="fill-yellow-400" />
              <Star className="fill-gray-300" />
              <span className="text-gray-600 ml-2">(4.5 Rating)</span>
            </div>

            <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
              <p className="text-gray-700">
                “Providing reliable and quality service supplies for educational and corporate institutions since 2018.”
              </p>
            </div>
          </div>

          {/* Right section */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <Briefcase className="text-indigo-600" />
              <p><span className="font-semibold">Experience:</span> 5 years</p>
            </div>
            <div className="flex items-center gap-3">
              <GraduationCap className="text-indigo-600" />
              <p><span className="font-semibold">Education:</span> Bachelor's Degree</p>
            </div>
            <div className="flex items-center gap-3">
              <Building className="text-indigo-600" />
              <p><span className="font-semibold">Organization:</span> SVNIT Supplies Ltd</p>
            </div>
            <div className="flex items-center gap-3">
              <User className="text-indigo-600" />
              <p><span className="font-semibold">Aadhaar:</span> XXXX-XXXX-1234</p>
            </div>
            <div className="flex items-center gap-3">
              <Star className="text-indigo-600" />
              <p><span className="font-semibold">Completed Tasks:</span> 1286</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
