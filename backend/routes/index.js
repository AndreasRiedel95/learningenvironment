var express = require('express');
var router = express.Router();
var section_controller = require('../controllers/sectionController');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/editor', section_controller.section_to_editor)

module.exports = router;


