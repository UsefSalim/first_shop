import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { CssBaseline } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import { getOrderDetails, payOrder } from "../actions/order.actions";
import Message from "../components/Message";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { ORDER_PAY_RESET } from "../constants/order.constants";

import {
  ListItemText,
  ListItemAvatar,
  ListItem,
  List,
} from "@material-ui/core";

const OrderScreen = () => {
  const classes = useStyles();
  const { id_order } = useParams();
  const dispatch = useDispatch();
  const [sdkReady, setSdkReady] = useState(false);
  // const history = useHistory();
  const { loading, error, order } = useSelector((state) => state.orderDetails);
  const { loading: loadingPay, success: successPay } = useSelector(
    (state) => state.orderPay
  );
  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(id_order, paymentResult));
  };
  // let heurPay
  // const datePay = order?.paidAt?.split('T')
  // if(datePay) {heurPay =  datePay[1].split('.')[0]}
  useEffect(() => {
    const addPaypalScript = async () => {
      const { data } = await axios.get("/config/paypal");
      const script = document.createElement("script");
      script.typpe = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(id_order));
    } else if (!order.idPad) {
      if (!window.paypal) addPaypalScript();
      else setSdkReady(true);
    }
  }, [dispatch, id_order, successPay, order]);
  return (
    <>
      {loading ? (
        <CircularProgress color="secondary" />
      ) : error ? (
        <Message type="error" title="Error">
          {error}
        </Message>
      ) : (
        <>
          <Container component="main" maxWidth="lg">
            <CssBaseline />
            <Grid container className={classes.root} spacing={3}>
              <Grid item md={8} xs={12}>
                <div>
                  <div className={classes.section}>
                    <Typography gutterBottom variant="h5">
                      Shipping
                    </Typography>
                    <Typography color="textSecondary" variant="subtitle1">
                      <b>Adress</b> :{" "}
                      {`${order?.shippingAddress?.adress} , ${order?.shippingAddress?.codepostal} ${order?.shippingAddress?.ville}, ${order?.shippingAddress?.pays}`}
                    </Typography>
                    <Typography color="textSecondary" variant="subtitle1">
                      <b>Name</b> : {order?.user?.name}
                    </Typography>
                    <Typography color="textSecondary" variant="subtitle1">
                      <b>Email</b> : {order?.user?.email}
                    </Typography>
                    {!order?.shippingAddress?.isDelivered && (
                      <Message type="info" title="Info" close={true}>
                        Non livré
                      </Message>
                    )}
                  </div>
                  <Divider variant="middle" />
                  <div className={classes.section}>
                    <Typography gutterBottom variant="h5">
                      Payment Methode
                    </Typography>
                    <Typography color="textSecondary" variant="h6">
                      Methode: {order?.paymentMethod}
                    </Typography>
                    {!order?.isPaid ? (
                      <Message type="info" title="Info" close={true}>
                        Non Payé
                      </Message>
                        ) : (<Message type="success" title="Success" close={true}>
                            Payé le :{order?.paidAt}
                            {/* {datePay[0]} a {heurPay} */}
                        </Message>)}
                  </div>
                  <Divider variant="middle" />
                  <div className={classes.section}>
                    <Typography gutterBottom variant="h5">
                      Order Items
                    </Typography>
                    <List className={classes.root}>
                      {order?.orderItems.map((item) => (
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
                                ></Typography>
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
                      ${order?.totalPrice}
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
                      ${order?.shippingPrice}
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
                      ${order?.taxPrice}
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
                      $
                      {order?.totalPrice +
                        +order?.shippingPrice +
                        +order?.taxPrice}
                    </Typography>
                  </Grid>
                </Grid>
                {!order.isPaid && (
                  <ListItem alignItems="center">
                    {loadingPay && <CircularProgress color="secondary" />}
                    {!sdkReady ? (
                      <CircularProgress color="secondary" />
                    ) : (
                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      ></PayPalButton>
                    )}
                  </ListItem>
                )}
              </Grid>
            </Grid>
          </Container>
        </>
      )}
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
export default OrderScreen;
