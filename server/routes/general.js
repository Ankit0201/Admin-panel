var express = require('express');
const { getUser, getDashboardStats } = require('../controllers/general');
var router = express.Router();

/* GET users listing. */


router.get("/user/:id",getUser);
router.get("/dashboard",getDashboardStats);

module.exports = router;
