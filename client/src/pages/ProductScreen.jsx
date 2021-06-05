import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actions/products.actions";
import { makeStyles } from "@material-ui/core/styles";
import { MenuItem, InputLabel, Select } from "@material-ui/core";
import { Link ,useHistory, useLocation} from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  Typography,
  Divider,
} from "@material-ui/core";
import { ListItem, List } from "@material-ui/core";
import { cyan } from "@material-ui/core/colors";
// import products from '../products'
import Ratings from "../components/Ratings";
import CircularProgress from "@material-ui/core/CircularProgress";
import Message from "../components/Message";
const ProductScreen = () =>
{
  const history = useHistory()

  const classes = useStyles();
  const [qty, setQty] = React.useState(1);
  const { id_product } = useParams();
  const { product, error, loading } = useSelector(
    (state) => state.productDetails
  );
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(listProductDetails(id_product));
  }, [dispatch, id_product]);
  const addToCardHnadler = () => {
    history.push(`/cart/${id_product}?qty=${qty}`);
  };
  return (
    <Container maxWidth="lg" key={id_product}>
      <Button
        className={classes.btn}
        component={Link}
        to="/"
        variant="outlined"
      >
        Retour
      </Button>
      {loading ? (
        <CircularProgress color="secondary" />
      ) : error ? (
        <Message type="error" title="Error">
          {" "}
          {error}
        </Message>
      ) : (
        <Grid container>
          <Grid item lg={6}>
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
                <Ratings
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <Typography variant="h6" component="p">
                  <span className="bold">Price</span> : ${product.price}
                </Typography>
              </ListItem>
              <Divider />
              <ListItem>
                <Typography variant="body1" component="p">
                  <span className="bold"> Description </span>: $
                  {product.description}
                </Typography>
              </ListItem>
            </List>
          </Grid>
          <Grid item lg={3} xs={12}>
            <List className={classes.root}>
              <ListItem>
                <Typography variant="h6" component="p">
                  Price : ${product.price}
                </Typography>
              </ListItem>
              <Divider />
              <ListItem>
                <Typography variant="h6" component="p">
                  Status :{" "}
                  {product.countInStock > 0 ? "InStock" : "Out Of Stock"}
                </Typography>
              </ListItem>
              <Divider />
              {product.countInStock > 0 && (
                <ListItem>
                  <InputLabel id="quantiter">Qty : </InputLabel>
                  <Select
                    labelId="quantiter"
                    id="demo-simple-select"
                    value={qty}
                    onChange={(e) => {
                      setQty(e.target.value);
                    }}
                    fullWidth
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <MenuItem key={x + 1} value={x + 1}>
                        {x + 1}
                      </MenuItem>
                    ))}
                  </Select>
                </ListItem>
              )}
              <Divider />
              <ListItem>
                <Button
                  fullWidth
                  onClick={addToCardHnadler}
                  size="large"
                  className={classes.addButton}
                  disabled={product.countInStock === 0}
                >
                  Add To Cart
                </Button>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};
const useStyles = makeStyles((theme) => ({
  btn: {
    margin: theme.spacing(3, 0),
  },
  root: {
    width: "100%",
    maxWidth: 360,
    border: "1px solid black",
  },
  image: {
    width: "600px",
    [theme.breakpoints.down("sm")]: {
      width: "90vw",
    },
  },
  addButton: {
    backgroundColor: cyan[900],
  },
  bold: {
    fontWeight: "bold",
  },
}));
export default ProductScreen;
