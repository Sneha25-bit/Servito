import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

const SPSchema = new Schema(
  {
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    phone_no: { type: String, required: true, match: [/^\d{10}$/, "Phone number must be 10 digits"] },
    address: { type: String, required: true },
    service_info: { type: String, required: true },
    aadhar_no: { type: String, required: true, unique: true, match: [/^\d{12}$/, "Aadhar must be 12 digits"] },
    experience: { type: String, default: "None" },
    dob: { type: Date },
    education: { type: String, default: "None" },
  },
  { timestamps: true }
);

// Hash password before save
SPSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export default mongoose.model("SP", SPSchema);
