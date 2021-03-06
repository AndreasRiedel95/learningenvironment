var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TaskSchema = new Schema(
  {
    task_number: {type: Number, required: true},
    name: {type: String, required: true, max: 100},
    description: {type: String, required: true},
    suffix: {type: String, required: true, unique: true},
    task_solved: {type: Boolean, required: true, default: false}
  }
);

// Virtual for author's URL
TaskSchema
.virtual('url')
.get(function () {
  return '/admin/task/' + this._id;
});


//Export model
module.exports = mongoose.model('Task', TaskSchema);