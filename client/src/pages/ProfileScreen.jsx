import React from 'react'
import { Grid } from '@material-ui/core'
import Register from './Register'
const ProfileScreen = () => {
  return (
    <Grid container>
      <Grid item xs={12} md={4}>
        <Register profile="true"/>
       </Grid>
    </Grid>
  )
}

export default ProfileScreen
