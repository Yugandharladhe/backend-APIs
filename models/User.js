const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    name: { type: String ,required:true,min:1},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,max:15,min:5}
  },
  { timestamps: true }
)



const User = mongoose.model('User', userSchema)
module.exports = User; 
