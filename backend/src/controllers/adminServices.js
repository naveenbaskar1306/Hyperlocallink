// controllers/adminServices.js
const path = require("path");
const fs = require("fs");
const Service = require("../models/Service"); // adjust path as necessary

/**
 * Admin controllers to create/update/delete services.
 * They normalize incoming fields (price -> basePrice, image -> imageUrl)
 */

async function listServices(req, res) {
  try {
    const services = await Service.find({}).sort({ createdAt: -1 }).lean();
    res.json(services);
  } catch (err) {
    console.error("admin listServices error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

async function createService(req, res) {
  try {
    // allow both JSON and multipart flows; mapping below expects req.body prepared.
    const payload = { ...(req.body || {}) };

    // map price -> basePrice
    if (payload.price !== undefined) {
      const p = payload.price;
      payload.basePrice = p === "" ? 0 : Number(p);
      delete payload.price;
    } else if (payload.basePrice !== undefined) {
      payload.basePrice = Number(payload.basePrice);
    } else {
      payload.basePrice = 0;
    }

    // map image -> imageUrl if provided as a path or url
    if (payload.image !== undefined && !payload.imageUrl) {
      payload.imageUrl = payload.image;
      delete payload.image;
    }

    // If using multipart (file uploaded by admin route) the actual file handling should be in the route
    // For safety, ensure imageUrl is a string
    payload.imageUrl = payload.imageUrl || "";

    const svc = new Service(payload);
    await svc.save();
    res.status(201).json(svc);
  } catch (err) {
    console.error("admin createService error:", err);
    res.status(400).json({ message: "Bad request" });
  }
}

async function getService(req, res) {
  try {
    const svc = await Service.findById(req.params.id);
    if (!svc) return res.status(404).json({ message: "Not found" });
    res.json(svc);
  } catch (err) {
    console.error("admin getService error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

async function updateService(req, res) {
  try {
    const update = { ...(req.body || {}) };

    if (update.price !== undefined) {
      update.basePrice = update.price === "" ? 0 : Number(update.price);
      delete update.price;
    }
    if (update.basePrice !== undefined) update.basePrice = Number(update.basePrice);

    if (update.image !== undefined && !update.imageUrl) {
      update.imageUrl = update.image;
      delete update.image;
    }

    // perform update
    const svc = await Service.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!svc) return res.status(404).json({ message: "Not found" });
    res.json(svc);
  } catch (err) {
    console.error("admin updateService error:", err);
    res.status(400).json({ message: "Bad request" });
  }
}

async function deleteService(req, res) {
  try {
    const svc = await Service.findById(req.params.id);
    if (!svc) return res.status(404).json({ message: "Not found" });

    // remove uploaded file if present
    if (svc.imageUrl) {
      try {
        const filePath = path.join(__dirname, "..", svc.imageUrl.replace(/^\//, ""));
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      } catch (e) {
        console.warn("Failed to remove admin service image:", e);
      }
    }

    await Service.deleteOne({ _id: svc._id });
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error("admin deleteService error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  listServices,
  createService,
  getService,
  updateService,
  deleteService,
};
