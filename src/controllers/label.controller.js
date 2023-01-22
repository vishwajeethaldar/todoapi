import {Label, User, Todo} from '../models/index.js';

const labelC = (()=>{

    const add = async (title, color="#ffffff", userid)=>{
        try{
            if(!title||!userid){
                return {code:400, msg:"title or userid is missing"}
            }

            let newLalbel = new Label({title:title, user:userid, color:color, isCompleted:false, todos:[]}) 
            await newLalbel.save();
            await User.updateOne({_id:userid}, {$push:{todos:newLalbel._id}})   
            return {code:200, data:newLalbel}

        }catch(e){
            return {code:500, data:`Internal Server Error! ${e.message}`}
        }
    }

    const remove = async (labelid)=>{
        try{
             const label = await Label.findOne(labelid);
             if(!label){
                return {code:400, data:`Label not exist! ${e.message}`}
             }
             await User.updateOne({_id:label.user}, {$pull:{todos:labelid}})  
             await Todo.deleteMany({user:label.user, _id:{$in:label.todos}})
             await Label.findByIdAndDelete(labelid)
            
             return {code:200, data:'deleted Successfully'}
        }catch(e){
            return {code:500, data:`Interval Server Error! ${e.message}`}
        }
    }

    const update = async(labelid, title, color)=>{
        
        try{
             if(!labelid){
                return {code:404, data:"labelid is required to update"}
             }

             let label = await Label.findOne({_id:labelid});
             
             if(!label){
                return {code:404, data:"Label not Exists"}
             }

             await Label.findByIdAndUpdate(labelid,{$set:{title:title&&title||label.title, color:color&&color||label.color}})
             label = await Label.findOne({_id:labelid});
             return {code:200, data:label}
        }catch(e){
            return {code:500, data:`Interval Server Error! ${e.message}`}
        }
    }


    
    const updateStatus = async(labelid, isCompleted)=>{
        
        try{
             if(!labelid){
                return {code:404, data:"labelid is required to update"}
             }

             let label = await Label.findOne({_id:labelid});
             
             if(!label){
                return {code:404, data:"Label not Exists"}
             }
             label = await Label.findOne({_id:labelid});
             await Label.findByIdAndUpdate(labelid,{$set:{isCompleted:isCompleted}})
             return {code:200, data:label}
        }catch(e){
            return {code:500, data:`Interval Server Error! ${e.message}`}
        }
    }



    const getOne = async (labelId)=>{
        try{
             let data  = await Label.findOne({_id:labelId})   
             return {code:200, data:data}
        }catch(e){
            return {code:500, data:`Interval Server Error! ${e.message}`}
        }
    }

    const getAll = async ()=>{
        try{
            let data  = await Label.find();   
            return {code:200, data:data}
       }catch(e){
           return {code:500, data:`Interval Server Error! ${e.message}`}
       }
    }

    return {
        add,
        remove,
        update,
        getOne,
        getAll,
        updateStatus
    }
})()

export default labelC;