var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SectionInstanceSchema = new Schema(
  {
    sectionInstance_number: {type: Number, required: true, unique: true},
    description: {type: String, max: 250},
    name: {type: String, required: true, max: 100},
    section: [{type: Schema.Types.ObjectId, ref: 'Section'}]
  }
);

// Virtual for author's URL
SectionInstanceSchema
.virtual('url')
.get(function () {
  return '/admin/sectioninstance/' + this._id;
});


//Export model
module.exports = mongoose.model('SectionInstance', SectionInstanceSchema);