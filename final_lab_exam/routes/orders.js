const express = require('express');
const router = express.Router();
const Order = require('../models/order');

router.post('/orders', async (req, res) => {
  const { customer, items, total, date } = req.body;

  if (!customer || !items || !total) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const newOrder = new Order({ customer, items, total, date });
    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
