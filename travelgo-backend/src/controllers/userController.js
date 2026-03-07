import User from '../models/User.js';

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId)
      .populate('bookings');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const updates = req.body;

    // Prevent password updates through this endpoint
    delete updates.password;

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const userId = req.userId;
    const { currentPassword, newPassword, confirmPassword } = req.body;

    const user = await User.findById(userId).select('+password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await user.matchPassword(currentPassword);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'New passwords do not match' });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addPaymentMethod = async (req, res) => {
  try {
    const userId = req.userId;
    const { cardNumber, cardHolder, expiryDate, cvv } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          paymentMethods: {
            cardNumber: cardNumber.slice(-4), // Store only last 4 digits for security
            cardHolder,
            expiryDate
          }
        }
      },
      { new: true }
    );

    res.json({
      message: 'Payment method added successfully',
      user
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
