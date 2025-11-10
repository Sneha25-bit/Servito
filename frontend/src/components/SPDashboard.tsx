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
  X,
  CheckCircle,
} from "lucide-react";

const SPDashboard = () => {
  const [activeTab, setActiveTab] = useState("tenders");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [requests, setRequests] = useState<any[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);


  // Fetch data
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
    const interval = setInterval(fetchData, 4000); // auto-refresh every 4s
    return () => clearInterval(interval);
  }, []);

  const handleAccept = (requestId: string) => {
    console.log("Accepted request ID:", requestId);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
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
          <Menu className="icon menu cursor-pointer" onClick={() => setMenuOpen(!menuOpen)} />
            <h1 className="logo">ServitoBid</h1>
            <span className="subtitle">Service Provider Portal</span>
          </div>
          <div className="header-right">
            <div className="search-box">
              <Search className="icon search-icon" />
              <input type="text" placeholder="Search requests..." />
            </div>
          
            <a href="/notifications"><Bell className="icon bell cursor-pointer text-blue-600" /></a>
            <div className="profile-mini">
              <div className="profile-avatar">
                <a href="/sp-profile"><User className="icon user cursor-pointer text-blue-600" /></a>
              </div>
              <span className="profile-name">Service Provider</span>
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
        </div>

        {/* Filter + Cards */}
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
                      <button
                        onClick={() => handleAccept(req._id)}
                        className="btn blue full"
                      >
                        Accept Request
                      </button>
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

      {/* View Details Modal */}
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
            <p className="text-gray-700 mb-2">
              <strong>Service Type:</strong> {selectedRequest.serviceType}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Email:</strong> {selectedRequest.email}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Phone:</strong> {selectedRequest.phone}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Address:</strong> {selectedRequest.address}
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Description:</strong> {selectedRequest.description}
            </p>
            <button
              className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-semibold transition"
              onClick={() => setSelectedRequest(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Toast Message */}
      {showToast && (
        <div className="toast">
          <CheckCircle className="text-white mr-2" />
          <span>Request Accepted Successfully!</span>
        </div>
      )}
{menuOpen && (
  <div className="sidebar">
    <button className="close-sidebar" onClick={() => setMenuOpen(false)}>×</button>
    <h3 className="sidebar-title">Quick Menu</h3>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/features">Features</a></li>
      <li><a href="/how-it-works">How It Works</a></li>
      <li><a href="/contact">Contact Us</a></li>
    </ul>
  </div>
)}

      {/* Styling */}
      <style>{`
  /* ========= Base Dashboard ========= */
  .dashboard { 
    background: #f8fafc; 
    min-height: 100vh; 
    font-family: 'Poppins', sans-serif; 
  }

  /* ========= Header ========= */
  .header { 
    background: #fff; 
    box-shadow: 0 1px 5px rgba(0,0,0,0.05); 
    position: sticky; 
    top: 0; 
    z-index: 20; 
  }
  .header-inner { 
    max-width: 1200px; 
    margin: 0 auto; 
    padding: 18px 22px; 
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
  }
  .header-left { display: flex; align-items: center; gap: 12px; }
  .logo { color: #2563eb; font-size: 1.6rem; font-weight: 700; }
  .subtitle { color: #64748b; font-size: 0.9rem; }
  .header-right { display: flex; align-items: center; gap: 20px; }
  .search-box { position: relative; display: flex; align-items: center; }
  .search-box input { 
    padding: 8px 14px 8px 34px; 
    border: 1px solid #e2e8f0; 
    border-radius: 8px; 
    background: #f9fafb; 
    outline: none; 
    width: 200px; 
    transition: 0.2s;
  }
  .search-box input:focus { 
    border-color: #60a5fa; 
    background: #fff; 
  }
  .search-icon { position: absolute; left: 10px; color: #94a3b8; }

  /* ========= Tabs ========= */
  .container { max-width: 1200px; margin: 0 auto; padding: 32px 20px; }
  .tabs { 
    display: flex; 
    border-bottom: 2px solid #e2e8f0; 
    background: #fff; 
    border-radius: 10px; 
    overflow: hidden; 
    margin-bottom: 28px; 
  }
  .tab { 
    padding: 14px 26px; 
    font-weight: 500; 
    background: none; 
    border: none; 
    cursor: pointer; 
    color: #64748b; 
    transition: 0.2s; 
  }
  .tab:hover { background: #f1f5f9; }
  .tab.active { color: #2563eb; border-bottom: 2px solid #2563eb; }

  /* ========= Filter Section ========= */
  .filter-card { 
    background: #fff; 
    border-radius: 12px; 
    box-shadow: 0 1px 5px rgba(0,0,0,0.06); 
    padding: 18px 24px; 
    margin-bottom: 28px; 
  }
  .filter-header { 
    display: flex; 
    align-items: center; 
    gap: 10px; 
    font-weight: 600; 
    color: #334155; 
  }
  .category-list { 
    display: flex; 
    flex-wrap: wrap; 
    gap: 10px; 
    margin-top: 12px; 
  }
  .category-btn { 
    padding: 8px 18px; 
    border-radius: 9999px; 
    background: #f1f5f9; 
    color: #334155; 
    border: 1px solid #e2e8f0; 
    font-size: 0.875rem; 
    font-weight: 500; 
    transition: all 0.2s ease; 
  }
  .category-btn:hover { background: #e2e8f0; }
  .category-btn.selected { background: #2563eb; color: #fff; border-color: #2563eb; }

  /* ========= Cards (Requests) ========= */
  .tenders-grid { 
    display: grid; 
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); 
    gap: 20px; 
  }
  .card { 
    background: #fff; 
    border-radius: 14px; 
    box-shadow: 0 2px 10px rgba(0,0,0,0.05); 
    padding: 22px; 
    transition: 0.25s ease; 
  }
  .card:hover { 
    transform: translateY(-3px); 
    box-shadow: 0 6px 16px rgba(0,0,0,0.08); 
  }
  .card-header { 
    display: flex; 
    justify-content: space-between; 
    align-items: start; 
    margin-bottom: 8px; 
  }
  .tag { 
    background: #dbeafe; 
    color: #1d4ed8; 
    font-size: 0.75rem; 
    padding: 4px 10px; 
    border-radius: 9999px; 
    font-weight: 600; 
    text-transform: capitalize;
  }
  .card h3 { 
    font-size: 1.05rem; 
    font-weight: 600; 
    color: #0f172a; 
    margin-top: 6px; 
  }
  .desc { 
    color: #475569; 
    font-size: 0.9rem; 
    margin-bottom: 12px; 
    line-height: 1.5; 
  }
    .desc-space {
  height: 16px;
}

  .card-details { 
    display: flex; 
    flex-direction: column; 
    gap: 6px; 
    color: #475569; 
    font-size: 0.875rem; 
    margin-bottom: 12px; 
  }
  .card-details div { 
    display: flex; 
    align-items: center; 
    gap: 6px; 
  }

  /* ========= Buttons ========= */
  .btn { 
    padding: 10px 16px; 
    border-radius: 8px; 
    font-weight: 500; 
    cursor: pointer; 
    transition: all 0.2s ease; 
    display: flex; 
    align-items: center; 
    justify-content: center; 
  }
  .btn.blue { 
    background: #2563eb; 
    color: white; 
  }
  .btn.blue:hover { background: #1d4ed8; box-shadow: 0 4px 10px rgba(37,99,235,0.25); }
  .btn.outline { 
    border: 1.5px solid #2563eb; 
    color: #2563eb; 
    background: transparent; 
  }
  .btn.outline:hover { background: #eff6ff; }
  .card-actions { 
    display: flex; 
    justify-content: space-between; 
    gap: 12px; 
    margin-top: 8px;
  }

  /* ========= Modal ========= */
  .modal { 
    position: fixed; 
    inset: 0; 
    background: rgba(0,0,0,0.5); 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    z-index: 50; 
    backdrop-filter: blur(3px);
  }
  .modal-content { 
    background: #fff; 
    border-radius: 18px; 
    padding: 2rem; 
    width: 420px; 
    position: relative; 
    box-shadow: 0 10px 25px rgba(0,0,0,0.2); 
    animation: popup 0.3s ease; 
  }
  @keyframes popup {
    from { transform: scale(0.9); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }

  /* ========= Toast ========= */
  .toast { 
    position: fixed; 
    bottom: 25px; 
    right: 25px; 
    background: #16a34a; 
    color: white; 
    padding: 14px 22px; 
    border-radius: 10px; 
    display: flex; 
    align-items: center; 
    gap: 8px; 
    box-shadow: 0 4px 12px rgba(0,0,0,0.25); 
    font-weight: 500; 
    animation: fadein 0.3s ease; 
  }
  @keyframes fadein { 
    from { opacity: 0; transform: translateY(10px); } 
    to { opacity: 1; transform: translateY(0); } 
  }

  .sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 240px;
  height: 100vh;
  background: #ffffff;
  box-shadow: 2px 0 10px rgba(0,0,0,0.1);
  padding: 1.5rem;
  z-index: 100;
  animation: slideIn 0.3s ease;
}
@keyframes slideIn {
  from { transform: translateX(-100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}
.sidebar-title {
  font-weight: 600;
  color: #1e3a8a;
  margin-bottom: 1rem;
}
.sidebar ul {
  list-style: none;
  padding: 0;
}
.sidebar li {
  margin: 12px 0;
}
.sidebar a {
  color: #334155;
  text-decoration: none;
  font-weight: 500;
}
.sidebar a:hover {
  color: #2563eb;
}
.close-sidebar {
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

`}</style>

    </div>
  );
};

export default SPDashboard;