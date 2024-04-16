import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import Input from "@mui/joy/Input";
import { Button } from "@mui/joy";
import { dark } from "@mui/material/styles/createPalette";
import { useNavigate } from "react-router-dom";


const Signup = () => {
  const navigate = useNavigate();
  const [signupCredentials , setSignupCredentials] = useState({
    email:"",
    firstname:"",
    lastname:"",
    password:"",
  })


 const signupHandler = async () => {
  const email = signupCredentials.email;
  const firstname = signupCredentials.firstname;
  const lastname = signupCredentials.lastname;
  const password = signupCredentials.password;
  console.log("coming in fr" , email ,  firstname,
  lastname,
  password)
    try {
      console.log("coming in fr2")
      console.log("inside try emial", email ,firstname, lastname, password);
      const response = await axios.post("http://localhost:3000/users/signup", {
        email,
        firstname,
        lastname ,
        password
      });
      console.log("in main body" , response)
      if (response.status === 200 || response.status === 201) {
      navigate("/login");
      }
      
      return response.data;
    } catch (error) {
      console.error("in error",error);
      if(axios.isAxiosError(error)){
        console.log("Thsi is axios error")
      }
      return error;
    }
  };



  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            bgcolor: "white",
            width: "30%",
            padding: 2,
            justifyContent: "center",
            borderRadius: 4,
            borderTop: "3px solid blue",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 0.5,
            }}
          >
            <Typography variant="h3" fontWeight={300}>
              Welcome to Linkr
            </Typography>
            <Typography>Get Linked!</Typography>
            <Typography sx={{ marginTop: 1 }}>Sign In</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              padding: 3,
              borderTop: 1,
              marginTop: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                gap: 1,
              }}
            >
              <div>Email:</div>
              <Input
                placeholder="email"
                size="md"
                variant="outlined"
                sx={{ width: "100%" }}
                value={signupCredentials.email}
                onChange={(e)=>{setSignupCredentials({...signupCredentials, email:e.target.value})}}

                
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                gap: 1,
              }}
            >
              <div>First Name:</div>
              <Input
                placeholder="firstname"
                size="md"
                variant="outlined"
                sx={{ width: "100%" }}
                value={signupCredentials.firstname}
                onChange={(e)=>{setSignupCredentials({...signupCredentials, firstname:e.target.value})}}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                gap: 1,
              }}
            >
              <div>Lastname:</div>
              <Input
                placeholder="lastname"
                size="md"
                variant="outlined"
                sx={{ width: "100%" }}
                value={signupCredentials.lastname}
                onChange={(e)=>{setSignupCredentials({...signupCredentials, lastname:e.target.value})}}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                gap: 1,
              }}
            >
              <div>Password</div>
              <Input
                placeholder="*********"
                size="md"
                variant="outlined"
                sx={{ width: "100%" }}
                value={signupCredentials.password}
                onChange={(e)=>{setSignupCredentials({...signupCredentials, password:e.target.value})}}
              />
            </Box>
            <Button
              color="primary"
              size="md"
              variant="solid"
              sx={{ marginTop: 2, width: "100%" }}
              onClick={signupHandler}
              
            >
              Sign Up
            </Button>
          </Box>

          <Typography fontWeight={300} onClick={()=>navigate('/login')}>
            Don't have an account? Sign up
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Signup;