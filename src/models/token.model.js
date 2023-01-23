import mongoose from 'mongoose';

const tokenSchema =  new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, ref:"user"},
    refreshToken:{type:String, default:""}
})

const Token = mongoose.models.token || mongoose.model("token", tokenSchema)
export default Token;