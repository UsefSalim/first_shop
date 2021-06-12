import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";
import Register from "./Register";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { useDispatch } from "react-redux";
import { listOrder } from "../actions/order.actions";
import { useSelector } from "react-redux";
const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  margin: {
    marginTop: theme.spacing(8),
  },
}));
const ProfileScreen = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrder());
  }, [dispatch]);
  // console.log(orders);
  const { orders } = useSelector((state) => state.orderList);
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Register profile="true" />
      </Grid>
      <Grid item xs={12} md={7}>
        <TableContainer component={Paper} className={classes.margin}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="right">date</TableCell>
                <TableCell align="right">TOTAL</TableCell>
                <TableCell align="right">paid</TableCell>
                <TableCell align="right">delivered</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders && orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell component="th" scope="row">
                    {order._id}
                  </TableCell>
                  <TableCell align="right">
                    {order.createdAt.substring(0, 10)}
                  </TableCell>
                  <TableCell align="right">{order.totalPrice}</TableCell>
                  <TableCell align="right">
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <p>Non Payé</p>
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {order.isDelivered ? <p>delivré</p> : <p>Non delivré</p>}
                  </TableCell>
                  <TableCell align="right">
                    <Button component={Link} to={`/order/${order._id}`}>
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default ProfileScreen;
