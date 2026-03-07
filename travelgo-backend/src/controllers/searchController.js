import Transport from '../models/Transport.js';

export const searchTransport = async (req, res) => {
  try {
    const { from, to, date, transportType } = req.query;

    // Build query
    const query = { active: true };

    if (from) query.from = { $regex: from, $options: 'i' };
    if (to) query.to = { $regex: to, $options: 'i' };
    if (transportType) query.type = transportType;

    // If date is provided, filter by date range
    if (date) {
      const dateObj = new Date(date);
      const nextDay = new Date(dateObj);
      nextDay.setDate(nextDay.getDate() + 1);

      query.departureTime = {
        $gte: dateObj,
        $lt: nextDay
      };
    }

    const transports = await Transport.find(query)
      .select('-seatMap') // Exclude detailed seat map for list view
      .sort({ departureTime: 1 });

    res.json({
      count: transports.length,
      data: transports
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTransportDetails = async (req, res) => {
  try {
    const { transportId } = req.params;

    const transport = await Transport.findById(transportId);

    if (!transport) {
      return res.status(404).json({ message: 'Transport not found' });
    }

    res.json(transport);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPopularRoutes = async (req, res) => {
  try {
    const routes = await Transport.aggregate([
      {
        $group: {
          _id: { from: '$from', to: '$to' },
          count: { $sum: 1 },
          avgRating: { $avg: '$rating' }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    res.json(routes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const filterByPrice = async (req, res) => {
  try {
    const { minPrice, maxPrice, from, to } = req.query;

    const query = { active: true };

    if (from) query.from = { $regex: from, $options: 'i' };
    if (to) query.to = { $regex: to, $options: 'i' };

    if (minPrice || maxPrice) {
      query['pricing.basePrice'] = {};
      if (minPrice) query['pricing.basePrice'].$gte = parseInt(minPrice);
      if (maxPrice) query['pricing.basePrice'].$lte = parseInt(maxPrice);
    }

    const transports = await Transport.find(query).sort({ 'pricing.basePrice': 1 });

    res.json({
      count: transports.length,
      data: transports
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
