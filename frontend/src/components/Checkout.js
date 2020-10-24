import React from "react";
import { connect } from "react-redux";
import { useStyles } from "../styling/forms";
import { withStyles } from "@material-ui/core/styles";
import {CardElement, injectStripe, Elements, StripeProvider} from 'react-stripe-elements';
import { withRouter } from "react-router";
import { Button } from "@material-ui/core";
import * as actions from "../store/actions/plan";
import MuiAlert from '@material-ui/lab/Alert';
import axios from "axios";


class Checkout extends React.Component {
    state = {
        loading: false,
        error: null
    }
    submit = (env) => {
        env.preventDefault();
        console.log("submitting...");
        var gb_selection = null;
        try {
          gb_selection = this.props.location.state.cart;
          this.setState( {loading: true} )
          console.log(gb_selection);
          if(this.props.stripe){
              this.props.stripe.createToken().then(result => {
                  if(result.error) {
                      this.setState({error: result.error.message, loading: false});
                  }
                  else {
                      axios.post('http://127.0.0.1:8000/checkout/', {stripeToken: result.token.id, item: gb_selection}, {headers: {Authorization: `Token ${localStorage.getItem("token")}`}})
                      .then(res => {
                          this.setState({ loading: false, success: true});
                      })
                      .catch(err => {
                          this.setState({ loading: false, success: false});
                      })
                  }
              })
          }
          else {
              console.log("Stripe is not loaded");
          }
        }
        catch(err){
          this.props.history.push("/plans");
        }
    }
  render() {
      const {error, loading, success} = this.state;
      return(
          <div>
              <MuiAlert severity="info">{this.success, this.loading, this.error}</MuiAlert>
              <p>Would you like to complete your purchase?</p>
              <CardElement></CardElement>
              <Button onClick={this.submit}>Submit</Button>
          </div>
    )
  }
}
const InjectedForm = withRouter(injectStripe(Checkout));

const WrappedForm = () => (
      <StripeProvider apiKey="pk_test_51HfD5GDSX6WQWHXC3V1wJeottMdcbaUeMClNeO9GWVdUtbr4rFbS8NAqeaGISWKiQRD8sDJ5Hy8A7vUUX5rS7KYo00gSMRPbG8">
        <div>
          <h1>Complete your order</h1>
          <Elements>
            <InjectedForm />
          </Elements>
        </div>
      </StripeProvider>
  );

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    loading: state.auth.loading,
    error: state.auth.error,
    cart: state.plan.cart
  };
};

export default connect(
  mapStateToProps
)(withStyles(useStyles)(WrappedForm));
