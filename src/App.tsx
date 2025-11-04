import React, { useState } from 'react';
// Importing the external CSS file
import './app.css';

// Define specific union type for the 'role' state
type Role = "customer" | "provider";

// Define form event type for convenience
type FormEvent = React.FormEvent<HTMLFormElement>;

export default function App() {
  // Added Role type annotation for useState
  const [role, setRole] = useState<Role>("customer");

  // Added explicit type annotation for event
  const handleSignIn = (e: FormEvent) => {
    e.preventDefault();
    console.log('Attempting Sign In...');
    // Add sign-in logic here
  };

  // Added explicit type annotation for event
  const handleSignUp = (e: FormEvent) => {
    e.preventDefault();
    console.log(`Attempting Sign Up as ${role}...`);
    // Add sign-up logic here
  };

  return (
    <div className="auth-shell">
      <div className="card">
        
        {/* Left Panel: Sign In */}
        <section className="panel left">
          <h1 className="title">Welcome Back</h1>
          <p className="subtitle">Sign in to your account</p>

          <form className="form" onSubmit={handleSignIn}>
            {/* Email */}
            <label className="input-group">
              <span className="input-label-text">Email</span>
              <input type="email" placeholder="Enter email" required className="input-field" />
            </label>

            {/* Password */}
            <label className="input-group">
              <span className="input-label-text">Password</span>
              <input type="password" placeholder="Enter password" required className="input-field" />
            </label>

            {/* Confirm Password */}
            <label className="input-group">
              <span className="input-label-text">Confirm Password</span>
              <input type="password" placeholder="Confirm password" required className="input-field" />
            </label>

            <div className="row between">
              {/* Remember Me Checkbox */}
              <label className="checkbox">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              
              {/* Forgot Password Link */}
              <button 
                className="link" 
                type="button"
              >
                Forgot Password?
              </button>
            </div>

            <button type="submit" className="btn primary full">Sign In</button>
          </form>
        </section>
        
        {/* Right Panel: Sign Up (Role-Based Form) */}
        <section className="panel right">
          <h1 className="title light">Create Account</h1>
          <p className="subtitle light">Join our community today</p>

          {/* Segmented Role Selector */}
          <div className="segmented">
            <button
              className={`seg-btn ${role === "customer" ? "active" : ""}`}
              onClick={() => setRole("customer")}
            >
              <span role="img" aria-label="customer">👤 Customer</span>
            </button>
            <button
              className={`seg-btn ${role === "provider" ? "active" : ""}`}
              onClick={() => setRole("provider")}
              >
              <span role="img" aria-label="service provider">🛠️ Service Provider</span>
            </button>
          </div>

          <form className="form" onSubmit={handleSignUp}>
            {role === "customer" ? (
              <>
                {/* Customer Fields - Note: Adding 'light' class to the input group for styling */}
                <label className="input-group light">
                  <span className="input-label-text">Username</span>
                  <input type="text" placeholder="Enter username" required className="input-field" />
                </label>
                <label className="input-group light">
                  <span className="input-label-text">Email</span>
                  <input type="email" placeholder="Enter email address" required className="input-field" />
                </label>
                <label className="input-group light">
                  <span className="input-label-text">Password</span>
                  <input type="password" placeholder="Create password" required className="input-field" />
                </label>
                <label className="input-group light">
                  <span className="input-label-text">Phone Number</span>
                  <input type="tel" placeholder="Enter phone number" required className="input-field" />
                </label>
                <label className="input-group light">
                  <span className="input-label-text">Address</span>
                  <textarea placeholder="Enter full address details" required className="input-field" />
                </label>
              </>
            ) : (
              <>
                {/* Service Provider Fields - Note: Adding 'light' class to the input group for styling */}
                <label className="input-group light">
                  <span className="input-label-text">Name</span>
                  <input type="text" placeholder="Enter full name" required className="input-field" />
                </label>
                <label className="input-group light">
                  <span className="input-label-text">Email Address</span>
                  <input type="email" placeholder="Enter email address" required className="input-field" />
                </label>
                <label className="input-group light">
                  <span className="input-label-text">Password</span>
                  <input type="password" placeholder="Create password" required className="input-field" />
                </label>
                <label className="input-group light">
                  <span className="input-label-text">Contact Number</span>
                  <input type="tel" placeholder="Enter contact number" required className="input-field" />
                </label>
                <label className="input-group light">
                  <span className="input-label-text">Address</span>
                  <textarea placeholder="Enter full address details" required className="input-field" />
                </label>
                <label className="input-group light">
                  <span className="input-label-text">Service Information</span>
                  <input type="text" placeholder="e.g., Plumber, Electrician" required className="input-field" />
                </label>
                <label className="input-group light">
                  <span className="input-label-text">Aadhar Card Number</span>
                  <input type="text" placeholder="Enter Aadhar card number" required className="input-field" />
                </label>
                <label className="input-group light">
                  <span className="input-label-text">Experience</span>
                  <textarea placeholder="Detailed history and skills" required className="input-field" />
                </label>
                <label className="input-group light">
                  <span className="input-label-text">Date of Birth</span>
                  <input type="date" required className="input-field" />
                </label>
                <label className="input-group light">
                  <span className="input-label-text">Education/Qualifications</span>
                  <textarea placeholder="Degrees, Certifications, etc." required className="input-field" />
                </label>
              </>
            )}

            <button type="submit" className="btn ghost full">
              {role === "customer" ? "Register as Customer" : "Register as Service Provider"}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
