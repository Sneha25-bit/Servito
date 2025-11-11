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
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    phone_no: { 
      type: String, 
      required: true, 
      match: [/^\d{10}$/, 'Phone number must be exactly 10 digits'] 
    },
    address: { type: String, required: true },

    // 🆕 Additional fields for profile UI
    profileImage: { 
      type: String, 
      default: function() {
        // Dicebear avatar as default — based on username
        return `https://api.dicebear.com/7.x/avataaars/svg?seed=${this.username || 'User'}`;
      } 
    },
    joinedDate: { 
      type: Date, 
      default: Date.now 
    },
    totalBookings: { 
      type: Number, 
      default: 0 
    },
    completedBookings: { 
      type: Number, 
      default: 0 
    },
    bio: { 
      type: String, 
      default: '' 
    }
  },
  { timestamps: true }
);

// 🧂 Hash password before saving
CustomerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// 🔐 Compare plain password with hashed password
CustomerSchema.methods.comparePassword = async function(plain) {
  return bcrypt.compare(plain, this.password);
};

export default mongoose.model('Customer', CustomerSchema);
