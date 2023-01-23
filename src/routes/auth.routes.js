import {authC} from '../controllers/index.js'
import {joseJwt} from '../lib/index.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

const authRoutes = (app)=>{

     app.post("/login", async (req, res)=>{

        const {email, password} =  req.body;
        try {
           
            let data = await authC.signIn(email, password);
        
            if(data.code===200){
                let decodedToken  = await joseJwt.verify(data.data,"access")
               
                 res.cookie("token", data.data, {maxAge:decodedToken.payload.exp, secure: false, httpOnly:true});  //,,
                return res.status(data.code).send( {...decodedToken.payload})
            }else{
                return  res.status(data.code).send(data.data)
            }
        } catch (error) {
            return res.send(error.message)
        }

    })


    app.post("/logout", async (req, res)=>{
       try {
            const {userid} =  req.body;
            let token = req.cookies.token
            let data = await authC.signOut(userid, token);
            res.cookie("token", "")
            return  res.status(data.code).send(data.data)
       } catch (error) {
            return res.status(500).send(error.message)
       }
    })

    app.get("/refresh", async(req, res)=>{
        try {
            let token = req.cookies.token
            return res.send(token)
        } catch (error) {
            return res.status(500).send(error.message)
        }
    })  
}

export default authRoutes