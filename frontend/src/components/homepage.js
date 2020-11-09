// import React from "react";
import React from "react";
import { connect } from "react-redux";
import { useStyles } from "../styling/homepage";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import LightBlueCloud from "../../assets/light-blue-cloud.svg";
import DarkBlueCloud from "../../assets/dark-blue-cloud.svg";
import NetworkLines from "../../assets/network-lines.svg";
import { Button } from "@material-ui/core";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import LockIcon from "@material-ui/icons/Lock";
import NetworkCheckIcon from "@material-ui/icons/NetworkCheck";

class Homepage extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div id="homepage_container">
        {/* Section 1: Typography Div */}
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
              <Button className={classes.buttonStyle}>View Plans</Button>
            </Grid>
          </Grid>
        </div>
        {/* Section 2: Cloud Div */}
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
        {/* Section 3: Features Div */}
        <div className={classes.lbRectangleStyle}>
          <div className={classes.dbRectangleStyle}>
            <Grid
              direction={"row"}
              className={classes.featuresCardContainer}
              container
              spacing={0}
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
              <Grid item xs={12} sm={12} md={4}>
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
              <Grid item xs={12} sm={12} md={4}>
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
          </div>
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
