export const useStyles = (theme) => ({
  // Div, Container styles
  containerStyle: {
    marginTop: "10%",
    display: "inline-block",
  },
  headerDivStyle: {
    marginLeft: "50%",
    [theme.breakpoints.down("md")]: {
      marginLeft: "45%",
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: "25%",
    },
    [theme.breakpoints.down("xs")]: {
      marginLeft: "5%",
    },
  },
  cloudDivStyle: {
    position: "relative",
    height: "45.5vh",
  },
  subContainer: {
    textAlign: "center",
  },
  plansButtonContainer: {
    marginTop: "10%",
  },
  // Components Styling
  buttonStyle: {
    fontSize: "1rem",
    backgroundColor: "#6bb6ff",
    fontFamily: `"Ramabhadra",sans-serif`,
    "&:hover": {
      background: "#a5d0fa",
    },
    width: "10rem",
    height: "3.5rem",
    borderRadius: "10px",
  },
  cloudStyle: {
    position: "relative",
  },
  lightCloudStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: "60%",
  },
  darkCloudStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: "40%",
  },
  networkStyle: {
    position: "absolute",
    right: 0,
    bottom: "-45%",
    width: "100%",
    // transform: "rotate(71.12deg)",
  },
  // Typography Styling
  headerStyle: {
    fontSize: "4.5rem",
    color: "black",
    fontFamily: `"Ramabhadra",sans-serif`,
  },
  subStyle: {
    color: "black",
    fontSize: "1.75rem",
    display: "inline-block",
    fontFamily: `"PT Sans",sans-serif`,
  },
  subRedStyle: {
    color: "red",
  },
  subGreenStyle: {
    color: "green",
  },
});
