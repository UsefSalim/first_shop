import React from 'react'
import { Link, Box, Typography} from '@material-ui/core'
const Footer = () => {
  return (
    <footer>
      <Box mt={5}>
        <Copyright />
      </Box>
    </footer>
  )
}


function Copyright()
{
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:3000">
        ShopingWeb
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
export default Footer
