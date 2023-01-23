import {todoC} from '../controllers/index.js'
const todos = (app)=>{
    
    app.get('/todos/', async(req, res)=>{
        try {
            let data = await todoC.getAll()
            return res.status(data.code).send(data.data)
        } catch (error) {
            return res.status(500).send(error.message)
        }
    })

    app.get("/todos/todo", async(req, res)=>{
        const {id} = req.body;
        try {
            let data = await todoC.getOne(id)
            return res.status(data.code).send(data.data)
        } catch (error) {
            return res.status(500).send(error.message)
        }
    })
      
    app.post('/todos/add', async(req, res)=>{
        try {
            const {title, description, color, labelid, userid}  = req.body;
            const resData  =  await todoC.add(title, description, color, labelid, userid) 
            return res.status(resData.code).send(resData.data)
        } catch (error) {
            return res.status(500).send(error.message)
        }
    })
    

    app.delete("/todos/delete", async(req, res)=>{
        const {id}  = req.body;
        try {
            const resData  =  await todoC.remove(id) 
            return res.status(resData.code).send(resData.data)
        } catch (error) {
            return res.status(500).send(error.message)
        }

    })

    app.patch("/todos/update/todo", async(req, res)=>{
        const {id, title,description, color}  = req.body;
        try {
            const resData  =  await todoC.update(id, title,description, color)
            return res.status(resData.code).send(resData.data)
        } catch (error) {
            return res.status(500).send(error.message)
        }
    })

    app.patch("/todos/update/status", async(req, res)=>{
        const {id, status}  = req.body;
        try {
            const resData  =  await todoC.updateState(id, status);
            return res.status(resData.code).send(resData.data);
        } catch (error) {
            return res.status(500).send(error.message)
        }
    })


}

export default todos 