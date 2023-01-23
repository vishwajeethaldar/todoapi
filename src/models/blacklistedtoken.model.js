import mongoose from 'mongoose';

const blockedTokenSchema =  new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, ref:"user"},
    refresh:{type:[String], default:[]},
    access:{type:[String], default:[]}
})

const Blockedtoken = mongoose.model("token", blockedTokenSchema)
export default Blockedtoken;