var TaskInstance = require('../models/taskinstance');


// Display list of all TaskInstances.
exports.taskinstance_list = function(req, res) {

	TaskInstance.find()
		.populate('task')
		.exec(function (err, list_taskinstances) {
			if(err) {return next(err); }
			res.render('admin/taskinstance_list', {title: "TaskInstance List", taskinstance_list: list_taskinstances})
		});
};

// Display detail page for a specific taskinstance.
exports.taskinstance_detail = function(req, res) {
    
    TaskInstance.findById(req.params.id)
    	.populate('task')
    	.exec(function (err, taskinstance) {
    		if(err) {return next(err)}
    		if(taskinstance == null) {
    			var err = new Error('Task not found')
    			err.status = 404;
    			return nex(err);
    		}

    		res.render('admin/taskinstance_detail', {title: 'Task', taskinstance: taskinstance})
    	})
};

// Display taskinstance create form on GET.
exports.taskinstance_create_get = function(req, res) {
	res.render('admin/taskinstance_form', { title: 'Create TaskInstance' });
};

// Handle taskinstance create on POST.
exports.taskinstance_create_post = [    
    (req, res, next) => {

        // Extract the validation errors from a request.

        // Create a BookInstance object with escaped and trimmed data.
        var taskinstance = new TaskInstance(
          { name: req.body.name,
            taskInstance_number: req.body.taskinstance_number,
            task: null
           });

            // Data from form is valid
            taskinstance.save(function (err) {
                if (err) { return next(err); }
                   // Successful - redirect to new record.
                   res.redirect(taskinstance.url);
                });
    }
];

// Display taskinstance delete form on GET.
exports.taskinstance_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: taskinstance delete GET');
};

// Handle taskinstance delete on POST.
exports.taskinstance_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: taskinstance delete POST');
};

// Display taskinstance update form on GET.
exports.taskinstance_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: taskinstance update GET');
};

// Handle taskinstance update on POST.
exports.taskinstance_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: taskinstance update POST');
};