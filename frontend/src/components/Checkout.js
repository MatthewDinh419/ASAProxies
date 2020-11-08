import React from "react";
import { connect } from "react-redux";
import { useStyles } from "../styling/forms";
import { withStyles } from "@material-ui/core/styles";
import {CardElement, injectStripe, Elements, StripeProvider} from 'react-stripe-elements';
import { withRouter } from "react-router";
import { Button, Card } from "@material-ui/core";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from "axios";

class Checkout extends React.Component {
    state = {
        loading: false,
        error: null,
        success: false,
    }
    submit = (env) => {
        env.preventDefault();
        try {
          let gb_selection = this.props.location.state.cart;
          this.setState( {loading: true} );
          if(this.props.stripe){
              this.props.stripe.createToken().then(result => {
                  if(result.error) {
                      this.setState({error: result.error.message, loading: false});
                  }
                  else {
                      axios.post('http://127.0.0.1:8000/checkout/', {stripeToken: result.token.id, item: gb_selection}, {headers: {Authorization: `Token ${localStorage.getItem("token")}`}})
                      .then(res => {
                        if(res.data.card_err ||
                           res.data.message === "Rate limit error" ||
                           res.data.message === "Invalid parameters to stripe API" ||
                           res.data.message === "Not authenticated. Please login" ||
                           res.data.message === "Network error" ||
                           res.data.message === "Something went wrong. You were not charged. Please try again" ||
                           res.data.message === "A serious error occurred. We have been notifed" ||
                           res.data.message === "Invalid data received" ||
                           res.data.message === "Out of Stock") {
                          this.setState({loading: false, error: res.data.message})
                        }
                        else {
                          this.setState({success: true});
                          window.setTimeout(() => {
                            this.setState({loading: false});
                          }, 600);
                        }
                      })
                      .catch(err => {
                        this.setState({ error: err.message, loading: false, success: false});
                      })
                  }
              })
          }
          else {
            this.setState({error: "Stripe is not loaded", loading: false});
          }
        }
        catch(err){
          this.props.history.push("/plans");
        }
    }
  render() {
      const { classes } = this.props;
      return(
          <div>
              <Card style={{marginTop: "12%", width: "25%", height: "25vh"}} raised={true} className={classes.cardStyle}>
                {/* Show success card if state is successful and no longer loading */}
                {(this.state.success & !this.state.loading) ? 
                (
                  <div style={{textAlign: "center", color: "green", marginTop: "15%"}}>
                    <CheckCircleOutlineIcon style={{fontSize: "60px"}}></CheckCircleOutlineIcon>
                    <h1 style={{color: "green", fontSize: "28px"}} className={classes.textStyle}>Welcome to the ASAP Team</h1>
                  </div>
                  ) 
                : 
                (
                <div>
                  {/* Headers */}
                  <h1 style={{borderBottomStyle: "solid", borderColor: "#d62e22"}} className={classes.textStyle}>Complete your order</h1> 
                <p style={{fontSize: "18px"}} className={classes.textStyle}>{this.props.location.state.cart}: ${this.props.location.state.price}</p>
                  {/* Stripe Element */}
                  <div style={{marginLeft: "5%", marginRight: "5%"}}>
                    <CardElement style={{base: {color:"white", fontSize: "16px", fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif'}}}></CardElement>
                  </div>
                  {/* Button */}
                  <div style={{marginTop: "5%" ,textAlign: "center"}}>
                    {
                      // If loading and not successful then show loading bar
                      // If loading and successful then show success bar
                      (this.state.loading) ? 
                      (this.state.success ? (<Button className={classes.buttonStyle}><CheckCircleOutlineIcon size={24}/></Button>) : 
                                             <Button className={classes.buttonStyle}><CircularProgress size={24}/></Button>)
                      :
                      // Not loading then show submit button
                      (<Button className={classes.buttonStyle} onClick={this.submit}>Submit</Button>)
                    }
                  </div>
                </div>
                )}
                { //Error message handling
                  !this.state.success && (
                    <p className={classes.textStyle} style={{ color: "red", marginTop: "-3%" }}>
                    {this.state.error}
                  </p>
                  )
                }
                  
              </Card>
          </div>
    )
  }
}
const InjectedForm = withRouter(withStyles(useStyles)(injectStripe(Checkout)));

const WrappedForm = () => (
      <StripeProvider apiKey="pk_test_51HfD5GDSX6WQWHXC3V1wJeottMdcbaUeMClNeO9GWVdUtbr4rFbS8NAqeaGISWKiQRD8sDJ5Hy8A7vUUX5rS7KYo00gSMRPbG8">
        <div>
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
  };
};

export default connect(
  mapStateToProps
)(withStyles(useStyles)(WrappedForm));
