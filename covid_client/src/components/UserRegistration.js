import React, { useState,useRef,useEffect } from 'react';
import { Grid, Paper} from '@material-ui/core';
import { Avatar } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './Authentication/Register.css'
import axios from '../axiosInstance';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import './messaging.css';
import {Routes,Route,Link,useNavigate} from 'react-router-dom';


const UserRegistration = () => {
  const navigate = useNavigate();
    const [Name, setName] = useState("")
    const [DOB, setDOB] = useState("")
    const [Age, setAge] = useState("")
    const [Id, setId] = useState("")
    const [Place, setPlace] = useState("")
    const [Surname, setSurname] = useState("")
    const [SecondDoseDate, setSecondDoseDate] = useState("")
    const [errMsg, setErrMsg] = useState('')
    const [succMsg, setSuccMsg] = useState('')
    const [shouldRedirect, setRedirect] = useState(false)
    
    const userRef = useRef();
    const errRef = useRef();
    const succRef = useRef();


    const handleSubmit = (evt) => {
        evt.preventDefault();
        axios.post('/vaccinated', {
            Name: Name,
            Surname: Surname,
            DOB: DOB,
            Age : Age,
            Id : Id,
            Place: Place,
            SecondDoseDate : SecondDoseDate
          })
          .then(function (response) {
            console.log(response);
            if(response.data){
              setSuccMsg('successful');
              succRef.current.focus();
              //setDriverId(response.data.driver_id)
              setRedirect(true);
            }else{
              setErrMsg('please check your username and password');
              errRef.current.focus();
              
            }
          })
          .catch(function (err) {
            console.log(err);
            if(!err?.response){
              setErrMsg('No Server Response');
            }else if(err.response?.status){
              console.log(err.response)
              setErrMsg(err.response.data.message);
            }
            errRef.current.focus();
          });
    }

    useEffect(()=>{
      {shouldRedirect && navigate('/card',{state:{
        Name: Name,
        Surname: Surname,
        DOB: DOB,
        Age : Age,
        Id : Id,
        Place: Place,
        SecondDoseDate : SecondDoseDate
      }})}
    })
  return (

    <Grid>
          <p ref={errRef} className={errMsg? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
          <p ref={succRef} className={succMsg? "succmsg" : "offscreen"} aria-live="assertive">{succMsg}</p>
        <Paper><h1>Register an Admin to the system</h1></Paper>
        <Paper elavation={24} className="paper_form" >
            <form  noValidate autoComplete="off">
                <TextField id="standard-basic" label="name" placeholder='Enter name ' value={Name} 
                fullWidth required 
                onChange={e => setName(e.target.value)} className="space" /><br/>
                <TextField id="standard-basic" label="surname" placeholder='Enter surname ' value={Surname} 
                fullWidth required 
                onChange={e => setSurname(e.target.value)} className="space" /><br/>
                <TextField id="standard-basic" label="D.O.B" 
                placeholder='Enter date of birth' type='text' value={DOB} fullWidth required
                onChange={e => setDOB(e.target.value)} className="space" />
                <br/>
                <TextField id="standard-basic" label="Age" 
                placeholder='Enter Age' type='text' value={Age} fullWidth required
                onChange={e => setAge(e.target.value)} className="space" />
                <br/>
                <TextField id="standard-basic" label="Id" 
                placeholder='Enter your Id' type='text' value={Id} fullWidth required
                onChange={e => setId(e.target.value)} className="space" />
                <br/>
                <TextField id="standard-basic" label="Place of Vaccination" 
                placeholder='Enter place of vaccination' type='text' value={Place} fullWidth required
                onChange={e => setPlace(e.target.value)} className="space" />
                <br/>
                <TextField id="standard-basic" label="second dose sate" 
                placeholder='Enter place second dose date' type='text' value={SecondDoseDate} fullWidth required
                onChange={e => setSecondDoseDate(e.target.value)} className="space" />
                <br/>
            </form>
            <br />
            <Button onClick={handleSubmit} variant="contained" color="primary" className="space">Submit</Button>
        </Paper>
    </Grid>
  )
}

export default UserRegistration;