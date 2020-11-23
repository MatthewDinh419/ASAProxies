import React from "react";
import { connect } from "react-redux";
import { useStyles } from "../styling/homepage";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import LightBlueCloud from "../../assets/light-blue-cloud.svg";
import DarkBlueCloud from "../../assets/dark-blue-cloud.svg";
import NetworkLines from "../../assets/network-test.svg";
import HomePageBlock1 from "../../assets/homepage-block1.svg";
import HomePageBlock2 from "../../assets/homepage-block2.svg";
import FinishLine from "../../assets/finishline-logo.svg";
import FootLocker from "../../assets/footlocker-logo.svg";
import Nike from "../../assets/nike-logo.svg";
import Shopify from "../../assets/shopify-logo.svg";
import Supreme from "../../assets/supreme-logo.svg";
import YeezyLogo from "../../assets/yeezy-logo.png";
import { Button, Card } from "@material-ui/core";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import LockIcon from "@material-ui/icons/Lock";
import NetworkCheckIcon from "@material-ui/icons/NetworkCheck";
import Fade from "@material-ui/core/Fade";
import Slide from "@material-ui/core/Slide";
import VizSensor from "react-visibility-sensor";

class Homepage extends React.Component {
  state = {
    active: false,
    features_active: false,
    sites_active: false,
  };
  render() {
    const { classes } = this.props;

    return (
      <div id="homepage_container">
        {/* Section 1: Typography Div */}
        <VizSensor
          partialVisibility={true}
          onChange={(isVisible) => {
            this.setState({ active: isVisible });
          }}
        >
          <Fade in={this.state.active} timeout={1300}>
            <div className={classes.containerStyle}>
              <Grid
                direction={"column"}
                className={classes.headerDivStyle}
                container
                spacing={0}
              >
                <Grid item xs={12}>
                  <Typography className={classes.headerStyle} variant="h1">
                    ASAPROXIES
                  </Typography>
                </Grid>
                <Grid className={classes.subContainer} item xs={12}>
                  <Typography className={classes.subStyle} variant="subtitle1">
                    Leader in&nbsp;
                  </Typography>
                  <Typography
                    className={`${classes.subStyle} ${classes.subRedStyle}`}
                    variant="subtitle1"
                  >
                    speed&nbsp;
                  </Typography>
                  <Typography className={classes.subStyle} variant="subtitle1">
                    and&nbsp;
                  </Typography>
                  <Typography
                    className={`${classes.subStyle} ${classes.subGreenStyle}`}
                    variant="subtitle1"
                  ></Typography>
                  <Typography
                    className={`${classes.subStyle} ${classes.subGreenStyle}`}
                    variant="subtitle1"
                  >
                    consistency
                  </Typography>
                </Grid>
                <Grid
                  className={`${classes.subContainer} ${classes.plansButtonContainer}`}
                  item
                  xs={12}
                >
                  <Button
                    onClick={() => this.props.history.push("/plans")}
                    className={classes.buttonStyle}
                  >
                    View Plans
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Fade>
        </VizSensor>
        {/* Section 2: Cloud Div */}
        <Fade in={this.state.active} timeout={1300}>
          <div className={classes.cloudDivStyle}>
            <img
              className={`${classes.cloudStyle} ${classes.networkStyle}`}
              src={NetworkLines}
              alt="network-lines"
            />
            <img
              className={`${classes.cloudStyle} ${classes.lightCloudStyle}`}
              src={LightBlueCloud}
              alt="light-blue-cloud"
            />
            <img
              className={`${classes.cloudStyle} ${classes.darkCloudStyle}`}
              src={DarkBlueCloud}
              alt="light-blue-cloud"
            />
          </div>
        </Fade>
        {/* Section 3: Features Div */}
        <div className={classes.lbRectangleStyle}>
          <div className={classes.dbRectangleStyle}>
            <VizSensor
              partialVisibility={true}
              onChange={(isVisible) => {
                console.log("change");
                this.setState({ features_active: isVisible });
              }}
            >
              <Fade in={this.state.features_active} timeout={1500}>
                <Grid
                  direction={"row"}
                  className={classes.featuresCardContainer}
                  container
                  spacing={3}
                >
                  <Grid item xs={12}>
                    <Typography
                      className={`${classes.headerStyle} ${classes.featuresHeaderStyle}`}
                      variant="h1"
                    >
                      Features
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <SupervisedUserCircleIcon className={classes.iconStyle} />
                    <Grid direction={"column"} container spacing={0}>
                      <Typography
                        className={`${classes.subStyle} ${classes.iconSubtitleStyle}`}
                        variant="subtitle2"
                      >
                        Customer Service
                      </Typography>
                      <Typography
                        className={`${classes.subStyle} ${classes.bodyStyle}`}
                        variant="body1"
                      >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nulla feugiat urna elit
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    className={classes.featuresTileStyle}
                    item
                    xs={12}
                    sm={12}
                    md={4}
                  >
                    <LockIcon className={classes.iconStyle} />
                    <Grid
                      className={classes.iconGridStyle}
                      direction={"column"}
                      container
                      spacing={0}
                    >
                      <Typography
                        className={`${classes.subStyle} ${classes.iconSubtitleStyle}`}
                        variant="subtitle2"
                      >
                        Diverse Pools
                      </Typography>
                      <Typography
                        className={`${classes.subStyle} ${classes.bodyStyle}`}
                        variant="body1"
                      >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nulla feugiat urna elit
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    className={classes.featuresTileStyle}
                    item
                    xs={12}
                    sm={12}
                    md={4}
                  >
                    <NetworkCheckIcon className={classes.iconStyle} />
                    <Grid
                      className={classes.iconGridStyle}
                      direction={"column"}
                      container
                      spacing={0}
                    >
                      <Typography
                        className={`${classes.subStyle} ${classes.iconSubtitleStyle}`}
                        variant="subtitle2"
                      >
                        Unthrottled Speeds
                      </Typography>
                      <Typography
                        className={`${classes.subStyle} ${classes.bodyStyle}`}
                        variant="body1"
                      >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nulla feugiat urna elit
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Fade>
            </VizSensor>
          </div>
        </div>

        {/* Section 4: Supported Sites Div */}
        <VizSensor
          partialVisibility={true}
          offset={{ bottom: 350 }}
          onChange={(isVisible) => {
            this.setState({ sites_active: isVisible });
          }}
        >
          <div className={classes.supportedContainer}>
            <Grid direction={"column"} container spacing={0}>
              <Grid className={classes.homepageBlockStyle} item xs={12}>
                <Slide
                  direction="right"
                  in={this.state.sites_active}
                  timeout={700}
                >
                  <img src={HomePageBlock1} alt="homepage_block" />
                </Slide>
              </Grid>
              <Fade in={this.state.sites_active} timeout={800}>
                <Grid className={classes.supportedCardContainer} item xs={12}>
                  <Card raised={true} className={classes.cardStyle}>
                    <Typography
                      className={`${classes.headerStyle} ${classes.supportedSitesFont}`}
                      variant="h1"
                    >
                      Supported Sites
                    </Typography>
                    <Grid
                      direction={"row"}
                      className={classes.supportedSitesContainer}
                      container
                      spacing={3}
                    >
                      <Grid item xs={6} sm={6} md={4}>
                        <img
                          className={`${classes.storeLogoStyle} ${classes.footlockerStyle}`}
                          src={FootLocker}
                          alt="footlocker_logo"
                        />
                      </Grid>
                      <Grid item xs={6} sm={6} md={4}>
                        <img
                          className={classes.storeLogoStyle}
                          src={Shopify}
                          alt="shopify_logo"
                        />
                      </Grid>
                      <Grid item xs={6} sm={6} md={4}>
                        <img
                          className={classes.storeLogoStyle}
                          src={Supreme}
                          alt="supreme_logo"
                        />
                      </Grid>
                      <Grid item xs={6} sm={6} md={4}>
                        <img
                          className={classes.storeLogoStyle}
                          src={FinishLine}
                          alt="finishline_logo"
                        />
                      </Grid>
                      <Grid item xs={6} sm={6} md={4}>
                        <img
                          className={classes.storeLogoStyle}
                          src={Nike}
                          alt="nike_logo"
                        />
                      </Grid>
                      <Grid item xs={6} sm={6} md={4}>
                        <img
                          className={classes.yeezyLogoStyle}
                          src={YeezyLogo}
                          alt="yeezy_logo"
                        />
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              </Fade>
              <Grid className={classes.homepageBlockStyle2} item xs={12}>
                <Slide
                  direction="left"
                  in={this.state.sites_active}
                  timeout={700}
                >
                  <img src={HomePageBlock2} alt="homepage2_block" />
                </Slide>
              </Grid>
            </Grid>
          </div>
        </VizSensor>
        {/* Section 5: About Div */}
        <div className={classes.aboutContainer}>
          <Grid spacing={0} direction={"row"} container>
            <Grid item xs={12} md={2}></Grid>
            <Grid item xs={12} md={2}></Grid>
            <Grid className={classes.bottomHeaderStyle} item xs={12} md={2}>
              <Typography
                className={`${classes.subStyle} ${classes.bottomItemsHeader}`}
                variant="h1"
              >
                Company
              </Typography>
              <div className={classes.line1Style}></div>
              <Typography
                className={`${classes.bodyStyle} ${classes.hyperlinkStyle}`}
                variant="h1"
                onClick={() => {
                  location.href = "http://localhost:3000/tos";
                }}
              >
                Terms of Service
              </Typography>
              <Typography
                className={`${classes.bodyStyle} ${classes.hyperlinkStyle}`}
                variant="h1"
                onClick={() => {
                  location.href = "http://localhost:3000/faq";
                }}
              >
                FAQ
              </Typography>
            </Grid>
            <Grid className={classes.bottomHeaderStyle} item xs={12} md={2}>
              <Typography
                className={`${classes.subStyle} ${classes.bottomItemsHeader}`}
                variant="h1"
              >
                Contact
              </Typography>
              <div className={classes.line1Style}></div>
              <Typography
                className={`${classes.bodyStyle} ${classes.hyperlinkStyle}`}
                variant="h1"
                onClick={() => {
                  window.open("https://twitter.com/asaproxies", "_blank");
                }}
              >
                Twitter
              </Typography>
              <Typography
                className={`${classes.bodyStyle} ${classes.endItemsStyle}`}
                variant="h1"
              >
                Asaproxiescontact@gmail.com
              </Typography>
            </Grid>
            <Grid item xs={12} md={2}></Grid>
            <Grid item xs={12} md={2}></Grid>
          </Grid>
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

export default connect(mapStateToProps)(withStyles(useStyles)(Homepage));
