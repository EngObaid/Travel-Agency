var mongoose =require('mongoose')
connectdb = async()=>{
    var con = await mongoose.connect('mongodb://localhost:/Traveldb',{
        useNewUrlParser:true,
        useUnifiedTopology:true
        })
    console.log('conected db',con.connection.host)
}
module.exports=connectdb