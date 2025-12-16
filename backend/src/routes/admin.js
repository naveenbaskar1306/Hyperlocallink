// backend/src/routes/admin.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Service = require("../models/Service"); // adjust path if different
const Booking = require("../models/Booking");
const User = require("../models/User");

const router = express.Router();

// ---- multer setup (store uploads in backend/uploads) ----
const uploadsDir = path.join(__dirname, "..", "..", "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    // keep unique name: timestamp + original
    const ext = path.extname(file.originalname);
    const name = file.fieldname + "-" + Date.now() + ext;
    cb(null, name);
  }
});
const upload = multer({ storage });

// ---- placeholder admin auth middleware ----
function adminAuth(req, res, next) {
  // Replace with your real admin/auth check.
  // This placeholder lets requests through in dev.
  next();
}

// ---- POST /services (create service, optional image) ----
router.post("/services", adminAuth, upload.single("image"), async (req, res) => {
  try {
    const { title, description = "", price } = req.body;
    if (!title || !price) return res.status(400).json({ message: "title and price required" });

    const newService = new Service({
      title,
      description,
      price: Number(price),
    });

    if (req.file) {
      // store URL relative to server root (frontend can fetch /uploads/filename)
      newService.imageUrl = `/uploads/${req.file.filename}`;
    }

    const saved = await newService.save();
    return res.status(201).json(saved);
  } catch (err) {
    console.error("Create service error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// ---- GET /services (list) ----
router.get("/services", adminAuth, async (req, res) => {
  try {
    const list = await Service.find().sort({ createdAt: -1 }).lean();
    return res.json(list);
  } catch (err) {
    console.error("List services error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// ---- DELETE /services/:id ----
router.delete("/services/:id", adminAuth, async (req, res) => {
  try {
    const deleted = await Service.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    // optionally remove file
    if (deleted.imageUrl) {
      const filePath = path.join(__dirname, "..", "..", deleted.imageUrl);
      fs.unlink(filePath, () => {});
    }
    return res.json({ ok: true });
  } catch (err) {
    console.error("Delete service error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// ---- GET /stats used by admin dashboard ----
router.get("/stats", adminAuth, async (req, res) => {
  try {
    const servicesCount = await Service.countDocuments();
    const bookingsCount = await Booking.countDocuments();
    const usersCount = await User.countDocuments();

    // bookings by status aggregation
    const agg = await Booking.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);
    const bookingsByStatus = {};
    agg.forEach((a) => (bookingsByStatus[a._id] = a.count));

    res.json({ servicesCount, bookingsCount, usersCount, bookingsByStatus });
  } catch (err) {
    console.error("Stats error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
