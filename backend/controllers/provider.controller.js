import Customer from "../models/Customer.js";
import SP from "../models/SP.js";

/**
 * GET /api/provider/profile/:id
 * Public endpoint - fetch provider info by customer ID
 */
export const getProviderProfile = async (req, res) => {
  try {
    const { id } = req.params; // customer id
    const customer = await Customer.findById(id).select("-password");
    if (!customer)
      return res.status(404).json({ message: "Provider not found" });

    const sp = await SP.findOne({ customer: id });
    if (!sp)
      return res.status(404).json({ message: "Service Provider info missing" });

    return res.json({
      id: customer._id,
      name: customer.username,
      email: customer.email,
      phone: customer.phone_no,
      address: customer.address,
      service_info: sp.service_info,
      experience: sp.experience,
      education: sp.education,
      dob: sp.dob,
      aadhar_no: sp.aadhar_no,
      joinedDate: customer.createdAt,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET /api/provider/me
 * Private endpoint - uses JWT (req.user.id)
 */
export const getMyProviderProfile = async (req, res) => {
  try {
    const userId = req.user.id; // set by requireAuth middleware
    const customer = await Customer.findById(userId).select("-password");
    const sp = await SP.findOne({ customer: userId });

    if (!customer || !sp)
      return res.status(404).json({ message: "Profile not found" });

    res.json({
      id: customer._id,
      name: customer.username,
      email: customer.email,
      phone: customer.phone_no,
      address: customer.address,
      service_info: sp.service_info,
      experience: sp.experience,
      education: sp.education,
      dob: sp.dob,
      aadhar_no: sp.aadhar_no,
      joinedDate: customer.createdAt,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * PUT /api/provider/update
 * Private endpoint - allows provider to update their details
 */
export const updateProviderProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { username, phone_no, address, service_info, experience, education } =
      req.body;

    const customer = await Customer.findByIdAndUpdate(
      userId,
      { username, phone_no, address },
      { new: true }
    ).select("-password");

    const sp = await SP.findOneAndUpdate(
      { customer: userId },
      { service_info, experience, education },
      { new: true }
    );

    res.json({
      message: "Profile updated successfully",
      customer,
      sp,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
