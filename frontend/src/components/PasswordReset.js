import React from "react";
import TextField from "@material-ui/core/TextField";
import { Button, Card } from "@material-ui/core";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { useStyles } from "../styling/forms";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormDecoration from "../../assets/form-dororation.svg";
import Slide from "@material-ui/core/Slide";
import Fade from "@material-ui/core/Fade";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

class PasswordReset extends React.Component {
  state = {
    message: null,
    error: false,
    loading: false,
    passwordError: "",
    confirmError: "",
    alert: false,
  };
  // Validates the signup form
  validate = async () => {
    let isError = false;
    const errors = {
      confirmError: "",
      passwordError: "",
    };
    // Check if form matches
    if (
      event.target.elements.password2.value !==
      event.target.elements.password3.value
    ) {
      isError = true;
      errors.confirmError = "Passwords do not match";
    }
    if (event.target.elements.password2.value.length <= 5) {
      isError = true;
      errors.passwordError = "Not at least 6 characters long";
    }
    this.setState({
      ...this.state,
      ...errors,
    });
    return isError;
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    let old_password = event.target.elements.password1.value;
    let new_password = event.target.elements.password2.value;
    this.validate().then((error) => {
      if (!error) {
        axios
          .post(
            "http://127.0.0.1:8000/api/change-password/",
            {
              old_password: old_password,
              new_password: new_password,
            },
            {
              headers: {
                Authorization: `Token ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            this.setState({
              message: "Password has been changed",
              alert: true,
              error: false,
              loading: false,
            });
          })
          .catch((err) => {
            console.log(err);
            this.setState({
              message: "Old password is incorrect",
              alert: true,
              error: true,
              loading: false,
            });
          });
      } else {
        this.setState({
          message: "Some fields were incorrect",
          alert: true,
          error: true,
          loading: false,
        });
      }
    });
  };
  render() {
    const { classes } = this.props;
    // Snackbar functions
    function Alert(props) {
      return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    const handleClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      this.setState({ error: false, alert: false });
    };
    return (
      <div className={classes.loginContainerStyle}>
        <Fade in={true} timeout={1300}>
          <Card className={classes.cardStyle} raised={true}>
            <form onSubmit={this.handleSubmit}>
              <Grid item xs={12}>
                <h1 className={classes.headerStyle}>Reset Password</h1>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="standard-password-input"
                  name="password1"
                  label="Old Password"
                  type="password"
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
                  label="New Password"
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
                  id="standard-password-input-3"
                  name="password3"
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
                      <CircularProgress
                        className={classes.progressStyle}
                        size={24}
                      ></CircularProgress>
                    </Button>
                  ) : (
                    <Button
                      className={`${classes.buttonStyle} ${classes.resetButtonStyle}`}
                      color="primary"
                      variant="contained"
                      style={{ marginTop: "10%" }}
                      type="submit"
                    >
                      Submit
                    </Button>
                  )
                }
              </Grid>
            </form>
          </Card>
        </Fade>
        <Snackbar
          open={this.state.alert}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={this.state.error ? "error" : "success"}
          >
            {this.state.message}
          </Alert>
        </Snackbar>
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

export default connect(mapStateToProps)(withStyles(useStyles)(PasswordReset));
