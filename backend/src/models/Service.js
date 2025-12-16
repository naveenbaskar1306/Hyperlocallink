// models/Service.js
const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    // URL-friendly id for the service (e.g. "ac-gas-refill")
    slug: { type: String, index: true },

    /**
     * Category slug, e.g.:
     *  - "women-salon"
     *  - "men-salon"
     *  - "cleaning"
     *  - "pest-control"
     *  - "electrician"
     *  - "plumber"
     *  - "carpenter"
     *  - "ac-appliance-repair"
     *  - "water-purifier"
     *  - "general"
     */
    category: { type: String, index: true, default: "general" },

    description: String,

    // price used by your frontend (AdminDashboard uses basePrice)
    basePrice: Number,

    durationMins: Number,

    imageUrl: { type: String, default: "" },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
