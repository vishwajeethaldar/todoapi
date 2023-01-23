import { config } from "../config/index.js";
import { ZohoMail } from "./index.js";

export default async function sendEmail(to, subject, body){
    
    try {
        let zmailRes =  await ZohoMail.sendMail({
            to:to,
            from:config.Z_Mail,
            subject:subject,
            text:body
        })
        return {status:true, msg:"email send Successfully"}
    } catch (error) {
        return {status:false, msg:`Failed, ${error}`}
    }

} 