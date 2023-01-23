import {User, Token, Blockedtoken} from '../models/index.js';
import {hashPwd,sendEmail, joseJwt} from '../lib/index.js';
import { config } from '../config/index.js';

const authC = (()=>{

    const signIn = async(email, password)=>{
        
        let existuser = await User.findOne({email:email});
        
        if(!existuser){
            return {code:404, data:"Email Not Registered"}
        }
        if(existuser.accountStatus==="blocked"){
            return {code:401, data:"Account is terminated, contact admin "}
        }
        if(existuser.accountStatus==="hold"){
            let emailstatus = await sendOtp(email, "Validate your email", "OTP to validate your account")
            if(emailstatus.status){
                return {code:403, data:"Email sent to your Registered Account"}
            }
        }

        let varifyPassword = await hashPwd.verify(existuser.password, password)
        
        if(!varifyPassword){
            return {code:401, data:"Invalid credintials email or password"}
        }

        let payload = {email:email,id:existuser._id, role:existuser.role}
        let accessToken  = await joseJwt.sing(payload, "access")
        let refreshToken  = await joseJwt.sing(payload, "refresh")

        let token = new Token({user:existuser._id, refreshToken:refreshToken})
        await token.save();
        return {code:200, data:accessToken}
    }

    const signOut = async(userid, accessToken)=>{
        
        let user = await User.findOne({_id:userid})
        
        if(!user){
            return {code:404, data:"user not exists"}
        }
        await Token.findOneAndDelete({user:userid})
    
        let blockedToken = await Blockedtoken.findOne({user:userid})

        if(blockedToken){
            await Blockedtoken.findOneAndUpdate({user:userid}, {$push:{access:accessToken}})
        }else{
            blockedToken = await Blockedtoken.create({user:userid})
            await Blockedtoken.findOneAndUpdate({user:userid}, {$push:{access:accessToken}})
        }

        return {code:200, data:"Logged out successfully"}
    }

    const sendOtp = async (email, subject, body)=>{

       try {

         // Generating an OTP
         let otp = Math.floor(Math.random()*(999999-111111)+111111);
 
         body = `${body} ${otp}`
         let res =  await sendEmail(email, subject, body)
        
         if(res.status){
            await User.findOneAndUpdate({email:email}, {$set:{otp:otp}})
            return {status:true, data:"OTP Send Successfully!"}
         }else{
            return {status:false, data:`Email Error! ${res.msg}`}
         }

       } catch (error) {
        return {code:false, data:`Internal Server Error ${error.message}`}
       }
    }


    return {
        signIn,
        signOut,
        sendOtp
    }
})()


export default authC;