const mongoose=require('mongoose')
const validator=require('validator')
const jwt=require('jsonwebtoken')
const bcryptjs=require('bcryptjs')
const Schema=mongoose.Schema
const UserSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        minlength:5
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:function (value){
                return validator.isEmail(value)
            },
            message:function (){
                return 'invalid email format'
            }
        }
       
    },
    password:{
        type:String,
        required:true,
        minlength:6,
        maxlength:128
    },
    creaedAt:{
        type:Date,
        default:Date.now()
    },
    tokens:[
        {
            token:{
                type:String
            },
            createdAt:{
                type:Date,
                default:Date.now()
            }
        }
    ]
})
UserSchema.pre('save',function(next){
    const user=this
   if(user.isNew){
    bcryptjs.genSalt(10)
    .then(function(salt){
        bcryptjs.hash(user.password,salt)
        .then(function(encryptedPassword){
            user.password=encryptedPassword
            next()
        })
    })
   }
   else{
       next()
   }
   
    
})

//own static method
UserSchema.statics.findbyCredentials=function(email,password){
    const User=this
    return User.findOne({email})
    .then(function(user){
        if(!user){
            return Promise.reject({error:'error'})
        }
        return bcryptjs.compare(password,user.password)
        .then(function(result){
            if(result){
                return Promise.resolve(user)
            }
            else{
                return Promise.reject({error:'error'})
            }
        })
    })
    .catch(function(err){
        return Promise.reject(err)
    })
}

UserSchema.statics.findbyToken=function(token){
    const User=this
    let tokenData
    try {
        tokenData=jwt.verify(token,'jwt@123')
    } catch (err) {
        return Promise.reject(err)
    }
    return User.findOne({
        _id:tokenData._id,
        'tokens.token':token
    })
}

//own instance method
UserSchema.methods.generateToken=function(){
    const User=this
    const tokenData={
        _id:User._id,
        username:User.username,
        createdAt:Number(new Date())
    }
    const token=jwt.sign(tokenData,'jwt@123')
    User.tokens.push({token})
    return User.save()
    .then(function(User){
        return Promise.resolve(token)
    })
    .catch(function(err){
        return Promise.reject(err)
    })
}
const User=mongoose.model('user',UserSchema)

module.exports={
    User
}