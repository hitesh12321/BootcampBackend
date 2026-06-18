const express = require('express');
const router = express.Router();
const {registerUser , generateAccessAndRefereshToken}  = require('../controllers/auth.controller');
const asyncHandler = require('../utils/async-error-handler');

router.post('/register', registerUser);

module.exports = router;