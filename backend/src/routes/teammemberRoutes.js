const express = require('express');
const router = express.Router();
const { getTeamMembers, createTeamMember, deleteTeamMember } = require('../controllers/teammemberController');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(getTeamMembers)
  .post(protect, createTeamMember);

router.route('/:id')
  .delete(protect, deleteTeamMember);

module.exports = router;
