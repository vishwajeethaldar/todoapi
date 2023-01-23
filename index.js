import express from 'express'
import connectdb from "./src/config/db.js"
import {config} from './src/config/index.js'
import {usersR, todosR, labelsR,authR} from './src/routes/index.js'
import cors from 'cors' 
import cookieParse from 'cookie-parser'

const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({credentials:true, origin:true}))
app.use(cookieParse())

app.listen(config.port, ()=>{
	connectdb()
	console.log(`server Started at http://localhost:${config.port}`);
})


usersR(app)
todosR(app)
labelsR(app)
authR(app)


