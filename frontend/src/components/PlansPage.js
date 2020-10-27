import React from "react";
import { useStyles } from "../styling/dashstyle";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Button, Card } from "@material-ui/core";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";

class PlansPage extends React.Component {
  render() {
    const { classes } = this.props;
    function PlanRedirect(all_props, gb_selection) {
      console.log(gb_selection);
      if(all_props.token == null) {
        all_props.history.push("/login");
      }
      else{
        all_props.history.push({pathname: "/Checkout", state: {cart: gb_selection}});
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
                    PlanRedirect(this.props, "1GB RESI PLAN");
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
                <h1 className={classes.textStyle}>2GB RESI PLAN</h1>
                <Button
                  onClick={() => {
                    PlanRedirect(this.props, "2GB RESI PLAN");
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
                    PlanRedirect(this.props, "4GB RESI PLAN");
                  }}
                  className={classes.buttonStyle}
                >
                  Buy
                </Button>
              </div>
            </Card>
          </Grid>
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
