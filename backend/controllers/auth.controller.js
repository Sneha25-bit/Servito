import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Customer from "../models/Customer.js";
import SP from "../models/SP.js";

/* =========================================================
   HELPER: JWT SIGN FUNCTION
   ========================================================= */
const signToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

/* =========================================================
   CUSTOMER SIGNUP
   ========================================================= */
export const signupCustomer = async (req, res) => {
  try {
    const { username, email, password, phone_no, address } = req.body;

    if (!username || !email || !password || !phone_no || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existing = await Customer.findOne({ email: normalizedEmail });
    if (existing) return res.status(409).json({ message: "Email already exists" });

    const customer = new Customer({
  username,
  email: normalizedEmail,
  password, 
  phone_no,
  address,
});


    await customer.save();

    const token = signToken({ id: customer._id, role: "customer" });

    return res.status(201).json({
      message: "Customer signup successful",
      token,
      user: {
        id: customer._id,
        role: "customer",
        username: customer.username,
        email: customer.email,
      },
    });
  } catch (err) {
    console.error("❌ Customer signup error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/* =========================================================
   PROVIDER SIGNUP
   ========================================================= */
export const signupProvider = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      phone_no,
      address,
      service_info,
      aadhar_no,
      experience,
      dob,
      education,
    } = req.body;

    if (
      !username ||
      !email ||
      !password ||
      !phone_no ||
      !address ||
      !service_info ||
      !aadhar_no
    ) {
      return res.status(400).json({
        message: "All fields are required (including Aadhar and service info)",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existing = await SP.findOne({ email: normalizedEmail });
    if (existing) return res.status(409).json({ message: "Email already exists" });

    const sp = new SP({
  username,
  email: normalizedEmail,
  password, // plain text — the model will hash automatically
  phone_no,
  address,
  service_info,
  aadhar_no,
  experience,
  dob,
  education,
});


    await sp.save();

    const token = signToken({ id: sp._id, role: "provider" });

    return res.status(201).json({
      message: "Provider signup successful",
      token,
      user: {
        id: sp._id,
        role: "provider",
        username: sp.username,
        email: sp.email,
      },
    });
  } catch (err) {
    console.error("❌ Provider signup error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/* =========================================================
   LOGIN (COMMON FOR BOTH)
   ========================================================= */
export const login = async (req, res) => {
  try {
    const { email, password, loginRole } = req.body;

    // 🔍 Validation
    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    if (!loginRole || !["customer", "provider"].includes(loginRole)) {
      return res.status(400).json({ message: "Invalid or missing login role" });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // 🔎 Find in the correct collection
    const userModel = loginRole === "provider" ? SP : Customer;
    const user = await userModel.findOne({ email: normalizedEmail }).select("+password");

    if (!user) {
      console.log(`❌ No ${loginRole} found with email: ${normalizedEmail}`);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 🧩 Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      console.log(`❌ Incorrect password for ${normalizedEmail}`);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // ✅ Generate JWT
    const token = signToken({
      id: user._id.toString(),
      role: loginRole,
    });

    // 🎯 Response
    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        role: loginRole,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/* =========================================================
   GET CURRENT LOGGED-IN USER
   ========================================================= */
export const me = async (req, res) => {
  try {
    const { id, role } = req.user;

    const userModel = role === "provider" ? SP : Customer;
    const user = await userModel.findById(id).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({
      id: user._id,
      role,
      username: user.username,
      email: user.email,
      phone_no: user.phone_no,
      address: user.address,
    });
  } catch (err) {
    console.error("❌ Fetch profile error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
