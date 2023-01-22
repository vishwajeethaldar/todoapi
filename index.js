const express = require("express");
const app = express()

console.log(process.env.NAME);
app.listen(process.env.port||8000, ()=>{
	console.log("server Started");
})

