var SectionInstance = require('../models/sectioninstance');
var Section = require('../models/section');
var async = require('async')
const fs = require('fs');
var path = require('path');

exports.admin = function(req, res, next) {   
        res.render('admin/index', { title: 'Admin Übersicht'});
};

//Render Sectioninstances to index.ejs
exports.section_instance_overview = function(req, res, next) {
    async.parallel({
        sectioninstances: function(callback) {
            SectionInstance.find(callback)
            .sort([['sectionInstance_number', 'ascending']]);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        res.render('index', { title: 'Overview', sectioninstances: results.sectioninstances});
    });
}

//Render Sectioninstances with section, taskinstances and tasks to section_overview.ejs
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

//Render Sectioninstances and Sections to editor
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
    .sort([['sectionInstance_number', 'ascending']])
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
        var sectioninstance = new SectionInstance(
            { 
                name: req.body.name,
                description: req.body.description,
                sectionInstance_number: req.body.sectionInstance_number,
                section: req.body.section
            }
        );

        sectioninstance.save(function (err) {
            if (err) { return next(err); }
               // Successful - redirect to new record.
               res.redirect(sectioninstance.url);
        });
    }
];

// Display sectioninstance delete form on GET.
exports.sectioninstance_delete_get = function(req, res, next) {
    async.parallel({
        sectioninstance: function(callback) {
            SectionInstance.findById(req.params.id).exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.sectioninstance==null) { // No results.
            res.redirect('/admin/sectioninstances');
        }
        // Successful, so render.
        res.render('admin/sectioninstance_delete', { title: 'Lösche Section-Instance', sectioninstance: results.sectioninstance } );
    });

};

// Handle sectioninstance delete on POST.
exports.sectioninstance_delete_post = function(req, res, next) {
    async.parallel({
        sectioninstance: function(callback) {
            SectionInstance.findById(req.params.id).exec(callback);
        }
    }, function(err, results) {
        if (err) { return next(err); }
        // Success
        //Delete object and redirect to the list of tasks.
        SectionInstance.findByIdAndRemove(req.body.id, function deleteSectionisntance(err) {
            if (err) { return next(err); }
            res.redirect('/admin/sectioninstances');
        });

    });

};

// Display sectioninstance update form on GET.
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
    }, 
    function(err, results) {
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

// Handle sectioninstance update on POST.
exports.sectioninstance_update_post = [
    (req, res, next) => {
        SectionInstance.findByIdAndUpdate(req.params.id, 
        { '$set': 
            {   name: req.body.name,
                description: req.body.description,
                sectionInstance_number: req.body.sectionInstance_number,
                section: req.body.section,
            } 
        }, function (err,thesectioninstance) {
            if (err) { return next(err); }

            res.redirect(thesectioninstance.url);
        });
    }
];

exports.sectioninstance_create_path = function(req, res, next) {
SectionInstance.findById(req.params.id)
    .populate({path: 'section',options:{sort:{suffix: 'ascending'}}, populate: {path: 'taskinstance',options:{sort:{suffix: 'ascending'}}, populate: {path: 'task', options:{sort:{suffix: 'ascending'}}}}})
    .exec(function (err, sectioninstance) {
        if(err) {return next(err)}
        if(sectioninstance == null) {
            var err = new Error('Section not found')
            err.status = 404;
            return next(err);
        }

        let sectioninstancePath = `./src/js/tests/sectioninstance${sectioninstance.sectionInstance_number}/section`
        ensureDirectoryExistence(sectioninstancePath)
        //REALLY BAD CODE STYLE
        if(sectioninstance.section !== null) {
            for(let i = 0; i<sectioninstance.section.length; i++) {
                let sectionPath = `./src/js/tests/sectioninstance${sectioninstance.sectionInstance_number}/section${sectioninstance.section[i].section_number}/section`
                ensureDirectoryExistence(sectionPath)
                if(sectioninstance.section[i].taskinstance !== null) {
                    for(let j = 0; j<sectioninstance.section[i].taskinstance.length; j++) {
                        if(sectioninstance.section[i].taskinstance[j].task !== null){
                            for(let k = 0; k < sectioninstance.section[i].taskinstance[j].task.length; k++) {
                                fs.appendFile(`./src/js/tests/sectioninstance${sectioninstance.sectionInstance_number}/section${sectioninstance.section[i].section_number}/test${sectioninstance.section[i].taskinstance[j].taskInstance_number}.js`, `//self.run${sectioninstance.section[i].taskinstance[j].task[k].task_number} – ${sectioninstance.section[i].taskinstance[j].task[k].name}, `, function(err) {
                                    if(err) {
                                        return console.log("file", err);
                                    }
                                    console.log("file was saved!");
                                });
                            }
                        }
                    }
                }
            }
        }

        function ensureDirectoryExistence(filePath) {
          var dirname = path.dirname(filePath);
          if (fs.existsSync(dirname)) {
            console.log("Folder already exsists")
            return true;
          }
          fs.mkdirSync(dirname);
          console.log("Folder saved")
        }

        res.render('admin/sectioninstance_create_path', {title: 'Section Instance Create Path', sectioninstance: sectioninstance, path: "Es wurden für diese Sectionsinstanzen die nötigen Dateien erstellt"})
    })
};


