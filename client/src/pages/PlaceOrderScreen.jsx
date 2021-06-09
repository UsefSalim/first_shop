import React, { useEffect } from "react";
import { Container } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import CheckoutSteps from "./CheckoutSteps";
import { CssBaseline } from "@material-ui/core";
import { useHistory, Link } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import {
  ListItemText,
  ListItemAvatar,
  ListItem,
  List,
} from "@material-ui/core";

const PlaceOrderScreen = () => {
  const classes = useStyles();
  const history = useHistory();
  const cart = useSelector((state) => state.cart);
  const { paymentMode, AdressInfo, cartItems } = cart;
  const { pays, codepostal, ville, adress } = AdressInfo;
  useEffect(() => {
    !paymentMode && history.push("/shipping");
  });
  //calculate Prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 10);
  cart.taxPrice = addDecimals((0.2 * +cart.itemsPrice).toFixed(2));
  cart.totalPrice = (
    +cart.itemsPrice +
    +cart.shippingPrice +
    +cart.taxPrice
  ).toFixed(2);
  const placeOrderHandler = () => {
    // dispatch(
    //   createOrder({
    //     orderItems: cart.cartItems,
    //     shippingAddress: cart.shippingAddress,
    //     paymentMethod: cart.paymentMethod,
    //     itemsPrice: cart.itemsPrice,
    //     shippingPrice: cart.shippingPrice,
    //     taxPrice: cart.taxPrice,
    //     totalPrice: cart.totalPrice,
    //   })
    // )
  };
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 steperValue="3" />
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Grid container className={classes.root}>
          <Grid item md={8} xs={12}>
            <div>
              <div className={classes.section}>
                <Typography gutterBottom variant="h5">
                  Shipping
                </Typography>
                <Typography color="textSecondary" variant="h6">
                  Adress: {`${adress} , ${codepostal} ${ville}, ${pays}`}
                </Typography>
              </div>
              <Divider variant="middle" />
              <div className={classes.section}>
                <Typography gutterBottom variant="h5">
                  Payment Methode
                </Typography>
                <Typography color="textSecondary" variant="h6">
                  Methode: {paymentMode}
                </Typography>
              </div>
              <Divider variant="middle" />
              <div className={classes.section}>
                <Typography gutterBottom variant="h5">
                  Order Items
                </Typography>
                <List className={classes.root}>
                  {cartItems.map((item) => (
                    <>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={7}>
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
                                    variant="h6"
                                    color="textSecondary"
                                    className={classes.inline}
                                  >
                                    {item.name}
                                  </Typography>
                                </React.Fragment>
                              }
                            />
                          </ListItem>
                        </Grid>
                        <Grid item xs={false} md={1} />
                        <Grid item xs={12} md={4}>
                          <ListItem alignItems="center">
                            <Typography
                              variant="h6"
                              color="textSecondary"
                              className={classes.inline}
                            >
                              {item.price}x{item.qty} ={" "}
                              {addDecimals(item.price * item.qty)}$
                            </Typography>
                          </ListItem>
                        </Grid>
                      </Grid>
                    </>
                  ))}
                </List>
              </div>
              <Divider variant="middle" />
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography
              variant="h4"
              color="textSecondary"
              className={classes.inline}
            >
              {/* Total Price :
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
              $ */}
              Order :
            </Typography>

            <Grid container>
              <Grid item xs={6}>
                <Typography
                  variant="h6"
                  color="textSecondary"
                  className={classes.inline}
                >
                  Items
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="h6"
                  color="textSecondary"
                  className={classes.inline}
                >
                  ${cart.itemsPrice}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="h6"
                  color="textSecondary"
                  className={classes.inline}
                >
                  Shipping
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="h6"
                  color="textSecondary"
                  className={classes.inline}
                >
                  ${cart.shippingPrice}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="h6"
                  color="textSecondary"
                  className={classes.inline}
                >
                  Tax
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="h6"
                  color="textSecondary"
                  className={classes.inline}
                >
                  ${cart.taxPrice}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="h6"
                  color="textSecondary"
                  className={classes.inline}
                >
                  Total
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="h6"
                  color="textSecondary"
                  className={classes.inline}
                >
                  ${cart.totalPrice}
                </Typography>
              </Grid>
            </Grid>
            <Button
              fullWidth
              onClick={placeOrderHandler}
              size="large"
              className={classes.addButton}
            >
              Add To Cart
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5),
    width: "100%",
  },
  section: {
    margin: theme.spacing(4, 0),
  },
}));
export default PlaceOrderScreen;
