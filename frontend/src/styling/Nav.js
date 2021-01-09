import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme) => ({
  // Components styling
  appbarStyle: {
    background: "#fbfcfe",
    alignItems: "center",
  },
  buttonStyle: {
    fontFamily: `"Ramabhadra",sans-serif`,
    textTransform: "none",
  },
  accountCircleStyle: {
    color: "black",
  },
  menuItemStyle: {
    textTransform: "none",
  },
  logoStyle: {
    width: "30%",
    height: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "40%",
    },
  },
  // Hide mobile dropdown
  mobileHideStyle: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  // Show mobile dropdown
  mobileShowStyle: {
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  drawerTextStyle: {
    textAlign: "center",
    fontFamily: `"Ramabhadra",sans-serif`,
  },
  toolbar: theme.mixins.toolbar,
}));
