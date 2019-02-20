var TaskInstance = require('../models/taskinstance');
var Task = require('../models/task');
var async = require('async')


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
exports.taskinstance_detail = function(req, res, next) {
    TaskInstance.findById(req.params.id)
    	.populate('task')
    	.exec(function (err, taskinstance) {
    		if(err) {return next(err)}
    		if(taskinstance == null) {
    			var err = new Error('Task not found')
    			err.status = 404;
    			return next(err);
    		}

    		res.render('admin/taskinstance_detail', {title: 'Task Instance', taskinstance: taskinstance})
    	})
};

// Display taskinstance create form on GET.
exports.taskinstance_create_get = function(req, res) {
    async.parallel({
        tasks: function(callback) {
            Task.find(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        res.render('admin/taskinstance_form', { title: 'Create Task Instance',tasks:results.tasks});
    });
};

// Handle taskinstance create on POST.
exports.taskinstance_create_post = [    
    (req, res, next) => {
        if(!(req.body.task instanceof Array)){
            if(typeof req.body.task==='undefined')
            req.body.task=[];
            else
            req.body.task=new Array(req.body.task);
        }
        next();
    },
    (req, res, next) => {
        // Extract the validation errors from a request.

        // Create a BookInstance object with escaped and trimmed data.
        var taskinstance = new TaskInstance(
          { name: req.body.name,
            taskInstance_number: req.body.taskInstance_number,
            htmlCode_inital: req.body.htmlCode_inital,
            cssCode_inital: req.body.cssCode_inital,
            htmlCode_user: null,
            cssCode_user: null,
            task: req.body.task
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

};

// Handle taskinstance delete on POST.
exports.taskinstance_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: taskinstance delete POST');
};

// Display taskinstance update form on GET.
exports.taskinstance_update_get = function(req, res, next) {
    async.parallel({
        taskinstance: function(callback) {
            TaskInstance.findById(req.params.id).populate('task').exec(callback)
        },
        tasks: function(callback) {
            Task.find(callback)
        },

        }, function(err, results) {
            if (err) { return next(err); }
            if (results.taskinstance==null) { // No results.
                var err = new Error('Taskinstance  not found');
                err.status = 404;
                return next(err);
            }
            for (var i = 0; i < results.tasks.length; i++) {
                for (var j = 0; j < results.taskinstance.task.length; j++) {
                    if (results.tasks[i]._id.toString()==results.taskinstance.task[j]._id.toString()) {
                        results.tasks[i].checked='true';
                    }
                }
            }
            // Success.
            res.render('admin/taskinstance_form', { title: 'Update  TaskInstance', tasks : results.tasks, selected_task : results.taskinstance.task._id, taskinstance:results.taskinstance });
    });
};

// Handle taskinstance update on POST.
exports.taskinstance_update_post = [
    (req, res, next) => {
        TaskInstance.findByIdAndUpdate(req.params.id, 
        { '$set': 
            {   name: req.body.name,
                taskInstance_number: req.body.taskInstance_number,
                task: req.body.task,
            } 
        }, function (err,thetaskinstance) {
            if (err) { return next(err); }
               res.redirect(thetaskinstance.url);
            });
        }
];

// Handle taskinstance update (only user code)on button click.
exports.taskinstance_update_btn = function(req, res, next) {
    TaskInstance.findByIdAndUpdate(req.params.id, 
        { '$set': 
            { 
                htmlCode_user: req.body.htmlCode_user,
                cssCode_user: req.body.cssCode_user,
            } 
        }, function (err,thetaskinstance) {
            if (err) { return next(err); }
           console.log("Update yaaa")
        });
    }