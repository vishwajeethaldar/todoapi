import mongoose from 'mongoose'

const todoSchema  =  new mongoose.Schema({
    title:{type:String, required:true, min:3},
    description:{type:String, required:true},
    user:{type:mongoose.Schema.Types.ObjectId, ref:"user", required:true},
    label:{type:mongoose.Schema.Types.ObjectId, ref:"label", required:true},
    isCompleted:{type:Boolean, default:false},
    color:{type:String, required:false, default:"#ffffff"},
})

const Todo = mongoose.models.todo||mongoose.model('todo', todoSchema)
export default Todo;

