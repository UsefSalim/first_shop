import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import Message from "../components/Message";
import { cyan } from "@material-ui/core/colors";
import { addToCart, removeFromCart } from "../actions/cart.actions";
import {
  Avatar,
  Container,
  Typography,
  Divider,
  Grid,
  Card,
  Button,
} from "@material-ui/core";
import { MenuItem, IconButton, Select, InputLabel } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  ListItemText,
  ListItemAvatar,
  ListItem,
  List,
} from "@material-ui/core";

const CartScreen = () => {
  const classes = useStyles();
  const { id_product } = useParams();
  const { cartItems } = useSelector((state) => state.cart);
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory()
  const qty = +location.search?.split("=")[1] || 1;
  React.useEffect(() => {
    id_product && dispatch(addToCart(id_product, qty));
  }, [dispatch, id_product, qty]);
  const remouveOnCartHnadler = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkoutHandler = () =>
  {
    history.push('/login?redirect=shipping')
  }
  return (
    <Container>
      {cartItems.length === 0 ? (
        <Message type="error">
          0 Element dans la cart <Link to="/">Go Back</Link>
        </Message>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <List className={classes.root}>
              {cartItems.map((item) => (
                <>
                  <ListItem alignItems="center">
                    <ListItemAvatar>
                      <Avatar
                        alt="Remy Sharp"
                        src={item.image}
                        className={classes.large}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <React.Fragment>
                          <Typography
                            component={Link}
                            to={`/product/${item.product}`}
                            variant="h5"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            {item.name}
                          </Typography>
                        </React.Fragment>
                      }
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            Price :
                          </Typography>
                          ${item.price}
                        </React.Fragment>
                      }
                    />
                    {item.countInStock > 0 && (
                      <>
                        <InputLabel id="quantiter">Qty : </InputLabel>
                        <Select
                          labelId="quantiter"
                          id="demo-simple-select"
                          value={item.qty}
                          variant="outlined"
                          onChange={(e) => {
                            dispatch(
                              addToCart(item.product, +e.target.value)
                            );
                          }}
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <MenuItem key={x + 1} value={x + 1}>
                              {x + 1}
                            </MenuItem>
                          ))}
                        </Select>
                      </>
                    )}
                    <IconButton
                      aria-label="delete"
                      className={classes.margin}
                      onClick={() => {
                        remouveOnCartHnadler(item.product);
                      }}
                    >
                      <DeleteIcon fontSize="large" />
                    </IconButton>
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </>
              ))}
            </List>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <List className={classes.root}>
                <ListItem>
                  <Typography variant="h6" component="p">
                    Subtotal (
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
                    <br />
                    Total Price : $
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </Typography>
                </ListItem>
                <Divider />
                <ListItem>
                    <Button
                      size="large"
                      className={classes.addButton}
                      fullWidth
                      onClick={checkoutHandler}
                      disabled={cartItems.length === 0}>Checkout</Button>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  inline: {
    maxWidth: 200,
    marginLeft: theme.spacing(3),
  },
  addButton: {
    backgroundColor: cyan[900],
  },
}));

export default CartScreen;
