import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { useDispatch, useSelector } from "react-redux";
import { green } from "@material-ui/core/colors";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import * as yup from "yup";
import { saveAdressInfo } from "../actions/cart.actions";
import CheckoutSteps from './CheckoutSteps';
const validationSchema = yup.object({
  adress: yup
    .string("Enter your Adress")
    .min(3, "Adress should be of minimum 3 characters length")
    .required("Adress is required"),
  ville: yup
    .string("Enter your ville")
    .min(3, "Ville should be of minimum 3 characters length")
    .required("ville is required"),
  codepostal: yup
    .string("Enter your codepostal")
    .min(6, "codepostal should be of minimum 6 characters length")
    .required("codepostal is required"),
  pays: yup
    .string("Enter your pays")
    .min(3, "pays should be of minimum 3 characters length")
    .required("pays is required"),
});
export default function Register({ profile })
{
  const classes = useStyles();
  const { AdressInfo } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      pays: AdressInfo?.pays || "",
      codepostal: AdressInfo?.codepostal || "",
      ville: AdressInfo?.ville || "", 
      adress: AdressInfo?.adress || "",
    },
    validationSchema,
    onSubmit: (values) =>
    {
      dispatch(saveAdressInfo(values))
    },
  });
  return (
    <>
        {/* <Container component="main" maxWidth="md" >

        <CheckoutSteps />
        </Container> */}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        
        <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Shipping
            </Typography>
          <form
            className={classes.form}
            onSubmit={formik.handleSubmit}
            noValidate
          >
            <Grid container spacing={2}>
             
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="pays"
                  label="pays"
                  name="pays"
                  autoComplete="pays"
                  value={formik.values.pays}
                  onChange={formik.handleChange}
                  error={formik.touched.pays && Boolean(formik.errors.pays)}
                  helperText={formik.touched.pays && formik.errors.pays}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="adress"
                  label="adress"
                  type="adress"
                  id="adress"
                  autoComplete="current-adress"
                  value={formik.values.adress}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.adress && Boolean(formik.errors.adress)
                  }
                  helperText={formik.touched.adress && formik.errors.adress}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="codepostal"
                  label=" codepostal"
                  name="codepostal"
                  autoComplete="codepostal"
                  value={formik.values.codepostal}
                  onChange={formik.handleChange}
                  error={formik.touched.codepostal && Boolean(formik.errors.codepostal)}
                  helperText={formik.touched.codepostal && formik.errors.codepostal}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="ville"
                  label="ville"
                  type="ville"
                  id="ville"
                  autoComplete="current-ville"
                  value={formik.values.ville}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.ville && Boolean(formik.errors.ville)
                  }
                  helperText={formik.touched.ville && formik.errors.ville}
                />
              </Grid>
            </Grid>        
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
               Checkout
              </Button>
          </form>
        </div>
      </Container>
    </>
  );
}

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
