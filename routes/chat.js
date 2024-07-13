const express = require('express');

const chatController = require('../controllers/chat');
const {authenticateUser} = require('../middlewares/auth');

const router = express.Router();

router.get('/all',authenticateUser ,chatController.getAllChat);
router.post('/send',authenticateUser ,chatController.addChat);

module.exports = router;