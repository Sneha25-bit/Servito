import React, { useState } from "react";
import {
  Bell,
  Search,
  Filter,
  User,
  LogOut,
  Menu,
  Star,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Clock,
  MessageSquare,
} from "lucide-react";

const SPDashboard = () => {
  const [activeTab, setActiveTab] = useState("tenders");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const spProfile = {
    name: "SVNIT Stationary",
    spId: "SP12345",
    rating: 4.5,
    completedTasks: 1286,
    category: "Stationary",
    adharNo: "XXXX-XXXX-1234",
    education: "Bachelor's Degree",
    experience: "5 years",
    orgName: "SVNIT Supplies Ltd",
  };

  const tenders = [
    {
      id: 1,
      title: "Office Supplies Procurement",
      customer: "ABC Corporation",
      category: "Electrical",
      description:
        "Need bulk office supplies including notebooks, pens, and folders for corporate office.",
      budget: "₹50,000",
      deadline: "2025-10-15",
      location: "Mumbai, Maharashtra",
    },
    {
      id: 2,
      title: "Plumbing Service Required",
      customer: "XYZ Apartments",
      category: "Plumbing",
      description:
        "Urgent plumbing work needed for residential complex. Must fix leaking pipes and install new fixtures.",
      budget: "₹30,000",
      deadline: "2025-10-12",
      location: "Surat, Gujarat",
    },
  ];

  const myRequests = [
    {
      id: 1,
      commissionName: "Stationary Supply - ABC Corp",
      status: "Pending",
      customer: "ABC Corporation",
      price: "₹45,000",
      issueDate: "2025-10-05",
      completionDate: "-",
      rating: null,
      note: "Waiting for customer approval",
    },
  ];

  const categories = [
    "All",
    "Electrical",
    "Plumbing",
    "Electronics",
    "Child Care",
    "Cleaning",
  ];

  const getStatusColor = (status) => {
    const colors = {
      Pending: "status-pending",
      Accepted: "status-accepted",
      Rejected: "status-rejected",
      Finished: "status-finished",
    };
    return colors[status] || "status-default";
  };

  const filteredTenders =
    selectedCategory === "all"
      ? tenders
      : tenders.filter(
          (t) => t.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <div className="dashboard">
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
              <input type="text" placeholder="Search tenders..." />
            </div>
            <Bell className="icon bell" />
            <div className="profile-mini">
              <div className="profile-avatar">
                <User className="icon user" />
              </div>
              <span className="profile-name">{spProfile.name}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container">
        <div className="profile-summary">
          <div className="profile-left">
            <div className="profile-avatar-large">
              <User className="icon-large" />
            </div>
            <div className="profile-info">
              <h2>{spProfile.name}</h2>
              <p>SP ID: {spProfile.spId}</p>
              <div className="profile-stats">
                <div className="rating">
                  <Star className="star-filled" />
                  <span>{spProfile.rating}</span>
                </div>
                <span className="divider">|</span>
                <span>{spProfile.completedTasks} Tasks Completed</span>
              </div>
            </div>
          </div>
          <div className="profile-buttons">
            <button className="btn white">My Profile</button>
            <button className="btn blue">
              <LogOut className="icon-small" /> Logout
            </button>
          </div>
        </div>

        <div className="tabs">
          <button
            className={`tab ${activeTab === "tenders" ? "active" : ""}`}
            onClick={() => setActiveTab("tenders")}
          >
            Available Tenders
          </button>
          <button
            className={`tab ${activeTab === "requests" ? "active" : ""}`}
            onClick={() => setActiveTab("requests")}
          >
            My Requests
          </button>
          <button
            className={`tab ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            Profile Details
          </button>
        </div>

        {activeTab === "tenders" && (
          <div>
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
              {filteredTenders.map((tender) => (
                <div className="card" key={tender.id}>
                  <div className="card-header">
                    <div>
                      <span className="tag">{tender.category}</span>
                      <h3>{tender.title}</h3>
                    </div>
                    <span className="price">{tender.budget}</span>
                  </div>
                  <p className="desc">{tender.description}</p>
                  <div className="card-details">
                    <div>
                      <User className="icon-small" />
                      <span>{tender.customer}</span>
                    </div>
                    <div>
                      <MapPin className="icon-small" />
                      <span>{tender.location}</span>
                    </div>
                    <div>
                      <Calendar className="icon-small" />
                      <span>{tender.deadline}</span>
                    </div>
                  </div>
                  <div className="card-actions">
                    <button className="btn blue full">Submit Bid</button>
                    <button className="btn outline">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "requests" && (
          <div className="requests">
            {myRequests.map((request) => (
              <div className="card" key={request.id}>
                <div className="request-header">
                  <div>
                    <h3>{request.commissionName}</h3>
                    <span className={`status ${getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                  </div>
                  <div className="request-price">
                    <div className="price">{request.price}</div>
                    {request.rating && (
                      <div className="rating">
                        <Star className="star-filled" />
                        <span>{request.rating}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>
        {`
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
          .profile-summary { background: linear-gradient(to right, #3b82f6, #2563eb); color: #fff; border-radius: 16px; padding: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; }
          .profile-left { display: flex; align-items: center; gap: 16px; }
          .profile-avatar-large { width: 80px; height: 80px; background: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
          .icon-large { color: #2563eb; width: 48px; height: 48px; }
          .profile-info h2 { font-size: 1.5rem; margin: 0; }
          .profile-stats { display: flex; align-items: center; gap: 8px; margin-top: 8px; }
          .rating { display: flex; align-items: center; gap: 4px; }
          .star-filled { color: #facc15; fill: #facc15; }
          .divider { color: #bfdbfe; }
          .profile-buttons { display: flex; gap: 8px; }

          .btn { padding: 8px 16px; border-radius: 8px; font-weight: 500; cursor: pointer; transition: 0.2s; display: flex; align-items: center; justify-content: center; gap: 6px; }
          .btn.white { background: #fff; color: #2563eb; }
          .btn.white:hover { background: #f0f9ff; }
          .btn.blue { background: #1d4ed8; color: #fff; }
          .btn.blue:hover { background: #1e40af; }
          .btn.outline { border: 1px solid #2563eb; color: #2563eb; background: transparent; }
          .btn.outline:hover { background: #eff6ff; }
          .btn.full { flex: 1; }

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
        `}
      </style>
    </div>
  );
};

export default SPDashboard;
