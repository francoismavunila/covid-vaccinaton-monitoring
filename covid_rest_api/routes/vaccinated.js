const express = require('express');
const router = express.Router();
const vaccinated = require('../models/vaccinated.js');


router.get('/',(req,res)=>{
    vaccinated .find()
   .exec()
   .then(docs=>{
       console.log(docs);
       res.status(200).json(docs)
   })
   .catch(err=>{
        console.log(docs)
        res.status(500).json({
            message : "couldn't fetch the docs"
        })
   })
})

router.post('/',(req,res)=>{
    console.log("here")
    const {Name, Surname, Id,DOB,Place,SecondDoseDate,Age}= req.body;
    console.log(Name)
    if (!Name || !Surname || !Id || !DOB || !Place|| !SecondDoseDate || !Age) return res.status(400).json({ 'message': 'makesure all fields are filled' });
    console.log(Name)
    vaccinated.findOne({National_Id:Id})
    .exec()
    .then(_user=>{
      if(_user){
          console.log('found user'+_user)
          res.status(400).json({
              message:'user exist'
          })
      }else{
        console.log('not founf')
        const Vacc = new vaccinated({
            Name : Name,
            Surname : Surname,
            National_Id : Id,
            DOB: DOB,
            Place: Place,
            SecondDoseDate: SecondDoseDate,
            Age:Age,
            First_Dose : true,
            First_Date: "",
            Second_Dose : false,
            Finger_Id : '' 
        })
        console.log("here nownow")
        Vacc.save().then(response=>{
            console.log(response);
            console.log("here now")
            res.status(200).json({
                message : response
            })
        })
        .catch(error=>{
            console.log("error"+error);
            res.status(500).json({
                message : 'server error'
            })
        })
      }
    })
    .catch(error=>{
        console.log(error);
        res.status(500).json({
          message:'server error'
      })
    })
  
})


router.get('/filter',(req,res)=>{
  const national_id =req.params.national_id;
  const finger_id = req.params.finger_id;
  if(national_id){
        Vaccinated.findOne({National_Id:national_id})
        .exec()
        .then(person=>{
            console.log(person);
            res.status(200).json({
                data : person
            })
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                message:'failed to fetch data'
            })
        })
  }else if(finger_id){
        Vaccinated.findOne({National_Id:national_id})
        .exec()
        .then(person=>{
            console.log(person);
            if(doc){
                res.status(200).json({
                    data : person
                })
            }
            res.status(200).json({
                message : 'invalid filter parameter'
            })

        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                message:'failed to fetch data'
            })
        })
  }else{
     res.status(400).json({
         message : 'provide atleast one filtering parameter'
     }) 
  }

})
router.delete('/:national_id',(req,res)=>{
   const id = req.params.national_id;
   Vaccinated.remove({National_Id:national_id})
   .exec()
   .then(result=>{
       res.status(200).json(resuult);
   })
   .catch(err=>{
       console.log(err);
       res.status(500).json({
           error:err
       })
   })
 })

 router.patch('/',(req,res)=>{
   Vaccinated.update({National_Id:national_id},{$set:{Second_Dose : True,Second_Date : new Date()}})
   .exec()
   .then(result=>{
    res.status(200).json(resuult);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
 })
module.exports = router;