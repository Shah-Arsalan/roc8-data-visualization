
import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Input from "@mui/joy/Input";
import { Button } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {useAuth} from "../Context/AuthContext"

const Login = () => {
  const navigate = useNavigate()
  const{ token , setToken} = useAuth();
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });

  const handleLogin = async () => {
    const email = loginDetails.email;
    const password = loginDetails.password;
    try {
      const response = await axios.post("http://localhost:3000/users/login", {
      email,
      password
      });
  
  
      if(response.status === 404){
        console.log("This is 404 error")
      }
  
  
      if (response.status === 200 || response.status === 201) {
        localStorage.setItem(
          "userToken",
          response.data.token
  
        );
        setToken(response.data.token);
        navigate("/");
      }
  
     
      console.log("The response is" , response);
      return response.data;
    } catch (error) {
      console.error(error);
        if(axios.isAxiosError(error)){
          console.log("This is axios error" , error)
        }
        // Error: Request failed with status code 401
  
        return error;
    }

  }

  useEffect(() => {
    token && navigate("/")

  },[token])
  

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
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
            border: "1px solid blue",
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
                placeholder="username or email"
                size="md"
                variant="outlined"
                value={loginDetails.email}
                onChange={(e) => {
                  setLoginDetails({ ...loginDetails, email: e.target.value });
                }}
                sx={{ width: "100%" }}
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
                type="password"
                onChange={(e) => {
                  setLoginDetails({
                    ...loginDetails,
                    password: e.target.value,
                  });
                }}
              />
            </Box>
            <Button
              color="primary"
              size="md"
              variant="solid"
              sx={{ marginTop: 2, width: "100%" }}
              onClick={handleLogin}
            >
              Sign In
            </Button>
          </Box>

          <Typography fontWeight={300} onClick={()=>navigate('/signup')}>
            Don't have an account? Sign up
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Login;
