import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import Input from "@mui/joy/Input";
import { Button } from "@mui/joy";
import { dark } from "@mui/material/styles/createPalette";
import { useLocation, useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";
import { Loader } from "../Components/Loader/Loader";


const Signup = () => {
  const [loading , setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {state } = location;
  const [signupCredentials , setSignupCredentials] = useState({
    email:"",
    firstname:"",
    lastname:"",
    password:"",
  })


 const signupHandler = async () => {
  setLoading(prev => !prev)
  const email = signupCredentials.email;
  const firstname = signupCredentials.firstname;
  const lastname = signupCredentials.lastname;
  const password = signupCredentials.password;
    try {
      const response = await axios.post("http://localhost:3000/users/signup", {
        email,
        firstname,
        lastname ,
        password
      });
      if (response.status === 200 || response.status === 201) {
        setLoading(prev => !prev);
        navigate('/login', { state })
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
    {loading && <Loader/>}
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#edf2f6",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            bgcolor: "white",
            width: { xs: "80%", sm: "70%", md: "50%", lg: "40%", xl: "30%" },
            padding: 2,
            justifyContent: "center",
            borderRadius: 4,
            borderTop: "3px solid #FF69B4",
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
            <Typography variant="h3" sx={{ textAlign:"center" , cursor: "pointer"}}  fontWeight={300}>
              Welcome to Roc8 Data Visualization 
            </Typography>
            <Typography sx={{ marginTop: 1 }}>Sign Up</Typography>
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
                type="password"
                variant="outlined"
                sx={{ width: "100%" }}
                value={signupCredentials.password}
                onChange={(e)=>{setSignupCredentials({...signupCredentials, password:e.target.value})}}
              />
            </Box>
            <Button
              size="md"
              variant="solid"
              sx={{ marginTop: 2, width: "100%" , background:"#FF69B4" ,  "&:hover": {
      background: "#FF4D94",
    },}}
              onClick={signupHandler}
              
            >
              Sign Up
            </Button>
          </Box>

          <Typography fontWeight={300} sx={{ textAlign:"center" , cursor: "pointer"}} onClick={()=>navigate('/login', { state })}>
            Already have an account ? Sign in
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Signup;