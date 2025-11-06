import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Bell,
  Search,
  Filter,
  User,
  LogOut,
  Menu,
  Star,
  MapPin,
  Calendar,
} from "lucide-react";

const SPDashboard = () => {
  const [activeTab, setActiveTab] = useState("tenders");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [requests, setRequests] = useState([]);

  // Fetch live data from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/requests")
      .then((res) => {
        setRequests(res.data.data || []);
      })
      .catch((err) => {
        console.error("❌ Error fetching data:", err);
      });
  }, []);

  const categories = [
    "All",
    "Electrical",
    "Plumbing",
    "Carpentry",
    "Painting",
    "HVAC",
    "Cleaning",
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      Pending: "status-pending",
      Accepted: "status-accepted",
      Rejected: "status-rejected",
      Completed: "status-finished",
    };
    return colors[status] || "status-default";
  };

  // Filter requests by category
  const filteredRequests =
    selectedCategory === "all"
      ? requests
      : requests.filter(
          (r) =>
            r.serviceType &&
            r.serviceType.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="header">
        <div className="header-inner">
          <div className="header-left">
            <Menu className="icon menu" />
            <h1 className="logo">ServitoBid</h1>
            <span className="subtitle">Service Provider Portal</span>
          </div>

          <div className="header-right">
            <div className="search-box">
              <Search className="icon search-icon" />
              <input type="text" placeholder="Search requests..." />
            </div>
            <Bell className="icon bell" />
            <div className="profile-mini">
              <div className="profile-avatar">
                <User className="icon user" />
              </div>
              <span className="profile-name">
                Service Provider
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="container">
        {/* Tabs */}
        <div className="tabs">
          <button
            className={`tab ${activeTab === "tenders" ? "active" : ""}`}
            onClick={() => setActiveTab("tenders")}
          >
            All Requests
          </button>
          <button
            className={`tab ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            Provider Profile
          </button>
        </div>

        {/* Requests Tab */}
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

            {/* Dynamic Requests */}
            <div className="tenders-grid">
              {filteredRequests.length === 0 ? (
                <p className="text-gray-500 text-center w-full">
                  No service requests available.
                </p>
              ) : (
                filteredRequests.map((req: any) => (
                  <div key={req._id} className="card">
                    <div className="card-header">
                      <div>
                        <span className="tag">{req.serviceType}</span>
                        <h3>{req.name}</h3>
                      </div>
                      <span className="price">{req.status}</span>
                    </div>

                    <p className="desc">{req.description}</p>

                    <div className="card-details">
                      <div>
                        <User className="icon-small" />
                        <span>{req.email}</span>
                      </div>
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
                      <button className="btn blue full">
                        Accept Request
                      </button>
                      <button className="btn outline">View Details</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {/* Provider Profile Tab */}
        {activeTab === "profile" && (
          <div className="text-center py-20 text-gray-500">
            <User className="mx-auto mb-4 w-10 h-10 text-sky-600" />
            <p>
              Logged in as <strong>Service Provider</strong>.
            </p>
            <p>All profile details can be fetched here later.</p>
          </div>
        )}
      </div>

      {/* Keep your entire CSS block as-is below */}
      <style>{`
        .dashboard { background: #f9fafb; min-height: 100vh; font-family: sans-serif; }
        .header { background: #fff; box-shadow: 0 1px 4px rgba(0,0,0,0.1); position: sticky; top: 0; z-index: 10; }
        .header-inner { max-width: 1200px; margin: 0 auto; padding: 16px; display: flex; justify-content: space-between; align-items: center; }
        .header-left { display: flex; align-items: center; gap: 12px; }
        .logo { color: #2563eb; font-size: 1.5rem; font-weight: 700; }
        .subtitle { color: #6b7280; font-size: 0.875rem; }
        .header-right { display: flex; align-items: center; gap: 16px; }
        .search-box { position: relative; display: flex; align-items: center; }
        .search-box input { padding: 8px 12px 8px 32px; border: 1px solid #d1d5db; border-radius: 8px; outline: none; }
        .search-icon { position: absolute; left: 8px; color: #9ca3af; }
        .icon { width: 24px; height: 24px; color: #4b5563; cursor: pointer; }
        .profile-mini { display: flex; align-items: center; gap: 8px; cursor: pointer; }
        .profile-avatar { width: 40px; height: 40px; background: #2563eb; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
        .profile-name { font-size: 0.875rem; font-weight: 500; }

        .container { max-width: 1200px; margin: 0 auto; padding: 24px; }
        .tabs { display: flex; border-bottom: 1px solid #e5e7eb; background: #fff; border-radius: 8px; margin: 24px 0; }
        .tab { padding: 16px 24px; font-weight: 500; border: none; background: none; cursor: pointer; color: #4b5563; transition: 0.2s; }
        .tab.active { color: #2563eb; border-bottom: 2px solid #2563eb; }

        .filter-card { background: #fff; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); padding: 16px; margin-bottom: 24px; }
        .filter-header { display: flex; align-items: center; gap: 8px; }
        .category-list { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }
        .category-btn { padding: 8px 16px; border-radius: 9999px; background: #f3f4f6; color: #374151; cursor: pointer; }
        .category-btn:hover { background: #e5e7eb; }
        .category-btn.selected { background: #2563eb; color: #fff; }

        .tenders-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px; }
        .card { background: #fff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); padding: 16px; transition: 0.2s; }
        .card:hover { box-shadow: 0 4px 8px rgba(0,0,0,0.15); }
        .card-header { display: flex; justify-content: space-between; align-items: start; }
        .tag { display: inline-block; background: #dbeafe; color: #1e3a8a; font-size: 0.75rem; font-weight: 600; padding: 4px 8px; border-radius: 9999px; margin-bottom: 4px; }
        .price { color: #2563eb; font-weight: 700; font-size: 1.25rem; }
        .desc { color: #4b5563; margin-bottom: 8px; }
        .card-details { display: flex; flex-direction: column; gap: 4px; color: #4b5563; font-size: 0.875rem; margin-bottom: 8px; }
        .card-details div { display: flex; align-items: center; gap: 4px; }
        .card-actions { display: flex; gap: 8px; }

        .status { display: inline-block; padding: 4px 8px; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; }
        .status-pending { background: #fef9c3; color: #854d0e; }
        .status-accepted { background: #dbeafe; color: #1e3a8a; }
        .status-rejected { background: #fee2e2; color: #991b1b; }
        .status-finished { background: #dcfce7; color: #166534; }
      `}</style>
    </div>
  );
};

export default SPDashboard;
