import React, { useState } from 'react';
import Container from '@mui/material/Container';
import { Switch, TextField } from '@mui/material/';
import './Login.css'
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import LoginService from '../services/LoginService';
import UserHome from './UserHome';
import axios from "axios"
import EasyRentalAppBar from './EasyRentalAppBar';
import { myStorage } from '../App';
const USER_REST_API_URL = "http://localhost:8080"


export default function Login() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    var sha256 = require('js-sha256').sha256;

    const settingError = () => {
        setError("Incorrect Login credentials");
    }

    const validateLoginDetails = (loginDetails) => {
        if (loginDetails.email.length == 0 || loginDetails.password.length == 0) {
            return false;
        }
        return true;
    }

    const login = (e) => {
        e.preventDefault();
        const loginFormData = { email: userName, password: password };
        console.log(loginFormData);
        if (!validateLoginDetails(loginFormData)) {
            setError("Please enter a valid email/password");
        } else {
            const loginDetails = { email: userName, password: sha256(password) };
            console.log(loginDetails);
            axios.post(`${USER_REST_API_URL}` + "/", loginDetails)
                .then(res => {
                    if (res.data === "Successful") {
                        myStorage.setItem("email", userName);
                        fetchOutStandingTransactions();
                        navigate("/userHome");
                    }
                    else {
                        settingError();
                    }
                })
        }
    }

    function fetchOutStandingTransactions(){
        
        axios.get(`${USER_REST_API_URL}` + "/fetchAllProducts?email="+myStorage.getItem("email"))
                .then(res => {
                    var obj=[{title: "Mac Book Pro", bookingId:1}, {title: "Play Station", bookingId:2}];
                    myStorage.setItem("pendingTransaction", res.data);
                    
                })
        console.log(myStorage.getItem("pendingTransaction"));
    }

    return (
        <div>
            <EasyRentalAppBar></EasyRentalAppBar>
            <Container>
                <Paper elevation={2} className='login-paper' >
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Login
                    </Typography>
                    <form className='login-form' noValidate autoComplete='off'>
                        <TextField type='email' label='Email' variant='outlined' fullWidth value={userName}
                            onChange={(e) => setUserName(e.target.value)} className="small-margin-below" />
                        <TextField label='Password' type='password' variant='outlined' fullWidth value={password}
                            onChange={(e) => setPassword(e.target.value)} className="small-margin-below" />
                        <Button variant="outlined" onClick={login} className="small-margin-below">Login</Button>
                        <Button variant="outlined" onClick={() => navigate("/registerUser")} className="small-margin-below">Register</Button>
                    </form>
                    {error}
                </Paper>
            </Container>
        </div>
    );
}
