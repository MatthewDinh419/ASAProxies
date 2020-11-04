import React from "react";
import { useStyles } from "../styling/dashstyle";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Button, Card } from "@material-ui/core";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import axios from "axios";

class PlansPage extends React.Component {
  constructor(props) {
    super(props);
    this.coupon_ref = React.createRef();
  }
  state = {
    loading: false,
    coupon: null,
    cart_form: false,
    item_name: null,
    price: null,
    discount_price: null,
    error: null,
  }
  submit = (env) => {
    env.preventDefault();
    this.setState({loading: true});
    let code = this.coupon_ref.current.value
    // Check if coupon is valid
    axios.post('http://127.0.0.1:8000/add-coupon/', {'code': code}, {headers: {Authorization: `Token ${localStorage.getItem("token")}`}})
      .then(res => {
        this.setState({loading: false, success: true, discount_price: res.data.discount/100*this.state.price, coupon: code, error: null})
      })
      .catch(err => {
        this.setState({ error: "Coupon is invalid or expired", loading: false, success: false});
      })
  }
  render() {
    const { classes } = this.props;
    const switchOpen = () => {
      this.setState({cart_form: !this.state.cart_form});
    };
    // Set state based off gb_selection
    const atc = (all_props, gb_selection) => {
      if(all_props.token == null) {
        all_props.history.push("/login");
      }
      else{
        if(gb_selection === "1GB RESI PLAN") {
          this.setState({cart_form: !this.state.cart_form, item_name: gb_selection, price: 20});
        }
        else if(gb_selection === "2GB RESI PLAN") {
          this.setState({cart_form: !this.state.cart_form, item_name: gb_selection, price: 40});
        }
        else if(gb_selection === "4GB RESI PLAN") {
          this.setState({cart_form: !this.state.cart_form, item_name: gb_selection, price: 60});
        }
      }
    }
    function PlanRedirect(all_props, gb_selection, coupon_passed, amount) {
      // Go to checkout button is pressed
      if(all_props.token == null) {
        all_props.history.push("/login");
      }
      else{
        all_props.history.push({pathname: "/Checkout", state: {cart: gb_selection, price: amount }});
      }
    }
    return (
      <div className={classes.rootStyle}>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Card raised={true} className={classes.cardStyle}>
              <div style={{ textAlign: "center" }}>
                <h1 className={classes.textStyle}>1GB RESI PLAN</h1>
                <Button
                  onClick={() => {
                    atc(this.props,"1GB RESI PLAN")}}
                  className={classes.buttonStyle}
                >
                  Buy
                </Button>
              </div>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card raised={true} className={classes.cardStyle}>
              <div style={{ textAlign: "center" }}>
                <h1 className={classes.textStyle}>2GB RESI PLAN</h1>
                <Button
                  onClick={() => {
                    atc(this.props,"2GB RESI PLAN");
                  }}
                  className={classes.buttonStyle}
                >
                  Buy
                </Button>
              </div>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card raised={true} className={classes.cardStyle}>
              <div style={{ textAlign: "center" }}>
                <h1 className={classes.textStyle}>4GB RESI PLAN</h1>
                <Button
                  onClick={() => {
                    atc(this.props,"4GB RESI PLAN");
                  }}
                  className={classes.buttonStyle}
                >
                  Buy
                </Button>
              </div>
            </Card>
          </Grid>
          {/* Popup dialgoue */}
          <Dialog open={this.state.cart_form} onClose={switchOpen} aria-labelledby="form-dialog-title">
            <DialogTitle style={{fontFamily: `"Source Sans Pro",sans-serif`}} id="form-dialog-title">Items</DialogTitle>
            <DialogContent>
              <div style={{marginLeft: "10%"}}>
                <DialogContentText style={{textAlign: "left", fontFamily: `"Source Sans Pro",sans-serif`}}>
                  {this.state.item_name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${this.state.price}
                </DialogContentText>
                <DialogContentText style={{textAlign: "left", fontFamily: `"Source Sans Pro",sans-serif`, color: "green"}}>
                  {
                    this.state.discount_price && (
                      "COUPON: " + this.state.coupon + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0-$" + this.state.discount_price
                    )
                  }
                </DialogContentText>
              </div>
              <TextField
                autoFocus
                inputRef={this.coupon_ref}
                onChange={e => { this.coupon_ref.current.value = e.target.value }}
                name="coupon"
                error={this.state.error}
                helperText={this.state.error}
                placeholder="Coupon Code"
                InputLabelProps={{
                  shrink: true,
                }}
                style={{marginTop: "5%"}}
                InputProps={{endAdornment: <Button onClick={this.submit} style={{backgroundColor: 'transparent', marginRight: "-8%"}}><KeyboardArrowRightIcon></KeyboardArrowRightIcon></Button>}}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={switchOpen} color="primary">
                Cancel
              </Button>
              <Button onClick={() => {
                PlanRedirect(this.props, this.state.item_name, this.state.coupon, this.state.price - this.state.discount_price);
              }} color="primary">
                Go to Checkout
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
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

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(PlansPage));
