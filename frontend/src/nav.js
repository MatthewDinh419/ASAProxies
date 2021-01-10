import React from "react";
import "./App.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actions from "./store/actions/auth";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";
import AsaproxiesLogo from "../assets/asaproxies-logo.svg";
import { useStyles } from "./styling/Nav";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import Drawer from "@material-ui/core/Drawer";
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
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [openDrawer, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(!openDrawer);
  };

  const classes = useStyles();
  return (
    <div>
      <AppBar
        style={{ zIndex: 1300 }}
        position="fixed"
        className={classes.appbarStyle}
      >
        <Toolbar>
          <img
            className={classes.logoStyle}
            src={AsaproxiesLogo}
            alt="asaproxies-logo"
          />
          <Typography style={{ flexGrow: 1 }}></Typography>
          <div className={classes.mobileShowStyle}>
            <IconButton
              color="inherit"
              aria-label="menu"
              aria-haspopup="true"
              aria-controls="menu-appbar"
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
          </div>
          <div className={classes.mobileHideStyle}>
            <Button component={Link} to="/" className={classes.buttonStyle}>
              Home
            </Button>
            <Button
              component={Link}
              to="/plans"
              className={classes.buttonStyle}
            >
              Plans
            </Button>
            <Button component={Link} to="/faq" className={classes.buttonStyle}>
              FAQ
            </Button>
            <Button onClick={dashboardRedirect} className={classes.buttonStyle}>
              Dashboard
            </Button>
            {props.isAuthenticated ? (
              <div className={classes.accountCircleStyle}>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
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
                    className={classes.menuItemStyle}
                    onClick={() => {
                      props.logout();
                      props.history.push("/");
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
                className={classes.buttonStyle}
              >
                Login
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="persistent" anchor="top" open={openDrawer}>
        <div className={classes.toolbar}></div>
        <List>
          <ListItem
            onClick={() => {
              window.location.href = "/";
            }}
            button
          >
            <ListItemText
              disableTypography
              className={classes.drawerTextStyle}
              primary={
                <Typography className={classes.drawerTextStyle}>
                  Home
                </Typography>
              }
            />
          </ListItem>
          <ListItem
            onClick={() => {
              window.location.href = "/Plans";
            }}
            button
          >
            <ListItemText
              className={classes.drawerTextStyle}
              primary={
                <Typography className={classes.drawerTextStyle}>
                  Plans
                </Typography>
              }
            />
          </ListItem>
          <ListItem
            onClick={() => {
              window.location.href = "/Faq";
            }}
            button
          >
            <ListItemText
              className={classes.drawerTextStyle}
              primary={
                <Typography className={classes.drawerTextStyle}>FAQ</Typography>
              }
            />
          </ListItem>
          <ListItem
            onClick={() => {
              window.location.href = "/Dashboard";
            }}
            button
          >
            <ListItemText
              className={classes.drawerTextStyle}
              primary={
                <Typography className={classes.drawerTextStyle}>
                  Dashboard
                </Typography>
              }
            />
          </ListItem>
          {props.isAuthenticated ? (
            <div>
              <ListItem
                onClick={() => {
                  window.location.href = "/payment-history";
                }}
                button
              >
                <ListItemText
                  className={classes.drawerTextStyle}
                  primary={
                    <Typography className={classes.drawerTextStyle}>
                      Purchase History
                    </Typography>
                  }
                />
              </ListItem>
              <ListItem
                onClick={() => {
                  ResetPassword();
                }}
                button
              >
                <ListItemText
                  className={classes.drawerTextStyle}
                  primary={
                    <Typography className={classes.drawerTextStyle}>
                      Reset Password
                    </Typography>
                  }
                />
              </ListItem>
              <ListItem
                onClick={() => {
                  props.logout();
                  window.location.href = "/";
                }}
                button
              >
                <ListItemText
                  className={classes.drawerTextStyle}
                  primary={
                    <Typography className={classes.drawerTextStyle}>
                      Logout
                    </Typography>
                  }
                />
              </ListItem>
            </div>
          ) : (
            <ListItem
              onClick={() => {
                window.location.href = "/Login";
              }}
              button
            >
              <ListItemText
                className={classes.drawerTextStyle}
                primary={
                  <Typography className={classes.drawerTextStyle}>
                    Login
                  </Typography>
                }
              />
            </ListItem>
          )}
        </List>
      </Drawer>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.logout()),
  };
};

export default withRouter(connect(null, mapDispatchToProps)(Nav));
