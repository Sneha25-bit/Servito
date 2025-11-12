import mongoose from "mongoose";
const { Schema } = mongoose;

const ServiceRequestSchema = new Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    sp: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SP",
      required: false,
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    serviceType: { type: String, required: true },
    address: { type: String, required: true },
    description: { type: String, required: true },
    budget: { type: Number, required: false, default: 0 }, 
    status: {
      type: String,
      enum: ["Pending", "Accepted", "In Progress", "Completed"],
      default: "Pending",
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: null,
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("ServiceRequest", ServiceRequestSchema);
