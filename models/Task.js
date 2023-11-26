const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema(
  {
    taskName: { type: String ,required:true},
    assignedTo:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdBy:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    isCompleted:{type:Boolean,required:true,default:false}
  },
  { timestamps: true }
)



const Task = mongoose.model('Task', taskSchema)
module.exports = Task; 
