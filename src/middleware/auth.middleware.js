import {joseJwt} from '../lib/index.js'

export const authMiddleware = async(req, res, next)=>{

    try {
        let token = req.cookies
        console.log(req.cookies);
        return next(); 
    } catch (error) {
        return res.status(500).send(error.message)
    }
    
}