const express = require('express');
const router = express.Router();

const userController = require('../../controllers/userController');
const verify = require('../../middlewares/verifyJWT');

router.get('/get-all',verify.verifyJWT, userController.getAllUser)
// router.post('/', loginController.handledLogin);

module.exports = router;