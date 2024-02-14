const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');

// @route   GET api/profile/me
// @desc    Get current user profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar']
    );

    if (!profile) {
      return res
        .status(404)
        .json({ msg: 'There is no profile for this user.' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: 'Server Error', error: err.message });
  }
});

// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
router.post(
  '/',
  [
    auth,
    check('status', 'Status is required').notEmpty(),
    check('skills', 'Skills is required').notEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      twitter,
      facebook,
      linkedin,
      instagram
    } = req.body;

    // Build profile object
    const profileFields = {
      user: req.user.id,
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills: skills ? skills.split(',').map((skill) => skill.trim()) : undefined,
      social: {
        youtube,
        twitter,
        facebook,
        linkedin,
        instagram
      }
    };

    try {
      // Update or create profile
      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true }
      );

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send({ msg: 'Server Error', error: err.message });
    }
  }
);

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);

    res.json(profiles); // TODO: Limit the number of profiles returned to 10
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: 'Server Error', error: err.message });
  }
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user id
// @access  Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(404).send({ msg: 'Profile not found' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).send({ msg: 'Profile not found' });
    }
    res.status(500).send({ msg: 'Server Error', error: err.message });
  }
});

// @route   DELETE api/profile
// @desc    Delete profile, user & posts
// @access  Private
router.delete('/', auth, async (req, res) => {
  try {
    // Remove user posts
    // await Post.deleteMany({ user: req.user.id });
    // Remove profile
    await Profile.findOneAndDelete({ user: req.user.id });
    // Remove user
    await User.findOneAndDelete({ _id: req.user.id });
    res.json({ msg: 'User baleted!' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: 'Server Error', error: err.message });
  }
});

// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private
router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'Title is required').notEmpty(),
      check('company', 'Company is required').notEmpty(),
      check('from', 'From date is required and needs to be from the past')
        .notEmpty()
        .custom((value, { req }) => {
          const fromDate = new Date(value);
          const toDate = req.body.to ? new Date(req.body.to) : new Date();
          return fromDate < toDate;
        })
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    const newExp = req.body;

    try {
      const profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $push: { experience: { $each: [newExp], $position: 0 } } },
        { new: true, useFindAndModify: false }
      );

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send({ msg: 'Server Error', error: err.message });
    }
  }
);

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Get remove index
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);

    profile.experience.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: 'Server Error', error: err.message });
  }
});

// @route   PUT api/profile/education
// @desc    Add profile education
// @access  Private
router.put(
  '/education',
  [
    auth,
    [
      check('school', 'School is required').notEmpty(),
      check('degree', 'Degree is required').notEmpty(),
      check('fieldofstudy', 'Field of study is required').notEmpty(),
      check('from', 'From date is required and needs to be from the past')
        .notEmpty()
        .custom((value, { req }) => {
          const fromDate = new Date(value);
          const toDate = req.body.to ? new Date(req.body.to) : new Date();
          return fromDate < toDate;
        })
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    const newEdu = req.body;

    try {
      const profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $push: { education: { $each: [newEdu], $position: 0 } } },
        { new: true, useFindAndModify: false }
      );

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send({ msg: 'Server Error', error: err.message });
    }
  }
);

// @route   DELETE api/profile/education/:edu
// @desc    Delete education from profile
// @access  Private
router.delete('/education/:edu', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Get remove index
    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);

    profile.education.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: 'Server Error', error: err.message });
  }
});

// @route   GET api/profile/github/:username
// @desc    Get user repos from Github
// @access  Public
router.get('/github/:username', async (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' }
    };

    request(options, (error, response, body) => {
      if (error) console.error(error);
      
      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: 'No Github profile found' });
      }
    
      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: 'Server Error', error: err.message });
  }
});

module.exports = router;
