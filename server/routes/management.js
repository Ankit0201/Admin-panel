var express = require('express');
const { getAdmins, getUserPerformance } = require('../controllers/management');
var router = express.Router();

/* GET users listing. */
router.get('/admins', getAdmins);
router.get('/performance/:id', getUserPerformance);

module.exports = router;
