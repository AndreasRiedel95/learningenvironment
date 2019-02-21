var express = require('express');
var router = express.Router();
var section_instance_controller = require('../controllers/sectioninstanceController');

/* GET home page. */
router.get('/', section_instance_controller.section_instance_overview)

router.get('/:id/overview', section_instance_controller.section_instance_overview_section)

router.get('/editor/:id', section_instance_controller.section_to_editor)

module.exports = router;


