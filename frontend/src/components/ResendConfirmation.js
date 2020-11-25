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

class ResendConfirmation extends React.Component {
  state = {
    loading: false,
    error: null,
    message: null,
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    axios
      .post("http://127.0.0.1:8000/api/resend-email/", {
        email: event.target.elements.email.value,
      })
      .then((res) => {
        this.setState({
          error: false,
          message: "Email confirmation has been sent",
          loading: false,
        });
      })
      .catch((err) => {
        this.setState({
          error: true,
          message:
            "The account is already verified or the requested email is not attached to an account",
          loading: false,
        });
      });
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.loginContainerStyle}>
        <Fade in={true} timeout={1300}>
          <Card className={classes.cardStyle} raised={true}>
            <form onSubmit={this.handleSubmit}>
              <p
                className={`${classes.baseTextStyle} ${classes.passEmailText}`}
              >
                Enter the email associated with your account to receive a
                confirmation email
              </p>
              <TextField
                name="email"
                id="standard-required-2"
                label="Email"
                defaultValue=""
                InputProps={{ className: classes.formStyle }}
                InputLabelProps={{
                  className: classes.formStyle,
                }}
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
  withStyles(useStyles)(ResendConfirmation)
);
