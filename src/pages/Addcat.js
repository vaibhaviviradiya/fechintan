import React, { useState } from 'react';
import {
  Box, CssBaseline, Container, Grid, Typography, Card, CardContent,
  FormControl, FormLabel, TextField, Button, Stack, OutlinedInput,
  InputAdornment, IconButton
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

function AddCategory() {
 
  const navigate = useNavigate();

  const [categoryname,setCategoryname] = useState('')
  const [picture,setPicture] = useState([]) // this array store multiple images
  const [path,setPath] = useState('')
  const [uploading,setUploading] = useState(false)
  
  const handleFileChange = (e) => {
    setPicture([...e.target.files]); // Store all selected files in state
  };

  var formdata = new FormData()
  formdata.append('category_name',categoryname)
  formdata.append('path',path)
  // formdata.append('picture',picture)
  for (let i = 0; i < picture.length; i++) {
    formdata.append('picture', picture[i]); // Make sure backend supports multiple files
  }

  
  const handleAddCategory = async()=>{
    try{
      var data = await axios.post('http://localhost:3000/admin/addcategory',formdata,{
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      if(data)
      {
        alert("category add")
      }
      else
      {
        alert("there is something issue")
      }
    }
    catch(error)
    {
      alert(error)
    }
  }

  return (
    <div>
      <Box>
        {/* <CssBaseline /> */}
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
                    Add Category
                  </Typography>
                </Typography>
              </Box>
              <Card sx={{ boxShadow: "0px 0px 8px rgba(0,0,0,0.3)" }}>
                <CardContent sx={{ padding: "30px 20px" }}>
                  <Typography variant="h5" component="div" fontWeight={400} textAlign="center">
                    Add a New Category
                  </Typography>
                  <Typography variant="body2" textAlign="center" marginBottom="22px" color='#8f8989'>
                    Fill in the details below to add a new category
                  </Typography>
                  <Stack spacing={2}>
                    
                    {/* Category Name */}
                    <FormControl fullWidth>
                      <FormLabel sx={{ color: "#000", marginBottom: "8px" }}>Category Name</FormLabel>
                      <TextField
                        type="text"
                        size="small"
                      value={categoryname}
                      onChange={(e)=>setCategoryname(e.target.value)}
                      />
                    </FormControl>

                    {/* Upload Image */}
                    <FormControl fullWidth>
                      <FormLabel sx={{ color: "#000", marginBottom: "8px" }}>Upload Image</FormLabel>
                      <OutlinedInput
                        type="file"
                        inputProps={{
                          multiple: true,
                          accept: "image/*"
                        }} // Allow multiple image selection
                        size="large"
                        onChange={handleFileChange}
                        // onChange={(e)=>setPicture(e.target.files[0])}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton edge="end">
                              <PhotoCamera />
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                   
                    </FormControl>

                    {/* Path Description */}
                    <FormControl fullWidth>
                      <FormLabel sx={{ color: "#000", marginBottom: "8px" }}>Path Description</FormLabel>
                      <TextField
                        multiline
                        rows={3}
                        size="small"
                        onChange={(e)=>setPath(e.target.value)}                 
                      />
                    </FormControl>

                    {/* Submit Button */}
                    <Button
                      variant="contained"
                      sx={{ textTransform: "capitalize", fontSize: "16px", backgroundColor: "#000" }}
                      onClick={handleAddCategory}
                    >
                      Add Category
                    </Button>
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

export default AddCategory;
