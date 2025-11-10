import { useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/auth";
import "../components/LoginPage.css";

export default function LoginPage() {
  const [role, setRole] = useState<"customer" | "provider">("customer");
  const [loginRole, setLoginRole] = useState<"customer" | "provider" | "">("");

  // Signin states
  const [signinEmail, setSigninEmail] = useState("");
  const [signinPassword, setSigninPassword] = useState("");
  const [signinConfirm, setSigninConfirm] = useState("");

  // Signup states
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [serviceInfo, setServiceInfo] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [experience, setExperience] = useState("");
  const [dob, setDob] = useState<string>("");
  const [education, setEducation] = useState("");

  const navigate = useNavigate();

  // ✅ Reset signup fields when switching between Customer and Provider
  useEffect(() => {
    setUsername("");
    setEmail("");
    setPassword("");
    setPhone("");
    setAddress("");
    setServiceInfo("");
    setAadhar("");
    setExperience("");
    setDob("");
    setEducation("");
  }, [role]);

  // 🔹 Handle Sign In
  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!loginRole) return alert("Please select your role before signing in.");
    if (signinPassword !== signinConfirm)
      return alert("Passwords do not match.");

    try {
      const { data } = await api.post("/auth/login", {
        email: signinEmail,
        password: signinPassword,
        loginRole,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate(loginRole === "customer" ? "/profile" : "/dashboard");
    } catch (err: any) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

 // 🔹 Handle Sign Up
const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  // ✅ Basic validation before calling backend
  if (!/^\d{10}$/.test(phone)) {
    return alert("Phone number must be exactly 10 digits");
  }

  if (role === "provider" && !/^\d{12}$/.test(aadhar)) {
    return alert("Aadhar number must be exactly 12 digits");
  }

  try {
    const payload: any = {
      username,
      email,
      password,
      phone_no: phone,
      address,
    };

    // Add provider-specific fields only if provider is selected
    if (role === "provider") {
      Object.assign(payload, {
        service_info: serviceInfo,
        aadhar_no: aadhar,
        experience,
        dob,
        education,
      });
    }

    console.log("Signup payload:", payload);

    // ✅ Send to correct backend route
    const endpoint =
      role === "customer"
        ? "/auth/signup-customer"
        : "/auth/signup-provider";

    const { data } = await api.post(endpoint, payload);

    // ✅ Save token and user info
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    // ✅ Redirect based on role
    navigate(role === "customer" ? "/profile" : "/dashboard");
  } catch (err: any) {
    alert(err.response?.data?.message || "Signup failed");
  }
};


  return (
    <div className="auth-shell">
      <div className="card">
        {/* ================== LEFT: SIGN IN ================== */}
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
                value={signinEmail}
                onChange={(e) => setSigninEmail(e.target.value)}
              />
            </label>

            <label className="input-group">
              <span className="input-label-text">Password</span>
              <input
                type="password"
                placeholder="Enter password"
                required
                className="input-field"
                value={signinPassword}
                onChange={(e) => setSigninPassword(e.target.value)}
              />
            </label>

            <label className="input-group">
              <span className="input-label-text">Confirm Password</span>
              <input
                type="password"
                placeholder="Confirm password"
                required
                className="input-field"
                value={signinConfirm}
                onChange={(e) => setSigninConfirm(e.target.value)}
              />
            </label>

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

            <button className="btn primary full" type="submit">
              Sign In
            </button>
          </form>
        </section>

        {/* ================== RIGHT: SIGN UP ================== */}
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
                {/* ===== CUSTOMER FIELDS ===== */}
                <label className="input-group light">
                  <span className="input-label-text">Username</span>
                  <input
                    type="text"
                    required
                    className="input-field"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </label>

                <label className="input-group light">
                  <span className="input-label-text">Email</span>
                  <input
                    type="email"
                    required
                    className="input-field"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>

                <label className="input-group light">
                  <span className="input-label-text">Password</span>
                  <input
                    type="password"
                    required
                    className="input-field"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>

                <label className="input-group light">
                  <span className="input-label-text">Phone Number</span>
                  <input
                    type="tel"
                    required
                    className="input-field"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </label>

                <label className="input-group light">
                  <span className="input-label-text">Address</span>
                  <textarea
                    required
                    className="input-field"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </label>
              </>
            ) : (
              <>
                {/* ===== PROVIDER FIELDS ===== */}
                <label className="input-group light">
                  <span className="input-label-text">Full Name</span>
                  <input
                    type="text"
                    required
                    className="input-field"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </label>

                <label className="input-group light">
                  <span className="input-label-text">Email Address</span>
                  <input
                    type="email"
                    required
                    className="input-field"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>

                <label className="input-group light">
                  <span className="input-label-text">Password</span>
                  <input
                    type="password"
                    required
                    className="input-field"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>

                <label className="input-group light">
                  <span className="input-label-text">Contact Number</span>
                  <input
                    type="tel"
                    required
                    className="input-field"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </label>

                <label className="input-group light">
                  <span className="input-label-text">Address</span>
                  <textarea
                    required
                    className="input-field"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </label>

                <label className="input-group light">
                  <span className="input-label-text">Service Information</span>
                  <input
                    type="text"
                    required
                    className="input-field"
                    value={serviceInfo}
                    onChange={(e) => setServiceInfo(e.target.value)}
                  />
                </label>

                <label className="input-group light">
                  <span className="input-label-text">Aadhar Number</span>
                  <input
                    type="text"
                    required
                    className="input-field"
                    value={aadhar}
                    onChange={(e) => setAadhar(e.target.value)}
                  />
                </label>

                <label className="input-group light">
                  <span className="input-label-text">Experience</span>
                  <textarea
                    className="input-field"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                  />
                </label>

                <label className="input-group light">
                  <span className="input-label-text">Date of Birth</span>
                  <input
                    type="date"
                    className="input-field"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                  />
                </label>

                <label className="input-group light">
                  <span className="input-label-text">Education / Qualification</span>
                  <textarea
                    className="input-field"
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
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
