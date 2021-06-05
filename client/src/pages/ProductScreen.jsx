import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {listProductDetails} from '../actions/products.actions'
import { makeStyles } from "@material-ui/core/styles";
import {Link} from "react-router-dom"
import { useParams } from 'react-router-dom'
import { Button, Container, Grid, Typography, Divider} from '@material-ui/core'
import { ListItem, List } from '@material-ui/core'
import {cyan} from '@material-ui/core/colors'
// import products from '../products'
import Ratings from '../components/Ratings';
import CircularProgress from "@material-ui/core/CircularProgress";
import Message from "../components/Message";
const ProductScreen = () =>
{
  const classes = useStyles();
  const { id_product } = useParams()
  const { product,error,loading } = useSelector(state => state.productDetails)
  const dispatch = useDispatch()
  React.useEffect(() =>
  {
    dispatch(listProductDetails(id_product))
  },[dispatch])
  return (
    <Container maxWidth="lg" key={id_product}>
      <Button className={classes.btn} component={Link} to="/" variant="outlined">Retour</Button>
      {loading ? (
        <CircularProgress color="secondary" />
      ) : error ? (
        <Message type="error" title="Error">
          {" "}
          {error}
        </Message>
      ) : (
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
               <Typography variant="body1" component="p">
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
      )}
    </Container>
  )
}
const useStyles = makeStyles((theme) => ({
  btn: {
    margin: theme.spacing(3, 0),
  },
  root: {
    width: '100%',
    maxWidth: 360,
    border: "1px solid black"
  },
  image: {
    width: "600px",
    [theme.breakpoints.down("sm")]: {
      width: "90vw"
    }
  },
  addButton: {
    backgroundColor: cyan[900]
  },
  bold: {
    fontWeight: "bold"
  }
}));
export default ProductScreen
