var Task = require('../models/task');
var TaskInstance = require('../models/taskinstance')
var async = require('async');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

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
		}
	}, function(err, results) {
		if (err) { return next(err); }
		if (results.task==null) { // No results.
			var err = new Error('Task not found');
			err.status = 404;
			return next(err);
		}
	// Successful, so render.
		console.log(results.task)
		res.render('admin/task_detail', { title: 'Task Detail', task: results.task} );
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
exports.task_update_get = function(req, res, next) {
    Task.findById(req.params.id, function(err, task) {
        if (err) { return next(err); }
        if (task==null) { // No results.
            var err = new Error('task not found');
            err.status = 404;
            return next(err);
        }
        // Success.
        res.render('admin/task_form', { title: 'Update Task', task: task });
    });

};

// Handle task update on POST.
exports.task_update_post = [
   
    // Validate that the name field is not empty.
    body('name', 'Title name required').isLength({ min: 1 }).trim(),
    
    // Sanitize (trim and escape) the name field.
    sanitizeBody('name').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request .
        const errors = validationResult(req);

    // Create a genre object with escaped and trimmed data (and the old id!)
        var task = new Task(
          {
			task_number: req.body.task_number,
			name: req.body.name,
			description: req.body.description,
			task_solved: false,
			_id: req.params.id
          }
        );


        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values and error messages.
            res.render('task_form', { title: 'Update Task', task: task, errors: errors.array()});
        return;
        }
        else {
            // Data from form is valid. Update the record.
            Task.findByIdAndUpdate(req.params.id, task, {}, function (err,thetask) {
                if (err) { return next(err); }
                   // Successful - redirect to genre detail page.
                   res.redirect(thetask.url);
                });
        }
    }
];
