import React from 'react'
import {Link} from 'react-router-dom'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { useSelector}  from "react-redux"
const CheckoutSteps = ({step1,step2,step3,step4,steperValue}) =>
{
  const [value, setValue] = React.useState(+steperValue);

  const handleChange = (event, newValue) =>
  {
    setValue(newValue);
  };
  const { userInfo } = useSelector(state => state.user)
  const firstStep = userInfo.isAuthenticated === true ? 'profile' : 'login'
  return (
    <Container component="main" maxWidth="md" >
      <Grid container alignItems="center">
      <Tabs
        justifyContent="center"
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <Tab label={firstStep.toUpperCase()} component={Link} to={`/${firstStep}`} disabled={!step1}></Tab>
        <Tab label="Shipping" component={Link} to="/shipping"  disabled={!step2}></Tab>
        <Tab label="Payment" component={Link} to="/payment"  disabled={!step3}></Tab>
        <Tab label="Place order" component={Link} to="/placeorder"  disabled={!step4}></Tab>
      </Tabs>
      </Grid>
    </Container>
  )
}

export default CheckoutSteps
