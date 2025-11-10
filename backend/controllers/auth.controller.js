import jwt from "jsonwebtoken";
import Customer from "../models/Customer.js";
import SP from "../models/SP.js";
import bcrypt from "bcrypt";

const signToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });

/**
 * Signup (role = 'customer' | 'provider')
 * - For 'customer': create Customer only
 * - For 'provider': create Customer + SP (links to customer)
 */
export const signup = async (req, res) => {
  try {
    const { role, username, email, password, phone_no, address,
      service_info, aadhar_no, experience, dob, education } = req.body;

    if (!role || !["customer", "provider"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Create base Customer
    const customer = new Customer({ username, email, password, phone_no, address });
    await customer.save();

    let payload = { id: customer._id.toString(), role: "customer" };

    // If provider, create SP profile linked to this customer
    if (role === "provider") {
      if (!aadhar_no) {
        return res.status(400).json({ message: "Aadhar is required for providers" });
      }
      const sp = new SP({
        customer: customer._id,
        service_info,
        aadhar_no,
        experience,
        dob,
        education
      });
      await sp.save();
      payload.role = "provider";
    }

    const token = signToken(payload);

    return res.status(201).json({
      message: "Signup successful",
      token,
      user: {
        id: payload.id,
        role: payload.role,
        username: customer.username,
        email: customer.email
      }
    });
  } catch (err) {
    // Handle duplicate keys nicely
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern || {})[0] || "field";
      return res.status(409).json({ message: `${field} already exists` });
    }
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * Login:
 * - Always authenticate against Customer (email + password)
 * - If loginRole === 'provider', also verify SP exists for this customer
 */
export const login = async (req, res) => {
  try {
    const { email, password, loginRole } = req.body; // loginRole: 'customer' | 'provider'

    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    // must include password since it's select:false
    const customer = await Customer.findOne({ email: email.toLowerCase().trim() }).select("+password");
    if (!customer) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, customer.password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    let role = "customer";
    if (loginRole === "provider") {
      const sp = await SP.findOne({ customer: customer._id });
      if (!sp) return res.status(403).json({ message: "No provider profile found for this account" });
      role = "provider";
    }

    const token = signToken({ id: customer._id.toString(), role });

    return res.json({
      message: "Login successful",
      token,
      user: {
        id: customer._id,
        role,
        username: customer.username,
        email: customer.email
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const me = async (req, res) => {
  try {
    // req.user = { id, role }
    const customer = await Customer.findById(req.user.id);
    if (!customer) return res.status(404).json({ message: "User not found" });

    let provider = null;
    if (req.user.role === "provider") {
      provider = await SP.findOne({ customer: req.user.id });
    }

    return res.json({
      id: customer._id,
      role: req.user.role,
      username: customer.username,
      email: customer.email,
      provider
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
