import mongoose from 'mongoose';

const blockedTokenSchema =  new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, ref:"user"},
    access:{type:[String], default:[]}
})

const Blockedtoken = mongoose.model("blockedtoken", blockedTokenSchema)
export default Blockedtoken;