var SectionInstance = require('../models/sectioninstance');
var Section = require('../models/section');
var async = require('async')


exports.section_instance_overview = function(req, res, next) {
    async.parallel({
        sectioninstances: function(callback) {
            SectionInstance.find(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        res.render('index', { title: 'Overview', sectioninstances: results.sectioninstances});
    });
}



exports.section_instance_overview_section = function(req, res, next) {
    SectionInstance.findById(req.params.id)
        .populate({path: 'section', populate: {path: 'taskinstance', populate: {path: 'task'}}})
        .exec(function (err, sectioninstance) {
            if(err) {return next(err)}
            if(sectioninstance == null) {
                var err = new Error('Section not found')
                err.status = 404;
                return next(err);
            }

            res.render('section_overview', {title: 'Section Instance', sectioninstance: sectioninstance})
        })
}

exports.section_to_editor = function(req, res, next) {   
    async.parallel({
        section: function (callback) {
            Section.findById(req.params.id)
            .populate({path: 'taskinstance', populate: {path: 'task'}})
            .exec(callback)
        },
        sectioninstance: function (callback) {
            SectionInstance.find({ 'section': req.params.id })
                .exec(callback)
        },
    }, function (err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.section == null) { // No results.
            var err = new Error('Sectioninstance not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('editor', { title: 'Section', section: results.section, sectioninstance: results.sectioninstance });
    });
};

// Display list of all TaskInstances.
exports.sectioninstance_list = function(req, res) {
	SectionInstance.find()
		.populate('section')
        .sort([['suffix', 'ascending']])
		.exec(function (err, list_sectioninstances) {
			if(err) {return next(err); }
			res.render('admin/sectioninstance_list', {title: "Section-Instance Übersicht", sectioninstance_list: list_sectioninstances})
		});
};

// Display detail page for a specific taskinstance.
exports.sectioninstance_detail = function(req, res, next) {
    SectionInstance.findById(req.params.id)
    	.populate({path: 'section',options:{sort:{suffix: 'ascending'}}, populate: {path: 'taskinstance',options:{sort:{suffix: 'ascending'}}, populate: {path: 'task', options:{sort:{suffix: 'ascending'}}}}})
    	.exec(function (err, sectioninstance) {
    		if(err) {return next(err)}
    		if(sectioninstance == null) {
    			var err = new Error('Section not found')
    			err.status = 404;
    			return next(err);
    		}

    		res.render('admin/sectioninstance_detail', {title: 'Section Instance', sectioninstance: sectioninstance})
    	})
};

// Display taskinstance create form on GET.
exports.sectioninstance_create_get = function(req, res) {
    async.parallel({
        sections: function(callback) {
            Section.find(callback)
            .sort([['suffix', 'ascending']]);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        res.render('admin/sectioninstance_form', { title: 'Erstelle neue Section-Instance',sections:results.sections});
    });
};

// Handle taskinstance create on POST.
exports.sectioninstance_create_post = [    
    (req, res, next) => {
        if(!(req.body.section instanceof Array)){
            if(typeof req.body.section==='undefined')
            req.body.section=[];
            else
            req.body.section=new Array(req.body.section);
        }
        next();
    },
    (req, res, next) => {
        // Extract the validation errors from a request.

        // Create a BookInstance object with escaped and trimmed data.
        var sectioninstance = new SectionInstance(
          { name: req.body.name,
            sectionInstance_number: req.body.sectionInstance_number,
            section: req.body.section
           });

            // Data from form is valid
            sectioninstance.save(function (err) {
                if (err) { return next(err); }
                   // Successful - redirect to new record.
                   res.redirect(sectioninstance.url);
                });
    }
];

// Display taskinstance delete form on GET.
exports.sectioninstance_delete_get = function(req, res) {

};

// Handle taskinstance delete on POST.
exports.sectioninstance_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: taskinstance delete POST');
};

// Display taskinstance update form on GET.
exports.sectioninstance_update_get = function(req, res, next) {
    async.parallel({
        sectioninstance: function(callback) {
            SectionInstance.findById(req.params.id)
            .sort([['suffix', 'ascending']])
            .populate('section').exec(callback);
        },
        sections: function(callback) {
            Section.find(callback)
            .sort([['suffix', 'ascending']])
        },

        }, function(err, results) {
            if (err) { return next(err); }
            if (results.sectioninstance==null) { // No results.
                var err = new Error('SectionInstance  not found');
                err.status = 404;
                return next(err);
            }

            if(results.sectioninstance.section !== null) {
                for (var i = 0; i < results.sections.length; i++) {
                    for (var j = 0; j < results.sectioninstance.section.length; j++) {
                        if (results.sections[i]._id.toString()==results.sectioninstance.section[j]._id.toString()) {
                            results.sections[i].checked='true';
                        }
                    }
                }
            }
            // Success.
            res.render('admin/sectioninstance_form', { title: 'Update  SectionInstance', sections : results.sections, sectioninstance:results.sectioninstance });
    });
};

// Handle taskinstance update on POST.
exports.sectioninstance_update_post = [
    (req, res, next) => {
        SectionInstance.findByIdAndUpdate(req.params.id, 
        { '$set': 
            {   name: req.body.name,
                sectionInstance_number: req.body.sectionInstance_number,
                section: req.body.section,
            } 
        }, function (err,thesectioninstance) {
            if (err) { return next(err); }
               res.redirect(thesectioninstance.url);
            });
        }
];