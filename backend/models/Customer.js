import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;

const CustomerSchema = new Schema(
  {
    username: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, select: false },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    phone_no: { type: String, required: true, match: [/^\d{10}$/, 'Phone number must be exactly 10 digits'] },
    address: { type: String, required: true }
  },
  { timestamps: true }
);

// Hash password on create/update if modified
CustomerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// helper to compare password (since password select:false)
CustomerSchema.methods.comparePassword = async function(plain) {
  return bcrypt.compare(plain, this.password);
}

export default mongoose.model('Customer', CustomerSchema);
