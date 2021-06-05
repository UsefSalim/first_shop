import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/products.actions";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
// import products from "../products";
import Message from "../components/Message";
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
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state) => state.productList
  );
  React.useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return (
    <main className={classes.main}>
      <Container className={classes.cardGrid} maxWidth="lg">
        <h1>Dernier Produits</h1>
        {loading ? (
          <CircularProgress color="secondary" />
        ) : error ? (
          <Message type="error" title="Error">
            {" "}
            {error}
          </Message>
        ) : (
          <Grid container spacing={4}>
            {products?.map((product) => (
              <Product {...product} />
            ))}
          </Grid>
        )}
      </Container>
    </main>
  );
}
