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
    padding: "0.5rem 3rem 0.5rem 3rem",
  },
  supportedSitesContainer: {
    position: "relative",
    marginTop: "5%",
    textAlign: "center",
  },
  supportedCardContainer: {
    position: "absolute",
    marginTop: "7%",
    marginLeft: "30%",
  },
  supportedContainer: {
    position: "relative",
    height: "83vh",
  },
  aboutContainer: {
    position: "relative",
    marginTop: "5%",
    backgroundColor: "#EFF5FA",
    textAlign: "center",
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
    // display: "inline-block",
    position: "relative",
    background: "#C7E3FF",
    marginTop: "-.05%",
    padding: "1rem 0rem 1rem 0rem",
  },
  dbRectangleStyle: {
    background: "#52AAFF",
    marginTop: "2%",
    marginBottom: "2%",
    padding: "10rem 10rem 10rem 10rem",
  },
  cardStyle: {
    position: "relative",
    backgroundColor: "#52AAFF",
    borderRadius: 25,
    width: "60%",
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
  homepageBlockStyle: {
    position: "absolute",
    right: 0,
  },
  homepageBlockStyle2: {
    position: "absolute",
    marginTop: "32%",
    transform: "rotate(180deg)",
    [theme.breakpoints.down("md")]: {
      marginTop: "37%",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "60%",
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: "122%", // without "ASAPROXIES" is connected to nav
    },
  },
  storeLogoStyle: {
    width: "50%",
    height: "50%",
  },
  yeezyLogoStyle: {
    width: "50%",
    height: "auto",
    padding: "0rem 1rem 1.5rem 1rem",
  },
  bottomHeaderStyle: {
    textAlign: "left",
    marginTop: "2%",
    marginBottom: "2%",
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
    },
  },
  line1Style: {
    borderBottom: ".5rem solid #52AAFF",
    width: "10%",
    marginTop: "1%",
    [theme.breakpoints.down("xs")]: {
      marginLeft: "45%",
    },
  },
  endItemsStyle: {
    marginTop: "5%",
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
    fontSize: "2.5vw",
    [theme.breakpoints.down("md")]: {
      fontSize: "4.2vw",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "5.63vw",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "7.77vw",
    },
    marginBottom: "10%",
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
