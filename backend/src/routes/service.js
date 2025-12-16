// routes/service.js
const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const Service = require("../models/Service"); // adjust path if necessary

// Simple slugify helper for service titles
function slugify(str = "") {
  return String(str)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// helper: is value a valid Mongo ObjectId string?
function isObjectIdLike(value) {
  return typeof value === "string" && /^[0-9a-fA-F]{24}$/.test(value);
}

// Multer storage config -> store files in ./uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, ".", "uploads");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, name);
  },
});

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    const allowed = /jpeg|jpg|png|webp|gif/;
    const ext = path.extname(file.originalname).toLowerCase().replace(".", "");
    if (allowed.test(ext)) cb(null, true);
    else cb(new Error("Only images are allowed"));
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});

/**
 * GET /api/services
 * Optional query:
 *   ?category=water-purifier   -> only services in that category
 */
router.get("/", async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) {
      filter.category = req.query.category;
    }

    const services = await Service.find(filter).sort({ createdAt: -1 }).lean();
    res.json(services);
  } catch (err) {
    console.error("GET /api/services error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET single service by ObjectId OR slug (e.g. "el1")
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    let svc;
    if (isObjectIdLike(id)) {
      // looks like a Mongo ObjectId
      svc = await Service.findById(id);
    } else {
      // treat as slug (e.g. "el1", "electrical-repair")
      svc = await Service.findOne({ slug: id });
    }

    if (!svc) return res.status(404).json({ message: "Not found" });
    res.json(svc);
  } catch (err) {
    console.error("GET /api/services/:id error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * Create service
 * Accepts multipart/form-data with optional file field "image"
 * Fields:
 *  - title (required)
 *  - description (optional)
 *  - price or basePrice (optional)
 *  - category (optional: stored as slug, e.g. "water-purifier")
 *  - imageUrl (optional string) or image file (multipart)
 */
router.post("/", upload.single("image"), async (req, res) => {
  try {
    console.log("==== /api/services POST called ====");
    console.log("req.body:", req.body);
    console.log(
      "req.file:",
      req.file
        ? {
            fieldname: req.file.fieldname,
            originalname: req.file.originalname,
            filename: req.file.filename,
            path: req.file.path,
            size: req.file.size,
          }
        : null
    );

    const { title, description, category } = req.body;
    const rawPrice = req.body.price ?? req.body.basePrice;

    if (!title) return res.status(400).json({ message: "Title is required" });

    const basePrice =
      rawPrice !== undefined && rawPrice !== "" ? Number(rawPrice) : 0;

    // prefer uploaded file; otherwise fall back to provided imageUrl/image fields
    const imageUrl = req.file
      ? `/uploads/${req.file.filename}`
      : req.body.imageUrl || req.body.image || "";

    // category slug: if frontend sends something, use it; otherwise 'general'
    const categorySlug = (category && category.trim()) || "general";

    // service slug: can be passed in body or derived from title
    const serviceSlug = req.body.slug ? req.body.slug : slugify(title);

    const svc = new Service({
      title,
      slug: serviceSlug,
      category: categorySlug,
      description: description || "",
      basePrice,
      imageUrl,
    });

    await svc.save();
    res.status(201).json(svc);
  } catch (err) {
    console.error("POST /api/services error:", err);
    if (
      err instanceof multer.MulterError ||
      err.message === "Only images are allowed"
    ) {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/services/:id -> update service (optional image)
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { title, description, category, slug } = req.body;
    const rawPrice = req.body.price ?? req.body.basePrice;

    const svc = await Service.findById(req.params.id);
    if (!svc) return res.status(404).json({ message: "Not found" });

    if (title !== undefined) {
      svc.title = title;
      // regenerate slug if none provided but title changed
      if (!slug && !svc.slug) {
        svc.slug = slugify(title);
      }
    }
    if (description !== undefined) svc.description = description;

    if (category !== undefined && category !== "") {
      svc.category = category;
    }

    if (slug !== undefined && slug !== "") {
      svc.slug = slug;
    }

    if (rawPrice !== undefined && rawPrice !== "") {
      svc.basePrice = Number(rawPrice);
    }

    // If new file uploaded -> delete old file and set new imageUrl
    if (req.file) {
      if (svc.imageUrl) {
        try {
          const oldPath = path.join(
            __dirname,
            ".",
            svc.imageUrl.replace(/^\//, "")
          );
          if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        } catch (e) {
          console.warn("Failed to remove old image", e);
        }
      }
      svc.imageUrl = `/uploads/${req.file.filename}`;
    } else {
      // allow client to set imageUrl via body
      if (req.body.imageUrl !== undefined) svc.imageUrl = req.body.imageUrl;
      if (req.body.image !== undefined && !svc.imageUrl)
        svc.imageUrl = req.body.image;
    }

    await svc.save();
    console.log("Updated service:", svc);
    res.json(svc);
  } catch (err) {
    console.error("PUT /api/services/:id error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/services/:id
router.delete("/:id", async (req, res) => {
  try {
    console.log("==== /api/services DELETE called ====", req.params.id);
    const svc = await Service.findById(req.params.id);
    if (!svc) return res.status(404).json({ message: "Not found" });

    if (svc.imageUrl) {
      try {
        const filePath = path.join(
          __dirname,
          ".",
          svc.imageUrl.replace(/^\//, "")
        );
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      } catch (e) {
        console.warn("Failed to remove service image:", e);
      }
    }

    await Service.deleteOne({ _id: svc._id });
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error("DELETE /api/services/:id error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
