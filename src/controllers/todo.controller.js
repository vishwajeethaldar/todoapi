import {Todo, User,Label} from '../models/index.js'
const todoC = (()=>{

    const add = async (title, description, color="#FFFFFF", labelid, userid)=>{
        try {
            if(!title, !description, !labelid, !userid){
                return {code:400, data:"title, description, labelid, userid all are require, it is possible any one out of all is missing"}
            }
            let todo = new Todo({title, description, labelid, userid,color});
            await todo.save();
            await Label.findByIdAndUpdate(labelid, {$push:{todos:todo._id}});
            await User.findByIdAndUpdate(userid, {$push:{todos:todo._id}})
            return {code:200, data:todo}
        } catch (error) {
            return {code:500, data:`Internal Server Error! ${error.message}`}
        }
    }

    const remove = async (todoId)=>{
        try {
            if(!todoId){
                return {code:400, data:"todoid is required"}
            }

            let todo = await Todo.findOneById(todoId);

            if(!todo){
                return {code:400, data:"todo does not exists"}
            }

            await Label.findByIdAndUpdate(todo.label, {$pull:{todos:todo._id}});
            await User.findByIdAndUpdate(todo.user, {$pull:{todos:todo._id}});
            await Todo.findByIdAndDelete(todoId);
            return {code:200, data:"Todo Deleted Successfully"}

        } catch (error) {
            return {code:500, data:`Internal Server Error! ${error.message}`}
        }
    }

    const update = async (todoId, title,description, color)=>{
        try {
            if(!todoId){
                return {code:400, data:"todoid is required"}
            }

            let todo = await Todo.findOneById(todoId);

            if(!todo){
                return {code:400, data:"todo does not exists"}
            }

            await Todo.findByIdAndUpdate(todoId, {$set:{title:title&&title||todo.title, description:description&&description||todo.description, color:color&&color||todo.color}})
            todo = await Todo.findOneById(todoId);
            return {code:200, data:todo}

        } catch (error) {
            return {code:500, data:`Internal Server Error! ${error.message}`}
        }
    }

    const updateState = async(todoId, isCompleted)=>{
            if(!todoId){
                return {code:400, data:"todoid is required"}
            }

            let todo = await Todo.findOneById(todoId);

            if(!todo){
                return {code:400, data:"todo does not exists"}
            }
            await Todo.findByIdAndUpdate(todoid, {$set:{isCompleted:isCompleted}})
            todo = await Todo.findOneById(todoId);
            return {code:200, data:todo}
    }

    const getOne = async (todoId)=>{
        try {
            if(!todoId){
                return {code:400, data:"todoid is required"}
            }

            let todo = await Todo.findOneById(todoId);

            if(!todo){
                return {code:400, data:"todo does not exists"}
            }
            return {code:200, data:todo}
        } catch (error) {
            return {code:500, data:`Internal Server Error! ${error.message}`}
        }
    }

    const getAll = async ()=>{
        try {
            let todos = await Todo.find({});
            return {code:200, data:todos}
        } catch (error) {
            return {code:500, data:`Internal Server Error! ${error.message}`}
        }
    }

    return {
        add,
        remove,
        update,
        getOne,
        getAll,
        updateState
    }
})()

export default todoC;