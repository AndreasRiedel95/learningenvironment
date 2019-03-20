var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

var SectionSchema = new Schema(
  {
    section_number: {type: Number, default: null},
    name: {type: String, required: true, max: 100},
    path_name: {type: String, required: true},
    description: {type: String, required: true},
    shortdescription: {type: String, required: true, max: 200},
    taskinstance: [{type: Schema.Types.ObjectId, ref: 'TaskInstance'}]
  }
);

// Virtual for author's URL
SectionSchema
.virtual('url')
.get(function () {
  return '/admin/section/' + this._id;
});

SectionSchema.plugin(AutoIncrement, {inc_field: 'section_inc'});


//Export model
module.exports = mongoose.model('Section', SectionSchema);