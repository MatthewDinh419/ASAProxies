import React from "react";
import { useStyles } from "../styling/plans";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Button, Card } from "@material-ui/core";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import CachedIcon from "@material-ui/icons/Cached";
import GroupWorkIcon from "@material-ui/icons/GroupWork";
import GroupIcon from "@material-ui/icons/Group";
import DnsIcon from "@material-ui/icons/Dns";
import HomeIcon from "@material-ui/icons/Home";
import Slider from "@material-ui/core/Slider";

class PlansPage extends React.Component {
  constructor(props) {
    super(props);
    // this.coupon_ref = React.createRef();
  }
  state = {
    loading: false,
    coupon: null,
    cart_form: false,
    item_name: null,
    price: null,
    discount_price: null,
    error: null,
  };
  submit = (env) => {
    env.preventDefault();
    this.setState({ loading: true });
    let code = this.coupon_ref.current.value;
    // Check if coupon is valid
    axios
      .post(
        "http://127.0.0.1:8000/add-coupon/",
        { code: code },
        { headers: { Authorization: `Token ${localStorage.getItem("token")}` } }
      )
      .then((res) => {
        this.setState({
          loading: false,
          success: true,
          discount_price: (res.data.discount / 100) * this.state.price,
          coupon: code,
          error: null,
        });
      })
      .catch((err) => {
        this.setState({
          error: "Coupon is invalid or expired",
          loading: false,
          success: false,
        });
      });
  };
  render() {
    const { classes } = this.props;
    const switchOpen = () => {
      this.setState({ cart_form: !this.state.cart_form });
    };
    const marks = [
      { value: 1, label: "1 GB" },
      { value: 2, label: "2 GB" },
      { value: 4, label: "4 GB" },
    ];
    // Set state based off gb_selection
    const atc = (all_props, gb_selection) => {
      if (all_props.token == null) {
        all_props.history.push("/login");
      } else {
        if (gb_selection === "1GB RESI PLAN") {
          this.setState({
            cart_form: !this.state.cart_form,
            item_name: gb_selection,
            price: 20,
          });
        } else if (gb_selection === "2GB RESI PLAN") {
          this.setState({
            cart_form: !this.state.cart_form,
            item_name: gb_selection,
            price: 40,
          });
        } else if (gb_selection === "4GB RESI PLAN") {
          this.setState({
            cart_form: !this.state.cart_form,
            item_name: gb_selection,
            price: 60,
          });
        }
      }
    };
    function PlanRedirect(all_props, gb_selection, coupon_passed, amount) {
      // Go to checkout button is pressed
      if (all_props.token == null) {
        all_props.history.push("/login");
      } else {
        all_props.history.push({
          pathname: "/Checkout",
          state: { cart: gb_selection, price: amount },
        });
      }
    }
    return (
      <div id="Plans Container">
        <div className={classes.plansContainerStyle}>
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
                      <Typography className={classes.headerStyle} variant="h1">
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
                            marks={marks}
                            min={1}
                            max={4}
                            valueLabelDisplay="on"
                            defaultValue={1}
                            step={null}
                          ></Slider>
                        </Grid>
                        <Grid className={classes.buttonGridStyle} item xs={12}>
                          <Button className={classes.buttonStyle}>
                            Review
                          </Button>
                        </Grid>
                      </Grid>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Card>
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
