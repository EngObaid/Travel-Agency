var mongoose =require('mongoose')

var doct_schema=mongoose.Schema({
    name:String,
    phone: String,
    email: String,
    department_id:{type:mongoose.Types.ObjectId}
})
var  agency =mongoose.model('agency',doct_schema)
module.exports =agency