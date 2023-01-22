import {labelC} from '../controllers/index.js'
const labels = (app)=>{
    
    app.get('/labels/', (req, res)=>{s
        return res.send("Working")
    })

      
    app.post('/labels/add', async(req, res)=>{
        const {title, color, userid}  = req.body;
        const resData  =  await labelC.add(title, color, userid) 
        console.log(resData);
        return res.status(resData.code).send(resData.data)
    })
    

}

export default labels 