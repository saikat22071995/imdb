const mongoose=require('mongoose')
const Schema=mongoose.Schema
const producerSchema=new Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:30
    },
    sex:{
        type:String,
        required:true,
        enum:['Male','Female','Other'],
        description:"can only have this value"
    },
    dob:{
        type:Date,
        required:true,
    },
    bio:{
        type:String,
        required:true,
        minlength:5
    },
    movies:[{
        type:Schema.Types.ObjectId,
        //required:true,
        ref:'movie'
    }],
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
const Producer=mongoose.model('producer',producerSchema)
module.exports=Producer