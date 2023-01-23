import {userC} from '../controllers/index.js'
const users = (app)=>{
    
    app.post("/users/add", async(req, res)=>{
        try {
            const {name, email, password, role} = req.body;
            let data = await userC.add(name, email, password, role)
            return res.status(data.code).send(data.data)
        } catch (error) {
            return res.status(500).send(error.message)
        }
    })

    app.get("/users/profile", async(req, res)=>{
        try {
            const {userid} = req.body;
            let data = await userC.getOne(userid)
            return res.status(data.code).send(data.data)
        } catch (error) {
            return res.status(500).send(error.message)
        }
    })

    app.get("/users/", async(req, res)=>{
        try {
            let data = await userC.getAll()
            return res.status(data.code).send(data.data)
        } catch (error) {
            return res.status(500).send(error.message)
        }
    })

    app.delete("/users/delete", async(req, res)=>{
        const {userid} = req.body;
       try {
         
            let data = await userC.remove(userid)
            return res.status(data.code).send(data.data)
       } catch (error) {
            return res.status(500).send(error.message)
       }
    })


    app.patch("/users/profile/update", async(req, res)=>{
        const {userid, name, email, avatar} = req.body;
        try {
             let data = await userC.updateProfile(userid,name, email, avatar)
             return res.status(data.code).send(data.data)
        } catch (error) {
             return res.status(500).send(error.message)
        }
     })

     app.patch("/users/profile/updatepassword", async(req, res)=>{
        const {userid, newpassword} = req.body;
        try {
             let data = await userC.updatePassword(userid,newpassword)
             return res.status(data.code).send(data.data)
        } catch (error) {
             return res.status(500).send(error.message)
        }
     })

     app.patch("/users/profile/updaterole", async(req, res)=>{
        const {adminid, userid, role} = req.body;
        try {
             let data = await userC.updateRole(adminid,userid,role)
             return res.status(data.code).send(data.data)
        } catch (error) {
             return res.status(500).send(error.message)
        }
     })

     app.patch("/users/account/validate", async(req, res)=>{
        const {email, otp} = req.body;
        try {
             let data = await userC.validate(email, otp)
             return res.status(data.code).send(data.data)
        } catch (error) {
             return res.status(500).send(error.message)
        }
     })

}

export default users 