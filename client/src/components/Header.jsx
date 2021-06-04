import React from "react";
import {Link } from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { AppBar, Toolbar } from "@material-ui/core";
import { Typography, Button, Container } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
const Header = () => {
  const classes = useStyles();
  return (
    <header>
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        className={classes.appBar}
      >
        <Container>
          <Toolbar className={classes.toolbar}>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              color="inherit"
              noWrap
              className={classes.toolbarTitle}
            >
              ShopingWeb
            </Typography>
            <nav>
              <IconButton component={Link} to="/shoping" aria-label="delete" className={classes.margin}>
                <ShoppingCartIcon />
              </IconButton>
            </nav>
            <Button
              component={Link}
              to="/login"
              color="primary"
              variant="outlined"
              className={classes.link}
            >
              Login
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </header>
  );
};

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
}));
export default Header;
