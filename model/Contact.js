import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    firstName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    maxLength:10
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
    required: true,
  },
}, { timestamps: true });

export default mongoose.models.Contact || mongoose.model("Contact", contactSchema);