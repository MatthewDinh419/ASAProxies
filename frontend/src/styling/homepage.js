export const useStyles = (theme) => ({
  // Div, Container styles
  containerStyle: {
    marginTop: "10%",
    display: "inline-block",
  },
  headerDivStyle: {
    marginLeft: "50%",
    [theme.breakpoints.down("md")]: {
      marginLeft: "26%",
      marginTop: "50%",
    },
    [theme.breakpoints.between("md", "lg")]: {
      marginTop: "25%",
      marginLeft: "26%",
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
  supportedCardContainer: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
  },
  supportedContainer: {
    overflowX: "hidden",
    overflowY: "hidden",
    position: "relative",
    height: "83vh",
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
  },
  aboutContainer: {
    position: "relative",
    backgroundColor: "#EFF5FA",
    textAlign: "center",
  },
  // Components Styling
  buttonStyle: {
    zIndex: 1,
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
    position: "absolute",
  },
  lightCloudStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: "55%",
    [theme.breakpoints.up("xl")]: {
      width: "50%",
    },
  },
  darkCloudStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: "35%",
    [theme.breakpoints.up("xl")]: {
      width: "30%",
    },
  },
  networkStyle: {
    position: "absolute",
    right: 0,
    bottom: 0,
    opacity: "50%",
    width: "100%",
    // bottom: "-70%",
    // width: "100%",
    // [theme.breakpoints.down("sm")]: {
    //   bottom: "-10%",
    // },
    // [theme.breakpoints.between("md", "lg")]: {
    //   bottom: "-50%",
    // },
    // [theme.breakpoints.between("lg", "xl")]: {
    //   bottom: "-70%",
    // },
  },
  lbRectangleStyle: {
    position: "relative",
    background: "#C7E3FF",
    marginTop: "-.05%",
    padding: "1rem 0rem 1rem 0rem",
    [theme.breakpoints.down("md")]: {
      marginTop: "-.1%",
    },
  },
  dbRectangleStyle: {
    background: "#52AAFF",
    marginTop: "1%",
    marginBottom: "1%",
    padding: "8rem 20rem 10rem 20rem",
    [theme.breakpoints.down("md")]: {
      padding: "8rem 5rem 8rem 5rem",
    },
    [theme.breakpoints.between("lg", "xl")]: {
      padding: "8rem 10rem 10rem 10rem",
    },
    [theme.breakpoints.up("xl")]: {
      padding: "8rem 20rem 10rem 20rem",
    },
  },
  cardStyle: {
    backgroundColor: "#52AAFF",
    borderRadius: 25,
    width: "60%",
    padding: "1rem 1rem 1rem 1rem",
    [theme.breakpoints.between("lg", "xl")]: {
      width: "40%",
    },
  },
  iconStyle: {
    fontSize: "45px",
  },
  homepageBlockStyle: {
    textAlign: "right",
  },
  homepageBlockStyle2: {
    textAlign: "left",
  },
  storeLogoStyle: {
    width: "40%",
    height: "50%",
    webkitFilter: "grayscale(100%)",
    filter: "grayscale(100%)",
    "&:hover": {
      filter: "none",
      webkitFilter: "none",
    },
    [theme.breakpoints.down("xs")]: {
      width: "60%",
      height: "60%",
    },
    [theme.breakpoints.down("md")]: {
      width: "70%",
      height: "70%",
    },
    [theme.breakpoints.between("lg", "xl")]: {
      width: "60%",
      height: "60%",
    },
  },
  footlockerStyle: {
    width: "70%",
    height: "60%",
    [theme.breakpoints.down("md")]: {
      width: "80%",
      height: "60%",
      marginTop: "10%",
    },
  },
  yeezyLogoStyle: {
    width: "50%",
    height: "auto",
    padding: "0rem 1rem 1.5rem 1rem",
    [theme.breakpoints.down("md")]: {
      width: "70%",
    },
  },
  bottomHeaderStyle: {
    textAlign: "left",
    marginTop: "2%",
    marginBottom: "2%",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
  line1Style: {
    borderBottom: ".5rem solid #52AAFF",
    width: "10%",
    marginTop: "1%",
    [theme.breakpoints.down("xs")]: {
      marginLeft: "45%",
      borderBottom: ".3rem solid #52AAFF",
    },
    [theme.breakpoints.between("md", "lg")]: {
      width: "15%",
    },
  },
  endItemsStyle: {
    marginTop: "5%",
    [theme.breakpoints.between("md", "lg")]: {
      marginTop: "10%",
    },
  },
  // Typography Styling
  headerStyle: {
    color: "black",
    fontFamily: `"Ramabhadra",sans-serif`,
    [theme.breakpoints.down("sm")]: {
      fontSize: "7.25vw",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "10vw",
    },
    [theme.breakpoints.between("md", "lg")]: {
      fontSize: "6vw",
    },
    [theme.breakpoints.between("lg", "xl")]: {
      fontSize: "5vw",
    },
    [theme.breakpoints.up("xl")]: {
      fontSize: "4.3vw",
    },
  },
  subStyle: {
    color: "black",
    fontSize: "1.5vw",
    display: "inline-block",
    fontFamily: `"PT Sans",sans-serif`,
    [theme.breakpoints.down("md")]: {
      fontSize: "4vw",
    },
    [theme.breakpoints.between("md", "lg")]: {
      fontSize: "2.2vw",
    },
    [theme.breakpoints.between("lg", "xl")]: {
      fontSize: "2vw",
    },
    [theme.breakpoints.up("xl")]: {
      fontSize: "1.6vw",
    },
  },
  bottomItemsHeader: {
    fontSize: "22px",
  },
  subRedStyle: {
    color: "red",
  },
  subGreenStyle: {
    color: "green",
  },
  featuresHeaderStyle: {
    fontSize: "50px",
    marginBottom: "7%",
  },
  supportedSitesFont: {
    fontSize: "40px",
    marginTop: "4%",
    marginBottom: "6%",
  },
  iconSubtitleStyle: {
    fontWeight: "bold",
    fontSize: "24px",
  },
  bodyStyle: {
    fontSize: "17px",
  },
  hyperlinkStyle: {
    marginTop: "5%",
    [theme.breakpoints.between("md", "lg")]: {
      marginTop: "10%",
    },
    cursor: "pointer",
  },
});
