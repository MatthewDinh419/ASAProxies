import React from "react";
import TextField from "@material-ui/core/TextField";
import { Button, Card } from "@material-ui/core";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
import Grid from "@material-ui/core/Grid";
import { useStyles } from "../styling/forms";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormDecoration from "../../assets/form-dororation.svg";
import Fade from "@material-ui/core/Fade";
import Slide from "@material-ui/core/Slide";

class Login extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onAuth(
      event.target.elements.email.value,
      event.target.elements.password1.value
    );
  };
  render() {
    const { classes } = this.props;
    let errorMessage = null;
    // Display incorrect login if login failed otherwise redirect
    if (this.props.error) {
      errorMessage = "Incorrect Login";
    } else {
      if (this.props.token) {
        history.back();
      }
    }
    return (
      <div className={classes.loginContainerStyle}>
        <Fade in={true} timeout={1300}>
          <Card className={classes.cardStyle} raised={true}>
            <p className={`${classes.baseTextStyle} ${classes.errorTextStyle}`}>
              {errorMessage}
            </p>
            <form onSubmit={this.handleSubmit}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <h1 className={classes.headerStyle}>Login</h1>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="email"
                    id="standard-required"
                    label="Email"
                    defaultValue=""
                    InputProps={{ className: classes.baseTextStyle }}
                    InputLabelProps={{
                      className: classes.baseTextStyle,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="standard-password-input"
                    name="password1"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    InputProps={{ className: classes.baseTextStyle }}
                    InputLabelProps={{
                      className: classes.baseTextStyle,
                    }}
                  />
                </Grid>
                {/* Button will show up as loading if loading state is true */}
                <Grid item xs={12}>
                  {this.props.loading ? (
                    <Button
                      className={classes.buttonStyle}
                      disabled
                      color="primary"
                      type="submit"
                    >
                      <CircularProgress size={25} />
                    </Button>
                  ) : (
                    <Button
                      className={classes.buttonStyle}
                      color="primary"
                      variant="contained"
                      type="submit"
                    >
                      Login
                    </Button>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <p
                    className={classes.baseTextStyle}
                    style={{ color: "black" }}
                  >
                    Don't have an account?&nbsp;
                    <a className={classes.hyperlinkTextStyle} href="/signup">
                      Signup
                    </a>
                  </p>
                  <a
                    className={classes.hyperlinkTextStyle}
                    href="/password-confirm"
                  >
                    Forgot Password?
                  </a>
                </Grid>
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

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password) => dispatch(actions.authLogin(email, password)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(Login));
