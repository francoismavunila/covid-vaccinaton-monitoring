import React, { useState } from 'react';
import { Grid, Paper} from '@material-ui/core';
import { Avatar } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './Register.css'
import axios from '../../axiosInstance';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';



const Register = () => {
    
    const [email, setEmail] = useState("")


    const [password, setPassword] = useState("")
    

    const handleSubmit = (evt) => {
        evt.preventDefault();
        axios.post('/users/registration', {
            email: email,
            password: password
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
  return (

    <Grid>
        <Paper><h1>Register an Admin to the system</h1></Paper>
        <Paper elavation={24} className="paper_form" >
            <form  noValidate autoComplete="off">
                <TextField id="standard-basic" label="email" placeholder='Enter email' value={email} 
                fullWidth required 
                onChange={e => setEmail(e.target.value)} className="space" /><br/>
                <TextField id="standard-basic" label="password" 
                placeholder='Enter password' type='password' value={password} fullWidth required
                onChange={e => setPassword(e.target.value)} className="space" />
                <br/><br/>
            </form>
            <br />
            <Button onClick={handleSubmit} variant="contained" color="primary" className="space">Submit</Button>
        </Paper>
    </Grid>
  )
}

export default Register;