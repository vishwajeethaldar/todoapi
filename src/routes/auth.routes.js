import {authC} from '../controllers/index.js'
import {joseJwt} from '../lib/index.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { Token, User } from '../models/index.js'

const authRoutes = (app)=>{


    app.post("/reset/otp", async (req, res)=>{
        const {email} = req.body;
        try {
            let data = await authC.sendOtp(email, "OTP to reset your account password", "OTP is ");
            return res.status(data.code).send(data.data);
        } catch (error) {
            return res.send(error.message)
        }
    })


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


    app.delete("/logout", async (req, res)=>{
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


    app.post("/refresh", async(req, res)=>{
        try {
            let token = req.cookies.token
            let {userid} = req.body

            let data = await authC.generateRefreshToken(token, userid);
            res.cookie("token", data.token, {maxAge:decoded.exp, secure:false, httpOnly:true})
            return res.status(data.code).send(data.decoded)
        } catch (error) {
            return res.status(500).send(error.message)
        }
    })  
}

export default authRoutes