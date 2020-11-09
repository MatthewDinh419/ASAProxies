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
      marginLeft: "40%",
    },
    [theme.breakpoints.down("xs")]: {
      marginLeft: "26%",
      marginTop: "20%", // without "ASAPROXIES" is connected to nav
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
  featuresCardContainer: {
    textAlign: "center",
  },
  iconGridStyle: {
    padding: "1rem 5rem 1rem 5rem",
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
  },
  lbRectangleStyle: {
    position: "absolute",
    background: "#C7E3FF",
    marginTop: "-.05%",
    height: "80%",
    width: "100%",
  },
  dbRectangleStyle: {
    background: "#52AAFF",
    marginTop: "2%",
    marginBottom: "2%",
    height: "90%",
    width: "100%",
  },
  cardStyle: {
    backgroundColor: "#2e2b40",
    width: "20%",
    margin: "auto",
    borderRadius: 25,
  },
  iconStyle: {
    fontSize: "4.5vw",
    [theme.breakpoints.down("sm")]: {
      fontSize: "4.86vw",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "5.04vw",
    },
  },
  // Typography Styling
  headerStyle: {
    fontSize: "4.5vw",
    color: "black",
    fontFamily: `"Ramabhadra",sans-serif`,
    [theme.breakpoints.down("sm")]: {
      fontSize: "7.25vw",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "10vw",
    },
  },
  subStyle: {
    color: "black",
    fontSize: "1.5vw",
    display: "inline-block",
    fontFamily: `"PT Sans",sans-serif`,
    [theme.breakpoints.down("sm")]: {
      fontSize: "2.48vw",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "3.26vw",
    },
  },
  subRedStyle: {
    color: "red",
  },
  subGreenStyle: {
    color: "green",
  },
  featuresHeaderStyle: {
    fontSize: "3.5vw",
    [theme.breakpoints.down("sm")]: {
      fontSize: "5.63vw",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "7.77vw",
    },
    marginTop: "7%",
    marginBottom: "5%",
  },
  iconSubtitleStyle: {
    fontWeight: "bold",
  },
  bodyStyle: {
    fontSize: "1vw",
    [theme.breakpoints.down("md")]: {
      fontSize: "1.5vw",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "2vw",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "2.5vw",
    },
  },
});
