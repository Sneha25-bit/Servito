import express from "express";
import ServiceRequest from "../models/ServiceRequest.js";
import { requireAuth } from "../middleware/auth.js"; //  Import your auth middleware

const router = express.Router();

/**
 * @route   POST /api/requests
 * @desc    Create a new service request (only for logged-in users)
 * @access  Private
 */
router.post("/", requireAuth, async (req, res) => {
  try {
    const { name, email, phone, serviceType, address, description } = req.body;

    // Attach the logged-in user's ID (decoded from token)
    const customerId = req.user.id;

    const newRequest = new ServiceRequest({
      customer: customerId,
      name,
      email,
      phone,
      serviceType,
      address,
      description,
    });

    await newRequest.save();

    res.status(201).json({
      success: true,
      message: "Service request created successfully",
      data: newRequest,
    });
  } catch (error) {
    console.error("Error creating service request:", error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

/**
 * @route   GET /api/requests
 * @desc    Fetch all service requests (for service provider dashboard)
 * @access  Public (can later restrict to admin/SP)
 */
router.get("/", async (req, res) => {
  try {
    const requests = await ServiceRequest.find().populate(
      "customer",
      "username email phone"
    );
    res.status(200).json({ success: true, data: requests });
  } catch (error) {
    console.error("Error fetching service requests:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @route   PUT /api/requests/:id
 * @desc    Update a service request (e.g., status update)
 * @access  Private (you can later restrict this to SP or admin)
 */
router.put("/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Find and update the service request
    const updatedRequest = await ServiceRequest.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedRequest) {
      return res
        .status(404)
        .json({ success: false, message: "Service request not found" });
    }

    res.status(200).json({
      success: true,
      message: "Service request updated successfully",
      data: updatedRequest,
    });
  } catch (error) {
    console.error("Error updating service request:", error);
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;
