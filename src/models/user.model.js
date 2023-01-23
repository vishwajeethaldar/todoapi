import mongoose, { Mongoose } from 'mongoose'

const usersSchema  =  new mongoose.Schema({
    name:{type:String, required:true, min:3},
    email:{type:String, required:true},
    password:{type:String, required:true, min:8},
    avatar:{type:String, required:false},
    otp:{type:String, required:false},
    todoLabels:{type:[mongoose.Schema.Types.ObjectId], default:[], ref:"label"},
    todos:{type:[mongoose.Schema.Types.ObjectId], default:[], ref:"todo"},
    role:{type:String, enum:["admin","user","su"]},
    accountStatus:{type:String, enum:["active","hold","blocked"], default:"hold"},
    lastlogin:{type:String, enum:["admin","user","su"]}
},{timestamps:true})

const User = mongoose.models.user||mongoose.model('user', usersSchema)
export default User;

