const express = require("express");
const { listBookings, updateBookingStatus } = require("../controllers/adminBookings");

const router = express.Router();

// GET /api/admin/bookings
router.get("/bookings", listBookings);

// PATCH /api/admin/bookings/:id/status
router.patch("/bookings/:id/status", updateBookingStatus);

module.exports = router;
