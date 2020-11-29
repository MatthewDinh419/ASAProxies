import React from "react";
import { connect } from "react-redux";
import { useStyles } from "../styling/forms";
import { withStyles } from "@material-ui/core/styles";
import { Button, Card } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "@material-ui/core/Fade";
import Slide from "@material-ui/core/Slide";
import FormDecoration from "../../assets/form-dororation.svg";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

class PasswordResetEmail extends React.Component {
  state = {
    loading: false,
    error: null,
    message: null,
    alert: false,
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    axios
      .post("http://127.0.0.1:8000/api/password_reset/", {
        email: event.target.elements.email.value,
      })
      .then((res) => {
        this.setState({
          alert: true,
          error: false,
          message: "Password recovery email has been sent",
          loading: false,
        });
      })
      .catch((err) => {
        this.setState({
          alert: true,
          error: true,
          message: "There is no account with that email",
          loading: false,
        });
      });
  };
  render() {
    const { classes } = this.props;
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
              <p
                className={`${classes.baseTextStyle} ${classes.passEmailText}`}
              >
                Enter the email associated with your account and we'll send a
                link for you to reset your password
              </p>
              <TextField
                name="email"
                id="standard-required-2"
                label="Email"
                defaultValue=""
                className={classes.emailFormStyle}
              />
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
                      className={` ${classes.buttonStyle} ${classes.resetButtonStyle}`}
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

export default connect(mapStateToProps)(
  withStyles(useStyles)(PasswordResetEmail)
);
