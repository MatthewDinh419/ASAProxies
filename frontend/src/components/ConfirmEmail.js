import React from "react";
import { connect } from "react-redux";
import { useStyles } from "../styling/forms";
import { withStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import FormDecoration from "../../assets/form-dororation.svg";
import Fade from "@material-ui/core/Fade";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CircularProgress from "@material-ui/core/CircularProgress";

class ConfirmEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      message: "",
      error: false,
    };
    const queryString = require("query-string");
    const parsed = queryString.parse(this.props.location.search);
    let key = parsed["key"];
    axios
      .post("http://127.0.0.1:8000/rest-auth/registration/verify-email/", {
        key: key,
      })
      .then((res) => {
        this.setState({ loading: false, message: "Email Confirmed" });
      })
      .catch((err) => {
        this.setState({
          loading: false,
          message: "Something went wrong",
          error: true,
        });
      });
  }
  state = {
    loading: false,
    message: "",
    error: false,
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.loginContainerStyle}>
        <Fade in={true} timeout={1100}>
          <Card
            raised={true}
            className={`${classes.cardStyle} ${classes.successCardStyle}`}
          >
            {this.state.loading ? (
              <CircularProgress
                className={classes.progressStyle}
                style={{ fontSize: 100 }}
              ></CircularProgress>
            ) : (
              <Grid container spacing={1}>
                <Grid item md={12}>
                  <CheckCircleOutlineIcon
                    className={classes.checkmarkLogoStyle}
                  ></CheckCircleOutlineIcon>
                </Grid>
                <Grid item md={12}>
                  {this.state.error ? (
                    <h1
                      style={{ color: "red", fontSize: "28px" }}
                      className={classes.textStyle}
                    >
                      {this.state.message}
                    </h1>
                  ) : (
                    <h1
                      style={{ color: "green", fontSize: "28px" }}
                      className={classes.textStyle}
                    >
                      {this.state.message}
                    </h1>
                  )}
                </Grid>
              </Grid>
            )}
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

export default connect(mapStateToProps)(withStyles(useStyles)(ConfirmEmail));
