import {authC} from '../controllers/index.js'
import {joseJwt} from '../lib/index.js'

const authRoutes = (app)=>{

    app.post("/login", async (req, res)=>{

        const {email, password} =  req.body;
        let data = await authC.signIn(email, password);
       
        if(data.code===200){
            let decodedToken  = await joseJwt.verify(data.data,"access")
            res.cookie("token", data.data,{secure: true ,maxAge:decodedToken.payload.exp});
            return res.status(data.code).send( {...decodedToken.payload})
        }else{
            return  res.status(data.code).send(data.data)
        }

    })


    app.post("/logout", async (req, res)=>{
        const {userid, token} =  req.body;
        let data = await authC.signOut(userid, token);
        return  res.status(data.code).send(data.data)
    })

}

export default authRoutes