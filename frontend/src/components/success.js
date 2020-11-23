import React from "react";
import { Card } from "@material-ui/core";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { useStyles } from "../styling/forms";
import { withStyles } from "@material-ui/core/styles";
import FormDecoration from "../../assets/form-dororation.svg";
import Fade from "@material-ui/core/Fade";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

class Success extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.loginContainerStyle}>
        <Fade in={true} timeout={1100}>
          <Card
            raised={true}
            className={`${classes.cardStyle} ${classes.successCardStyle}`}
          >
            <Grid container spacing={1}>
              <Grid item md={12}>
                <CheckCircleOutlineIcon
                  className={classes.checkmarkLogoStyle}
                ></CheckCircleOutlineIcon>
              </Grid>
              <Grid item md={12}>
                <h1
                  style={{ color: "green", fontSize: "28px" }}
                  className={classes.textStyle}
                >
                  Welcome to the ASAP Team
                </h1>
              </Grid>
            </Grid>
          </Card>
        </Fade>
        <Fade in={true} timeout={1100}>
          <img
            className={classes.decorationStyle}
            src={FormDecoration}
            alt="form_decoration"
          />
        </Fade>
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

export default connect(mapStateToProps)(withStyles(useStyles)(Success));
