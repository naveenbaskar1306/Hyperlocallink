const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ['customer', 'provider', 'admin'],
      default: 'customer'
    },
    phone: String,
    avatarUrl: String,
    address: String,
    providerProfile: {
      servicesOffered: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Service' }
      ],
      rating: { type: Number, default: 0 },
      bio: String,
      availability: Object
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
