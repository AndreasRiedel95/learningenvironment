var Section = require('../models/section');
var Task = require('../models/task');
var TaskInstance = require('../models/taskinstance');
var async = require('async');


exports.index = function(req, res) {  
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
        res.render('admin', { title: 'Overview Home', error: err, data: results });
    });
};

exports.section_to_editor = function(req, res) {   
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
        res.render('editor', { title: 'Overview Home', error: err, data: results });
    });
};

exports.admin = function(req, res) {   
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
        res.render('admin/index', { title: 'Overview Home', error: err, data: results });
    });
};

// Display list of all sections.
exports.section_list = function(req, res) {
    
    Section.find({}, 'name taskinstance')
    .populate('taskinstance')
    .exec(function (err, list_sections) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('admin/section_list', { title: 'Section List', section_list: list_sections });
    });
};

// Display detail page for a specific section.
exports.section_detail = function(req, res) {
        async.parallel({
        section: function(callback) {
            Section.findById(req.params.id)
              .populate('taskinstance')
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
        res.render('admin/section_detail', { title: 'Title', section: results.section} );
    });
};

// Display section create form on GET.
exports.section_create_get = function(req, res) {
        res.render('admin/section_form', { title: 'Create Section' });
};

// Handle section create on POST.
exports.section_create_post = [
    (req, res, next) => {
        // Create a Book object with escaped and trimmed data.
        var section = new Section(
	      { name: req.body.name,
	        section_number: req.body.section_number,
	        description: req.body.description,
	        taskinstance: null,
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
exports.section_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Section update GET');
};

// Handle section update on POST.
exports.section_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Section update POST');
};