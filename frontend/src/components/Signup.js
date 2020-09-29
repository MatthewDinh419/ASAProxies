import React from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { useStyles } from "../styling/forms";

class Signup extends React.Component {
  state = {
    usernameError: "",
    emailError: "",
    passwordError: "",
    confirmError: "",
  };
  validate = () => {
    let isError = false;
    const errors = {
      usernameError: "",
      emailError: "",
      passwordError: "",
      confirmError: "",
    };
    if (
      event.target.elements.password1.value !==
      event.target.elements.password2.value
    ) {
      isError = true;
      errors.confirmError = "Passwords do not match";
    }
    if (event.target.elements.username.value.length < 5) {
      isError = true;
      errors.usernameError = "Not at least 5 characters long";
    }
    if (event.target.elements.password1.value.length < 5) {
      isError = true;
      errors.passwordError = "Not at least 5 characters long";
    }
    // Testing email format
    if (
      !/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        event.target.elements.email.value
      )
    ) {
      isError = true;
      errors.emailError = "Not a valid email";
    }
    this.setState({
      ...this.state,
      ...errors,
    });
    return isError;
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const err = this.validate();
    if (!err) {
      // clear form
      this.setState({
        usernameError: "",
        emailError: "",
        passwordError: "",
      });
      this.props.onAuth(
        event.target.elements.username.value,
        event.target.elements.email.value,
        event.target.elements.password1.value,
        event.target.elements.password2.value
      );
      this.props.history.push("/");
    }
  };
  render() {
    const { classes } = this.props;
    return (
      <div style={{ textAlign: "center", marginTop: "5%" }}>
        <Card className={classes.cardStyle} raised={true}>
          <form onSubmit={this.handleSubmit}>
            <h1
              style={{
                textAlign: "center",
                color: "white",
                fontFamily: `"Source Sans Pro",sans-serif`,
              }}
            >
              Signup
            </h1>
            <Grid style={{ textAlign: "center" }} container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  name="username"
                  id="standard-required"
                  label="Username"
                  defaultValue=""
                  error={this.state.usernameError.length > 0}
                  helperText={this.state.usernameError}
                  InputProps={{ className: classes.formStyle }}
                  InputLabelProps={{
                    className: classes.formStyle,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="email"
                  id="standard-required-2"
                  label="Email"
                  defaultValue=""
                  error={this.state.emailError.length > 0}
                  helperText={this.state.emailError}
                  InputProps={{ className: classes.formStyle }}
                  InputLabelProps={{
                    className: classes.formStyle,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="standard-password-input"
                  name="password1"
                  label="Password"
                  type="password"
                  error={this.state.passwordError.length > 0}
                  helperText={this.state.passwordError}
                  InputProps={{ className: classes.formStyle }}
                  InputLabelProps={{
                    className: classes.formStyle,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="standard-password-input-2"
                  name="password2"
                  label="Confirm Password"
                  type="password"
                  error={this.state.confirmError.length > 0}
                  helperText={this.state.confirmError}
                  InputProps={{ className: classes.formStyle }}
                  InputLabelProps={{
                    className: classes.formStyle,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  className={classes.buttonStyle}
                  color="primary"
                  variant="contained"
                  type="submit"
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    error: state.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (username, email, password1, password2) =>
      dispatch(actions.authSignup(username, email, password1, password2)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(Signup));
