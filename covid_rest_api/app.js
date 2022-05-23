const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

mongoose
  .connect(
    "mongodb://0.0.0.0:27017/CovidVaccinated"
  )
  .then(() => console.log("mongodb connected"))
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });

const vaccRoutes = require('./routes/vaccinated');
const userRoutes = require('./routes/user')

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(cors({credentials: true,origin: "http://localhost:3000"}));
// app.use((req, res , next)=>{
//     res.header("Access-Control-Allow-Origini","*");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin,X-Requested-With, Content-Types, Accept, Authorization"
//     );
//     if(req.method==='OPTIONS'){
//         res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE,GET');
//         return res.status(200).json({});
//     } 
//     next(); 
// })
app.use('/vaccinated',vaccRoutes);
app.use('/users',userRoutes);

app.use((req,res,next)=>{
    console.log('here')
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res,next)=>{
    res.status(error.status || 500);
    res.json({
        errror:{
            message :error.message
        }
    })
})

module.exports = app;