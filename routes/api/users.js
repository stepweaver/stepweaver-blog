const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
  '/',
  [
    check('name', 'Name is required').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      // Create new user
      user = new User({
        name,
        email,
        password: await bcrypt.hash(password, 10)
      });

      await user.save();

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id
        }
      };

      res.send('User registered');
    } catch (err) {
      console.error(err.message);
      res.status(500).send({ msg: 'Server Error', error: err.message });
    }
  }
);

module.exports = router;
