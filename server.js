const express = require('express')
const app = express()
const PORT = 3000
const mongoose = require('mongoose')
require('dotenv').config()
const Post = require('./models/post')

// Db connection
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
mongoose.connection.once('open', ()=> {
    console.log("i'm going in");
});

// middleware
app.use(express.json({ extended: false }));

app.get('/',(req,res)=>{
   res.send("Hello ✅ ")
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


app.listen(PORT,(req,res)=>{
 console.log(`Port on 3K`)
})