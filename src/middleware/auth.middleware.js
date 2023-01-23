import {joseJwt} from '../lib/index.js'

export const authMiddleware = async(req, res, next)=>{
    let token = req.cookies.token
    try {
        let decoded  = token && await joseJwt.verify(token, "access")

        if(decoded){
            req.id = decoded.payload.id;
            return next(); 
        }else{
            return res.status(401).send("UnAuthorized Access")
        }
       
    } catch (error) {
        return res.status(500).send(error.message)
    }
    
}