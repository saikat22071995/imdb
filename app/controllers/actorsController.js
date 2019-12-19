const Actor=require('../models/actor')
const moment=require('moment')

module.exports.list=(req,res)=>{
    Actor.find({user:req.user._id}).populate('movie',['name'])
    .then((actors)=>{
        res.json(actors)
    })
    .catch((err)=>{
        console.log(err)
    })
}

module.exports.show=(req,res)=>{
    const id=req.params.id
    Actor.findOne({_id:id,user:req.user._id}).populate('movie',['name'])
    .then((actors)=>{
        if(actors){
            res.json(actors)
        }
        else{
            res.json({})
        }
    })
    .catch((err)=>{
        console.log(err)
    })
}

module.exports.create=(req,res)=>{
    const body=req.body
    const actor=new Actor(body).populate('movie',['name'])
    actor.user=req.user._id
    actor.save()
    .then((actor)=>{
        res.json(actor)
    })
    .catch((err)=>{
        console.log(err)
    })

}

module.exports.update=(req,res)=>{
    const id=req.params.id
    const body=req.body
    Actor.findOneAndUpdate({_id:id,user:req.user._id},body,{new:true,runValidators:true})
    .then((actor)=>{
        if(actor){
            res.json(actor)
        }
        else{
            res.json({})
        }
    })
    .catch((err)=>{
        console.log(err)
    })
}

module.exports.destroy=(req,res)=>{
    const id=req.params.id
    Actor.findOneAndDelete({_id:id,user:req.user._id})
    .then((actor)=>{
        if(actor){
            res.json(actor)
        }else{
            res.json({})
        }
    })
    .catch((err)=>{
        console.log(err)
    })
}