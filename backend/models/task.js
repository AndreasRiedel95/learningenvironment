var mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

var Schema = mongoose.Schema;

var TaskSchema = new Schema(
  {
    task_number: {type: Number, default: null},
    name: {type: String, required: true, max: 100},
    description: {type: String, required: true},
    path_name: {type: String, required: true},
    task_solved: {type: Boolean, required: true, default: false}
  }
);


// Virtual for author's URL
TaskSchema
.virtual('url')
.get(function () {
  return '/admin/task/' + this._id;
});

TaskSchema.plugin(AutoIncrement, {inc_field: 'task_inc'});
//Export model
module.exports = mongoose.model('Task', TaskSchema);
