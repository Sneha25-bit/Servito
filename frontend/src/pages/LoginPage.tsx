import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "../components/LoginPage.css";

export default function LoginPage() {
  const [role, setRole] = useState<"customer" | "provider">("customer");
  const [loginRole, setLoginRole] = useState<"customer" | "provider" | "">("");
  const navigate = useNavigate();

  // Handle Sign In (Left Panel)
  const handleSignIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!loginRole) {
      alert("Please select your role before signing in.");
      return;
    }

    // Navigate based on loginRole
    if (loginRole === "customer") {
      navigate("/profile");
    } else {
      navigate("/dashboard");
    }
  };

  // Handle Sign Up (Right Panel)
  const handleSignUp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Navigate based on selected signup role
    if (role === "customer") {
      navigate("/profile");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="auth-shell">
      <div className="card">
        {/* Left: Sign In */}
        <section className="panel left">
          <h1 className="title">Welcome Back</h1>
          <p className="subtitle">Sign in to your account</p>

          <form className="form" onSubmit={handleSignIn}>
            <label className="input-group">
              <span className="input-label-text">Email Address</span>
              <input
                type="email"
                placeholder="Enter email"
                required
                className="input-field"
              />
            </label>

            <label className="input-group">
              <span className="input-label-text">Password</span>
              <input
                type="password"
                placeholder="Enter password"
                required
                className="input-field"
              />
            </label>

            <label className="input-group">
              <span className="input-label-text">Confirm Password</span>
              <input
                type="password"
                placeholder="Confirm password"
                required
                className="input-field"
              />
            </label>

            {/* NEW FIELD: Choose Login Role */}
            <label className="input-group">
              <span className="input-label-text">Login as</span>
              <select
                value={loginRole}
                onChange={(e) =>
                  setLoginRole(e.target.value as "customer" | "provider")
                }
                required
                className="input-field"
              >
                <option value="">Select your role</option>
                <option value="customer">Customer</option>
                <option value="provider">Service Provider</option>
              </select>
            </label>

            <div className="row between">
              <label className="checkbox">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <button className="link" type="button">
                Forgot Password?
              </button>
            </div>

            <button className="btn primary full" type="submit">
              Sign In
            </button>
          </form>
        </section>

        {/* Right: Sign Up (Role-Based Form) */}
        <section className="panel right">
          <h1 className="title light">Create Account</h1>
          <p className="subtitle light">Join our community today</p>

          <div className="segmented">
            <button
              type="button"
              className={`seg-btn ${role === "customer" ? "active" : ""}`}
              onClick={() => setRole("customer")}
            >
              👤 Customer
            </button>
            <button
              type="button"
              className={`seg-btn ${role === "provider" ? "active" : ""}`}
              onClick={() => setRole("provider")}
            >
              🛠️ Service Provider
            </button>
          </div>

          <form className="form light" onSubmit={handleSignUp}>
            {role === "customer" ? (
              <>
                <label className="input-group light">
                  <span className="input-label-text">Username</span>
                  <input
                    type="text"
                    placeholder="Enter username"
                    required
                    className="input-field"
                  />
                </label>

                <label className="input-group light">
                  <span className="input-label-text">Email</span>
                  <input
                    type="email"
                    placeholder="Enter email address"
                    required
                    className="input-field"
                  />
                </label>

                <label className="input-group light">
                  <span className="input-label-text">Password</span>
                  <input
                    type="password"
                    placeholder="Create password"
                    required
                    className="input-field"
                  />
                </label>

                <label className="input-group light">
                  <span className="input-label-text">Phone Number</span>
                  <input
                    type="tel"
                    placeholder="Enter phone number"
                    required
                    className="input-field"
                  />
                </label>

                <label className="input-group light">
                  <span className="input-label-text">Address</span>
                  <textarea
                    placeholder="Enter full address details"
                    required
                    className="input-field"
                  />
                </label>
              </>
            ) : (
              <>
                <label className="input-group light">
                  <span className="input-label-text">Name</span>
                  <input
                    type="text"
                    placeholder="Enter full name"
                    required
                    className="input-field"
                  />
                </label>

                <label className="input-group light">
                  <span className="input-label-text">Email Address</span>
                  <input
                    type="email"
                    placeholder="Enter email address"
                    required
                    className="input-field"
                  />
                </label>

                <label className="input-group light">
                  <span className="input-label-text">Password</span>
                  <input
                    type="password"
                    placeholder="Create password"
                    required
                    className="input-field"
                  />
                </label>

                <label className="input-group light">
                  <span className="input-label-text">Contact Number</span>
                  <input
                    type="tel"
                    placeholder="Enter contact number"
                    required
                    className="input-field"
                  />
                </label>

                <label className="input-group light">
                  <span className="input-label-text">Address</span>
                  <textarea
                    placeholder="Enter full address details"
                    required
                    className="input-field"
                  />
                </label>

                <label className="input-group light">
                  <span className="input-label-text">Service Information</span>
                  <input
                    type="text"
                    placeholder="e.g., Plumber, Electrician"
                    required
                    className="input-field"
                  />
                </label>

                <label className="input-group light">
                  <span className="input-label-text">Aadhar Card Number</span>
                  <input
                    type="text"
                    placeholder="Enter Aadhar card number"
                    required
                    className="input-field"
                  />
                </label>

                <label className="input-group light">
                  <span className="input-label-text">Experience</span>
                  <textarea
                    placeholder="Detailed history and skills"
                    required
                    className="input-field"
                  />
                </label>

                <label className="input-group light">
                  <span className="input-label-text">Date of Birth</span>
                  <input type="date" required className="input-field" />
                </label>

                <label className="input-group light">
                  <span className="input-label-text">
                    Education/Qualifications
                  </span>
                  <textarea
                    placeholder="Degrees, Certifications, etc."
                    required
                    className="input-field"
                  />
                </label>
              </>
            )}

            <button className="btn ghost full" type="submit">
              {role === "customer"
                ? "Register as Customer"
                : "Register as Service Provider"}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
