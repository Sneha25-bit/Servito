// import React, { useState } from "react";
// import {
//   Bell,
//   Search,
//   Filter,
//   User,
//   LogOut,
//   Menu,
//   Star,
//   MapPin,
//   Phone,
//   Mail,
//   Calendar,
//   Clock,
//   MessageSquare,
// } from "lucide-react";

// const SPDashboard = () => {
//   const [activeTab, setActiveTab] = useState("tenders");
//   const [selectedCategory, setSelectedCategory] = useState("all");

//   const spProfile = {
//     name: "SVNIT Stationary",
//     spId: "SP12345",
//     rating: 4.5,
//     completedTasks: 1286,
//     category: "Stationary",
//     adharNo: "XXXX-XXXX-1234",
//     education: "Bachelor's Degree",
//     experience: "5 years",
//     orgName: "SVNIT Supplies Ltd",
//   };

//   const tenders = [
//     {
//       id: 1,
//       title: "Office Supplies Procurement",
//       customer: "ABC Corporation",
//       category: "Electrical",
//       description:
//         "Need bulk office supplies including notebooks, pens, and folders for corporate office.",
//       budget: "₹50,000",
//       deadline: "2025-10-15",
//       location: "Mumbai, Maharashtra",
//     },
//     {
//       id: 2,
//       title: "Plumbing Service Required",
//       customer: "XYZ Apartments",
//       category: "Plumbing",
//       description:
//         "Urgent plumbing work needed for residential complex. Must fix leaking pipes and install new fixtures.",
//       budget: "₹30,000",
//       deadline: "2025-10-12",
//       location: "Surat, Gujarat",
//     },
//   ];

//   const myRequests = [
//     {
//       id: 1,
//       commissionName: "Stationary Supply - ABC Corp",
//       status: "Pending",
//       customer: "ABC Corporation",
//       price: "₹45,000",
//       issueDate: "2025-10-05",
//       completionDate: "-",
//       rating: null,
//       note: "Waiting for customer approval",
//     },
//   ];

//   const categories = [
//     "All",
//     "Electrical",
//     "Plumbing",
//     "Electronics",
//     "Child Care",
//     "Cleaning",
//   ];

//   const getStatusColor = (status) => {
//     const colors = {
//       Pending: "status-pending",
//       Accepted: "status-accepted",
//       Rejected: "status-rejected",
//       Finished: "status-finished",
//     };
//     return colors[status] || "status-default";
//   };

//   const filteredTenders =
//     selectedCategory === "all"
//       ? tenders
//       : tenders.filter(
//           (t) => t.category.toLowerCase() === selectedCategory.toLowerCase()
//         );

//   return (
//     <div className="dashboard">
//       <header className="header">
//         <div className="header-inner">
//           <div className="header-left">
//             <Menu className="icon menu" />
//             <h1 className="logo">ServitoBid</h1>
//             <span className="subtitle">Service Provider Portal</span>
//           </div>
//           <div className="header-right">
//             <div className="search-box">
//               <Search className="icon search-icon" />
//               <input type="text" placeholder="Search tenders..." />
//             </div>
//             <Bell className="icon bell" />
//             <div className="profile-mini">
//               <div className="profile-avatar">
//                 <User className="icon user" />
//               </div>
//               <span className="profile-name">{spProfile.name}</span>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="container">
//         <div className="profile-summary">
//           <div className="profile-left">
//             <div className="profile-avatar-large">
//               <User className="icon-large" />
//             </div>
//             <div className="profile-info">
//               <h2>{spProfile.name}</h2>
//               <p>SP ID: {spProfile.spId}</p>
//               <div className="profile-stats">
//                 <div className="rating">
//                   <Star className="star-filled" />
//                   <span>{spProfile.rating}</span>
//                 </div>
//                 <span className="divider">|</span>
//                 <span>{spProfile.completedTasks} Tasks Completed</span>
//               </div>
//             </div>
//           </div>
//           <div className="profile-buttons">
//             <button className="btn white">My Profile</button>
//             <button className="btn blue">
//               <LogOut className="icon-small" /> Logout
//             </button>
//           </div>
//         </div>

//         <div className="tabs">
//           <button
//             className={`tab ${activeTab === "tenders" ? "active" : ""}`}
//             onClick={() => setActiveTab("tenders")}
//           >
//             Available Tenders
//           </button>
//           <button
//             className={`tab ${activeTab === "requests" ? "active" : ""}`}
//             onClick={() => setActiveTab("requests")}
//           >
//             My Requests
//           </button>
//           <button
//             className={`tab ${activeTab === "profile" ? "active" : ""}`}
//             onClick={() => setActiveTab("profile")}
//           >
//             Profile Details
//           </button>
//         </div>

//         {activeTab === "tenders" && (
//           <div>
//             <div className="filter-card">
//               <div className="filter-header">
//                 <Filter className="icon-small" />
//                 <h3>Filter by Category</h3>
//               </div>
//               <div className="category-list">
//                 {categories.map((cat) => (
//                   <button
//                     key={cat}
//                     className={`category-btn ${
//                       selectedCategory === cat.toLowerCase() ? "selected" : ""
//                     }`}
//                     onClick={() => setSelectedCategory(cat.toLowerCase())}
//                   >
//                     {cat}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div className="tenders-grid">
//               {filteredTenders.map((tender) => (
//                 <div className="card" key={tender.id}>
//                   <div className="card-header">
//                     <div>
//                       <span className="tag">{tender.category}</span>
//                       <h3>{tender.title}</h3>
//                     </div>
//                     <span className="price">{tender.budget}</span>
//                   </div>
//                   <p className="desc">{tender.description}</p>
//                   <div className="card-details">
//                     <div>
//                       <User className="icon-small" />
//                       <span>{tender.customer}</span>
//                     </div>
//                     <div>
//                       <MapPin className="icon-small" />
//                       <span>{tender.location}</span>
//                     </div>
//                     <div>
//                       <Calendar className="icon-small" />
//                       <span>{tender.deadline}</span>
//                     </div>
//                   </div>
//                   <div className="card-actions">
//                     <button className="btn blue full">Submit Bid</button>
//                     <button className="btn outline">View Details</button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {activeTab === "requests" && (
//           <div className="requests">
//             {myRequests.map((request) => (
//               <div className="card" key={request.id}>
//                 <div className="request-header">
//                   <div>
//                     <h3>{request.commissionName}</h3>
//                     <span className={`status ${getStatusColor(request.status)}`}>
//                       {request.status}
//                     </span>
//                   </div>
//                   <div className="request-price">
//                     <div className="price">{request.price}</div>
//                     {request.rating && (
//                       <div className="rating">
//                         <Star className="star-filled" />
//                         <span>{request.rating}</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       <style>
//         {`
        //   .dashboard { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        //   .header { background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px); box-shadow: 0 4px 6px rgba(0,0,0,0.1); position: sticky; top: 0; z-index: 10; }
        //   .header-inner { max-width: 1200px; margin: 0 auto; padding: 16px; display: flex; justify-content: space-between; align-items: center; }
        //   .header-left { display: flex; align-items: center; gap: 12px; }
        //   .logo { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 1.5rem; font-weight: 700; }
        //   .subtitle { color: #6b7280; font-size: 0.875rem; }
        //   .header-right { display: flex; align-items: center; gap: 16px; }
        //   .search-box { position: relative; display: flex; align-items: center; }
        //   .search-box input { padding: 8px 12px 8px 32px; border: 2px solid #e0e7ff; border-radius: 12px; outline: none; transition: all 0.3s; }
        //   .search-box input:focus { border-color: #667eea; box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1); }
        //   .search-icon { position: absolute; left: 8px; color: #667eea; }
        //   .icon { width: 24px; height: 24px; color: #667eea; cursor: pointer; transition: transform 0.2s; }
        //   .icon:hover { transform: scale(1.1); }
        //   .profile-mini { display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 6px 12px; border-radius: 12px; transition: background 0.3s; }
        //   .profile-mini:hover { background: #f3f4f6; }
        //   .profile-avatar { width: 40px; height: 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3); }
        //   .profile-name { font-size: 0.875rem; font-weight: 600; color: #1f2937; }

        //   .container { max-width: 1200px; margin: 0 auto; padding: 24px; }
        //   .profile-summary { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #fff; border-radius: 20px; padding: 32px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3); }
        //   .profile-left { display: flex; align-items: center; gap: 16px; }
        //   .profile-avatar-large { width: 80px; height: 80px; background: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); }
        //   .icon-large { color: #667eea; width: 48px; height: 48px; }
        //   .profile-info h2 { font-size: 1.5rem; margin: 0; }
        //   .profile-stats { display: flex; align-items: center; gap: 8px; margin-top: 8px; }
        //   .rating { display: flex; align-items: center; gap: 4px; background: rgba(255, 255, 255, 0.2); padding: 4px 10px; border-radius: 12px; }
        //   .star-filled { color: #fbbf24; fill: #fbbf24; }
        //   .divider { color: rgba(255, 255, 255, 0.5); }
        //   .profile-buttons { display: flex; gap: 8px; }

        //   .btn { padding: 10px 20px; border-radius: 12px; font-weight: 600; cursor: pointer; transition: all 0.3s; display: flex; align-items: center; justify-content: center; gap: 6px; border: none; }
        //   .btn.white { background: #fff; color: #667eea; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); }
        //   .btn.white:hover { background: #f9fafb; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); }
        //   .btn.blue { background: rgba(255, 255, 255, 0.2); color: #fff; border: 2px solid rgba(255, 255, 255, 0.3); }
        //   .btn.blue:hover { background: rgba(255, 255, 255, 0.3); transform: translateY(-2px); }
        //   .btn.outline { border: 2px solid #667eea; color: #667eea; background: transparent; }
        //   .btn.outline:hover { background: #eff6ff; transform: translateY(-2px); }
        //   .btn.full { flex: 1; }

        //   .tabs { display: flex; border-bottom: 2px solid #e0e7ff; background: #fff; border-radius: 12px; margin: 24px 0; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
        //   .tab { padding: 16px 24px; font-weight: 600; border: none; background: none; cursor: pointer; color: #6b7280; transition: all 0.3s; position: relative; }
        //   .tab.active { color: #667eea; }
        //   .tab.active::after { content: ''; position: absolute; bottom: -2px; left: 0; right: 0; height: 3px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 3px 3px 0 0; }

        //   .filter-card { background: #fff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); padding: 20px; margin-bottom: 24px; }
        //   .filter-header { display: flex; align-items: center; gap: 8px; color: #667eea; font-weight: 600; }
        //   .category-list { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 12px; }
        //   .category-btn { padding: 10px 18px; border-radius: 20px; background: #f3f4f6; color: #374151; cursor: pointer; border: 2px solid transparent; transition: all 0.3s; font-weight: 500; }
        //   .category-btn:hover { background: #e5e7eb; transform: translateY(-1px); }
        //   .category-btn.selected { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #fff; border-color: #667eea; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3); }

        //   .tenders-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
        //   .card { background: #fff; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); padding: 20px; transition: all 0.3s; border: 1px solid #f0f0f0; }
        //   .card:hover { box-shadow: 0 8px 24px rgba(102, 126, 234, 0.15); transform: translateY(-4px); }
        //   .card-header { display: flex; justify-content: space-between; align-items: start; }
        //   .tag { display: inline-block; background: linear-gradient(135deg, #ddd6fe 0%, #e0e7ff 100%); color: #5b21b6; font-size: 0.75rem; font-weight: 700; padding: 6px 12px; border-radius: 20px; margin-bottom: 8px; }
        //   .price { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: 800; font-size: 1.25rem; }
        //   .desc { color: #4b5563; margin-bottom: 12px; line-height: 1.5; }
        //   .card-details { display: flex; flex-direction: column; gap: 6px; color: #6b7280; font-size: 0.875rem; margin-bottom: 12px; }
        //   .card-details div { display: flex; align-items: center; gap: 6px; }
        //   .card-details .icon-small { color: #667eea; width: 16px; height: 16px; }
        //   .card-actions { display: flex; gap: 10px; }

        //   .status { display: inline-block; padding: 6px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; }
        //   .status-pending { background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); color: #92400e; }
        //   .status-accepted { background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); color: #1e40af; }
        //   .status-rejected { background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%); color: #991b1b; }
        //   .status-finished { background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%); color: #065f46; }
          
        //   .icon-small { width: 16px; height: 16px; }
        //   .user { color: #fff; }
        //   .bell:hover { animation: ring 0.5s ease-in-out; }
        //   @keyframes ring { 0%, 100% { transform: rotate(0deg); } 25% { transform: rotate(15deg); } 75% { transform: rotate(-15deg); } }
        // `}
//       </style>
//     </div>
//   );
// };

// export default SPDashboard;
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
import { useNavigate } from "react-router-dom"; // 🟢 added for navigation

const SPDashboard = () => {
  const [activeTab, setActiveTab] = useState("tenders");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const navigate = useNavigate(); // 🟢 added for navigation instance

  // 🟢 optional logout handler for clarity
  const handleLogout = () => {
    // You can add logout logic here (like clearing tokens)
    navigate("/"); // Redirect to home page after logout
  };

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
            {/* 🟢 added navigation to MyProfile page */}
            <button
              className="btn white"
              onClick={() => navigate("/myprofile")}
            >
              My Profile
            </button>

            {/* 🟢 updated Logout button to navigate home */}
            <button className="btn blue" onClick={handleLogout}>
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
                    <span
                      className={`status ${getStatusColor(request.status)}`}
                    >
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

      {/* ✅ Your entire original CSS kept untouched */}
      <style>
        {`
            .dashboard { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
          .header { background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px); box-shadow: 0 4px 6px rgba(0,0,0,0.1); position: sticky; top: 0; z-index: 10; }
          .header-inner { max-width: 1200px; margin: 0 auto; padding: 16px; display: flex; justify-content: space-between; align-items: center; }
          .header-left { display: flex; align-items: center; gap: 12px; }
          .logo { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 1.5rem; font-weight: 700; }
          .subtitle { color: #6b7280; font-size: 0.875rem; }
          .header-right { display: flex; align-items: center; gap: 16px; }
          .search-box { position: relative; display: flex; align-items: center; }
          .search-box input { padding: 8px 12px 8px 32px; border: 2px solid #e0e7ff; border-radius: 12px; outline: none; transition: all 0.3s; }
          .search-box input:focus { border-color: #667eea; box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1); }
          .search-icon { position: absolute; left: 8px; color: #667eea; }
          .icon { width: 24px; height: 24px; color: #667eea; cursor: pointer; transition: transform 0.2s; }
          .icon:hover { transform: scale(1.1); }
          .profile-mini { display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 6px 12px; border-radius: 12px; transition: background 0.3s; }
          .profile-mini:hover { background: #f3f4f6; }
          .profile-avatar { width: 40px; height: 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3); }
          .profile-name { font-size: 0.875rem; font-weight: 600; color: #1f2937; }

          .container { max-width: 1200px; margin: 0 auto; padding: 24px; }
          .profile-summary { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #fff; border-radius: 20px; padding: 32px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3); }
          .profile-left { display: flex; align-items: center; gap: 16px; }
          .profile-avatar-large { width: 80px; height: 80px; background: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); }
          .icon-large { color: #667eea; width: 48px; height: 48px; }
          .profile-info h2 { font-size: 1.5rem; margin: 0; }
          .profile-stats { display: flex; align-items: center; gap: 8px; margin-top: 8px; }
          .rating { display: flex; align-items: center; gap: 4px; background: rgba(255, 255, 255, 0.2); padding: 4px 10px; border-radius: 12px; }
          .star-filled { color: #fbbf24; fill: #fbbf24; }
          .divider { color: rgba(255, 255, 255, 0.5); }
          .profile-buttons { display: flex; gap: 8px; }

          .btn { padding: 10px 20px; border-radius: 12px; font-weight: 600; cursor: pointer; transition: all 0.3s; display: flex; align-items: center; justify-content: center; gap: 6px; border: none; }
          .btn.white { background: #fff; color: #667eea; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); }
          .btn.white:hover { background: #f9fafb; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); }
          .btn.blue { background: rgba(255, 255, 255, 0.2); color: #fff; border: 2px solid rgba(255, 255, 255, 0.3); }
          .btn.blue:hover { background: rgba(255, 255, 255, 0.3); transform: translateY(-2px); }
          .btn.outline { border: 2px solid #667eea; color: #667eea; background: transparent; }
          .btn.outline:hover { background: #eff6ff; transform: translateY(-2px); }
          .btn.full { flex: 1; }

          .tabs { display: flex; border-bottom: 2px solid #e0e7ff; background: #fff; border-radius: 12px; margin: 24px 0; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
          .tab { padding: 16px 24px; font-weight: 600; border: none; background: none; cursor: pointer; color: #6b7280; transition: all 0.3s; position: relative; }
          .tab.active { color: #667eea; }
          .tab.active::after { content: ''; position: absolute; bottom: -2px; left: 0; right: 0; height: 3px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 3px 3px 0 0; }

          .filter-card { background: #fff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); padding: 20px; margin-bottom: 24px; }
          .filter-header { display: flex; align-items: center; gap: 8px; color: #667eea; font-weight: 600; }
          .category-list { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 12px; }
          .category-btn { padding: 10px 18px; border-radius: 20px; background: #f3f4f6; color: #374151; cursor: pointer; border: 2px solid transparent; transition: all 0.3s; font-weight: 500; }
          .category-btn:hover { background: #e5e7eb; transform: translateY(-1px); }
          .category-btn.selected { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #fff; border-color: #667eea; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3); }

          .tenders-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
          .card { background: #fff; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); padding: 20px; transition: all 0.3s; border: 1px solid #f0f0f0; }
          .card:hover { box-shadow: 0 8px 24px rgba(102, 126, 234, 0.15); transform: translateY(-4px); }
          .card-header { display: flex; justify-content: space-between; align-items: start; }
          .tag { display: inline-block; background: linear-gradient(135deg, #ddd6fe 0%, #e0e7ff 100%); color: #5b21b6; font-size: 0.75rem; font-weight: 700; padding: 6px 12px; border-radius: 20px; margin-bottom: 8px; }
          .price { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: 800; font-size: 1.25rem; }
          .desc { color: #4b5563; margin-bottom: 12px; line-height: 1.5; }
          .card-details { display: flex; flex-direction: column; gap: 6px; color: #6b7280; font-size: 0.875rem; margin-bottom: 12px; }
          .card-details div { display: flex; align-items: center; gap: 6px; }
          .card-details .icon-small { color: #667eea; width: 16px; height: 16px; }
          .card-actions { display: flex; gap: 10px; }

          .status { display: inline-block; padding: 6px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; }
          .status-pending { background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); color: #92400e; }
          .status-accepted { background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); color: #1e40af; }
          .status-rejected { background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%); color: #991b1b; }
          .status-finished { background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%); color: #065f46; }
          
          .icon-small { width: 16px; height: 16px; }
          .user { color: #fff; }
          .bell:hover { animation: ring 0.5s ease-in-out; }
          @keyframes ring { 0%, 100% { transform: rotate(0deg); } 25% { transform: rotate(15deg); } 75% { transform: rotate(-15deg); } }
      
          .dashboard { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
          .header { background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px); box-shadow: 0 4px 6px rgba(0,0,0,0.1); position: sticky; top: 0; z-index: 10; }
          .header-inner { max-width: 1200px; margin: 0 auto; padding: 16px; display: flex; justify-content: space-between; align-items: center; }
          .header-left { display: flex; align-items: center; gap: 12px; }
          .logo { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 1.5rem; font-weight: 700; }
          .subtitle { color: #6b7280; font-size: 0.875rem; }
          .header-right { display: flex; align-items: center; gap: 16px; }
          .search-box { position: relative; display: flex; align-items: center; }
          .search-box input { padding: 8px 12px 8px 32px; border: 2px solid #e0e7ff; border-radius: 12px; outline: none; transition: all 0.3s; }
          .search-box input:focus { border-color: #667eea; box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1); }
          .search-icon { position: absolute; left: 8px; color: #667eea; }
          .icon { width: 24px; height: 24px; color: #667eea; cursor: pointer; transition: transform 0.2s; }
          .icon:hover { transform: scale(1.1); }
          .profile-mini { display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 6px 12px; border-radius: 12px; transition: background 0.3s; }
          .profile-mini:hover { background: #f3f4f6; }
          .profile-avatar { width: 40px; height: 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3); }
          .profile-name { font-size: 0.875rem; font-weight: 600; color: #1f2937; }
          
        `}
      </style>
    </div>
  );
};

export default SPDashboard;
