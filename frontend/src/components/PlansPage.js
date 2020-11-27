import React from "react";
import { useStyles } from "../styling/plans";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Button, Card } from "@material-ui/core";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
import PlanDecoration from "../../assets/plan_decoration.svg";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import CachedIcon from "@material-ui/icons/Cached";
import GroupWorkIcon from "@material-ui/icons/GroupWork";
import GroupIcon from "@material-ui/icons/Group";
import DnsIcon from "@material-ui/icons/Dns";
import Fade from "@material-ui/core/Fade";
import Slide from "@material-ui/core/Slide";
import { loadStripe } from "@stripe/stripe-js";
import CircularProgress from "@material-ui/core/CircularProgress";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

class PlansPage extends React.Component {
  state = {
    loading: false,
    slider_val: 1,
    item_name: null,
    error_message: null,
    selection_state: ["1 GB", "2 GB", "4 GB"],
    price_state: ["$20", "$40", "$60"],
    selection_index: 0,
    alert: false,
  };
  render() {
    const { classes } = this.props;
    const stripePromise = loadStripe(
      "pk_test_51HfD5GDSX6WQWHXC3V1wJeottMdcbaUeMClNeO9GWVdUtbr4rFbS8NAqeaGISWKiQRD8sDJ5Hy8A7vUUX5rS7KYo00gSMRPbG8"
    );
    // Snackbar functions
    function Alert(props) {
      return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    const handleClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      this.setState({ alert: false });
    };
    // Plan Handling
    const PlanSelect = (action) => {
      if (action === "subtract") {
        if (this.state.selection_index !== 0) {
          this.setState({ selection_index: this.state.selection_index - 1 });
        }
      } else {
        if (
          this.state.selection_index <
          this.state.selection_state.length - 1
        ) {
          this.setState({ selection_index: this.state.selection_index + 1 });
        }
      }
    };
    const PlanRedirect = async (all_props) => {
      // Go to checkout button is pressed
      if (all_props.token == null) {
        all_props.history.push("/login");
      } else {
        this.setState({ loading: true });
        var item_name = null;
        if (this.state.selection_index === 0) {
          item_name = "1GB RESI PLAN";
        } else if (this.state.selection_index === 1) {
          item_name = "2GB RESI PLAN";
        } else if (this.state.selection_index === 2) {
          item_name = "4GB RESI PLAN";
        }
        const stripe = await stripePromise;
        axios
          .post(
            "http://127.0.0.1:8000/api/create-checkout-session/",
            { item: item_name },
            {
              headers: {
                Authorization: `Token ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            if (res.data.message === "Out of Stock") {
              this.setState({
                alert: true,
                error_message: "Out of Stock",
                loading: false,
              });
            } else {
              this.setState({ loading: false });
              stripe.redirectToCheckout({
                sessionId: res.data.id,
              });
            }
          })
          .catch((err) => {
            this.setState({
              alert: true,
              error_message: err.message,
              loading: false,
            });
          });
      }
    };
    return (
      <div id="Plans Container">
        <div className={classes.plansContainerStyle}>
          <Fade in={true} timeout={1300}>
            <Card raised={true} className={classes.cardStyle}>
              <Grid
                className={classes.gridContainerStyle}
                direction={"row"}
                container
                spacing={0}
              >
                {/* Features Grid */}
                <Grid item xs={12} md={6}>
                  <div
                    className={`${classes.FeaturesDivStyle} ${classes.paddingDivStyle}`}
                  >
                    <Grid
                      className={classes.gridItemsStyle}
                      direction={"column"}
                      container
                      spacing={3}
                    >
                      <Grid item xs={12}>
                        <Typography
                          className={classes.headerStyle}
                          variant="h1"
                        >
                          Features
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid
                          className={classes.gridItemsStyle}
                          direction={"row"}
                          container
                          spacing={0}
                        >
                          <div className={classes.featuresCardStyle}>
                            <Grid
                              className={classes.gridContainerStyle}
                              item
                              xs={2}
                            >
                              <CachedIcon
                                className={classes.featureIconsStyle}
                              ></CachedIcon>
                            </Grid>
                            <Grid item xs={10}>
                              <Typography
                                className={classes.featuresTextStyle}
                                variant="subtitle1"
                              >
                                &nbsp;Unlimited Proxy Generation
                              </Typography>
                            </Grid>
                          </div>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid
                          className={classes.gridItemsStyle}
                          direction={"row"}
                          container
                          spacing={0}
                        >
                          <div className={classes.featuresCardStyle}>
                            <Grid
                              className={classes.gridContainerStyle}
                              item
                              xs={2}
                            >
                              <GroupWorkIcon
                                className={classes.featureIconsStyle}
                              ></GroupWorkIcon>
                            </Grid>
                            <Grid item xs={10}>
                              <Typography
                                className={classes.featuresTextStyle}
                                variant="subtitle1"
                              >
                                &nbsp;Supports All Websites
                              </Typography>
                            </Grid>
                          </div>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid
                          className={classes.gridItemsStyle}
                          direction={"row"}
                          container
                          spacing={0}
                        >
                          <div className={classes.featuresCardStyle}>
                            <Grid
                              className={classes.gridContainerStyle}
                              item
                              xs={2}
                            >
                              <GroupIcon
                                className={classes.featureIconsStyle}
                              ></GroupIcon>
                            </Grid>
                            <Grid item xs={10}>
                              <Typography
                                className={classes.featuresTextStyle}
                                variant="subtitle1"
                              >
                                &nbsp;150+ Locations Supported
                              </Typography>
                            </Grid>
                          </div>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid
                          className={classes.gridItemsStyle}
                          direction={"row"}
                          container
                          spacing={0}
                        >
                          <div className={classes.featuresCardStyle}>
                            <Grid
                              className={classes.gridContainerStyle}
                              item
                              xs={2}
                            >
                              <DnsIcon
                                className={classes.featureIconsStyle}
                              ></DnsIcon>
                            </Grid>
                            <Grid item xs={10}>
                              <Typography
                                className={classes.featuresTextStyle}
                                variant="subtitle1"
                              >
                                &nbsp;Dedicated and 100% Uptime
                              </Typography>
                            </Grid>
                          </div>
                        </Grid>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
                {/* Residential Plan Grid */}
                <Grid item xs={12} md={6}>
                  <Grid direction={"column"} container spacing={0}>
                    <div className={classes.paddingDivStyle}>
                      <form onSubmit={this.PlanSubmit}>
                        <Grid item xs={12}>
                          <Typography className={classes.headerStyle}>
                            Pick a Plan
                          </Typography>
                        </Grid>
                        <div className={classes.itemDivStyle}>
                          <Grid direction={"row"} container spacing={0}>
                            <Grid item xs={7}>
                              <Button
                                disableRipple={true}
                                style={{ backgroundColor: "transparent" }}
                                onClick={() => {
                                  PlanSelect("subtract");
                                }}
                              >
                                <RemoveCircleOutlineIcon
                                  className={classes.featureIconsStyle}
                                ></RemoveCircleOutlineIcon>
                              </Button>
                              <Typography
                                className={classes.selectionTextStyle}
                                variant="subtitle1"
                              >
                                {
                                  this.state.selection_state[
                                    this.state.selection_index
                                  ]
                                }
                              </Typography>
                              <Button
                                disableRipple={true}
                                style={{ backgroundColor: "transparent" }}
                                onClick={() => {
                                  PlanSelect("add");
                                }}
                              >
                                <AddCircleOutlineIcon
                                  className={classes.featureIconsStyle}
                                ></AddCircleOutlineIcon>
                              </Button>
                            </Grid>
                            <Grid
                              className={classes.selectGridStyle}
                              item
                              xs={5}
                            >
                              <Typography
                                className={` ${classes.featuresTextStyle} ${classes.priceText} `}
                                variant="subtitle1"
                              >
                                {
                                  this.state.price_state[
                                    this.state.selection_index
                                  ]
                                }
                              </Typography>
                            </Grid>
                          </Grid>
                        </div>
                        <Grid item xs={12}>
                          <Typography
                            className={`${classes.featuresTextStyle} ${classes.agreementTextStyle}`}
                            variant="subtitle1"
                          >
                            By purchasing a plan, you agree to the terms and
                            agreement
                          </Typography>
                        </Grid>
                        <Grid className={classes.buttonGridStyle} item xs={12}>
                          {this.state.loading ? (
                            <Button className={classes.buttonStyle}>
                              <CircularProgress size={25} />
                            </Button>
                          ) : (
                            <Button
                              onClick={() => PlanRedirect(this.props)}
                              className={classes.buttonStyle}
                            >
                              Checkout
                            </Button>
                          )}
                        </Grid>
                      </form>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Fade>
          <Snackbar
            open={this.state.alert}
            autoHideDuration={2500}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="error">
              {this.state.error_message}
            </Alert>
          </Snackbar>
          <Slide direction="right" in={true} timeout={1100}>
            <div className={classes.decorationDivStyle}>
              <img
                className={classes.decorationStyle}
                src={PlanDecoration}
                alt="plan_decoration"
              />
            </div>
          </Slide>
        </div>
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
