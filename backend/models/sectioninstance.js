var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

var SectionInstanceSchema = new Schema(
  {
    sectionInstance_number: {type: Number, required: true },
    description: {type: String, max: 250},
    name: {type: String, required: true, max: 100},
    path_name: {type: String, required: true},
    section: [{type: Schema.Types.ObjectId, ref: 'Section'}]
  }
);

// Virtual for author's URL
SectionInstanceSchema
.virtual('url')
.get(function () {
  return '/admin/sectioninstance/' + this._id;
});

SectionInstanceSchema.plugin(AutoIncrement, {inc_field: 'sectioninstance_inc'});

//Export model
module.exports = mongoose.model('SectionInstance', SectionInstanceSchema);