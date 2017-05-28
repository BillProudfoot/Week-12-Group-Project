var express = require('express');
var router = express.Router();
var path = require('path');

router.use('/api/locations', require('./locationRouter'));
router.use('/api/walks', require('./walkRouter'));

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/../client/build/index.html'));
});


module.exports = router;
