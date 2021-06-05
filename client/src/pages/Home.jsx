import React from "react";
import { useDispatch, useSelector } from "react-redux"
import {listProducts} from '../actions/products.actions'
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid } from "@material-ui/core";
// import products from "../products";
import Product from "../components/Product";
const useStyles = makeStyles((theme) => ({
  main: {
    padding: theme.spacing(3, 0),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

export default function Home() {
  const classes = useStyles();
  const { products ,login } = useSelector(state => state.productList)
  const dispatch = useDispatch()
  React.useEffect(() =>
  {
   dispatch(listProducts())
 },[dispatch])
  return (
    <main className={classes.main}>
      <Container className={classes.cardGrid} maxWidth="lg">
        <h1>Dernier Produits</h1>
        <Grid container spacing={4}>
          {products?.map((product, key) => (
            <Product {...product} key={key} />
          ))}
        </Grid>
      </Container>
    </main>
  );
}
