import React, { useState, useEffect } from 'react';
import {
  Box, Container, Grid, Typography, Card, CardContent,
  FormControl, FormLabel, TextField, Button, Stack, OutlinedInput,
  InputAdornment, IconButton, MenuItem, Select
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

function Add_subcat() {
  const [subcategoryname, setSubcategoryname] = useState('');
  const [picture, setPicture] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);

  // Fetch categories when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/admin/dispcategory');
        if (response.data.status) {
          setCategories(response.data.data); 
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleFileChange = (e) => {
    setPicture([...e.target.files]); // Store all selected files in state
  };

  const handleAddSubcat = async () => {
    let formdata = new FormData();
    formdata.append('subcategory_name', subcategoryname); //error ocuures here because i wrote subcategory instead of subcategory_name
    formdata.append('category', categoryId);
    

    for (var i = 0; i < picture.length; i++) {
      formdata.append('picture', picture[i]);
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/admin/addsubcategory/${categoryId}`, 
        formdata,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      console.log("sub cate api successfully hit",response)

      if (response.data.status) {
        alert("Subcategory added successfully");
      } else {
        alert("There is an issue");
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <Box>
      <Container maxWidth="sm">
        <Grid container justifyContent="center" padding="50px 0px">
          <Grid item sm={8} xs={12}>
            <Box textAlign="center" paddingBottom="18px">
              <Typography variant="h6" fontWeight={500} fontSize={'20px'}>
                Add Sub-Category
              </Typography>
            </Box>
            <Card sx={{ boxShadow: "0px 0px 8px rgba(0,0,0,0.3)" }}>
              <CardContent sx={{ padding: "30px 20px" }}>
                <Typography variant="h5" fontWeight={400} textAlign="center">
                  Add a New Sub-Category
                </Typography>
                <Typography variant="body2" textAlign="center" marginBottom="22px" color='#8f8989'>
                  Fill in the details below to add a new Subcategory
                </Typography>
                <Stack spacing={2}>
                  
                  {/* Select Category Dropdown */}
                  <FormControl fullWidth>
                    <FormLabel sx={{ color: "#000", marginBottom: "8px" }}>Select Category</FormLabel>
                    <Select
                      value={categoryId}
                      onChange={(e) => { 
                        setCategoryId(e.target.value)
                        console.log("selected category id = "+e.target.value);                        
                      }}
                      displayEmpty
                      size="small"
                    >
                      <MenuItem value="" disabled>Select a Category</MenuItem>
                      {categories.map((category) => (
                        <MenuItem key={category._id} value={category._id}>
                          {category.category_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  {/* Subcategory Name */}
                  <FormControl fullWidth>
                    <FormLabel sx={{ color: "#000", marginBottom: "8px" }}>Subcategory Name</FormLabel>
                    <TextField
                      type="text"
                      size="small"
                      value={subcategoryname}
                      onChange={(e) => setSubcategoryname(e.target.value)}
                    />
                  </FormControl>

                  {/* Upload Image */}
                  <FormControl fullWidth>
                    <FormLabel sx={{ color: "#000", marginBottom: "8px" }}>Upload Image</FormLabel>
                    <OutlinedInput
                      type="file"
                      multiple
                      size="large"
                      inputProps={{
                        multiple: true,
                        accept: "image/*"
                      }} // Allow multiple image selection
                      onChange={handleFileChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton edge="end">
                            <PhotoCamera />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>

                  {/* Submit Button */}
                  <Button
                    variant="contained"
                    sx={{ textTransform: "capitalize", fontSize: "16px", backgroundColor: "#000" }}
                    onClick={handleAddSubcat}
                  >
                    Add SubCategory
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Add_subcat;
