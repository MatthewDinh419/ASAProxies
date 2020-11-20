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
  // Component Styles
  cardStyle: {
    position: "relative",
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
    color: "#DAEEFD",
  },
  activeBarStyle: {
    color: "#0066FF",
  },
  selectStyle: {
    width: "50%",
  },
  sliderStyle: {
    marginTop: "5%",
  },
  textboxStyle: {
    width: "100%",
  },
  discordLogoStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    padding: "0rem 2rem 1rem 0rem",
    width: "6%",
    height: "auto",
    textAlign: "right",
    cursor: "pointer",
  },
  // Typography Style
  baseTextStyle: {
    fontSize: "30px",
    color: "black",
    fontFamily: `"PT Sans",sans-serif`,
    [theme.breakpoints.up("lg")]: {
      fontSize: "18px",
    },
  },
  statusTextStyle: {
    fontSize: "24px",
  },
});
