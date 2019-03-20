var mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

var Schema = mongoose.Schema;

var TaskInstanceSchema = new Schema(
  {
    taskInstance_number: {type: Number, default: null},
    name: {type: String, required: true, max: 100},
    htmlCode_inital: {type: String},
    cssCode_inital: {type: String},
    htmlCode_user: {type: String},
    cssCode_user: {type: String},
    path_name: {type: String, required: true},
    task: [{type: Schema.Types.ObjectId, ref: 'Task'}]
  }
);

// Virtual for author's URL
TaskInstanceSchema
.virtual('url')
.get(function () {
  return '/admin/taskinstance/' + this._id;
});

TaskInstanceSchema.plugin(AutoIncrement, {inc_field: 'taskinstance_inc'});

//Export model
module.exports = mongoose.model('TaskInstance', TaskInstanceSchema);