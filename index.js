var express =require('express')
var ejs =require('ejs')
var app =express()
var connectdb=require('./db/connection')
connectdb()
app.use(express.urlencoded({extends:true}))
app.use(express.json())
// db load
app.set('view engine','html')
app.engine('html',ejs.renderFile)
app.use(express.static('./public'))
app.use('/',require('./route/route'))
app.listen(9000)
console.log(9000)
