const express = require('express')
const app = express()
const PORT = 3000
const mongoose = require('mongoose')
const Post = require('./models/post')
require("dotenv").config()

// Db connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true
  });
mongoose.connection.once("open", ()=> {
    console.log("i'm going in");
});

// middleware
app.use(express.json({ extended: false }));

app.get('/',(req,res)=>{
   res.send("Hello ✅ ")
})
// index route
app.get('/', async(req,res)=>{
    try{
       const allPosts = await Post.find({})  
      res.send(allPosts)
    }catch (err){
        console.error(err)
        res.status(500).send("Server Error")
      }
   
})

// Create route CRUD
app.post('/', async (req,res)=>{
    try{
     const post = await Post.create(req.body) 
      res.send(post)
    } catch (err){
      console.error(err)
    }
    
})
// delete
app.delete('/', async(req,res)=>{
    try{
      await Post.findByIdAndDelete(req.params.id)
  res.send('Deleted Post')  
    }catch (err){
        console.error(err)
        res.status(500).send("Server Error")
      }
  
})
// update
app.put('/:id',async(req,res)=>{
    try{
     const post = await Post.findByIdAndUpdate(req.params.id,req.body,{new: true})
     res.send(post)
    }catch (err){
      console.error(err)
      res.status(500).send("Server Error")
    }
})


app.listen(PORT,(req,res)=>{
 console.log(`Port on 3K`)
})