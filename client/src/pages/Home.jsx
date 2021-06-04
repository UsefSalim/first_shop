
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container ,Grid} from '@material-ui/core';
import products from '../products'
import Product from '../components/Product';
const useStyles = makeStyles((theme) => ({
  main: {
     padding:theme.spacing(3,0)
   }
}));

export default function Home() {
  const classes = useStyles();

  return (
    <main className={classes.main}>
      <Container>
      <h1>Dernier Produits</h1>
      <Grid container spacing={3}>
          {
            products?.map(product => (
              <Grid item >
                 <Product {...product}/>
              </Grid>
            ))
          }
      </Grid>
      </Container>
    </main>
  );

}