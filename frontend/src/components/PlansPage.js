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
import HomeIcon from "@material-ui/icons/Home";
import Slider from "@material-ui/core/Slider";
import Fade from "@material-ui/core/Fade";
import Slide from "@material-ui/core/Slide";
import { loadStripe } from "@stripe/stripe-js";
import CircularProgress from "@material-ui/core/CircularProgress";

class PlansPage extends React.Component {
  state = {
    loading: false,
    slider_val: 1,
    item_name: null,
    error: null,
    error_message: null,
  };
  render() {
    const { classes } = this.props;
    const stripePromise = loadStripe(
      "pk_test_51HfD5GDSX6WQWHXC3V1wJeottMdcbaUeMClNeO9GWVdUtbr4rFbS8NAqeaGISWKiQRD8sDJ5Hy8A7vUUX5rS7KYo00gSMRPbG8"
    );
    const marks = [
      { value: 1, label: "1 GB" },
      { value: 2, label: "2 GB" },
      { value: 4, label: "4 GB" },
    ];
    const PlanRedirect = async (all_props, gb_selection) => {
      // Go to checkout button is pressed
      if (all_props.token == null) {
        all_props.history.push("/login");
      } else {
        this.setState({ loading: true });
        var item_name = null;
        if (Number(gb_selection) === 1) {
          item_name = "1GB RESI PLAN";
        } else if (Number(gb_selection) === 2) {
          item_name = "2GB RESI PLAN";
        } else if (Number(gb_selection) === 4) {
          item_name = "4GB RESI PLAN";
        }
        console.log(item_name);
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
              this.setState({ error_message: "Out of Stock" });
            } else {
              this.setState({ loading: false });
              stripe.redirectToCheckout({
                sessionId: res.data.id,
              });
            }
          })
          .catch((err) => {
            console.log(err);
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
                  <div className={classes.FeaturesDivStyle}>
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
                          <Card className={classes.featuresCardStyle}>
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
                          </Card>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid
                          className={classes.gridItemsStyle}
                          direction={"row"}
                          container
                          spacing={0}
                        >
                          <Card className={classes.featuresCardStyle}>
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
                          </Card>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid
                          className={classes.gridItemsStyle}
                          direction={"row"}
                          container
                          spacing={0}
                        >
                          <Card className={classes.featuresCardStyle}>
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
                          </Card>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid
                          className={classes.gridItemsStyle}
                          direction={"row"}
                          container
                          spacing={0}
                        >
                          <Card className={classes.featuresCardStyle}>
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
                          </Card>
                        </Grid>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
                {/* Residential Plan Grid */}
                <Grid item xs={12} md={6}>
                  <Grid
                    direction={"column"}
                    className={classes.headerDivStyle}
                    container
                    spacing={0}
                  >
                    <Grid item xs={12}>
                      <div className={classes.ResiDivStyle}>
                        <form onSubmit={this.PlanSubmit}>
                          <Grid
                            className={classes.gridContainerStyle}
                            direction={"column"}
                            container
                            spacing={0}
                          >
                            <Grid item xs={12}>
                              <Typography className={classes.headerStyle}>
                                Residential Plan
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <HomeIcon
                                className={classes.homeIconStyle}
                              ></HomeIcon>
                            </Grid>
                            <Grid className={classes.sliderStyle} item xs={12}>
                              <Slider
                                name="gb_selection"
                                marks={marks}
                                min={1}
                                max={4}
                                valueLabelDisplay="on"
                                defaultValue={1}
                                step={null}
                                onChange={(e, val) =>
                                  this.setState({ slider_val: val })
                                }
                              ></Slider>
                            </Grid>
                            <Grid
                              className={classes.buttonGridStyle}
                              item
                              xs={12}
                            >
                              {this.state.loading ? (
                                <Button
                                  disabled
                                  className={classes.buttonStyle}
                                >
                                  <CircularProgress size={25} />
                                </Button>
                              ) : (
                                <Button
                                  onClick={() =>
                                    PlanRedirect(
                                      this.props,
                                      this.state.slider_val
                                    )
                                  }
                                  className={classes.buttonStyle}
                                >
                                  Checkout
                                </Button>
                              )}
                              <p
                                className={`${classes.featuresTextStyle} ${classes.errorTextStyle}`}
                              >
                                {this.state.error_message}
                              </p>
                            </Grid>
                          </Grid>
                        </form>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Fade>
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
