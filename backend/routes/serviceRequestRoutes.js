import express from 'express';
import ServiceRequest from '../models/ServiceRequest.js';
const router = express.Router();

// POST: create a new service request
router.post('/', async (req, res) => {
  try {
    const newRequest = new ServiceRequest(req.body);
    await newRequest.save();
    res.status(201).json({ success: true, data: newRequest });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// GET: fetch all service requests (for service provider dashboard)
router.get('/', async (req, res) => {
  try {
    const requests = await ServiceRequest.find().populate('customer', 'username email phone_no');
    res.status(200).json({ success: true, data: requests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT: update a service request status
router.put('/:id', async (req, res) => {
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
      return res.status(404).json({
        success: false,
        message: 'Service request not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Service request updated successfully',
      data: updatedRequest,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
