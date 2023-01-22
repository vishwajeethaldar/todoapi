import mongoose from 'mongoose'

const LabelSchema  =  new mongoose.Schema({
    title:{type:String, required:true, min:3},
    color:{type:String, required:false, default:"#ffffff"},
    user:{type:mongoose.Schema.Types.ObjectId, ref:"user", required:true},
    todos:{type:[mongoose.Schema.Types.ObjectId], ref:"todo"},
    isCompleted:{type:Boolean}
})

const Label = mongoose.models.label||mongoose.model('label', LabelSchema)
export default Label;

