var Section = require('../models/section');
var Task = require('../models/task');
var TaskInstance = require('../models/taskinstance');
var async = require('async');

//Pass sections to Student Overview
exports.section_overview = function(req, res, next) {
	async.parallel({
        sections: function(callback) {
            Section.find(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        res.render('index', { title: 'Overview', sections: results.sections});
    });
}

//Pass selected Section to Editor 
exports.section_to_editor = function(req, res, next) {   
	async.parallel({
		section: function(callback) {
			Section.findById(req.params.id)
  				.populate({path: 'taskinstance', populate: {path: 'task'}})
  				.exec(callback);
		},
	}, function(err, results) {
		if (err) { return next(err); }
		if (results.section==null) { // No results.
			var err = new Error('Section not found');
			err.status = 404;
			return next(err);
		}
		// Successful, so render.
		console.log(JSON.stringify(results.section))
		res.render('editor', { title: 'Overview', section: results.section} );
	});
};

// Display everything on Admin overview which is in the database
exports.admin = function(req, res, next) {   
	async.parallel({
		section_count: function(callback) {
			Section.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
		},
		task_count: function(callback) {
			Task.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
		},
		task_instance_count: function(callback) {
			TaskInstance.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
		}
	}, function(err, results) {
		res.render('admin/index', { title: 'Overview Admin', error: err, data: results });
	});
};


///SECTIONS////

// Display list of all sections.
exports.section_list = function(req, res, next) {
	Section.find()
		.populate('taskinstance')
		.exec(function (err, list_sections) {
			if(err) {return next(err); }
			res.render('admin/section_list', {title: "Section List", sections: list_sections})
		});
};

// Display detail page for a specific section.
exports.section_detail = function(req, res, next) {
	async.parallel({
		section: function(callback) {
			Section.findById(req.params.id)
  				.populate({path: 'taskinstance', populate: {path: 'task'}})
  				.exec(callback);
		},
	}, function(err, results) {
		if (err) { return next(err); }
		if (results.section==null) { // No results.
			var err = new Error('Secion not found');
			err.status = 404;
			return next(err);
		}
		// Successful, so render.
		res.render('admin/section_detail', { title: 'Create Section', section: results.section} );
	});
};

// Display section create form on GET.
exports.section_create_get = function(req, res, next) {
		async.parallel({
			taskinstances: function(callback) {
				TaskInstance.find(callback);
			},
	}, function(err, results) {
		if (err) { return next(err); }
		res.render('admin/section_form', { title: 'Create Sections',taskinstances:results.taskinstances});
	});
};

// Handle section create on POST.
exports.section_create_post = [
	(req, res, next) => {
		if(!(req.body.taskinstance instanceof Array)){
			if(typeof req.body.taskinstance==='undefined')
			req.body.taskinstance=[];
			else
			req.body.taskinstance=new Array(req.body.taskinstance);
		}
		next();
	},
	(req, res, next) => {
		// Create a Section object with escaped and trimmed data.
		var section = new Section({ 
			name: req.body.name,
			section_number: req.body.section_number,
			description: req.body.description,
			taskinstance: req.body.taskinstance,
		   });

			// Data from form is valid. Save book.
			section.save(function (err) {
				if (err) { return next(err); }
				   //successful - redirect to new book record.
				   res.redirect(section.url);
				});
		// }
	}
];

// Display section delete form on GET.
exports.section_delete_get = function(req, res) {
	res.send('NOT IMPLEMENTED: Section delete GET');
};

// Handle section delete on POST.
exports.section_delete_post = function(req, res) {
	res.send('NOT IMPLEMENTED: Section delete POST');
};

// Display section update form on GET.
exports.section_update_get = function(req, res, next) {
    async.parallel({
        section: function(callback) {
            Section.findById(req.params.id).populate('taskinstance').exec(callback)
        },
        taskinstances: function(callback) {
            TaskInstance.find(callback)
        },

        }, function(err, results) {
            if (err) { return next(err); }
            if (results.section==null) { // No results.
                var err = new Error('Section  not found');
                err.status = 404;
                return next(err);
            }
            for (var i = 0; i < results.taskinstances.length; i++) {
                for (var j = 0; j < results.section.taskinstance.length; j++) {
                    if (results.taskinstances[i]._id.toString()==results.section.taskinstance[j]._id.toString()) {
                        results.taskinstances[i].checked='true';
                    }
                }
            }
            // Success.
            res.render('admin/section_form', { title: 'Update  Section', taskinstances : results.taskinstances, section:results.section });
    });
};

// Handle section update on POST.
exports.section_update_post = [
    // Process request after validation and sanitization.
    (req, res, next) => {
        Section.findByIdAndUpdate(req.params.id, 
        { '$set': 
            {   
            	name: req.body.name,
                section_number: req.body.section_number,
                description: req.body.description,
                taskinstance: req.body.taskinstance,
            } 
        }, function (err,thetaskinstance) {
            if (err) { return next(err); }
               res.redirect(thetaskinstance.url);
            });
        }
];