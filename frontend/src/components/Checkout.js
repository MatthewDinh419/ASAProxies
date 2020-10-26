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
        var gb_selection = null;
        
        try {
          gb_selection = this.props.location.state.cart;
          this.setState( {loading: true} )
          if(this.props.stripe){
              this.props.stripe.createToken().then(result => {
                  if(result.error) {
                      this.setState({error: result.error.message, loading: false});
                  }
                  else {
                      axios.post('http://127.0.0.1:8000/checkout/', {stripeToken: result.token.id, item: gb_selection}, {headers: {Authorization: `Token ${localStorage.getItem("token")}`}})
                      .then(res => {
                        this.setState({loading: true});
                        window.setTimeout(() => {
                          this.setState({success: true, loading: false});
                        }, 1000);
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
      const { classes } = this.props;
      return(
          <div>
              <Card style={{marginTop: "12%", width: "25%", height: "25vh"}} raised={true} className={classes.cardStyle}>
                {this.state.success ? 
                (
                  <div style={{textAlign: "center", color: "green", marginTop: "15%"}}>
                    <CheckCircleOutlineIcon style={{fontSize: "60px"}}></CheckCircleOutlineIcon>
                    <h1 style={{color: "green", fontSize: "28px"}} className={classes.textStyle}>Welcome to the ASAP Team</h1>
                  </div>
                  ) 
                : 
                (
                <div>
                  <h1 style={{borderBottomStyle: "solid", borderColor: "#d62e22"}} className={classes.textStyle}>Complete your order</h1> 
                  <p style={{fontSize: "18px"}} className={classes.textStyle}>{this.props.location.state.cart}GB RESI PLAN</p>
                  <div style={{marginLeft: "5%", marginRight: "5%"}}>
                    <CardElement style={{base: {color:"white", fontSize: "16px", fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif'}}}></CardElement>
                  </div>
                  <div style={{marginTop: "5%" ,textAlign: "center"}}>
                    {
                      this.state.loading ? 
                      (<Button className={classes.buttonStyle} onClick={this.submit}><CircularProgress disabled size={24}/></Button>)
                      :
                      (<Button className={classes.buttonStyle} onClick={this.submit}>Submit</Button>)
                    }
                  </div>
                </div>
                )}
                {/* alternate line color: 675f99 */}
                
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
