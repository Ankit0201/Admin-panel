var express = require('express');
const { getSales } = require('../controllers/sales');
var router = express.Router();

/* GET users listing. */
router.get('/', getSales);

module.exports = router;
