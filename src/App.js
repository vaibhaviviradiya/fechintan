import './App.css';
import Adminlogin from './component/Adminlogin';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './component/Welcome';
import Userlist from './pages/Userlist';
import Category from './pages/Category';
import Sub_category from './pages/Sub_category';
import Addcat from './pages/Addcat';
import Add_subcat from './pages/Add_subcat';
import Product from './pages/Product';
import Add_product from './pages/Add_product';
import Orders from './pages/Orders';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Adminlogin/>}></Route>
          <Route path='/welcome' element={<Welcome/>}></Route>
          <Route path='/userlist' element={<Userlist/>}></Route>
          <Route path='/category-managment' element={<Category/>}></Route>
          <Route path='/addcat' element={<Addcat/>}></Route>
          <Route path='/subcategory_managment' element={<Sub_category/>}></Route>
          <Route path='/add_sub_category' element={<Add_subcat/>}></Route>
          <Route path='/product_managment' element={<Product/>}></Route>
          <Route path='/addproduct' element={<Add_product/>}></Route>
          <Route path='/orderlist' element={<Orders/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
