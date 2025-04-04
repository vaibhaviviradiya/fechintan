import React from 'react';
import { 
  Box, CssBaseline, Container, Stack, Typography, Card, CardContent, 
  FormControl, FormLabel, TextField, OutlinedInput, InputAdornment, 
  IconButton, Checkbox, Button, Grid 
} from '@mui/material';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function Adminlogin() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  var navigate = useNavigate()

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handlelogin = async()=>{
    try{
      var logindata = await axios.post('http://localhost:3000/admin/login',{Username : username,Password : password})
      console.log(logindata);      
      if(logindata)
      {
        navigate('/welcome')
      }
      else
      {
        alert("error")
      }
    }
    catch(error)
    {
      // alert(error.Message)
      // navigate('/welcome')
      alert("Wrong username or password")
    }
  }

  return (
    <div>
      <Box>
        <CssBaseline />
        <Container maxWidth="sm">
          <Grid container justifyContent="center" padding="50px 0px">
            <Grid item sm={8} xs={12}>
              <Box textAlign="center" paddingBottom="18px">
                <Typography component="a" sx={{ textDecoration: "none", display: "inline-block" }}>
                  <Typography
                    variant="h6"
                    noWrap
                    color="text.primary"
                    fontWeight={500}
                    fontFamily={"Lucida sans"}
                    fontSize={'20px'}
                    sx={{
                      mr: 2,
                      textDecoration: 'none',
                    }}
                  >
                    Admin Login
                  </Typography>
                </Typography>
              </Box>
              <Card sx={{ boxShadow: "0px 0px 8px rgba(0,0,0,0.3)" }}>
                <CardContent sx={{ padding: "30px 20px" }}>
                  <Typography variant="h5" component="div" fontWeight={400} textAlign="center">
                    Login to Your Account
                  </Typography>
                  <Typography variant="body2" textAlign="center" marginBottom="22px" color='#8f8989'>
                    Enter your username & password to login
                  </Typography>
                  <Stack spacing={2}>
                    <FormControl fullWidth>
                      <FormLabel sx={{ color: "#000", marginBottom: "8px" }}>Username</FormLabel>
                      <TextField
                        type="text"
                        size="small"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </FormControl>
                    <FormControl fullWidth>
                      <FormLabel sx={{ color: "#000", marginBottom: "8px" }}>Password</FormLabel>
                      <OutlinedInput
                        type={showPassword ? 'text' : 'password'}
                        size="small"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              edge="end"
                            >
                              {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                    <Stack direction="row" alignItems="center">
                      <Checkbox disableRipple />
                      <Typography color='#8f8989'>
                        Remember me
                      </Typography>
                    </Stack>
                    <Button
                    onClick={handlelogin}
                      variant="contained"
                      sx={{ textTransform: "capitalize", fontSize: "16px", backgroundColor: "#000" }}
                    >
                      Login
                    </Button>
                    <Typography>
                      Don't have an account?
                      <Typography
                        component="a"
                        href="#ff"
                        color="#8f8989"
                        sx={{ textDecoration: "none" }}
                      >
                        {' '}Create an account
                      </Typography>
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
}

export default Adminlogin;
