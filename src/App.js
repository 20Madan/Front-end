import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Nav from './components/Nav';
import SignUp from './components/SignUp';
import PrivateComponent from './components/PrivateComponent'
import Login from './components/Login';
import AddProduct from './components/AddProducts';
import ProductsList from './components/ProductsList';
import UpdateProduct from './components/UpdateComponent';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav/>
      <Routes>
      <Route element={<PrivateComponent/>}>
        <Route path='/' element={<ProductsList/>}/>
        <Route path='/add' element={<AddProduct/>}/>
        <Route path='/update/:id' element={<UpdateProduct/>}/>
        <Route path='/logout' element={<h1>LogOut Component</h1>}/>
        <Route path='/profile' element={<h1>Profile Component</h1>}/>
        </Route>
        <Route path='/signup' element= {<SignUp/>}/>
        <Route path='/Login'  element={<Login/>}/>
      </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
