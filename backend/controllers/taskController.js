var Task = require('../models/task');
var TaskInstance = require('../models/taskinstance')
var async = require('async');

// Display list of all tasks.
exports.task_list = function(req, res, next) {
	Task.find()
		.sort([['name', 'ascending']])
		.exec(function (err, list_tasks) {
			if (err) { return next(err); }
			// Successful, so render.
			res.render('admin/task_list', { title: 'Task List', list_tasks:  list_tasks});
	});
};

// Display detail page for a specific task.
exports.task_detail = function(req, res, next) {
	async.parallel({
		task: function(callback) {
			Task.findById(req.params.id)
				.exec(callback);
		},
		task_instance: function(callback) {
			TaskInstance.find({ 'task': req.params.id })
				.exec(callback);
		},
	}, function(err, results) {
		if (err) { return next(err); }
		if (results.task==null) { // No results.
			var err = new Error('Task not found');
			err.status = 404;
			return next(err);
		}
	// Successful, so render.
		res.render('admin/task_detail', { title: 'Task Detail', task: results.task, task_instance: results.task_instance } );
	});
};

// Display task create form on GET.
exports.task_create_get = function(req, res) {
    res.render('admin/task_form', { title: 'Create Genre'});
};

// Handle task create on POST.
exports.task_create_post =  [
	(req, res, next) => {
		var task = new Task(
			{
				task_number: req.body.task_number,
				name: req.body.name,
				description: req.body.description,
				htmlCode_inital: req.body.htmlCode_inital,
				cssCode_inital: req.body.cssCode_inital,
				htmlCode_user: null,
				cssCode_user: null,
				task_solved: false
			}
		);

            Task.findOne({ 'name': req.body.name })
                .exec( function(err, found_task) {
                     if (err) { return next(err); }

                     if (found_task) {
                         // Task exists, redirect to its detail page.
                         res.redirect(found_task.url);
                     }
                     else {

                         task.save(function (err) {
                           if (err) { return next(err); }
                           // Task saved. Redirect to genre detail page.
                           res.redirect(task.url);
                         });

                     }

                 });
        }
];


// Display task delete form on GET.
exports.task_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: task delete GET');
};

// Handle task delete on POST.
exports.task_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: task delete POST');
};

// Display task update form on GET.
exports.task_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: task update GET');
};

// Handle task update on POST.
exports.task_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: task update POST');
};