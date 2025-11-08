import React, { useState } from "react";
import { Bell, CheckCircle, Clock, XCircle, Info, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Service Request",
      message: "You have received a new plumbing request from Yash Gondaliya.",
      type: "new",
      time: "10 mins ago",
      isRead: false,
    },
    {
      id: 2,
      title: "Request Accepted",
      message: "You successfully accepted the AC Servicing request from Mina Desai.",
      type: "success",
      time: "1 hour ago",
      isRead: true,
    },
    {
      id: 3,
      title: "Payment Received",
      message: "₹1,200 has been credited for the completed job ‘Kitchen Sink Repair’.",
      type: "success",
      time: "Yesterday, 6:45 PM",
      isRead: true,
    },
    {
      id: 4,
      title: "Customer Cancelled",
      message: "A customer cancelled their booking for ‘Painting Work’.",
      type: "cancelled",
      time: "2 days ago",
      isRead: false,
    },
    {
      id: 5,
      title: "Profile Reminder",
      message: "Update your service profile to attract more bookings.",
      type: "info",
      time: "3 days ago",
      isRead: false,
    },
  ]);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "new":
        return <Bell className="text-blue-600" size={18} />;
      case "success":
        return <CheckCircle className="text-green-600" size={18} />;
      case "cancelled":
        return <XCircle className="text-red-600" size={18} />;
      default:
        return <Info className="text-yellow-500" size={18} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-[Poppins]">
      {/* ===== Header ===== */}
      <header className="bg-white shadow-md sticky top-0 z-20 flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <Link to="/dashboard">
            <ArrowLeft className="text-gray-600 hover:text-blue-600 cursor-pointer" />
          </Link>
          <h2 className="text-xl font-semibold text-gray-800">Notifications</h2>
        </div>
        <button
          onClick={markAllAsRead}
          className="text-blue-600 text-sm font-medium hover:underline"
        >
          Mark all as read
        </button>
      </header>

      {/* ===== Notification List ===== */}
      <main className="max-w-3xl mx-auto p-6">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <Bell size={48} className="text-gray-400 mb-3" />
            <p className="text-lg font-medium">No new notifications</p>
            <p className="text-sm text-gray-400">
              You’re all caught up! Check back later.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((note) => (
              <div
                key={note.id}
                className={`flex items-start gap-4 p-4 rounded-xl shadow-sm transition-all ${
                  note.isRead
                    ? "bg-white"
                    : "bg-blue-50 border border-blue-100"
                } hover:shadow-md`}
              >
                <div className="p-2 bg-white rounded-full shadow-sm flex items-center justify-center">
                  {getIcon(note.type)}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{note.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{note.message}</p>
                  <p className="text-xs text-gray-400 flex items-center gap-1 mt-2">
                    <Clock size={12} /> {note.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
