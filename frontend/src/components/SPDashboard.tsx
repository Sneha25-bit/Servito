import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Bell,
  Search,
  Filter,
  User,
  Menu,
  MapPin,
  Calendar,
  X,
  CheckCircle
} from "lucide-react";
import "./SPDashboard.css";

interface ServiceRequest {
  _id: string;
  customer?: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  address: string;
  description: string;
  status: "Pending" | "Accepted" | "In Progress" | "Completed";
  createdAt: string;
  updatedAt: string;
}

const SPDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("tenders");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // 🔹 Fetch data periodically
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/requests");
        setRequests(res.data.data || []);
      } catch (err) {
        console.error("Error fetching requests:", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 4000);
    return () => clearInterval(interval);
  }, []);


  // 🔹 Update status to "In Progress" when accepted
  const handleAccept = async (requestId: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/requests/${requestId}`,
        { status: "In Progress" },
      {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ include token
    },
  }
);

      // Update UI immediately
      setRequests((prev) =>
        prev.map((r) =>
          r._id === requestId ? { ...r, status: "In Progress" } : r
        )
      );

      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
    } catch (err) {
      console.error("Error accepting request:", err);
    }
  };

  const categories = [
    "All",
    "Electrical",
    "Plumbing",
    "Carpentry",
    "Painting",
    "HVAC",
    "Cleaning",
  ];

  const filteredRequests =
    selectedCategory === "all"
      ? requests
      : requests.filter(
          (r) =>
            r.serviceType &&
            r.serviceType.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <div className="dashboard relative">
      {/* Header */}
      <header className="header">
        <div className="header-inner">
          <div className="header-left">
            <Menu
              className="icon menu cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
            />
            <h1 className="logo">ServitoBid</h1>
            <span className="subtitle">Service Provider Portal</span>
          </div>
          <div className="header-right">
            <div className="search-box">
              <Search className="icon search-icon" />
              <input type="text" placeholder="Search requests..." />
            </div>
            <a href="/notifications">
              <Bell className="icon bell cursor-pointer text-blue-600" />
            </a>
            <div className="profile-mini">
              <div className="profile-avatar">
                <a href="/sp-profile">
                  <User className="icon user cursor-pointer text-blue-600" />
                </a>
              </div>
              <span className="profile-name">Service Provider</span>
            </div>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="container">
        <div className="tabs">
          <button
            className={`tab ${activeTab === "tenders" ? "active" : ""}`}
            onClick={() => setActiveTab("tenders")}
          >
            All Requests
          </button>
        </div>

        {activeTab === "tenders" && (
          <>
            <div className="filter-card">
              <div className="filter-header">
                <Filter className="icon-small" />
                <h3>Filter by Category</h3>
              </div>
              <div className="category-list">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`category-btn ${
                      selectedCategory === cat.toLowerCase() ? "selected" : ""
                    }`}
                    onClick={() => setSelectedCategory(cat.toLowerCase())}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="tenders-grid">
              {filteredRequests.length === 0 ? (
                <p className="text-gray-500 text-center w-full">
                  No service requests available.
                </p>
              ) : (
                filteredRequests.map((req) => (
                  <div key={req._id} className="card">
                    <div className="card-header">
                      <div>
                        <span className="tag">{req.serviceType}</span>
                        <h3>{req.name}</h3>
                      </div>
                      <span className="price">{req.status}</span>
                    </div>

                    <div className="desc-space"></div>

                    <div className="card-details">
                      <div>
                        <MapPin className="icon-small" />
                        <span>{req.address}</span>
                      </div>
                      <div>
                        <Calendar className="icon-small" />
                        <span>
                          {new Date(req.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="card-actions">
                      {/* 🔹 Only show button if status is Pending */}
                      {req.status === "Pending" && (
                        <button
                          onClick={() => handleAccept(req._id)}
                          className="btn blue full"
                        >
                          Accept Request
                        </button>
                      )}

                      <button
                        onClick={() => setSelectedRequest(req)}
                        className="btn outline"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>

      {/* Modal */}
      {selectedRequest && (
        <div className="modal">
          <div className="modal-content">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              onClick={() => setSelectedRequest(null)}
            >
              <X size={20} />
            </button>
            <h2 className="text-2xl font-bold mb-4 text-sky-600">
              {selectedRequest.name}
            </h2>
            <p><strong>Service Type:</strong> {selectedRequest.serviceType}</p>
            <p><strong>Email:</strong> {selectedRequest.email}</p>
            <p><strong>Phone:</strong> {selectedRequest.phone}</p>
            <p><strong>Address:</strong> {selectedRequest.address}</p>
            <p><strong>Description:</strong> {selectedRequest.description}</p>
            <button
              className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-semibold transition mt-4"
              onClick={() => setSelectedRequest(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Toast */}
      {showToast && (
        <div className="toast">
          <CheckCircle className="text-white mr-2" />
          <span>Status updated to “In Progress”!</span>
        </div>
      )}

      {/* Sidebar */}
      {menuOpen && (
        <div className="sidebar">
          <button className="close-sidebar" onClick={() => setMenuOpen(false)}>
            ×
          </button>
          <h3 className="sidebar-title">Quick Menu</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/features">Features</a></li>
            <li><a href="/how-it-works">How It Works</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SPDashboard;
