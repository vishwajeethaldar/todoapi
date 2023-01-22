import mongoose from 'mongoose'
import configs from "./locals.js";

const connectdb = ()=>{
    mongoose.set('strictQuery', false)
    return mongoose.connect(configs.mongouri);
}


export default connectdb;