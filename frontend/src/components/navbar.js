import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

export default function Navbar(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{backgroundColor:"#0dad46"}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            YOGA - FLEXMONEY
          </Typography>
          {props.user ? (
            <Button color="inherit" onClick={()=>{
                sessionStorage.clear();
                props.setUser(null);
            }}>
                LogOut
                </Button>
            ): (
            <>
            <Link to='/login' style={{textDecoration:'none'}}>
            <Button color="inherit"><Typography style={{color: 'white'}}>Login</Typography></Button>
            </Link>
                
            <Link to='/register' style={{textDecoration:'none'}}>
            <Button color="inherit"><Typography style={{color: 'white'}}>Register</Typography></Button>
            </Link>
            </>
          )}
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}
