import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import {Link} from "react-router-dom"
import { useParams } from 'react-router-dom'
import { Button, Container, Grid, Typography, Divider} from '@material-ui/core'
import { ListItem, List } from '@material-ui/core'
import {cyan} from '@material-ui/core/colors'
import products from '../products'
import Ratings from '../components/Ratings';
const useStyles = makeStyles((theme) => ({
  btn: {
    margin: theme.spacing(3,0),
  },
  root: {
    width: '100%',
    maxWidth: 360,
    border: "1px solid black"
  },
  image: {
    width: "600px",
    [theme.breakpoints.down("sm")]: {
      width:"90vw"
    }
  },
  addButton: {
    backgroundColor: cyan[900]
  },
  bold: {
    fontWeight:"bold"
  }
}));
const ProductScreen = () =>
{
  const classes = useStyles();
  const { id_product } = useParams()
  const product = products.find(p=>p._id === id_product)
  return (
    <Container  maxWidth="lg">
      <Button className={classes.btn}  component={Link} to="/" variant="outlined">Retour</Button>
      <Grid container>
        <Grid item lg={6} >
          <img className={classes.image} src={product.image} alt="" />
        </Grid>
        <Grid item lg={3}>
          <List>
            <ListItem>
              <Typography variant="h5" component="h1">
                {product.name}
              </Typography>
            </ListItem>
            <Divider />
            <ListItem>
              <Ratings value={product.rating} text={`${product.numReviews} reviews`} />
            </ListItem>
            <Divider/>
            <ListItem>
              <Typography variant="h6" component="p">
                <span className="bold">Price</span>  : ${product.price}
               </Typography>
            </ListItem>
            <Divider />
            <ListItem>
              <Typography variant="p" component="p">
               <span className="bold"> Description </span>: ${product.description}
               </Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item lg={3}>
          <List className={classes.root}>
            <ListItem>
              <Typography variant="h6" component="p">
                Price : ${product.price}
              </Typography>
            </ListItem>
            <Divider />
            <ListItem>
              <Typography variant="h6" component="p">
                Status : {product.countInStock > 0 ? "InStock" : "Out Of Stock"}
              </Typography>
            </ListItem>
            <Divider />
            <ListItem>
              <Button fullWidth size="large" className={classes.addButton}>Add To Cart</Button>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ProductScreen
