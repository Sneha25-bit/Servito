import Customer from "../models/Customer.js";

/**
 * =========================================================
 * GET CUSTOMER PROFILE (FULL DATA)
 * =========================================================
 * @route   GET /api/customer/profile
 * @access  Private (Customer)
 */
export const getCustomerProfile = async (req, res) => {
  try {
    // req.user is populated by requireAuth middleware (JWT verified)
    const customer = await Customer.findById(req.user.id).select("-password");
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json(customer);
  } catch (err) {
    console.error("❌ Fetch customer profile error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * =========================================================
 * UPDATE CUSTOMER PROFILE
 * =========================================================
 * @route   PUT /api/customer/profile
 * @access  Private (Customer)
 */
export const updateCustomerProfile = async (req, res) => {
  try {
    const updates = req.body;
    const allowedUpdates = [
      "username",
      "email",
      "phone_no",
      "address",
      "bio",
      "profileImage",
    ];

    // Filter only allowed fields
    const filteredUpdates = Object.keys(updates)
      .filter((key) => allowedUpdates.includes(key))
      .reduce((obj, key) => {
        obj[key] = updates[key];
        return obj;
      }, {});

    const customer = await Customer.findByIdAndUpdate(
      req.user.id,
      filteredUpdates,
      { new: true }
    ).select("-password");

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      customer,
    });
  } catch (err) {
    console.error("❌ Update customer profile error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
