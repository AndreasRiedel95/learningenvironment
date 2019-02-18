var express = require('express');
var router = express.Router();
var section_controller = require('../controllers/sectionController');

/* GET home page. */
router.get('/', section_controller.section_overview)

router.get('/editor/:id', section_controller.section_to_editor)

module.exports = router;


