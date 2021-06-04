import React from 'react'
import Rating from '@material-ui/lab/Rating';
import {Typography} from '@material-ui/core'
const Ratings = ({ value, text}) => {
  return (
    <>
      <Rating name="read-only" value={value} precision={0.5} />
      <Typography variant="p" component="p">{text}</Typography>
      </>
  )
}

export default Ratings
  