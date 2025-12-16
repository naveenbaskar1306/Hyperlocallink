// backend/src/routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

const router = express.Router();

// Models
const User = require('../models/User');
let Admin = require('../models/Admin'); // may be CommonJS or ESM

// If Admin was exported as ESM default (export default ...), require returns an object:
// { default: Model } — normalize to the actual model if needed.
if (Admin && Admin.default) {
  Admin = Admin.default;
}

// Load env (ensures JWT_SECRET available even if called from different cwd)
require('dotenv').config({ path: path.resolve(process.cwd(), './.env') });

const JWT_SECRET = process.env.JWT_SECRET || 'change-me-in-production';

// ------------------------------------------------------------------
// Helper: generate token
function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

// ------------------------------------------------------------------
// Register endpoint (user registration)
// (leave as-is — admin registration usually done via seeder or protected route)
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      passwordHash: hash,
      role: role || 'customer'
    });

    const token = generateToken({ id: user._id, role: user.role });

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ------------------------------------------------------------------
// Login endpoint — supports Admin and User
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Missing email or password' });
    }

    // Try Admin first (so admin@example.com logs in as admin)
    let admin = null;
    try {
      // Admin might be undefined if model file missing — guard it
      if (Admin && typeof Admin.findOne === 'function') {
        admin = await Admin.findOne({ email }).lean();
      } else {
        // attempt dynamic require/resolution (robust in case of path mismatches)
        try {
          let dynamicAdmin = require('../models/Admin');
          if (dynamicAdmin && dynamicAdmin.default) dynamicAdmin = dynamicAdmin.default;
          if (dynamicAdmin && typeof dynamicAdmin.findOne === 'function') {
            admin = await dynamicAdmin.findOne({ email }).lean();
          }
        } catch (innerErr) {
          // ignore - we'll fallback to user lookup
          console.warn('Admin model dynamic require failed (will fallback to user lookup):', innerErr && innerErr.message);
        }
      }
    } catch (e) {
      // If Admin model not present or other error, log and continue
      // (don't fail because Admin model missing)
      if (e && e.code === 'MODULE_NOT_FOUND') {
        console.warn('Admin model not found, skipping admin lookup');
      } else {
        console.error('Admin lookup error:', e);
      }
    }

    if (admin) {
      // admin.passwordHash must exist in admin doc
      const ok = await bcrypt.compare(password, admin.passwordHash || '');
      if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

      // Create token with admin role
      const token = generateToken({ id: admin._id, role: 'admin' });

      return res.json({
        token,
        user: { id: admin._id, name: admin.name || 'Admin', email: admin.email, role: 'admin' }
      });
    }

    // Fallback to regular user
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const okUser = await bcrypt.compare(password, user.passwordHash || '');
    if (!okUser) return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken({ id: user._1d, role: user.role || 'customer' });

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role || 'customer' }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
