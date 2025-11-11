import mongoose from 'mongoose';
const { Schema } = mongoose;

const ServiceRequestSchema = new Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: false,
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    serviceType: { type: String, required: true },
    address: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ['Pending', 'Accepted', 'In Progress', 'Completed'],
      default: 'Pending',
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: null, // or 0 if you want to default to 0
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model('ServiceRequest', ServiceRequestSchema);
