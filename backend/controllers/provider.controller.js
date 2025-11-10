import SP from "../models/SP.js";

/**
 * GET /api/provider/profile/:id
 * Public endpoint — fetch a provider’s public profile by their ID
 */
export const getProviderProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const provider = await SP.findById(id).select("-password");
    if (!provider) {
      return res.status(404).json({ message: "Provider not found" });
    }

    res.status(200).json({
      id: provider._id,
      username: provider.username,
      email: provider.email,
      phone_no: provider.phone_no,
      address: provider.address,
      service_info: provider.service_info,
      experience: provider.experience,
      education: provider.education,
      dob: provider.dob,
      aadhar_no: provider.aadhar_no,
      joinedDate: provider.createdAt,
    });
  } catch (err) {
    console.error("Error fetching provider profile:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET /api/provider/me
 * Private endpoint — fetch the logged-in provider’s own profile
 */
export const getMyProviderProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Set by JWT middleware
    const provider = await SP.findById(userId).select("-password");

    if (!provider) {
      return res.status(404).json({ message: "Provider not found" });
    }

    res.status(200).json({
      id: provider._id,
      username: provider.username,
      email: provider.email,
      phone_no: provider.phone_no,
      address: provider.address,
      service_info: provider.service_info,
      experience: provider.experience,
      education: provider.education,
      dob: provider.dob,
      aadhar_no: provider.aadhar_no,
      joinedDate: provider.createdAt,
    });
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * PUT /api/provider/update
 * Private endpoint — update the logged-in provider’s profile
 */
export const updateProviderProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const updates = req.body;

    const updatedProvider = await SP.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updatedProvider) {
      return res.status(404).json({ message: "Provider not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      provider: updatedProvider,
    });
  } catch (err) {
    console.error("Error updating provider profile:", err);
    res.status(500).json({ message: "Server error" });
  }
};
