var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TaskInstanceSchema = new Schema(
  {
    taskInstance_number: {type: Number, required: true},
    name: {type: String, required: true, max: 100},
    task: [{type: Schema.Types.ObjectId, ref: 'Task'}]
  }
);

// Virtual for author's URL
TaskInstanceSchema
.virtual('url')
.get(function () {
  return '/taskinstance/' + this._id;
});


//Export model
module.exports = mongoose.model('TaskInstance', TaskInstanceSchema);