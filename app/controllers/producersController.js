const Producer=require('../models/producer')

module.exports.list=(req,res)=>{
    Producer.find({user:req.user._id})
    .then((producers)=>{
        res.json(producers)
    })
    .catch((err)=>{
        console.log(err)
    })
}

module.exports.show=(req,res)=>{
    const id=req.params.id
    Producer.findOne({_id:id,user:req.user._id})
    .then((producer)=>{
        if(producer){
            res.json(producer)
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
    const producer=new Producer(body)
    producer.user=req.user._id
    producer.save()
    .then((producer)=>{
        res.json(producer)
    })
    .catch((err)=>{
        console.log(err)
    })

}

module.exports.update=(req,res)=>{
    const id=req.params.id
    const body=req.body
    Producer.findOneAndUpdate({_id:id,user:req.user._id},body,{new:true,runValidators:true})
    .then((producer)=>{
        if(producer){
            res.json(producer)
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
    Producer.findOneAndDelete({_id:id,user:req.user._id})
    .then((producer)=>{
        if(producer){
            res.json(producer)
        }else{
            res.json({})
        }
    })
    .catch((err)=>{
        console.log(err)
    })
}