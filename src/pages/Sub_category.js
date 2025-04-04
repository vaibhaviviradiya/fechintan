import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function Sub_category() {
    const navigate = useNavigate()
    const [Categories,setCategories] = useState([]);
    useEffect(()=>{
      axios.get('http://localhost:3000/admin/dispsubcat')
      .then((res)=>{        
        setCategories(res.data.data);
        console.log(res.data.data);
      })
      .catch((error)=>{
        console.error('Error fetching category data:', error);
      })
    },[]);
    
  return (
    <div style={{margin:'20px'}}> 
    <div  style={{margin:'20px',textAlign:'center',display:"flex",justifyContent:'center'}}>
    <Button variant="contained" 
    sx={{backgroundColor:"black",display:"flex",padding:"10px 80px",alignItems: 'center'}}
    onClick={()=>navigate('/add_sub_category')}>
      Add Sub-Category
    </Button>
    </div>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700}} aria-label="customized table">
        <TableHead>
          <TableRow>
            {/* <StyledTableCell>Cateegory id</StyledTableCell> */}
            <StyledTableCell align="center">Sub-category Name</StyledTableCell>
            <StyledTableCell align="center">Image</StyledTableCell>
            <StyledTableCell align="center">Category Name</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Categories.map((item,index) => (
            <StyledTableRow key={item.id}>
              <StyledTableCell component="th" align='center' scope="row">{item.subcategory_name}</StyledTableCell>
              <StyledTableCell align="center">
                  <img 
                  src={`http://localhost:3000/images/${item.picture[0]}`}  
                  width="100px"
                  height="100px" 
                  style={{ objectFit: "cover", borderRadius: "8px" }}
                  />
                </StyledTableCell>
              <StyledTableCell align="center">{item.category_name}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}


export default Sub_category