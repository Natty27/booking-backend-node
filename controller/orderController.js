const Order = require('../models/orderModel');

// Create a new order
// Create new order
exports.createOrder = async (req, res) => {
  // Destructure userDetails from req.body
  const {
    hotel: hotel,
    orderCode,
    checkIn,
    checkOut,
    bedType,
    duration,
    bedPrice,
    status,
    userDetails: { user,fullName, email, phone, city, kebele } // Correctly destructure userDetails
  } = req.body;

  // Convert duration and bedPrice to numbers if they are coming as strings
  const parsedDuration = parseInt(duration, 10);
  const parsedBedPrice = parseFloat(bedPrice);

  try {
    const newOrder = new Order({
      hotel: hotel,
      orderCode,
      checkIn,
      checkOut,
      bedType,
      duration: parsedDuration, // Use the parsed number
      bedPrice: parsedBedPrice, // Use the parsed number
      status,
      userDetails: {
        user,
        fullName,
        email,
        phone,
        city,
        kebele,
      },
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create order', error: err.message });
  }
};


// Update an existing order by ID
// Update an existing order by ID
exports.updateOrder = async (req, res) => {
  const {
    hotel,
    orderCode,
    checkIn,
    checkOut,
    bedType,
    duration,
    bedPrice,
    status,
    userDetails: { user, fullName, email, phone, city, kebele } // Destructure userDetails
  } = req.body;

  // Parse duration and bedPrice to numbers
  const parsedDuration = parseInt(duration, 10);
  const parsedBedPrice = parseFloat(bedPrice);

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        hotel,
        orderCode,
        checkIn,
        checkOut,
        bedType,
        duration: parsedDuration, // Use the parsed number
        bedPrice: parsedBedPrice, // Use the parsed number
        status,
        userDetails: {
          user,
          fullName,
          email,
          phone,
          city,
          kebele
        },
      },
      { new: true, runValidators: true } // Added runValidators to ensure validation on update
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order updated successfully', order: updatedOrder });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update order', error: err.message });
  }
};


// Get all orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('hotel');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get a single order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('hotel');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete an order by ID
exports.deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted successfully', order: deletedOrder });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete order', error: err.message });
  }
};
