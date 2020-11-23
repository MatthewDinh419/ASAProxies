import React from "react";
import { connect } from "react-redux";
import { useStyles } from "../styling/forms";
import { withStyles } from "@material-ui/core/styles";
import { Button, Card } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormDecoration from "../../assets/form-dororation.svg";
import Fade from "@material-ui/core/Fade";
import Slide from "@material-ui/core/Slide";

class PasswordResetConfirm extends React.Component {
  state = {
    loading: false,
    error: null,
    message: null,
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    if (
      event.target.elements.password1.value !==
      event.target.elements.password2.value
    ) {
      this.setState({ error: true, message: "Passwords do not match" });
    } else {
      const queryString = require("query-string");
      const parsed = queryString.parse(this.props.location.search);
      let token = parsed["token"];
      axios
        .post("http://127.0.0.1:8000/api/password_reset/confirm/", {
          token: token,
          password: event.target.elements.password1.value,
        })
        .then((res) => {
          this.setState({
            loading: false,
            error: false,
            message: "Password Successfully Changed",
          });
          window.setTimeout(() => {
            this.props.history.push("/login");
          }, 1000);
        })
        .catch((err) => {
          this.setState({
            loading: false,
            error: true,
            message: "Something has gone wrong",
          });
        });
    }
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.loginContainerStyle}>
        <Fade in={true} timeout={1200}>
          <Card className={classes.cardStyle} raised={true}>
            <form onSubmit={this.handleSubmit}>
              <h1 className={classes.headerStyle}>Reset Password</h1>
              <Grid item xs={12}>
                <TextField
                  id="standard-password-input"
                  name="password1"
                  label="Password"
                  type="password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="standard-password-input-2"
                  name="password2"
                  label="Confirm Password"
                  type="password"
                />
              </Grid>
              <Grid item xs={12}>
                {
                  // Loading state for button
                  this.state.loading ? (
                    <Button
                      className={classes.buttonStyle}
                      disabled
                      color="primary"
                      variant="contained"
                      style={{ marginTop: "10%" }}
                      type="submit"
                    >
                      <CircularProgress size={24}></CircularProgress>
                    </Button>
                  ) : (
                    <Button
                      className={classes.buttonStyle}
                      color="primary"
                      variant="contained"
                      style={{ marginTop: "10%" }}
                      type="submit"
                    >
                      Submit
                    </Button>
                  )
                }
                <p
                  className={classes.textStyle}
                  style={{ color: this.state.error ? "red" : "green" }}
                >
                  {this.state.message}
                </p>
              </Grid>
            </form>
          </Card>
        </Fade>
        <Slide in={true} direction="right" timeout={1100}>
          <img
            className={classes.decorationStyle}
            src={FormDecoration}
            alt="form_decoration"
          />
        </Slide>
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

export default connect(mapStateToProps)(
  withStyles(useStyles)(PasswordResetConfirm)
);
