var Section = require('../models/section');
var Task = require('../models/task');
var TaskInstance = require('../models/taskinstance');
var SectionInstance = require('../models/sectioninstance');
var async = require('async');

// Display list of all sections.
exports.section_list = function(req, res, next) {
	Section.find()
		.populate('taskinstance')
		.sort([['suffix', 'ascending']])
		.exec(function (err, list_sections) {
			if(err) {return next(err); }
			res.render('admin/section_list', {title: "Section Übersicht", sections: list_sections})
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
		sectioninstance: function(callback) {
			SectionInstance.find({ 'section': req.params.id }).exec(callback);
		},
	}, function(err, results) {
		if (err) { return next(err); }
		if (results.section==null) { // No results.
			var err = new Error('Section not found');
			err.status = 404;
			return next(err);
		}
		// Successful, so render.
		res.render('admin/section_detail', { title: 'Section Detail', section: results.section, sectioninstance: results.sectioninstance} );
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
		res.render('admin/section_form', { title: 'Erstelle neue Section',taskinstances:results.taskinstances});
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
			section_number: null,
			description: req.body.description,
			shortdescription: req.body.shortdescription,
			suffix: req.body.suffix,
			taskinstance: req.body.taskinstance,
		});
		console.log(req.body)
		section.save(function (err) {
			if (err) { return next(err); }
			   //successful - redirect to new section record.
			   res.redirect(section.url);
		});
	}
];

// Display section delete form on GET.
exports.section_delete_get = function(req, res, next) {
	async.parallel({
		section: function(callback) {
			Section.findById(req.params.id).exec(callback);
		},
		sectioninstance: function(callback) {
			SectionInstance.find({ 'section': req.params.id }).exec(callback);
		},
	}, function(err, results) {
		if (err) { return next(err); }
		if (results.section==null) { // No results.
			res.redirect('/admin/sections');
		}
		// Successful, so render.
		res.render('admin/section_delete', { title: 'Lösche Section', section: results.section, sectioninstance: results.sectioninstance } );
	});

};

// Handle section delete on POST.
exports.section_delete_post = function(req, res, next) {
	async.parallel({
		section: function(callback) {
			Section.findById(req.params.id).exec(callback);
		},
		sectioninstance: function(callback) {
			SectionInstance.find({ 'section': req.params.id }).exec(callback);
		},
	}, function(err, results) {
		if (err) { return next(err); }
		// Success
		if (results.sectioninstance.length > 0) {
			// Taskinstnace has tasks.
			for(let i = 0; i<results.sectioninstance.length; i++) {
				results.sectioninstance[i].update(
					{ $pull: 
						{
							section: req.params.id
						}
					},function(err, numberAffected) {
						if (err) { return next(err); }
					}

				)
			}
		}
		//Delete object and redirect to the list of tasks.
		Section.findByIdAndRemove(req.body.id, function deleteSection(err) {
			if (err) { return next(err); }
			res.redirect('/admin/sections');
		});

	});

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
		if(results.section.taskinstance !== null) {
			for (var i = 0; i < results.taskinstances.length; i++) {
				for (var j = 0; j < results.section.taskinstance.length; j++) {
					if (results.taskinstances[i]._id.toString()==results.section.taskinstance[j]._id.toString()) {
						results.taskinstances[i].checked='true';
					}
				}
			}
		}
		// Success.
		res.render('admin/section_form', { title: 'Update  Section', taskinstances : results.taskinstances, section:results.section });
	});
};

// Handle section update on POST.
exports.section_update_post = [
	(req, res, next) => {
		Section.findByIdAndUpdate(req.params.id, 
		{ '$set': 
			{   
				name: req.body.name,
				description: req.body.description,
				shortdescription: req.body.shortdescription,
				suffix: req.body.suffix,
				taskinstance: req.body.taskinstance,
			} 
		}, function (err,thetaskinstance) {
			if (err) { return next(err); }
			   res.redirect(thetaskinstance.url);
			});
		}
];

exports.update_taskinstance_order = function(req, res, next) {
	console.log("hhh",req.body.objects)
    Section.findByIdAndUpdate(req.params.id, 
        { '$set': 
            {
                taskinstance: req.body.objects   
            }
        }, 
    function (err,thetaskinstance) {
        if (err) { return next(err); }
        return res.send({success: true});
    });
}



exports.section_udpate_order = function(req, res, next) {
    Section.findByIdAndUpdate(req.params.id, 
        { '$set': 
            { 
                section_number: req.body.position,
            } 
        }, function (err,numberAffected) {
            if (err) { return next(err); }
            return res.send({success: true});
        });

}