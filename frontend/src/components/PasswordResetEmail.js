import React from "react";
import { connect } from "react-redux";
import { useStyles } from "../styling/forms";
import { withStyles } from "@material-ui/core/styles";
import { Button, Card } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress';

class PasswordResetEmail extends React.Component {  
  state = {
    loading: false,
    error: null,
    message: null,
}
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({loading: true});
    axios.post('http://127.0.0.1:8000/api/password_reset/', {email: event.target.elements.email.value})
      .then(res => {
        this.setState({error: false, message: "Password recovery email has been sent", loading: false});
      })
      .catch(err => {
        this.setState({error: true, message: "There is no account with that email", loading: false});
      })
  };
  render() {
    const { classes } = this.props;
    return (
      <div style={{ textAlign: "center" }}>
        <Card className={classes.cardStyle} raised={true}>
          <form onSubmit={this.handleSubmit}>
            <p className={classes.textStyle} style={{marginLeft: "5%", marginRight: "5%"}}>Enter the email associated with your account and we'll send a link for you to reset your password</p>
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
              this.state.loading ? 
              (
                  <Button
                  className={classes.buttonStyle}
                  color="primary"
                  variant="contained"
                  style={{marginTop: "10%"}}
                  type="submit">
                  <CircularProgress size={24}></CircularProgress>
                  </Button>
              )
              :
              (
                  <Button
                  className={classes.buttonStyle}
                  color="primary"
                  variant="contained"
                  style={{marginTop: "10%"}}
                  type="submit">
                  Submit
                  </Button>
              )
                }
              <p className={classes.textStyle} style={{ color: this.state.error ? "red" : "green" }}>
                  {this.state.message}
              </p>
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

export default connect(
  mapStateToProps,
)(withStyles(useStyles)(PasswordResetEmail));
