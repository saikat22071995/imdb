const express=require('express')
const configureDB=require('./config/database')
const router=require('./config/routes')
const cors=require('cors')
const app=express()
const port=3025
app.use(express.json())
configureDB()
app.use(cors())
app.use('/uploads',express.static('uploads'))

app.get('/',(req,res)=>{
    res.send('Welcome to the IMDB app')
})

// app.get('/uploads',(req,res)=>{
//     const id=req.params.id
//     uploads.find({id},(err,result)=>{
//         if(err){
//             res.send(err)
//         }else{
//             res.json(result)
//         }
//     })
// })

app.use('/',router)

app.listen(port,()=>{
    console.log('listening on port',port)
})