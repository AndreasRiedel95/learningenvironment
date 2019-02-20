var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TaskInstanceSchema = new Schema(
  {
    taskInstance_number: {type: Number, required: true},
    name: {type: String, required: true, max: 100},
    htmlCode_inital: {type: String},
    cssCode_inital: {type: String},
    htmlCode_user: {type: String},
    cssCode_user: {type: String},
    suffix: {type: String, required: true, unique: true},
    task: [{type: Schema.Types.ObjectId, ref: 'Task'}]
  }
);

// Virtual for author's URL
TaskInstanceSchema
.virtual('url')
.get(function () {
  return '/admin/taskinstance/' + this._id;
});


//Export model
module.exports = mongoose.model('TaskInstance', TaskInstanceSchema);