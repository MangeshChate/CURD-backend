const express = require('express')
const app = express();
const cors = require('cors'); 
require('./db/conn');
const Curd = require("./model/model");
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
require('dotenv').config({ path: './config.env' })

PORT = process.env.PORT;

app.use(cors({
    exposedHeaders: ['Authorization']
}));

app.use((req, res, next) => {
    // Remove the Access-Control-Allow-Origin header
    res.removeHeader('Access-Control-Allow-Origin');
    next();
  });

  app.get('/api', (req, res) => {
    res.header('Authorization', 'Bearer mytoken');
    res.send('Hello World!');
  });



app.get("/api/get" , async(req,res)=>{
    try{
        const users = await Curd.find({});
        if(!users){
            res.status(404).send("user not found");
        }
        res.send(users)
    }
    catch(err){
        res.status(500).send(err)
    }
})

//post : localhost:3000/api/post
app.post("/api/post",async (req,res)=>{
    
    const user = new Curd({
        name:req.body.name,
        email:req.body.email
    })
    try{
        const savedUser = await user.save();
        console.log("user Added")
        res.json(savedUser)
    }
    catch(err){
        res.status(500).send(err)
    }
})

//delete :localhost:3000/api/delete



app.delete("/api/delete/:id" , async(req, res)=>{
    try{
        const id = req.params.id
        const curd = await Curd.findByIdAndDelete(id );
           
        if(!curd){
            res.status(404).send({error:"user not found"})
        }
        res.send({message:"user deleted succesfully"})
        
    }catch(err){
        if(err){
            console.log(err)
        }
    }
})


//dupdate :localhost:3000/api/update



app.put("/api/update/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const curd = await Curd.findByIdAndUpdate(id, req.body);
      if (!curd) {
        res.status(404).send({ error: "User not found" });
      } else {
        res.send({ user: curd });
        console.log("updated")
      }
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  });
  



















app.listen(PORT,()=>{
    console.log(`server connected on port ${PORT}`);
})