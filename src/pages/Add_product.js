import React, { useState, useEffect, use } from 'react';
import {
    Box, Container, Grid, Typography, Card, CardContent,
    FormControl, FormLabel, TextField, Button, Stack, OutlinedInput,
    InputAdornment, IconButton, MenuItem, Select
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

function Add_product() {
    const [productname, setProductname] = useState('')
    const [categories, setCategories] = useState([])
    const [categoryID, setCategoryId] = useState('')
    const [subcategories, setSubcategories] = useState([])
    const [subcategoryId, setSubcategoryId] = useState('')
    const [filtersubdata, setFilterSubdata] = useState([])
    const [picture, setPicture] = useState([])
    const [color, setColor] = useState([])
    const [material, setMaterial] = useState('')
    const [price, setPrice] = useState('')
    const [desc,setDesc] = useState('')

    useEffect(() => {
        var fetchcategories = async () => {
            try {
                var respose = await axios.get('http://localhost:3000/admin/dispcategory')
                console.log("CAT = ", respose.data.data);

                if (respose.data.data) {
                    setCategories(respose.data.data)
                }
            }
            catch (error) {
                console.log("Error in fetchinng categories..", error);
            }
        };
        fetchcategories()
    }, [])

    useEffect(() => {
        const fetchSubcategories = async () => {
            try {
                const response = await axios.get('http://localhost:3000/admin/dispsubcat');
                console.log("SUB-CAT == ", response.data.data);

                if (response.data.data) {
                    setSubcategories(response.data.data); 
                }
            } catch (error) {
                console.log("Error in fetching subcategories", error);
            }
        };
        fetchSubcategories();
    }, []);

    useEffect(() => {
        if (categoryID) {
            console.log("Cat ID = " + categoryID);
            console.log("Subcategories = ", subcategories);

            const data = subcategories.filter(item => item.category_id._id === categoryID);

            console.log("Filtered Data = ", data);
            setFilterSubdata(data);
        } else {
            setFilterSubdata([]);
        }

        setSubcategoryId('');
    }, [categoryID, subcategories]);

    var handleFileChange = (e) => {
        setPicture([...e.target.files])
    }

    var handleAddproduct = async () => {
        var formdata = new FormData()
        formdata.append('subcategory_name', subcategories)
        formdata.append('category_name', categories)
        formdata.append('product_name', productname)
        formdata.append('material', material)
        formdata.append('color', color)
        formdata.append('price', price)
        formdata.append('description',desc)

        for (var i = 0; i < picture.length; i++) {
            formdata.append('picture', picture[i])
        }

        try {
            const response = await axios.post(`http://localhost:3000/admin/addproduct/${subcategoryId}`,
                formdata,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            )
            if (response.data.data) {
                alert("product add successfully")
            }
            else {
                alert("There is issue")
            }
        }
        catch (error) {
            alert('error : ' + error.message)
        }
    }


    return (
        <div>
            <Box>
                <Container maxWidth="sm">
                    <Grid container justifyContent="center" padding="50px 0px">
                        <Grid item sm={8} xs={12}>
                            <Box textAlign="center" paddingBottom="18px">
                                <Typography variant="h6" fontWeight={500} fontSize={'20px'}>
                                    Add Product
                                </Typography>
                            </Box>
                            <Card sx={{ boxShadow: "0px 0px 8px rgba(0,0,0,0.3)" }}>
                                <CardContent sx={{ padding: "30px 20px" }}>
                                    <Typography variant="h5" fontWeight={400} textAlign="center">
                                        Add a New Product
                                    </Typography>
                                    <Typography variant="body2" textAlign="center" marginBottom="22px" color='#8f8989'>
                                        Fill in the details below to add a new Product
                                    </Typography>
                                    <Stack spacing={2}>

                                        {/* Select Category Dropdown */}
                                        <FormControl fullWidth>
                                            <FormLabel sx={{ color: "#000", marginBottom: "8px" }}>Select Category</FormLabel>
                                            <Select
                                                value={categoryID}
                                                onChange={(e) => {
                                                    setCategoryId(e.target.value);
                                                    console.log("Selected category ID = " + e.target.value);
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

                                        {/* Select Sub-Category Dropdown */}
                                        <FormControl fullWidth>
                                            <FormLabel sx={{ color: "#000", marginBottom: "8px" }}>Select Sub-Category</FormLabel>
                                            <Select
                                                value={subcategoryId}
                                                onChange={(e) => {
                                                    setSubcategoryId(e.target.value);
                                                    console.log("Selected sub-category ID = " + e.target.value);
                                                }}
                                                displayEmpty
                                                size="small"
                                            >
                                                <MenuItem value="" disabled>Select a Sub Category</MenuItem>
                                                {filtersubdata.map((item) => (
                                                    <MenuItem key={item._id} value={item._id}>
                                                        {item.subcategory_name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        
                                        {/*  Product*/}
                                        <FormControl fullWidth>
                                            <FormLabel sx={{ color: "#000", marginBottom: "8px" }}>Product Name</FormLabel>
                                            <TextField
                                                type="text"
                                                size="small"
                                                value={productname}
                                                onChange={(e) => setProductname(e.target.value)}
                                            />
                                        </FormControl>

                                        {/* Upload Image */}
                                        <FormControl fullWidth>
                                            <FormLabel sx={{ color: "#000", marginBottom: "8px" }}>Upload Image</FormLabel>
                                            <OutlinedInput
                                                type="file"
                                                multiple
                                                inputProps={{
                                                    multiple: true,
                                                    accept: "image/*"
                                                }} // Allow multiple image selection
                                                size="large"
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

                                          {/*  color*/}
                                          <FormControl >
                                            <FormLabel sx={{ color: "#000", marginBottom: "8px" }}>Color</FormLabel>
                                            <TextField
                                                type="text"
                                                size="small"
                                                value={color}
                                                onChange={(e) => setColor(e.target.value)}
                                            />
                                        </FormControl>
                                          {/*  material*/}
                                          <FormControl >
                                            <FormLabel sx={{ color: "#000", marginBottom: "8px" }}>Material</FormLabel>
                                            <TextField
                                                type="text"
                                                size="small"
                                                value={material}
                                                onChange={(e) => setMaterial(e.target.value)}
                                            />
                                        </FormControl>

                                          {/*  price*/}
                                          <FormControl fullWidth>
                                            <FormLabel sx={{ color: "#000", marginBottom: "8px" }}>Price</FormLabel>
                                            <TextField
                                                type="text"
                                                size="small"
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                            />
                                        </FormControl>

                                          {/*  description*/}
                                          <FormControl fullWidth>
                                            <FormLabel sx={{ color: "#000", marginBottom: "8px" }}>Description</FormLabel>
                                            <TextField
                                                type="text"
                                                size="small"
                                                value={desc}
                                                onChange={(e) => setDesc(e.target.value)}
                                            />
                                        </FormControl>

                                        {/* Submit Button */}
                                        <Button
                                            variant="contained"
                                            sx={{ textTransform: "capitalize", fontSize: "16px", backgroundColor: "#000" }}
                                            onClick={handleAddproduct}
                                        >
                                            Add Product
                                        </Button>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </div>
    )
}

export default Add_product