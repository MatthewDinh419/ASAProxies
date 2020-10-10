import React from "react";
import { useStyles } from "../styling/dashstyle";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Button, Card } from "@material-ui/core";
import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";

class PlansPage extends React.Component {
  render() {
    const { classes } = this.props;

    function PlanRedirect(all_props, gb_selection) {
      if (all_props.token) {
        // If authenticated
        axios
          .post("http://127.0.0.1:8000/api/plans/create/", {
            auth_token: all_props.token,
            gb: gb_selection,
            used: "0.00",
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        all_props.history.push("/login");
      }
    }
    return (
      <div className={classes.rootStyle}>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Card raised={true} className={classes.cardStyle}>
              <div style={{ textAlign: "center" }}>
                <h1>1 GB</h1>
                <Button
                  onClick={() => {
                    PlanRedirect(this.props, 1);
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
                <h1>2 GB</h1>
                <Button
                  onClick={() => {
                    PlanRedirect(this.props, 2);
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
                <h1>4 GB</h1>
                <Button
                  onClick={() => {
                    PlanRedirect(this.props, 4);
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
    token: state.token,
    loading: state.loading,
    error: state.error,
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
