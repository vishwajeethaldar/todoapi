import dotenv from 'dotenv'

dotenv.config()

let configs = (function (){
    let mongouri = process.env.MONGO_URI;
    let port = process.env.PORT;
    return {mongouri, port};
})()


export default configs