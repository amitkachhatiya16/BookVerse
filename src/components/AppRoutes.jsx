import React from "react";
import { Route, Routes} from 'react-router-dom'
import BookList from "./Pages/BookList";
import About from "./Pages/About";
// import { AuthContext } from "../context/authContext";
import PageNotFound from "./Pages/PageNotFound";
import Login from "./Pages/Login";
import BooksPage from "./Pages/Books/BooksPage";
import UserProfile from "./Pages/UserProfile/UserProfile";
import Registration from "./Pages/Registration";
import { AddBook } from "./Pages/Books/AddBook";
import { UpdateBook } from "./Pages/Books/UpdateBook";
import UserInfo from "./Pages/Users/UserInfo";
import EditUser from "./Pages/Users/EditUser";
import CategoryInfo from "./Pages/Category/CategoryInfo";
import AddCategory from "./Pages/Category/AddCategory";
import EditCategory from "./Pages/Category/EditCategory";
import Cart from "./cart/Cart";
// import Cookies from "js-cookie";

const AppRoutes = () => {

return(
    <>
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/Registration' element={<Registration/>}/>
            <Route exact path={'/Books'} element={<BookList/>}/>
            <Route path='/About' element={<About/>}/>
            <Route path='/BooksPage' element={<BooksPage/>}/>
            <Route path='/UserInfo' element={<UserInfo/>}/>
            <Route path='/UserProfile' element={<UserProfile/>}/>
            <Route path='/AddBook' element={<AddBook/>}/>
            <Route path='/UpdateBook' element={<UpdateBook/>}/>
            <Route path='/EditUser' element={<EditUser/>}/>
            <Route path='/CategoryInfo' element={<CategoryInfo/>}/>
            <Route path='/AddCategory' element={<AddCategory/>}/>
            <Route path='/EditCategory' element={<EditCategory/>}/>
            <Route path='/Cart' element={<Cart/>}/>
            <Route path='*' element={<PageNotFound/>}/>
        </Routes>
    </>
    );
};

export default AppRoutes;