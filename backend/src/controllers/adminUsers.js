// backend/src/controllers/adminUsers.js
const User = require('../models/User');

async function listUsers(req, res) {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}

async function updateUserRole(req, res) {
  try {
    const { role, blocked } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { role, blocked }, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'Not found' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: 'Bad request' });
  }
}

module.exports = { listUsers, updateUserRole };
