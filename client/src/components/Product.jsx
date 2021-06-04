import React from 'react'
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardMedia, CardContent, CardActions} from '@material-ui/core'
import { Typography, Button, Grid } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));
const Product = (props) =>
{
  const { image, key, _id, name, rating, numReviews,price} = props
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
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography>
            {rating} from {numReviews} reviews
          </Typography>
          <Typography gutterBottom variant="h3" component="h2">
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
  )
}

      
      
export default Product
