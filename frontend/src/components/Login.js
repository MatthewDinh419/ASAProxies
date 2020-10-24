import React from "react";
import TextField from "@material-ui/core/TextField";
import { Button, Card } from "@material-ui/core";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
import Grid from "@material-ui/core/Grid";
import { useStyles } from "../styling/forms";
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router";
import CircularProgress from '@material-ui/core/CircularProgress';

class Login extends React.Component {  
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onAuth(
      event.target.elements.username.value,
      event.target.elements.password1.value
    );
  };
  render() {
    const { classes } = this.props;
    let errorMessage = null;
    // Display incorrect login if login failed otherwise redirect
    if (this.props.error) {
      errorMessage = "Incorrect Login";
    }
    if (this.props.token) {
      return <Redirect to="/"></Redirect>;
    }
    return (
      <div style={{ marginTop: "5%" }}>
        <Card className={classes.cardStyle} raised={true}>
          <p className={classes.textStyle} style={{ color: "red" }}>
            {errorMessage}
          </p>
          <form onSubmit={this.handleSubmit}>
            <h1 className={classes.textStyle}>Login</h1>
            <Grid style={{ textAlign: "center" }} container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  name="username"
                  id="standard-required"
                  label="Username"
                  defaultValue=""
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
                  autoComplete="current-password"
                  InputProps={{ className: classes.formStyle }}
                  InputLabelProps={{
                    className: classes.formStyle,
                  }}
                />
              </Grid>
              {/* Button will show up as loading if loading state is true */}
              <Grid item xs={12}>
                {
                  this.props.loading ? 
                  <Button
                  className={classes.buttonStyle}
                  disabled
                  color="primary"
                  type="submit"
                >
                  <CircularProgress size={25}/>
                </Button>
                :
                <Button
                  className={classes.buttonStyle}
                  color="primary"
                  variant="contained"
                  type="submit"
                >
                  Login
                </Button>
                }
              </Grid>
              <Grid item xs={12}>
                <p className={classes.textStyle} style={{ color: "black" }}>
                  Don't have an account?&nbsp;
                  <a
                    className={classes.textStyle}
                    style={{
                      color: "blue",
                      fontWeight: "bold",
                      textDecoration: "none",
                    }}
                    href="/signup"
                  >
                    Signup
                  </a>
                </p>
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
    token: state.auth.token,
    loading: state.auth.loading,
    error: state.auth.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (username, password) =>
      dispatch(actions.authLogin(username, password)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(Login));
