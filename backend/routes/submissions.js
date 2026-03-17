const express = require('express');
const { body, validationResult } = require('express-validator');
const Submission = require('../models/Submission');
const { upload } = require('../config/cloudinary');
const protect = require('../middleware/auth');
const { sendNotification } = require('../config/mailer');

const router = express.Router();

const parseJsonFields = (req, res, next) => {
  try {
    if (typeof req.body.volunteer === 'string') req.body.volunteer = JSON.parse(req.body.volunteer);
    if (typeof req.body.location === 'string') req.body.location = JSON.parse(req.body.location);
    if (typeof req.body.donation === 'string') req.body.donation = JSON.parse(req.body.donation);
  } catch {
    return res.status(400).json({ message: 'Invalid JSON in form fields' });
  }
  next();
};

const submissionValidation = [
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 200 }),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('volunteer.name').trim().notEmpty().withMessage('Volunteer name is required'),
  body('volunteer.email').isEmail().withMessage('Valid volunteer email required'),
  body('volunteer.contact').trim().notEmpty().withMessage('Contact number is required'),
];

// POST /api/submissions — public
router.post(
  '/',
  (req, res, next) => {
    upload.array('images', 5)(req, res, (err) => {
      if (err) console.error('Upload error:', err.message);
      next();
    });
  },
  parseJsonFields,
  submissionValidation,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });

    try {
      const { title, description, importance, location, donation, volunteer, type } = req.body;

      const parsedLocation = location;
      const parsedDonation = donation || { amount: 0 };
      const parsedVolunteer = volunteer;

      const images = (req.files || []).map((f) => ({
        url: f.path,
        publicId: f.filename,
      }));

      const submission = await Submission.create({
        title,
        description,
        importance,
        location: parsedLocation,
        donation: parsedDonation,
        volunteer: parsedVolunteer,
        images,
        type: type || 'tangible',
      });

      sendNotification(submission).catch(() => {});

      res.status(201).json({ message: 'Submission received', submission });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// GET /api/submissions — public
router.get('/', async (req, res) => {
  try {
    const { type, status, from, to, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (type) filter.type = type;
    if (status) filter.status = status;
    if (from || to) {
      filter.createdAt = {};
      if (from) filter.createdAt.$gte = new Date(from);
      if (to) filter.createdAt.$lte = new Date(to);
    }

    const [submissions, total] = await Promise.all([
      Submission.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(Number(limit)),
      Submission.countDocuments(filter),
    ]);

    res.json({ submissions, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/submissions/:id — protected
router.get('/:id', protect, async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);
    if (!submission) return res.status(404).json({ message: 'Not found' });
    res.json(submission);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// PATCH /api/submissions/:id/status — protected
router.patch('/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['pending', 'approved', 'rejected'].includes(status))
      return res.status(400).json({ message: 'Invalid status' });

    const submission = await Submission.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!submission) return res.status(404).json({ message: 'Not found' });
    res.json(submission);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
