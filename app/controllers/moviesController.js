const Movie=require('../models/movie')

module.exports.list=(req,res)=>{
    Movie.find({user:req.user._id})
    .then((movies)=>{
        res.json(movies)
    })
    .catch((err)=>{
        console.log(err)
    })
}

module.exports.show=(req,res)=>{
    const id=req.params.id
    Movie.findOne({_id:id,user:req.user._id})
    .then((movies)=>{
        if(movies){
            res.json(movies)
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
    const body={
        name:req.body.name,
        year_of_release:req.body.year_of_release,
        plot:req.body.plot,
        poster:req.file.path,
        actors:req.body.actors
    }
    const movie=new Movie(body)
    movie.user=req.user._id
    movie.save()
    .then((movie)=>{
        res.json(movie)
    })
    .catch((err)=>{
        console.log(err)
    })

}

module.exports.update=(req,res)=>{
    const id=req.params.id
    const body=req.body
    Movie.findOneAndUpdate({_id:id,user:req.user._id},body,{new:true,runValidators:true})
    .then((movie)=>{
        if(movie){
            res.json(movie)
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
    Movie.findOneAndDelete({_id:id,user:req.user._id})
    .then((movie)=>{
        if(movie){
            res.json(movie)
        }else{
            res.json({})
        }
    })
    .catch((err)=>{
        console.log(err)
    })
}