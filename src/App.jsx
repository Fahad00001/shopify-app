import 'remixicon/fonts/remixicon.css'
import {
   BrowserRouter,
  Routes,
  Route 
} 
  from "react-router-dom";
  import 'animate.css';

import Products from './Components/Products';
import AdminProduct from './Components/Admin/Products';
import Order from './Components/Admin/Orders';
import Dashboard from './Components/Admin/Dashboard';
import Customer from './Components/Admin/Customer';
import Settings from './Components/Admin/Settings';
import Payments from './Components/Admin/Payments';
import Admin from './Components/Admin';
import NotFound from './Components/NotFound';
import Home from './Components/Home';
import Category from './Components/Category';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Contactus from './Components/Contactus';
import PreGuard from './Components/Guard/PreGuard';
import Cart from './Components/Cart';
import Profile from './Components/Profile';

// import Product from './Components/Products';

const App=()=>{
  return(
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/category' element={<Category/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/profile' element={<Profile/>}/>
       

        {/* protect route */}
        <Route element={<PreGuard/>}>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        </Route>
        <Route path='/contact-us' element={<Contactus/>}/>
        {/* admin */}
        <Route path="/admin">
        <Route path='products' element={<AdminProduct />}/>
        <Route path='orders' element={<Order />}/>
        <Route path='dashboard' element={<Dashboard/>}/>
        <Route path='payments' element={<Payments/>}/>
        <Route path='customers' element={<Customer/>}/>
        <Route path='settings' element={<Settings/>}/>
        <Route path='auth' element={<Admin />}/>
        </Route>
        <Route path='*' element={<NotFound />}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App
