import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { AppBar, Toolbar } from "@material-ui/core";
import { Typography, Button, Container } from "@material-ui/core";
import { MenuItem, Menu } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { logout } from "../actions/user.actions";
const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const logoutHandler = () => {
    dispatch(logout());
  };
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
              {
                userInfo?.role !== 'Admin' && (
                  <IconButton
                    component={Link}
                    to="/cart"
                    aria-label="delete"
                    className={classes.margin}
                  >
                    <Badge color="secondary" badgeContent={cartItems.length}>
                      <ShoppingCartIcon />
                    </Badge>
                  </IconButton>
                )
             }
            </nav>
            {userInfo?.isAuthenticated ? (
              <>
                <Button
                  color="primary"
                  variant="outlined"
                  className={classes.link}
                  onClick={handleMenu}
                >
                  {userInfo.infoUser?.name}
                </Button>

                <Menu
                  anchorEl={anchorEl}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  keepMounted
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                  open={isMenuOpen}
                  onClose={handleMenuClose}
                >
                  {
                    userInfo?.role === 'User' ?
                      (<MenuItem
                        component={Link}
                        to="/profile"
                        onClick={handleMenuClose}
                      >
                        Profile
                      </MenuItem>) :
                      (
                        <MenuItem
                          component={Link}
                          to="/admin"
                          onClick={handleMenuClose}
                        >
                          Dashboard
                        </MenuItem>
                      )
                  }
                  <MenuItem
                    onClick={() => {
                      handleMenuClose();
                      logoutHandler();
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                component={Link}
                to="/login"
                color="primary"
                variant="outlined"
                className={classes.link}
              >
                Login
              </Button>
            )}
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
