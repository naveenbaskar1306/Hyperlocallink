// backend/src/seed.js (UPDATED) - includes ALL services
import path from "path";
import fs from "fs";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import Service from "./models/Service.js";
import User from "./models/User.js";
import Booking from "./models/Booking.js";
import Admin from "./models/Admin.js";

// robust .env loading: try backend/.env first, then project root .env
const tryLoadEnv = () => {
  const tryPaths = [
    path.resolve(process.cwd(), ".env"),                // if running from backend root
    path.resolve(process.cwd(), "..", ".env"),         // if running from backend/src and .env at project root
    path.resolve(process.cwd(), "..", "..", ".env"),   // extra try (rare)
  ];
  for (const p of tryPaths) {
    if (fs.existsSync(p)) {
      dotenv.config({ path: p });
      console.log(`✅ loaded env from ${p}`);
      return;
    }
  }
  // fallback to standard dotenv config (no path)
  dotenv.config();
  console.log("ℹ️ dotenv loaded with default fallback");
};
tryLoadEnv();

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("❌ MONGO_URI missing in .env (backend/.env or project .env)");
  process.exit(1);
}

// ALL SERVICES - combined from your UI components
const allServices = [
  { id: "lite1", title: "Lite AC service", price: 599, duration: 45, rating: 4.78, reviews: "283K", bullets: ["Applicable for both window & split ACs", "Indoor unit cleaning with water jet spray"], image: "/images/services/ac-lite.jpg", category: "AC" },
  { id: "repair1", title: "AC less/no cooling repair", price: 299, duration: 150, rating: 4.76, reviews: "473K", bullets: ["Diagnostics & repair", "Includes minor part replacement (if available)"], image: "/images/services/ac-repair.jpg", category: "AC" },
  { id: "service-split", title: "AC service (split)", price: 799, duration: 90, rating: 4.8, reviews: "120K", bullets: ["Full indoor + outdoor cleaning", "Filter cleaning and deodorize"], image: "/images/services/ac-split.jpg", category: "AC" },
  { id: "gas1", title: "AC gas refill", price: 2499, duration: 120, rating: 4.65, reviews: "85K", bullets: ["Gas top-up based on diagnosis", "Safe handling and testing"], image: "/images/services/ac-gas.jpg", category: "AC" },

  { id: "cl1", title: "Sofa deep cleaning", price: 899, duration: 90, bullets: ["Deep cleaning with foam", "Quick dry technology"], image: "/images/services/sofa.jpg", category: "Cleaning" },
  { id: "cl2", title: "Full home cleaning", price: 2499, duration: 180, bullets: ["Kitchen & bathroom", "Floor scrubbing & dusting"], image: "/images/services/home-clean.jpg", category: "Cleaning" },

  { id: "el1", title: "Electrical repair", price: 499, duration: 60, bullets: ["Wiring checks", "Fuse & switch repair"], image: "/images/services/electrical.jpg", category: "Electrical" },
  { id: "pl1", title: "Plumbing repair", price: 599, duration: 60, bullets: ["Leak fixing", "Pipe replacement"], image: "/images/services/plumbing.jpg", category: "Plumbing" },
  { id: "cr1", title: "Carpentry (small jobs)", price: 999, duration: 90, bullets: ["Cabinet repair", "Shelf fixing"], image: "/images/services/carpentry.jpg", category: "Carpentry" },

  { id: "ms1", title: "Men's haircut & shave", price: 299, duration: 45, bullets: ["Haircut & styling", "Beard trim"], image: "/images/services/mens-hair.jpg", category: "Salon" },
  { id: "ms2", title: "Head massage", price: 249, duration: 30, bullets: ["Relaxing massage", "Oil therapy"], image: "/images/services/head-massage.jpg", category: "Salon" },

  { id: "ws1", title: "Haircut & Styling", price: 499, duration: 60, bullets: ["Haircut", "Blow-dry"], image: "/images/services/haircut.jpg", category: "Salon" },
  { id: "ws2", title: "Facial & Glow", price: 599, duration: 45, bullets: ["Deep cleanse", "Glow mask"], image: "/images/services/facial.jpg", category: "Salon" },
  { id: "ws3", title: "Manicure & Pedicure", price: 399, duration: 40, bullets: ["Nail care", "Polish"], image: "/images/services/manicure.jpg", category: "Salon" },

  { id: "wp1", title: "RO installation", price: 1999, duration: 120, bullets: ["Full installation", "Leak test"], image: "/images/services/ro-install.jpg", category: "WaterPurifier" },
  { id: "wp2", title: "Filter replacement", price: 599, duration: 40, bullets: ["Replace cartridges", "Sanitize unit"], image: "/images/services/filter.jpg", category: "WaterPurifier" }
];

const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected for seeding");

    // Clear collections if they exist
    const collectionsToClear = ["services", "users", "bookings", "admins"];
    for (const col of collectionsToClear) {
      if (mongoose.connection.collections[col]) {
        await mongoose.connection.collections[col].deleteMany({});
      }
    }
    console.log("Cleared collections: Service, User, Booking, Admin");

    // Insert ALL services
    // If your Service schema enforces uniqueness on `id` or `title`, adjust accordingly.
    // We'll map `id` -> `_id` if needed by schema; otherwise insert as-is.
    const servicesPayload = allServices.map(s => ({
      title: s.title,
      // include all available fields - schema will pick what it needs
      externalId: s.id,
      price: s.price,
      duration: s.duration,
      rating: s.rating,
      reviews: s.reviews,
      bullets: s.bullets,
      image: s.image,
      category: s.category,
      description: s.description || "",
    }));

    const createdServices = await Service.insertMany(servicesPayload);
    console.log(`✅ Created ${createdServices.length} services`);

    // Create a sample user
    const userPassword = process.env.SEED_USER_PASSWORD || "user1234";
    const userHash = bcrypt.hashSync(userPassword, 10);
    const user = await User.create({
      name: "Seed User",
      email: process.env.SEED_USER_EMAIL || "user@example.com",
      passwordHash: userHash,
    });
    console.log(`✅ Created user ${user.email} / ${userPassword}`);

    // Create admin (make sure Admin schema fields are filled)
    const adminPassword = process.env.SEED_ADMIN_PASSWORD || "admin1234";
    const adminHash = bcrypt.hashSync(adminPassword, 10);

    const adminSchemaPaths = Admin.schema.paths;
    const adminObj = {};
    if (adminSchemaPaths.name) adminObj.name = "Seed Admin";
    if (adminSchemaPaths.email) adminObj.email = process.env.SEED_ADMIN_EMAIL || "admin@example.com";
    if (adminSchemaPaths.passwordHash) adminObj.passwordHash = adminHash;

    const createdAdmin = await Admin.create(adminObj);
    console.log(`✅ Created admin ${createdAdmin.email} / password: ${adminPassword}`);

    // Create a booking safely — only set fields that exist on Booking schema
    const bookingSchema = Booking.schema;
    const bookingObj = {};

    if (bookingSchema.path("service")) bookingObj.service = createdServices[0]._id;
    if (bookingSchema.path("customer")) bookingObj.customer = user._id;

    const statusPath = bookingSchema.path("status");
    if (statusPath && Array.isArray(statusPath.enumValues) && statusPath.enumValues.length > 0) {
      bookingObj.status = statusPath.enumValues[0];
    } else {
      bookingObj.status = "pending";
    }

    if (bookingSchema.path("scheduledAt")) {
      bookingObj.scheduledAt = new Date();
    } else if (bookingSchema.path("date")) {
      bookingObj.date = new Date();
    }

    if (bookingSchema.path("price")) {
      bookingObj.price = createdServices[0].price || 100;
    }
    if (bookingSchema.path("notes")) bookingObj.notes = "Seed booking";

    if (bookingObj.service && bookingObj.customer) {
      const createdBooking = await Booking.create(bookingObj);
      console.log("✅ Created booking:", createdBooking._id.toString());
    } else {
      console.log("ℹ️ Booking creation skipped because required refs missing");
    }

    // Disconnect
    await mongoose.disconnect();
    console.log("✅ Seeding finished, disconnected from DB");
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err.message || err);
    console.error(err.stack || "");
    try { await mongoose.disconnect(); } catch (e) {}
    process.exit(1);
  }
};

seedData();
