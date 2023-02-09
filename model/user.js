var mongoose =require('mongoose')

var user_schema=mongoose.Schema({
    name:String,
    phone: String,
    user_name: String,
    password:String
})
var  user =mongoose.model('user',user_schema)
module.exports =user