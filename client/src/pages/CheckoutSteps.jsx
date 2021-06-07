import React from 'react'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
const CheckoutSteps = () =>
{
  const [value, setValue] = React.useState(2);

  const handleChange = (event, newValue) =>
  {
    setValue(newValue);
  };
  return (
    <>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <Tab label="Active" />
        <Tab label="Disabled" disabled />
        <Tab label="Active" />
      </Tabs>
    </>
  )
}

export default CheckoutSteps
