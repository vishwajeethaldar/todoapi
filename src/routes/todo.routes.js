
const todos = (app)=>{
    
    app.get('/todos/', (req, res)=>{
        return res.send("Working")
    })

}

export default todos 