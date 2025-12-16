const Booking = require('../models/Booking');

async function listBookings(req, res) {
  try {
    const { page = 1, perPage = 20 } = req.query;

    const bookings = await Booking.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * perPage)
      .limit(parseInt(perPage))
      .populate('customer', 'name email')      // ✅ FIXED
      .populate('service', 'title basePrice'); // keep same

    res.json(bookings);
  } catch (err) {
    console.error("Admin booking list error:", err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function updateBookingStatus(req, res) {
  try {
    const { status } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )
      .populate('customer', 'name email')  // populate here too
      .populate('service', 'title basePrice');

    if (!booking) return res.status(404).json({ message: 'Not found' });

    res.json(booking);
  } catch (err) {
    console.error("Admin update booking error:", err);
    res.status(400).json({ message: 'Bad request' });
  }
}

module.exports = { listBookings, updateBookingStatus };
