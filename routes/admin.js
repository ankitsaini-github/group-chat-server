const express = require('express');

const adminController = require('../controllers/admin');
const {authenticateUser} = require('../middlewares/auth');

const router = express.Router();

router.post('/addgroup',authenticateUser,adminController.addGroup);
router.get('/getgroups',authenticateUser,adminController.getGroups);
router.get('/groupmembers',authenticateUser,adminController.getGroupMembers);
router.post('/groupmembers',authenticateUser,adminController.addGroupMembers);
router.delete('/groupmembers',authenticateUser,adminController.removeGroupMembers);

module.exports = router;