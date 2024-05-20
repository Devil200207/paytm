const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://chinmay:chinmay@cluster0.dwpy7.mongodb.net/paytm");

const UserSchem = mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:false
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    wallet:{
        type:Number,
        required:true
    }
});

const User = mongoose.model("users",UserSchem);
module.exports = {
    User
}