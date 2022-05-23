const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config(); 
const saltRounds =10;

const user = require('../models/user.js');
console.log('inside users');
router.post('/registration',(req,res,next)=>{
    console.log('insider register controller');
    const { email, password} = req.body;
    console.log('email is :'+ email);
    if (!email || !password) return res.status(400).json({ 'message': 'makesure all fields are filled' });
    console.log(email)
    user.findOne({Email:req.body.email})
    .exec()
    .then(_user=>{
        console.log("hererer")
      if(_user){
          console.log('found user'+_user)
          res.status(400).json({
              message:'wrong email or password'
          })
      }else{
        
          bcrypt.hash(req.body.password, saltRounds).then(function(hash) {
            console.log(user)
              const User = new user({
                  Email : req.body.email,
                  Password : hash
              });
              console.log(vaccinated)
              User.save()
              .then(result=>{
                  console.log("save results"+result);
                  res.status(200).json({
                      message:'registered successfully'
                  })
              })
              .catch(err=>{
                  console.log(err)
                  res.status(500).json({
                      message:'server error'
                  })
              })
          });
      }
    })
    .catch(error=>{
        console.log(error);
        res.status(500).json({
          message:'server error'
      })
    })
})

router.post('/login',(req,res,next)=>{
    console.log('insider login controller');
    const { email, password } = req.body;
    console.log('email is :'+ email)
    if (!email || !password) return res.status(400).json({ 'message': 'Username and password are required.' });
    console.log(email+ password)
    user.findOne({Email:email})
    .exec()
    .then(_user=>{
        if(_user){
            //check password
            bcrypt.compare(password, _user.Password).then(function(result) {
                if(result){
                    console.log(result)
                   //using jwt to authontenticate
                   const accessToken = jwt.sign({
                       userInfo:{
                        "userEmail" : _user.Email
                       }
                   },
                   process.env.ACCESS_TOKEN_SECRET,
                   {expiresIn:'30s'} 
                   )
                   console.log(accessToken)
                   res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None',secure:true ,  maxAge: 24 * 60 * 60 * 1000 }); //secure: true, 
                   res.json({accessToken });
                }else{
                    res.status(401).json({
                        message :'invalid credentials'
                    })                   
                }
            });
            
        }else{
            console.log('invalid credentials')
            res.status(401).json({
                message :'invalid credentials'
            })
        }

    })
    .catch(err=>{
        console.log(err)
            res.status(500).json({
                message : 'server error'
            })
        })

})

module.exports = router;