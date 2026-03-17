const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    description: { type: String, required: true, trim: true, maxlength: 5000 },
    importance: { type: String, trim: true, maxlength: 2000 },
    images: [{ url: String, publicId: String }],
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
      address: { type: String, trim: true },
    },
    donation: {
      amount: { type: Number, min: 0, default: 0 },
      currency: { type: String, default: 'USD' },
      transactionId: { type: String, default: '' },
    },
    volunteer: {
      name: { type: String, required: true, trim: true },
      email: { type: String, required: true, lowercase: true, trim: true },
      contact: { type: String, required: true, trim: true },
    },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    type: { type: String, enum: ['tangible', 'intangible', 'living'], default: 'tangible' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Submission', submissionSchema);
