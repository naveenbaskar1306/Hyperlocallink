// backend/src/utils/seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');

const services = [
  {
    title: "Women's Salon & Spa",
    category: 'Salon',
    basePrice: 499,
    durationMins: 60,
    description: 'Home salon for women — haircut, facial, pedicure and more',
    images: []
  },
  {
    title: "Men's Salon & Massage",
    category: 'Massage',
    basePrice: 399,
    durationMins: 45,
    description: 'Grooming and massage for men at home',
    images: []
  },
  {
    title: 'AC & Appliance Repair',
    category: 'Repair',
    basePrice: 799,
    durationMins: 90,
    description: 'AC servicing, installation and appliance repair',
    images: []
  },
  {
    title: 'Home Cleaning & Pest Control',
    category: 'Cleaning',
    basePrice: 699,
    durationMins: 120,
    description: 'Deep cleaning, regular cleaning and pest control services',
    images: []
  },
  {
    title: 'Electrician, Plumber & Carpenter',
    category: 'Maintenance',
    basePrice: 499,
    durationMins: 60,
    description: 'Minor electrical/plumbing/carpentry works at home',
    images: []
  }
];

async function seed() {
  try {
    // Connect to DB (no deprecated options)
    await mongoose.connect(process.env.MONGO_URI);
    console.log('DB connected');

    // Clear and insert
    await Service.deleteMany({});
    await Service.insertMany(services);

    console.log('Seed complete');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

// Run the seeder
seed();
