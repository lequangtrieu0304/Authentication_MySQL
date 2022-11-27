const express = require('express');
const router = express.Router();

const registerController = require('../controllers/registerController');

router.get('/add-user', registerController.formRegister)
router.post('/', registerController.handledRegister);

module.exports = router;