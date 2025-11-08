import React, { useState } from 'react';
import { Phone, Mail, MapPin, Calendar, Clock, CheckCircle, XCircle, Star, User } from 'lucide-react';

export default function CustomerProfile() {
  const [activeTab, setActiveTab] = useState('all');

  // Dummy customer profile data
  const profile = {
    name: "Yash Gondaliya",
    mobile: "+91 7572810626",
    email: "yashgondaliya98@gmail.com",
    address: "26, Avadhut Nagar, Katargam , Surat, Gujarat - 395004",
    joinedDate: "March 2023",
    totalBookings: 28,
    completedBookings: 24,
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Yash"
  };

  // Dummy booking history data
  const bookingHistory = [
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
      address: "Katargam, Surat"
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
      address: "Katargam, Surat"
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
      address: "Katargam, Surat"
    },
    {
      id: 4,
      serviceName: "Electrical Wiring",
      providerName: "Ramesh Joshi",
      category: "Electrical",
      date: "2025-10-20",
      time: "11:30 AM",
      status: "cancelled",
      amount: "₹2,000",
      rating: null,
      address: "Katargam, Surat"
    },
    {
      id: 5,
      serviceName: "Painting Work",
      providerName: "Vijay Singh",
      category: "Painting",
      date: "2025-10-15",
      time: "08:00 AM",
      status: "completed",
      amount: "₹5,500",
      rating: 5,
      address: "Katargam, Surat"
    },
    {
      id: 6,
      serviceName: "Pest Control",
      providerName: "Kiran Mehta",
      category: "Pest Control",
      date: "2025-10-10",
      time: "03:00 PM",
      status: "completed",
      amount: "₹1,800",
      rating: 4,
      address: "Katargam, Surat"
    },
    {
      id: 7,
      serviceName: "Washing Machine Repair",
      providerName: "Anil Kumar",
      category: "Appliance Repair",
      date: "2025-10-05",
      time: "01:00 PM",
      status: "completed",
      amount: "₹900",
      rating: 5,
      address: "Katargam, Surat"
    }
  ];

  const filteredHistory = activeTab === 'all' 
    ? bookingHistory 
    : bookingHistory.filter(booking => booking.status === activeTab);

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold">Customer Profile</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Profile Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <img 
                src={profile.profileImage} 
                alt={profile.name}
                className="w-32 h-32 rounded-full border-4 border-blue-500"
              />
            </div>

            {/* Profile Details */}
            <div className="flex-grow">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">{profile.name}</h2>
                  <p className="text-blue-600 font-medium flex items-center gap-2 mt-1">
                    <User className="w-4 h-4" />
                    Customer
                  </p>
                </div>
                <div className="mt-2 md:mt-0">
                  <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                    Member since {profile.joinedDate}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 text-gray-700">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <span>{profile.mobile}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span>{profile.email}</span>
                </div>
                <div className="flex items-start gap-3 text-gray-700 md:col-span-2">
                  <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span>{profile.address}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex gap-6 mt-6 pt-6 border-t">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{profile.totalBookings}</p>
                  <p className="text-sm text-gray-600">Total Bookings</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{profile.completedBookings}</p>
                  <p className="text-sm text-gray-600">Completed</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">
                    {profile.totalBookings - profile.completedBookings}
                  </p>
                  <p className="text-sm text-gray-600">Pending/Cancelled</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking History Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Booking History</h3>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6 border-b">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'all'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              All ({bookingHistory.length})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'completed'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Completed ({bookingHistory.filter(b => b.status === 'completed').length})
            </button>
            <button
              onClick={() => setActiveTab('pending')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'pending'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Pending ({bookingHistory.filter(b => b.status === 'pending').length})
            </button>
            <button
              onClick={() => setActiveTab('cancelled')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'cancelled'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Cancelled ({bookingHistory.filter(b => b.status === 'cancelled').length})
            </button>
          </div>

          {/* Booking Cards */}
          <div className="space-y-4">
            {filteredHistory.map((booking) => (
              <div key={booking.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-grow">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800">{booking.serviceName}</h4>
                        <p className="text-gray-600">Provider: {booking.providerName}</p>
                        <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs mt-1">
                          {booking.category}
                        </span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getStatusColor(booking.status)}`}>
                        {getStatusIcon(booking.status)}
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(booking.date).toLocaleDateString('en-IN', { 
                          day: 'numeric', 
                          month: 'short', 
                          year: 'numeric' 
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
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="text-sm text-gray-600 ml-1">({booking.rating}/5)</span>
                      </div>
                    )}

                    {booking.status === 'pending' && (
                      <div className="mt-3 flex gap-2">
                        <button className="px-4 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors">
                          Cancel Booking
                        </button>
                        <button className="px-4 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300 transition-colors">
                          Reschedule
                        </button>
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