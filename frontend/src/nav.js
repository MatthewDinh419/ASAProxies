import React from "react";
import "./App.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions/auth";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";

function Nav(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  function dashboardRedirect(e) {
    e.preventDefault();
    if (props.isAuthenticated) {
      props.history.push("/dashboard");
    } else {
      props.history.push("/login");
    }
  }

  function ResetPassword() {
    props.history.push("/password-reset");
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
    // this.setState({open: true});
  };

  const handleClose = () => {
    setAnchorEl(null);
    // this.setState({open: false});
  };
  return (
    <div>
      <AppBar
        position="fixed"
        style={{
          background: "#fbfcfe",
          alignItems: "center",
        }}
      >
        <Toolbar>
          <Typography style={{ flexGrow: 1 }}></Typography>
          <Button
            component={Link}
            to="/"
            style={{
              fontFamily: `"Ramabhadra",sans-serif`,
              textTransform: "none",
            }}
          >
            Home
          </Button>
          <Button
            component={Link}
            to="/plans"
            style={{
              fontFamily: `"Ramabhadra",sans-serif`,
              textTransform: "none",
            }}
          >
            Plans
          </Button>
          <Button
            component={Link}
            to="/plans"
            style={{
              fontFamily: `"Ramabhadra",sans-serif`,
              textTransform: "none",
            }}
          >
            FAQ
          </Button>
          <Button
            onClick={dashboardRedirect}
            style={{
              fontFamily: `"Ramabhadra",sans-serif`,
              textTransform: "none",
            }}
          >
            Dashboard
          </Button>
          {props.isAuthenticated ? (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                onMouseOver={handleMenu}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                elevation={0}
                getContentAnchorEl={null}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                open={open}
                onClose={handleClose}
                MenuListProps={{ onMouseLeave: handleClose }}
              >
                <MenuItem
                  onClick={() => {
                    handleClose();
                    props.history.push("/payment-history");
                  }}
                >
                  Purchase History
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    ResetPassword();
                  }}
                >
                  Reset Password
                </MenuItem>
                <MenuItem
                  style={{ textTransform: "none" }}
                  onClick={() => {
                    props.logout();
                    handleClose();
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <Button
              component={Link}
              to="/login"
              style={{
                fontFamily: `"Ramabhadra",sans-serif`,
                textTransform: "none",
              }}
            >
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
