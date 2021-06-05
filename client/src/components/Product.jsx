import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardMedia, CardContent } from "@material-ui/core";
import { Typography, Grid } from "@material-ui/core";
import Ratings from "./Ratings";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  cardTitle: {
    textDecoration: "none",
    display: "inline-block",
    color: "black",
  },
}));
const Product = (props) => {
  const { image, key, _id, name, rating, numReviews, price } = props;
  const classes = useStyles();
  return (
    <Grid item key={key} xs={12} sm={6} md={4} lg={3}>
      <Card className={classes.card}>
        <CardMedia
          component={Link}
          to={`/product/${_id}`}
          className={classes.cardMedia}
          image={image}
          title="Image title"
        />
        <CardContent className={classes.cardContent}>
          <Typography
            component={Link}
            to={`/product/${_id}`}
            className={classes.cardTitle}
            gutterBottom
            variant="h6"
          >
            {name}
          </Typography>
          {/* <Typography>
            {rating} from {numReviews} reviews
          </Typography> */}
          <Ratings value={rating} text={`${numReviews} reviews`} />
          <Typography variant="h4" component="h2">
            ${price}
          </Typography>
        </CardContent>
        {/* <CardActions>
          <Button size="small" color="primary">
            View
          </Button>
          <Button size="small" color="primary">
            Edit
          </Button>
        </CardActions> */}
      </Card>
    </Grid>
  );
};

export default Product;
