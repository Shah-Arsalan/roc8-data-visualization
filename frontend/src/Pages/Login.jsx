
import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Input from "@mui/joy/Input";
import { Button } from "@mui/joy";
import { useNavigate  , useLocation , Navigate} from "react-router-dom";
import axios from "axios";
import {useAuth} from "../Context/AuthContext"
import { Loader } from "../Components/Loader/Loader";

const Login = () => {
  const [loading , setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate()
  const{ token , setToken} = useAuth();
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
  const { state } = location;

  const handleLogin = async () => {
    setLoading(prev => !prev)
    const email = loginDetails.email;
    const password = loginDetails.password;
    try {
      const response = await axios.post("https://roc8-data-visualization.onrender.com/users/login", {
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
        const redirectURL = state?.from ? `/${state.from.search}` : "/";
        setLoading(prev => !prev);
        navigate(redirectURL);
      }
  
     

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

  const handleTestLogin = async () => {
    setLoginDetails({email : "demo@gmail.com" , password : "123456"})
    setLoading(prev => !prev)
    try {
      const response = await axios.post("https://roc8-data-visualization.onrender.com/users/login", {
      email : "demo@gmail.com",
      password : "123456"
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
        const redirectURL = state?.from ? `/${state.from.search}` : "/";
        setLoading(prev => !prev);
        navigate(redirectURL);
      }
  
     

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
            padding: 2,
            justifyContent: "center",
            borderRadius: 4,
            borderTop: "3px solid #FF69B4",
            width: { xs: "80%", sm: "70%", md: "50%", lg: "40%", xl: "30%" },
        
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
            <Typography variant="h3" sx={{textAlign :"center"}} fontWeight={300}>
            Welcome to Roc8 Data Visualization
            </Typography>
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
              size="md"
              variant="solid"
              sx={{ marginTop: 2, width: "100%" , background:"#FF69B4" ,  "&:hover": {
      background: "#FF4D94",
    },}}
              onClick={handleLogin}
            >
              Sign In
            </Button>
            <Button
              size="md"
              variant="solid"
              sx={{ marginTop: 2, width: "100%" , background:"#FF69B4" ,  "&:hover": {
      background: "#FF4D94",
    },}}
              onClick={handleTestLogin}
            >
              Sign In with test credentials
            </Button>
          </Box>

          <Typography sx={{ textAlign:"center" , cursor: "pointer"}} fontWeight={300} onClick={()=>navigate('/signup', { state })}>
            Don't have an account? Sign up
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Login;
