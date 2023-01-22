import mongoose from 'mongoose'

const todoSchema  =  new mongoose.Schema({
    title:{type:String, required:true, min:3},
    description:{type:String, required:true},
    user:{type:mongoose.Schema.Types.ObjectId, ref:"user"},
    label:{type:mongoose.Schema.Types.ObjectId, ref:"label"},
    isCompleted:{type:Boolean, default:false},
    color:{type:String, required:false, default:"#ffffff"},
})

const Todo = mongoose.models.todo||mongoose.model('todo', todoSchema)
export default Todo;

