const mongoose=require('mongoose')
const configugreDB=()=>{
    mongoose.connect('mongodb://localhost:27017/imdb',{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false})
    .then(()=>{
        console.log('connected to Db')
    })
    .catch((err)=>{
        console.log(err)
    })
}
module.exports=configugreDB