import {labelC} from '../controllers/index.js'

const labels = (app)=>{
    
    app.get('/labels/', async(req, res)=>{
        try {
            let data = await labelC.getAll()
            return res.status(data.code).send(data.data)
        } catch (error) {
            return res.status(500).send(error.message)
        }
    })

    app.get("/labels/label", async(req, res)=>{
        const {id} = req.body;
        try {
            let data = await labelC.getOne(id)
            return res.status(data.code).send(data.data)
        } catch (error) {
            return res.status(500).send(error.message)
        }
    })
      
    app.post('/labels/add', async(req, res)=>{
        try {
            const {title, color, userid}  = req.body;
            const resData  =  await labelC.add(title, color, userid) 
            return res.status(resData.code).send(resData.data)
        } catch (error) {
            return res.status(500).send(error.message)
        }
    })
    

    app.delete("/labels/delete", async(req, res)=>{
        const {id}  = req.body;
        try {
            const resData  =  await labelC.remove(id) 
            return res.status(resData.code).send(resData.data)
        } catch (error) {
            return res.status(500).send(error.message)
        }

    })

    app.patch("/labels/update/label", async(req, res)=>{
        const {id, title, color}  = req.body;
        try {
            const resData  =  await labelC.update(id, title, color)
            return res.status(resData.code).send(resData.data)
        } catch (error) {
            return res.status(500).send(error.message)
        }
    })

    app.patch("/labels/update/status", async(req, res)=>{
        const {id, status}  = req.body;
        try {
            const resData  =  await labelC.updateStatus(id, status);
            return res.status(resData.code).send(resData.data);
        } catch (error) {
            return res.status(500).send(error.message)
        }
    })

}

export default labels 