import express from 'express'
import connectdb from "./src/config/db.js"
import {config} from './src/config/index.js'
import {usersR, todosR, labelsR} from './src/routes/index.js'
const app = express()
app.use(express.json())


app.listen(config.port, ()=>{
	connectdb()
	console.log(`server Started at http://localhost:${config.port}`);
})


usersR(app)
todosR(app)
labelsR(app)


