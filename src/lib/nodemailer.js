import nodemailer from 'nodemailer';
import {config} from '../config/index.js';

const Z_Mail_Transport = nodemailer.createTransport({
	host:config.Z_Mail_Host,
	port:config.Z_Mail_Port,
    secure:true,
	auth:{
		user:config.Z_Mail,
		pass:config.Z_Mail_Password
	}
}	
)

export default Z_Mail_Transport 