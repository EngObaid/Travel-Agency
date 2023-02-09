var express =require('express')
var app=express()
var User= require('../model/user')
var airline= require('../model/airline')
var agency= require('../model/agency')
var Booking= require('../model/booking')
var moment = require("moment-timezone");
// get dashboard
app.get('/',(req,res)=>{
    res.render('home',{
        data:[]
    })
})
// user re

app.get('/users',(req,res)=>{
    User.find({}).then((users)=>{
    res.render('users',{
        data:users
    })
})
})

//save user
app.post('/save_user',(req,res)=>{
    console.log(req.body)
    var user_data= new User({
        name:req.body.name,
        phone:req.body.phone,
        user_name:req.body.user_name,
        password:req.body.password
    })
    user_data.save().then((d)=>{
        res.redirect('users')
    })
})
//edit user
app.post('/edit_user',(req,res)=>{ 
    var  data = { 
        name:req.body._name, 
        phone:req.body._phone, 
        user_name:req.body._user_name, 
    } 
     User.findOneAndUpdate({_id:req.body._id},data) .then((d)=>{
        res.redirect('users')
    })
  
})

//delete users
app.delete('/del_user',(req,res)=>{
    airline.deleteOne(req.body._id).then((d)=>{
        res.redirect('users')
    });
    // res.redirect('airlines')
})

//airline
app.get('/airline',(req,res)=>{
    airline.find({}).then((depts)=>{
    res.render('airline',{
        data:depts
    })
})
})
app.post('/save_dept',(req,res)=>{
     var dept= new airline({
        name:req.body.name,
        desc:req.body.desc,
       
    })
    dept.save().then((d)=>{
        res.redirect('airline')
    })
})
//edit airlines //newly added
app.post('/edit_dept',(req,res)=>{ 
    var  data = { 
        name:req.body._name,
        desc:req.body._desc,
    } 
     airline.findOneAndUpdate({_id:req.body._id},data) .then((d)=>{
        res.redirect('airline')
    })
  
})






//login
app.post('/check_login',(req,res)=>{
    User.find({user_name:req.body.user_name,password:req.body.password})
    .then((data)=>{
        console.log(data) 
        if(data.length > 0){
            res.render('home',{
         data:data
            } )
        } else {
            res.render('login' )
        }
   
    })
})

app.get('/login',(req,res)=>{ 
            res.render('login' ) 
})
app.post('/login',(req,res)=>{ 
    res.render('login' ) 
})
// agency
app.get('/agency',(req,res)=>{ 
    agency.find({}).then((doct)=>{
    airline.find({}).then((dept)=>{
        res.render('agency',{
            data:dept,
            doct:doct
        } ) 
    }) 
}) 
})

//save agencys
app.post('/save_doctor',(req,res)=>{ 
    var doctor_data= new agency({
        name:req.body.name,
        phone:req.body.phone,
        email:req.body.email,
        airline_id:req.body.airline_id

    })
    doctor_data.save().then((d)=>{
        res.redirect('agency')
    })
})

//edit agency
app.post('/edit_doc',(req,res)=>{ 
    var  data = { 
        name:req.body._name,
        phone:req.body._phone,
        email:req.body._user_name,
        airline_id:req.body.airline_id
    } 
     agency.findOneAndUpdate({_id:req.body._id},data) .then((d)=>{
        res.redirect('agency')
    })
  
})
//delete Doc
app.delete('/del_doc',(req,res)=>{
    airline.deleteOne(req.body._id).then((d)=>{
        res.redirect('agency')
    });
    // res.redirect('airlines')
})

app.delete('/del_dept',(req,res)=>{
    airline.deleteOne(req.body._id).then((d)=>{
        res.redirect('airlines')
    });
    // res.redirect('airlines')
})

// Booking get
app.get('/booking',(req,res)=>{ 
    Booking.aggregate([
        {
            $lookup:{
                from:"doctors",
                localField:"doctor_id",
                foreignField:"_id",
                as: "doctor"
            },
        },
            { $unwind: "$doctor" },
        
    ]).then((b)=>{
    agency.find({}).then((doct)=>{
        res.render('booking',{
            data:b,
            doct:doct,
            moment:moment
        } ) 
    }) 
}) 
})

//save Booking
app.post('/save_booking',(req,res)=>{ 
    var b_data= new Booking({
        patient_name:req.body.c_name,
        patient_phone:req.body.c_phone, 
        doctor_id:req.body.doctor_id,
        source:req.body.source,
        distination:req.body.destination,
        amount:req.body.amount

    })
    b_data.save().then((d)=>{
        res.redirect('booking')
    })
})


//Edit Booking
app.post('/edit_doc',(req,res)=>{ 
    var  data = { 
        patient_name:req.body.c_name,
        patient_phone:req.body.c_phone, 
        doctor_id:req.body.doctor_id,
        source:req.body.source,
        distination:req.body.destination,
        amount:req.body.amount
    } 
     Booking.findOneAndUpdate({_id:req.body._id},data) .then((d)=>{
        res.redirect('booking')
    })
  
})
//delete booking
app.delete('/del_book',(req,res)=>{
    airline.deleteOne(req.body._id).then((d)=>{
        res.redirect('booking')
    });
    // res.redirect('airlines')
})
 
module.exports =app