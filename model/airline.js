var mongoose =require('mongoose')

var dept_schema=mongoose.Schema({
    name:String,
    desc:String 
})
var  airline =mongoose.model('airline',dept_schema)
module.exports =airline