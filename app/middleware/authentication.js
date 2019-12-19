const {User}=require('../models/user')

const authenticateUser=function(req,res,next){
    const token=req.header('x-auth')
        User.findbyToken(token)
        .then(function(user){
            req.user=user
            req.token=token
            next()
        })
        .catch(function(err){
            res.status('401').send(err)
        })
}

module.exports={
    authenticateUser
}