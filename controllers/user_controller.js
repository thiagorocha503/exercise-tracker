import {Router} from "express"
import mongoose from "mongoose"
import User from "../model/user.js"

let UserController = new Router()
const dateRegex = /^\d{4}\-\d{2}\-\d{2}$/

UserController.route("/users").get((req, res)=>{
  User.find({}).select("-__v").then((users)=>{
    res.json(users)
  }).catch((err)=>{
    res.json({error: err})
  }) 
}).post((req, res)=>{
  const username = req.body.username
  if(!username){
    return res.json({error:"username not setted"})
  }
  const user = new User({username})
  user.save().then((model)=>{
    res.json(model)
  }).catch((err)=>{
    console.error(err)
    res.json(err)
  })
})

UserController.post('/users/:_id/exercises', async (req, res)=>{
  const _id = req.params._id;
  const description = req.body.description
  const duration = req.body.duration
  const date = req.body.date ? new Date(req.body.date): new Date();
  try{
    const user = await User.findOne({_id})
    if(!user){
      return res.json({error: "not found"})
    }
    user.log.push({
      description,
      duration: parseInt(duration),
      date
    })
    await user.save()
    res.json({
      username: user.username,
      description,
      duration: parseInt(duration),
      date: date.toDateString(),
      _id
    })
  }catch(err){
    console.error(err)
    res.json(err)
  }
})


UserController.get('/users/:_id/logs', async (req, res)=>{
  const _id = req.params._id;
  const to = req.query.to;
  const from = req.query.from;
  const limit =  req.query.limit 
  try{ 
    let pipeline = [    
      {$match:
        {
          $and:[
            // user id
            {_id: new mongoose.Types.ObjectId(_id)},
            // date between from ad to
            ... (dateRegex.test(to) && dateRegex.test(from))?
              [ {'log.date': {$gte: new Date(from), $lte: new Date(to) } }]:
              []
          ]
        } 
      },
      {$project:{
          username: 1,
          count: {$size: "$log"}, // count  
          log: limit ? { $slice: ["$log", 0, parseInt(limit) ]}: 1,// limit
        }
      },
    ]  
    const user = (await User.aggregate(pipeline))[0]
    if(!user){
      return res.json({"error": "Not found"})
    }
    user.log = user.log.map((obj)=>{
      obj.date = obj.date.toDateString()
      return obj
    })
    res.json(user)
  }catch(err){
     console.error(err)
    res.json(err)
  }
})
export default UserController