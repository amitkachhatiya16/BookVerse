import React, { useContext} from 'react';
import { Typography, Paper, Container, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { AuthContext } from '../../../context/authContext';
import './UserProfile.css';

const UserProfile = () => {
    const Details = useContext(AuthContext);
    console.log(Details);

    const user = useContext(AuthContext);
    const logout = () =>{
        user.signOut();
        }
    


    return (
        <Container maxWidth="md" id="profile-container">
            <Paper elevation={3} id="profile-paper">
                <Typography  variant="h9" id="profile-title">
                    User Profile
                </Typography>
                {Details && (
                    <>
                    <Grid container spacing={2} id="profile-grid">
                        
                        <Grid item xs={12} id="profile-detail">
                            <Typography id="fontmain"  sx={{fontSize:35}} variant="h6">Name: {Details.user.firstName}</Typography>
                        </Grid>
                        <Grid item xs={12} id="profile-detail">
                            <Typography id="fontmain" sx={{fontSize:35}} variant="h6">Email: {Details.user.email}</Typography>
                        </Grid>
                        <Grid item xs={12} id="profile-detail">
                            <Typography id="fontmain" sx={{fontSize:35}} variant="h6">Role: {Details.user.role}</Typography>
                        </Grid>
                        <Grid item xs={12} id="profile-detail">
                            <Typography id="fontmain" sx={{fontSize:35}} variant="h6">RoleID: {Details.user.roleId}</Typography>
                        </Grid>
                    </Grid>
                    </>
                )}

                <div id="logout-button">
                <Button type="button" id="fontmain"  class="btn btn-danger" href="/"
                onClick={logout}>
                    LogOut
                </Button>
                </div>
            <br/>
            <div id="profile-buttons">
                {Details.user.role === "admin" && (
                <div id="edit-button">
                <Button type="button" class="btn btn-info" href="/BooksPage">
                    Edit Book
                </Button>
                </div>)}
                {Details.user.role === "admin" && (
                <div id="edit-button">
                <Button type="button" class="btn btn-info" href="/UserInfo">
                    All Users
                </Button>
                </div>)}
                {Details.user.role === "admin" && (
                <div id="edit-button">
                <Button type="button" class="btn btn-info" href="/AddBook">
                    Add Book
                </Button>
                </div>)}
                {Details.user.role === "seller" && (
                <div id="edit-button">
                <Button type="button" class="btn btn-info" size="large" href="/AddBook" >
                    Add Book
                </Button>
                </div>)}

                {Details.user.role === "seller" && (
                <div id="edit-button">
                <Button type="button" class="btn btn-info" href="/EditUser">
                    Edit Profile
                </Button>
                </div>)}
                
                {Details.user.role === "admin" && (
                <div id="edit-button">
                <Button type="button" class="btn btn-info" href="/CategoryInfo">
                    All Category 
                </Button>
                </div>)}

                {Details.user.role === "buyer" && (
                <div id="edit-button">
                <Button type="button" class="btn btn-info" href="/EditUser">
                    Edit Profile
                </Button>
                </div>)}

            </div>
            </Paper>
        </Container>
    );
};

export default UserProfile;
