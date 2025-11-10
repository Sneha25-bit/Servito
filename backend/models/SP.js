import mongoose from 'mongoose';
const { Schema, Types } = mongoose;

const SPSchema = new Schema(
  {
    customer: { type: Types.ObjectId, ref: 'Customer', required: true, unique: true },
    service_info: { type: String },
    aadhar_no: { type: String, required: true, match: [/^\d{12}$/, 'Not a valid Aadhar'] },
    experience: { type: String, default: "None" },
    dob: { type: Date },
    education: { type: String, default: "None" }
  },
  { timestamps: true }
);

export default mongoose.model('SP', SPSchema);
