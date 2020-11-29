export const useStyles = (theme) => ({
  // Container, Div Styles
  dashContainerStyle: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    height: "100vh",
    alignItems: "center",
    padding: "0rem 5rem 0rem 5rem",
    [theme.breakpoints.down("sm")]: {
      padding: "15rem 5rem 0rem 5rem",
    },
    [theme.breakpoints.between("lg", "xl")]: {
      padding: "0rem 20rem 0rem 20rem",
    },
    [theme.breakpoints.up("xl")]: {
      padding: "0rem 25rem 0rem 25rem",
    },
  },
  copyGridStyle: {
    textAlign: "right",
  },
  exportGridStyle: {
    textAlign: "left",
  },
  discordGridStyle: {
    textAlign: "right",
  },
  decorationStyle: {
    zIndex: -1,
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "0%",
    },
  },
  // Component Styles
  cardStyle: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    backgroundColor: "#52AAFF",
    borderRadius: 25,
    padding: "1rem 1rem 1rem 1rem",
    height: "90%",
  },
  buttonStyle: {
    color: "black",
    backgroundColor: "#4ef594",
    fontFamily: `"Source Sans Pro",sans-serif`,
    "&:hover": {
      background: "#8cffa2",
    },
    width: "25%",
  },
  trackBarStyle: {
    position: "absolute",
    color: "#408edb",
    opacity: "70%",
  },
  activeBarStyle: {
    color: "#C7E3FF",
  },
  selectStyle: {
    minWidth: 180,
  },
  textboxStyle: {
    width: "100%",
  },
  discordLogoStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    padding: "0rem .5rem .5rem 0rem",
    width: "3%",
    height: "auto",
    textAlign: "right",
    cursor: "pointer",
    opacity: "60%",
    [theme.breakpoints.down("md")]: {
      width: "15%",
    },
    [theme.breakpoints.between("md", "lg")]: {
      width: "3.5%",
    },
  },
  // Typography Style
  baseTextStyle: {
    fontSize: "30px",
    color: "black",
    fontFamily: `"PT Sans",sans-serif`,
  },
  statusTextStyle: {
    fontSize: "24px",
  },
});
