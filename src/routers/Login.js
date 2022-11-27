const express = require('express');
const router = express.Router();

const loginController = require('../controllers/authController');

router.get('/login-user', loginController.formLogin)
router.post('/', loginController.handledLogin);

module.exports = router;