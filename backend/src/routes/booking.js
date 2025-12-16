// backend/src/routes/booking.js
const express = require("express");
const Booking = require("../models/Booking");
const Service = require("../models/Service");
const User = require("../models/User"); // to fetch user email/name
const auth = require("../middleware/auth");

const { sendBookingEmail } = require("../utils/sendEmail");

const router = express.Router();

// helper: is value a valid Mongo ObjectId string?
function isObjectIdLike(value) {
  return typeof value === "string" && /^[0-9a-fA-F]{24}$/.test(value);
}

/**
 * Create booking
 *
 * Accepts body:
 * - service: serviceId OR service slug OR Mongo _id (required)
 * - scheduledAt OR date: ISO datetime string or datetime-local string (required)
 * - address (optional)
 * - notes (optional)
 * - guest: { name, email } (optional) if user not logged in
 *
 * Auth behavior:
 * - If Authorization token is present and valid, req.user is set by auth middleware.
 * - If user is logged in, customer will be req.user.id.
 * - If not logged in, a guest object OR body.customer (id) is accepted.
 */
router.post("/", auth, async (req, res) => {
  try {
    const {
      service,
      scheduledAt,
      date,
      address,
      notes,
      guest,
      customer: bodyCustomer,
    } = req.body;

    console.log("Incoming booking body.service =", service);

    // Normalize scheduled date using scheduledAt OR legacy date field
    const incomingDate = scheduledAt || date;
    if (!service || !incomingDate) {
      return res.status(400).json({
        message:
          "Missing fields: service and scheduledAt (or date) are required",
      });
    }

    // Determine customer
    let customer = null;
    if (req.user && (req.user.id || req.user._id)) {
      customer = req.user.id || req.user._id;
    } else if (bodyCustomer) {
      customer = bodyCustomer;
    }

    // If no customer and no guest -> reject
    if (!customer && !(guest && guest.name && guest.email)) {
      return res.status(400).json({
        message: "Missing fields: customer or guest (name+email) required",
      });
    }

    // Validate and resolve service:
    // - if ObjectId-like -> findById
    // - else -> assume slug (e.g. "el1") and findOne({ slug })
    let serviceDoc = null;
    if (isObjectIdLike(service)) {
      serviceDoc = await Service.findById(service);
    } else {
      serviceDoc = await Service.findOne({ slug: service });
    }

    if (!serviceDoc) {
      console.error("Service not found for value:", service);
      return res.status(404).json({ message: "Service not found" });
    }

    // Parse date into JS Date
    const parsedDate = new Date(incomingDate);
    if (Number.isNaN(parsedDate.getTime())) {
      return res
        .status(400)
        .json({ message: "Invalid date format for scheduledAt/date" });
    }

    // Build booking doc
    const bookingData = {
      customer: customer || null,
      service: serviceDoc._id, // ALWAYS store ObjectId reference
      scheduledAt: parsedDate,
      address: address || "",
      notes: notes || "",
      price: serviceDoc.basePrice ?? 0,
    };

    // Optional guest info (if your Booking model supports it)
    if (guest && guest.name && guest.email) {
      bookingData.guest = {
        name: guest.name,
        email: guest.email,
      };
    }

    const booking = new Booking(bookingData);
    await booking.save();

    // -------------------------------------------------
    // Send confirmation email (best-effort, non-blocking)
    // -------------------------------------------------
    try {
      let emailTo = null;
      let nameForEmail = "Customer";

      // Logged-in user
      if (customer) {
        const user = await User.findById(customer).lean();
        if (user) {
          emailTo = user.email;
          if (user.name) nameForEmail = user.name;
        }
      }
      // Guest booking
      if (!emailTo && guest && guest.email) {
        emailTo = guest.email;
        if (guest.name) nameForEmail = guest.name;
      }

      if (emailTo) {
        await sendBookingEmail({
          to: emailTo,
          name: nameForEmail,
          serviceName: serviceDoc.title,
          dateTime: parsedDate.toLocaleString(),
          address: address || "",
        });
      }
    } catch (emailErr) {
      console.error(
        "Failed to send booking confirmation email:",
        emailErr && emailErr.stack ? emailErr.stack : emailErr
      );
      // booking itself should NOT fail because email failed
    }

    return res.status(201).json(booking);
  } catch (err) {
    console.error("Booking error:", err && err.stack ? err.stack : err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
