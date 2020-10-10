import React from "react";
import "./App.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions/auth";

function Nav(props) {
  function dashboardRedirect(e) {
    e.preventDefault();
    if (props.isAuthenticated) {
      props.history.push("/dashboard");
    } else {
      props.history.push("/login");
    }
  }
  return (
    <div>
      <AppBar
        position="static"
        style={{ background: "transparent", boxShadow: "none" }}
      >
        <Toolbar>
          <Typography style={{ flexGrow: 1 }} variant="h6"></Typography>
          <Button component={Link} to="/" color="inherit">
            Home
          </Button>
          <Button component={Link} to="/plans" color="inherit">
            Plans
          </Button>
          <Button onClick={dashboardRedirect} color="inherit">
            Dashboard
          </Button>
          {props.isAuthenticated ? (
            <Button onClick={props.logout} color="inherit">
              Logout
            </Button>
          ) : (
            <Button component={Link} to="/login" color="inherit">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.logout()),
  };
};

export default withRouter(connect(null, mapDispatchToProps)(Nav));
