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

class PaymentHistory extends React.Component {
    state = {
        row: []
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
        })
        .catch(err => {
            console.log(err);
        })
    }
  render() {
    const { classes } = this.props;
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
                {this.state.row.map((row) => (
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
