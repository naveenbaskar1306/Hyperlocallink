// backend/src/controllers/adminStats.js
const Service = require('../models/Service');
const Booking = require('../models/Booking');
const User = require('../models/User');

async function getStats(req, res) {
  try {
    const [servicesCount, bookingsCount, usersCount] = await Promise.all([
      Service.countDocuments(),
      Booking.countDocuments(),
      User.countDocuments()
    ]);

    const bookingsByStatusAgg = await Booking.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const bookingsByStatus = bookingsByStatusAgg.reduce((acc, cur) => {
      acc[cur._id] = cur.count; return acc;
    }, {});

    res.json({
      servicesCount,
      bookingsCount,
      usersCount,
      bookingsByStatus
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { getStats };
