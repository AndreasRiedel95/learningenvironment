var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SectionSchema = new Schema(
  {
    section_number: {type: Number, required: true},
    name: {type: String, required: true, max: 100},
    description: {type: String, required: true},
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