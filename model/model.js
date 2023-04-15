const mongoose = require('mongoose');


const curdSchema = new mongoose.Schema({
        name:{
            type:String,
            require:true
        },
        email:{
            type:String,
            require:true
            
        }
})

const Curd = new mongoose.model("Curd" , curdSchema);

module.exports = Curd;