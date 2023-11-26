const router=require("./routes/routes")
const express=require("express")
require("dotenv").config()
const app=express()
const {connectDB}=require("./db/connect")

const PORT=process.env.PORT
connectDB(process.env.DB_URL);

app.use(express.json())
app.use("/api",router);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS')
    next()
  })

app.listen(PORT,()=>{
    console.log(`app is listeninig on port ${PORT}`)
})