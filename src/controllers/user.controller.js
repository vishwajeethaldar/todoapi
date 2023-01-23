import {User, Label, Todo} from '../models/index.js';
import {hashPwd} from '../lib/index.js';

const userC = (()=>{

        const add = async (name, email, password, role="user")=>{
            try {

                if(!name||!email||!password){
                    return {code:400, data:"name, email and password is required"}
                }
                password = await hashPwd.hash(password)
                
                let newUser = new User({name, email, password, role})
                await newUser.save();
                newUser = newUser.findOne({email:email}, {password:0,role:0,_id:0,__V:0})
                return {code:200, data:newUser}

            } catch (error) {
                return {code:500, data:`Internal Sever Error! ${error.message}`}
            }
            
        }

        const remove = async (userid)=>{
            try {
                let user = await User.findOne({_id:userid});
                if(!user){
                    return {code:404, data:"user not exists"}
                }
                await Label.deleteMany({user:userid, id:{$in:user.todoLabels}})
                await Todo.deleteMany({user:userid, id:{$in:user.todos}})
                await User.findByIdAndDelete(userid)
                
                return {code:200, data:"Deleted Successfully"}
            } catch (error) {
                return {code:500, data:`Internal Sever Error! ${error.message}`}
            }
        }

        const updateProfile = async (userid, name, email,avatar)=>{
            try {
                if(!userid){
                    return {code:400, data:"user is is required to update"}
                }
                
                let user = await User.findOne({_id:userid})
                
                if(!user){
                    return {code:404, data:"user not exist"}
                }

                await User.findByIdAndUpdate(userid, {$set:{name:name||user.name, email:email||user.email, avatar:avatar||user.avatar}})
                user = await User.findOne({_id:userid}, {password:0,role:0,_id:0,__V:0})
                return {code:200, data:user}

            } catch (error) {
                return {code:500, data:`Internal Sever Error! ${error.message}`}
            }
        }

        const updatePassword = async(userid, newPassword)=>{
                try {
                    if(!userid){
                        return {code:400, data:"user is is required to update"}
                    }
                    
                    let user = await User.findOne({_id:userid})
                    
                    if(!user){
                        return {code:404, data:"user not exist"}
                    }
                    newPassword = await hashPwd.hash(newPassword)

                    User.findByIdAndUpdate(userid, {$set:{password:newPassword}})
                    user = await User.findOne({_id:userid}, {password:0,role:0,_id:0,__V:0})
                    return {code:200, data:user}

                } catch (error) {
                    return {code:500, data:`Internal Sever Error! ${error.message}`}
                }
        }

        const updateRole = async(adminid, userid, newrole)=>{
            try {
                if(!userid||!newrole){
                    return {code:400, data:"userid and newrole is required to update the users role"}
                }
                
                let user = await User.findOne({_id:userid})
                
                if(!user){
                    return {code:404, data:"user not exist"}
                }
               
                let admin =  await User.findOne({_id:adminid})
                if(admin.role!=="su"){
                    return {code:403, data:"You are not Authorised to update the role"}
                }

                await User.findOneAndUpdate({_id:userid}, {$set:{role:newrole}})
                 user = await User.findOne({_id:userid}, {password:0,role:0,_id:0,__V:0})
                return {code:200, data:user}
            } catch (error) {
                return {code:500, data:`Internal Sever Error! ${error.message}`}
            }
        }

        const getOne = async (userid)=>{
            try {
                let user = await User.findOne({_id:userid}, {password:0,role:0,_id:0,__V:0});
                if(!user){
                    return {code:404, data:"user not exists"}
                }
                return {code:200, data:user}

            } catch (error) {
                return {code:500, data:`Internal Sever Error! ${error.message}`}
            }
        }

        const getAll = async ()=>{
            try {
                let users = await User.find({}, {password:0});
                return {code:200, data:users}
            } catch (error) {
                return {code:500, data:`Internal Sever Error! ${error.message}`}
            }
        }

        return {
            add,
            remove,
            updateProfile,
            getOne,
            getAll,
            updatePassword,
            updateRole
        }
})()

export default userC;