
import './App.css';
import { BrowserRouter, NavLink,} from 'react-router-dom';
import Navbar from './components/Navbar';
// import { ThemeProvider, createTheme } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Login from './components/Login';
// import { createContext } from 'react';
import AuthWrapper from './context/authContext';
import AppRoutes from './components/AppRoutes';


function App() {


  return (
    <div id="mainfont">
    <ToastContainer/>
    <AuthWrapper>
    <Navbar/>
    <div className='wrapper'>
      {/* {<Header/>} */}
        <BrowserRouter>
          <div id='as'>
            <div ><NavLink to='/HomePage'></NavLink></div> 
            <div><NavLink to='/Books'></NavLink></div> 
            <div><NavLink to='/About'></NavLink></div> 
            <div><NavLink to='/Registration'></NavLink></div> 
            <div><NavLink to='/'></NavLink></div> 
            <div><NavLink to='*'></NavLink></div>
          </div>
          <AppRoutes/>
        </BrowserRouter> 
      {/* <Footer /> */}
    </div>
    </AuthWrapper>
    </div>
  );
}
export default App;
