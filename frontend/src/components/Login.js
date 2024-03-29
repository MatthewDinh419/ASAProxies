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
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

class Login extends React.Component {
  state = {
    loading: false,
    loginForm: true,
    emailError: "",
    passwordError: "",
    confirmError: "",
    toggleValue: "left",
    alert: false,
    error: false,
    message: null,
    tab_index: 0,
  };
  // Validates the signup form
  validate = async () => {
    let isError = false;
    const errors = {
      emailError: "",
      passwordError: "",
      confirmError: "",
    };
    // Check if form matches
    if (
      event.target.elements.password1.value !==
      event.target.elements.password2.value
    ) {
      isError = true;
      errors.confirmError = "Passwords do not match";
    }
    if (event.target.elements.password1.value.length <= 5) {
      isError = true;
      errors.passwordError = "Not at least 6 characters long";
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
    // Check if email exists
    if (errors.emailError === "") {
      await axios
        .post("http://127.0.0.1:8000/api/verify-info/", {
          email: event.target.elements.email.value,
        })
        .then((res) => {
          if (res.data.email_error !== "") {
            isError = true;
          }
          if (errors.emailError === "") {
            errors.emailError = res.data.email_error;
          }
        });
    }
    this.setState({
      ...this.state,
      ...errors,
    });
    return isError;
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props
      .onAuth(
        event.target.elements.email.value,
        event.target.elements.password1.value
      )
      .then((res) => {
        if (this.props.error) {
          this.setState({
            message: "Incorrect Login",
            alert: true,
            error: true,
          });
        } else {
          if (this.props.token) {
            this.props.history.push("/");
          }
        }
      });
  };
  signupSubmit = (event) => {
    event.preventDefault();
    const elements = event.target;
    this.setState({ loading: true });
    this.validate() // validate form
      .then((error) => {
        if (!error) {
          // if there is no error then post the form
          // clear form
          this.setState({
            emailError: "",
            passwordError: "",
          });
          this.props
            .onSignup(
              elements.email.value,
              elements.password1.value,
              elements.password2.value
            )
            .then((result) => {
              this.setState({
                message: "Check your email to verify your account",
                error: false,
                alert: true,
                loading: false,
              });
            });
        } else {
          this.setState({
            message: "Some fields were incorrect",
            alert: true,
            loading: false,
            error: true,
          });
        }
      })
      .catch((err) => {
        this.setState({
          message: "Something went wrong",
          alert: true,
          loading: false,
          error: true,
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
      this.setState({ alert: false });
    };
    const handleChange = (event, newValue) => {
      this.setState({ tab_index: newValue });
    };
    function a11yProps(index) {
      return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
      };
    }
    function TabPanel(props) {
      const { children, value, index, ...other } = props;

      return (
        <div
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          {...other}
        >
          {value === index && (
            <Box p={3}>
              <Typography>{children}</Typography>
            </Box>
          )}
        </div>
      );
    }
    return (
      <div className={classes.loginContainerStyle}>
        <Fade in={true} timeout={1300}>
          <Card className={classes.cardStyle} raised={true}>
            <Tabs
              value={this.state.tab_index}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab
                style={{
                  color: "black",
                  fontFamily: `"Ramabhadra",sans-serif`,
                  textTransform: "None",
                }}
                label="Login"
                {...a11yProps(0)}
              >
                <h1>hello world</h1>
              </Tab>
              <Tab
                style={{
                  color: "black",
                  fontFamily: `"Ramabhadra",sans-serif`,
                  textTransform: "None",
                }}
                label="Signup"
                {...a11yProps(1)}
              />
            </Tabs>
            {/* Login Form */}
            <TabPanel value={this.state.tab_index} index={0}>
              <form onSubmit={this.handleSubmit}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <TextField
                      name="email"
                      id="standard-required"
                      label="Email"
                      defaultValue=""
                      InputProps={{
                        className: classes.baseTextStyle,
                      }}
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
                        <CircularProgress
                          className={classes.progressStyle}
                          size={25}
                        />
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
                    <a
                      className={classes.hyperlinkTextStyle}
                      href="/password-confirm"
                    >
                      Forgot Password?
                    </a>
                  </Grid>
                </Grid>
              </form>
            </TabPanel>
            {/* Signup Form */}
            <TabPanel value={this.state.tab_index} index={1}>
              <form onSubmit={this.signupSubmit}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <TextField
                      name="email"
                      id="standard-required-2"
                      label="Email"
                      defaultValue=""
                      error={this.state.emailError.length > 0}
                      helperText={this.state.emailError}
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
                      error={this.state.passwordError.length > 0}
                      helperText={this.state.passwordError}
                      InputProps={{ className: classes.baseTextStyle }}
                      InputLabelProps={{
                        className: classes.baseTextStyle,
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
                      InputProps={{ className: classes.baseTextStyle }}
                      InputLabelProps={{
                        className: classes.baseTextStyle,
                      }}
                    />
                  </Grid>
                  {/* Button will show up as loading if loading state is true */}
                  <Grid item xs={12}>
                    {this.state.loading ? (
                      <Button
                        className={classes.buttonStyle}
                        disabled
                        color="primary"
                        type="submit"
                      >
                        <CircularProgress
                          className={classes.progressStyle}
                          size={25}
                        />
                      </Button>
                    ) : (
                      <Button
                        className={classes.buttonStyle}
                        color="primary"
                        variant="contained"
                        type="submit"
                      >
                        Signup
                      </Button>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <a
                      className={classes.hyperlinkTextStyle}
                      href="/resend-confirmation"
                    >
                      Resend confirmation email
                    </a>
                  </Grid>
                </Grid>
              </form>
            </TabPanel>
          </Card>
        </Fade>
        <Snackbar
          open={this.state.alert}
          autoHideDuration={4500}
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

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password) => dispatch(actions.authLogin(email, password)),
    onSignup: (email, password1, password2) =>
      dispatch(actions.authSignup(email, password1, password2)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(Login));
