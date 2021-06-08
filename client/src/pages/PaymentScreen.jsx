import { Container, Button,Grid, Typography} from "@material-ui/core";
import React, { useEffect } from "react";
import CheckoutSteps from './CheckoutSteps';
import { CssBaseline } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { useSelector ,useDispatch} from "react-redux";
import { useHistory } from 'react-router-dom';
import { saveInfoPayment } from "../actions/cart.actions";
const PaymentScreen = () =>
{
  const classes = useStyles();
  const [methodePayment, seMethodePayment] = React.useState('paypal');
  const history = useHistory()
  const dispatch = useDispatch()
  const { AdressInfo } = useSelector(state => state.cart)
  console.log(AdressInfo);
  useEffect(() =>
  {
    (Object.keys(AdressInfo).length === 0) && history.push('/shipping')
  })
  const handleChange = (event) => 
  {
    seMethodePayment(event.target.value);
  };
  const submitHandler = (e) =>
  {
    e.preventDefault();
    dispatch(saveInfoPayment(methodePayment))
    history.push('/placeorder')
  }
  return (
    <>
      <CheckoutSteps step1 step2 step3 steperValue="2" />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
              Payment
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup aria-label="payment" name="paymentmode" value={methodePayment} onChange={handleChange}>
              <FormControlLabel value="paypal" control={<Radio />} label="Paypal Or Cart" />
              <FormControlLabel value="strip" control={<Radio />} label="Strip" />
            </RadioGroup>
          </FormControl>
          <Grid container spacing={2}>
            <Button
              onClick={submitHandler}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Checkout
            </Button>
          </Grid>
        </div>
        </Container>
    </>
  );
};
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));
export default PaymentScreen;
