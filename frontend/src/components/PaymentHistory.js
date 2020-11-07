import React from "react";
import { connect } from "react-redux";
import { useStyles } from "../styling/forms";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';

class PaymentHistory extends React.Component {
    state = {
        row: [],
        page: 0,
        rowsPerPage: 5

    }
    constructor(props) {
        super(props);
        // Retrieve all orders
        axios.get("http://127.0.0.1:8000/api/payment-history/", {headers: {Authorization: `Token ${localStorage.getItem("token")}`}})
        .then(res => {
            var key = 0;
            // Append orders to the table
            res.data.forEach(order => {
                key += 1;
                let order_date = order.order_date;
                let order_num = order.order_num;
                let item_name = order.item_name;
                let coupon = order.coupon;
                let cost = order.cost;
                this.setState({state: this.state.row.push({key, order_date, order_num, item_name, coupon, cost})})
            })
            this.setState({state: this.state.row.reverse()})
        })
        .catch(err => {
            console.log(err);
        })
    }
  render() {
    const { classes } = this.props;
    const handleChangePage = (event, newPage) => {
      this.setState({page: newPage});
    };
  
    const handleChangeRowsPerPage = (event) => {
      this.setState({rowsPerPage: +event.target.value});
      handleChangePage(event, 0);
    };
    return (
      <div style={{ marginTop: "5%", marginLeft: "10%", marginRight: "10%" }}>
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                  <TableCell>Number</TableCell>
                  <TableCell>Order Date</TableCell>
                  <TableCell>Order Number</TableCell>
                  <TableCell>Item name</TableCell>
                  <TableCell>Coupon</TableCell>
                  <TableCell>Cost ($)</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {(this.state.row.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)).map((row) => (
                    <TableRow key={row.key}>
                    <TableCell component="th" scope="row">
                        {row.key}
                    </TableCell>
                    <TableCell>{row.order_date}</TableCell>
                    <TableCell>{row.order_num}</TableCell>
                    <TableCell>{row.item_name}</TableCell>
                    <TableCell>{row.coupon}</TableCell>
                    <TableCell>{row.cost}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
        </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[5, 10]}
            component="div"
            count={this.state.row.length}
            rowsPerPage={this.state.rowsPerPage}
            page={this.state.page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            SelectProps={{
              inputProps: { color: "white" },
            }}
          />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    loading: state.auth.loading,
    error: state.auth.error,
  };
};

export default connect(
  mapStateToProps,
)(withStyles(useStyles)(PaymentHistory));
