const express = require('express');

const adminController = require('../controllers/admin');
const {authenticateUser} = require('../middlewares/auth');

const router = express.Router();

router.post('/addgroup',authenticateUser,adminController.addGroup);
router.get('/getgroups',authenticateUser,adminController.getGroups);

module.exports = router;