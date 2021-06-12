import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userListe } from "../actions/user.actions";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import { Container } from "@material-ui/core";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import IconButton from "@material-ui/core/IconButton";
import SystemUpdateAltIcon from "@material-ui/icons/SystemUpdateAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import CircularProgress from "@material-ui/core/CircularProgress";
import Message from "../components/Message";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
}));
const AdminScreen = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.userListe);
  useEffect(() => {
    dispatch(userListe());
  }, [dispatch]);
  const handelDeleteUser = () => {};
  if (error)
    return (
      <Message type="error" title="Error">
        {" "}
        {error}
      </Message>
    );
  return (
    <Container>
      {loading ? (
        <CircularProgress color="secondary" />
      ) : (
        <TableContainer component={Paper} className={classes.margin}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="right">name</TableCell>
                <TableCell align="right">email</TableCell>
                <TableCell align="right">admin</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map((user) => (
                <TableRow key={user._id}>
                  <TableCell component="th" scope="row">
                    {user._id}
                  </TableCell>
                  <TableCell align="right">{user.name}</TableCell>
                  <TableCell align="right">{user.email}</TableCell>
                  <TableCell align="right">
                    {user.role === "Admin" ? <CheckIcon /> : <ClearIcon />}
                  </TableCell>
                  <TableCell align="right">
                    <ButtonGroup variant="contained">
                      <IconButton
                        aria-label="update"
                        className={classes.margin}
                      >
                        <SystemUpdateAltIcon color="primary" fontSize="small" />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        className={classes.margin}
                        onClick={handelDeleteUser}
                      >
                        <DeleteIcon color="secondary" fontSize="small" />
                      </IconButton>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default AdminScreen;
