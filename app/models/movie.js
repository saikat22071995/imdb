const mongoose=require('mongoose')
const Schema=mongoose.Schema
const movieSchema=new Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:30
    },
    year_of_release:{
        type:String,
        required:true
    },
    plot:{
        type:String,
        required:true
    },
    poster:{
        type:String,
        required:true
    },
    actors:[{
        type:Schema.Types.ObjectId,
        //required:true,
        ref:'actor'
    }],
    producer:{
        type:Schema.Types.ObjectId,
        //required:true,
        ref:'producer'
    },
    user:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'user'
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})
const Movie=mongoose.model('movie',movieSchema)
module.exports=Movie
