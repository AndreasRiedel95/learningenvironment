var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SectionSchema = new Schema(
  {
    section_number: {type: Number, required: true},
    name: {type: String, required: true, max: 100},
    description: {type: String, required: true},
    shortdescription: {type: String, required: true, max: 200},
    suffix: {type: String, required: true, unique: true},
    taskinstance: [{type: Schema.Types.ObjectId, ref: 'TaskInstance'}]
  }
);

// Virtual for author's URL
SectionSchema
.virtual('url')
.get(function () {
  return '/admin/section/' + this._id;
});


//Export model
module.exports = mongoose.model('Section', SectionSchema);