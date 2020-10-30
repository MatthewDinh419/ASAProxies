import React from "react";
import TextField from "@material-ui/core/TextField";
import { Button, Card } from "@material-ui/core";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { useStyles } from "../styling/forms";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress';

class PasswordReset extends React.Component {  
  state = {
      message: null,
      error: false,
      loading: false,
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({loading: true});
    axios.post('http://127.0.0.1:8000/api/change-password/', {"old_password": event.target.elements.password1.value, "new_password": event.target.elements.password2.value}, {headers: {Authorization: `Token ${localStorage.getItem("token")}`}})
      .then(res => {
          this.setState({message: "Password has been changed", error: false, loading: false});
      })
      .catch(err => {
          this.setState({message: "Old password is incorrect or new password does not meet requirements", error: true, loading: false});
      })
  };
  render() {
    const { classes } = this.props;
    let errorMessage = null;
    // Display incorrect login if login failed otherwise redirect
    return (
      <div style={{ marginTop: "5%" }}>
        <Card className={classes.cardStyle} raised={true}>
          <p className={classes.textStyle} style={{ color: "red" }}>
            {errorMessage}
          </p>
          <form onSubmit={this.handleSubmit}>
              <div style={{textAlign: "center"}}>
              <h1 className={classes.textStyle} style={{marginBottom: "5%"}}>Reset Password</h1>
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
                  InputProps={{ className: classes.formStyle }}
                  InputLabelProps={{
                    className: classes.formStyle,
                  }}
                />
              </Grid>
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
              </Grid>
              <p className={classes.textStyle} style={{ color: this.state.error ? "red" : "green" }}>
                  {this.state.message}
              </p>
              </div>
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
)(withStyles(useStyles)(PasswordReset));
