var express = require('express');
var router = express.Router();

// Require controller modules.
var section_controller = require('../controllers/sectionController');
var task_controller = require('../controllers/taskController');
var task_instance_controller = require('../controllers/taskinstanceController');

//Get admin index
router.get('/', section_controller.admin);

// GET request for creating a section. NOTE This must come before routes that display section (uses id).
router.get('/section/create', section_controller.section_create_get);

// POST request for creating section.
router.post('/section/create', section_controller.section_create_post);

// GET request to delete section.
router.get('/section/:id/delete', section_controller.section_delete_get);

// POST request to delete section.
router.post('/section/:id/delete', section_controller.section_delete_post);

// GET request to update section.
router.get('/section/:id/update', section_controller.section_update_get);

// POST request to update section.
router.post('/section/:id/update', section_controller.section_update_post);

// GET request for one section.
router.get('/section/:id', section_controller.section_detail);

// GET request for list of all section items.
router.get('/sections', section_controller.section_list);


/// Task ROUTES ///

// GET request for creating a task. NOTE This must come before routes that display task (uses id).
router.get('/task/create', task_controller.task_create_get);

// POST request for creating task.
router.post('/task/create', task_controller.task_create_post);

// GET request to delete task.
router.get('/task/:id/delete', task_controller.task_delete_get);

// POST request to delete task.
router.post('/task/:id/delete', task_controller.task_delete_post);

// GET request to update task.
router.get('/task/:id/update', task_controller.task_update_get);

// POST request to update task.
router.post('/task/:id/update', task_controller.task_update_post);

// GET request for one task.
router.get('/task/:id', task_controller.task_detail);

// GET request for list of all task items.
router.get('/tasks', task_controller.task_list);


/// TASKINSTANCE ROUTES ///

// GET request for creating a BookInstance. NOTE This must come before route that displays BookInstance (uses id).
router.get('/taskinstance/create', task_instance_controller.taskinstance_create_get);

// POST request for creating taskinstance. 
router.post('/taskinstance/create', task_instance_controller.taskinstance_create_post);

// GET request to delete taskinstance.
router.get('/taskinstance/:id/delete', task_instance_controller.taskinstance_delete_get);

// POST request to delete taskinstance.
router.post('/taskinstance/:id/delete', task_instance_controller.taskinstance_delete_post);

// GET request to update taskinstance.
router.get('/taskinstance/:id/update', task_instance_controller.taskinstance_update_get);

// POST request to update taskinstance.
router.post('/taskinstance/:id/update', task_instance_controller.taskinstance_update_post);

// GET request for one taskinstance.
router.get('/taskinstance/:id', task_instance_controller.taskinstance_detail);

// GET request for list of all taskinstance.
router.get('/taskinstances', task_instance_controller.taskinstance_list);

router.post('/btn/taskinstance/:id/update', task_instance_controller.taskinstance_update_btn)


module.exports = router;