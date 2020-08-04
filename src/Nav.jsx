import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import { Redirect } from 'react-router';
import { deleteCookie } from './utils/cookie';
import React, {useState} from "react";

export default function Navbar() {
    const [redirect, setRedirect] = useState( false );
    return (
        <AppBar position="fixed" color="default">
            {redirect && <Redirect to='/login'/>}
            <Toolbar>
              <Grid
                  container
                  justify="space-between"
              >
                  <Typography variant="h4">
                      <Link className="curl-fonts" to="/dashboard" style={{ textDecoration: 'none', color: '#ed576b' }}>GramInsta</Link>
                  </Typography>
                  <Button
                      color="inherit"
                      onClick={() => {
                          deleteCookie('token');
                          setRedirect(true);
                      }}
                  >Logout</Button>
              </Grid>
            </Toolbar>
        </AppBar>
    );
}
