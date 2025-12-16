// backend/src/server.js
require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

// route files
const authRoutes = require("./routes/auth");
const serviceRoutes = require("./routes/service");   
const adminRoutes = require("./routes/admin");       
const bookingRoutes = require("./routes/booking");

// ⭐ NEW — Admin Bookings Route
const adminBookingsRoutes = require("./routes/adminBookings");

const app = express();

// --- Middlewares ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// logging in dev
app.use(morgan("dev"));

// CORS
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:5173";
app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);
      if (origin === FRONTEND_ORIGIN) return cb(null, true);
      return cb(new Error("Not allowed by CORS"), false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// -------------------------------
// Static Uploads
// -------------------------------
const uploadsDir = path.join(__dirname, "routes", "uploads");
console.log("Serving uploads from:", uploadsDir);

app.use("/uploads", express.static(uploadsDir));
app.use("/api/uploads", express.static(uploadsDir));

// -------------------------------
// Mount API Routes
// -------------------------------
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/admin", adminRoutes);

// ⭐ ADD THIS — REAL ADMIN BOOKINGS ENDPOINT
app.use("/api/admin", adminBookingsRoutes);

// public bookings
app.use("/api/bookings", bookingRoutes);

// Health check
app.get("/api/health", (req, res) => res.json({ ok: true, ts: Date.now() }));

// --- DB connect & start ---
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("MONGO_URI missing in .env");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () =>
      console.log(`🚀 Server listening on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err && err.stack ? err.stack : err);
  res.status(500).json({ message: err?.message || "Server error" });
});
