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
  iconGridStyle: {
    padding: "0.5rem 3rem 0.5rem 3rem",
    [theme.breakpoints.between("md", "xl")]: {
      padding: "0rem 0rem .5rem 0rem",
    },
  },
  featuresTileStyle: {
    "&:hover": {
      background: "#C7E3FF",
      borderRadius: "10px",
    },
  },
  supportedSitesContainer: {
    position: "relative",
    textAlign: "center",
  },
  supportedCardContainer: {
    position: "absolute",
    marginTop: "8%",
    marginLeft: "30%",
    [theme.breakpoints.down("md")]: {
      marginTop: "10%",
      marginLeft: "9.5%",
    },
    [theme.breakpoints.between("md", "lg")]: {
      marginTop: "0%",
      marginLeft: "25%",
    },
    [theme.breakpoints.between("lg", "xl")]: {
      marginTop: "9%",
      marginLeft: "25%",
    },
  },
  supportedContainer: {
    marginTop: "5%",
    position: "relative",
    height: "83vh",
  },
  aboutContainer: {
    position: "relative",
    backgroundColor: "#EFF5FA",
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      marginTop: "5%",
    },
    [theme.breakpoints.between("md", "lg")]: {
      marginTop: "10%",
    },
    [theme.breakpoints.between("lg", "xl")]: {
      marginTop: "5%",
    },
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
    position: "relative",
  },
  lightCloudStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: "55%",
  },
  darkCloudStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: "35%",
  },
  networkStyle: {
    position: "absolute",
    right: 0,
    bottom: "-70%",
    width: "100%",
    [theme.breakpoints.down("md")]: {
      bottom: "-10%",
    },
    [theme.breakpoints.between("md", "lg")]: {
      bottom: "-50%",
    },
    [theme.breakpoints.between("lg", "xl")]: {
      bottom: "-70%",
    },
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
    marginTop: "2%",
    marginBottom: "2%",
    padding: "8rem 10rem 10rem 10rem",
    [theme.breakpoints.down("md")]: {
      padding: "8rem 5rem 8rem 5rem",
    },
  },
  cardStyle: {
    position: "relative",
    backgroundColor: "#52AAFF",
    borderRadius: 25,
    width: "60%",
    [theme.breakpoints.down("md")]: {
      width: "90%",
      marginTop: "40%",
      paddingBottom: "1rem",
    },
    [theme.breakpoints.between("md", "lg")]: {
      width: "70%",
      marginTop: "20%",
    },
    [theme.breakpoints.between("lg", "xl")]: {
      width: "70%",
      paddingBottom: "1.5rem",
      marginTop: "0%",
    },
  },
  iconStyle: {
    fontSize: "4vw",
    [theme.breakpoints.down("sm")]: {
      fontSize: "4.86vw",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "8vw",
      marginTop: "10%",
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
      marginTop: "165%",
    },
    [theme.breakpoints.between("md", "lg")]: {
      marginTop: "56%",
    },
    [theme.breakpoints.between("lg", "xl")]: {
      marginTop: "42%",
    },
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
    [theme.breakpoints.between("md", "lg")]: {
      fontSize: "2.5vw",
      marginLeft: "-1.5%",
    },
    [theme.breakpoints.between("lg", "xl")]: {
      fontSize: "2vw",
      marginLeft: "-1.5%",
    },
    [theme.breakpoints.up("xl")]: {
      fontSize: "1.5vw",
      marginLeft: "-1.5%",
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
    marginBottom: "7%",
    [theme.breakpoints.down("md")]: {
      fontSize: "8vw",
    },
    [theme.breakpoints.between("md", "lg")]: {
      fontSize: "4.5vw",
    },
    [theme.breakpoints.between("lg", "xl")]: {
      fontSize: "3.5vw",
    },
    [theme.breakpoints.up("xl")]: {
      fontSize: "3vw",
    },
  },
  supportedSitesFont: {
    fontSize: "2.5vw",
    marginBottom: "7%",
    [theme.breakpoints.down("md")]: {
      marginTop: "7%",
      fontSize: "6vw",
    },
    [theme.breakpoints.between("md", "lg")]: {
      fontSize: "3.5vw",
      marginTop: "4%",
    },
    [theme.breakpoints.between("lg", "xl")]: {
      fontSize: "3.5vw",
      marginTop: "4%",
    },
    [theme.breakpoints.up("xl")]: {
      fontSize: "3vw",
      marginTop: "4%",
    },
  },
  iconSubtitleStyle: {
    fontWeight: "bold",
    [theme.breakpoints.down("md")]: {
      fontSize: "5vw",
    },
    [theme.breakpoints.between("md", "lg")]: {
      fontSize: "2vw",
      marginTop: "4%",
    },
    [theme.breakpoints.between("lg", "xl")]: {
      fontSize: "1.7vw",
    },
    [theme.breakpoints.up("xl")]: {
      fontSize: "1.5vw",
    },
  },
  bodyStyle: {
    fontSize: "1vw",
    [theme.breakpoints.down("md")]: {
      fontSize: "4vw",
    },
    [theme.breakpoints.between("md", "lg")]: {
      fontSize: "1.5vw",
    },
    [theme.breakpoints.between("lg", "xl")]: {
      fontSize: "1.3vw",
    },
    [theme.breakpoints.up("xl")]: {
      fontSize: "1.1vw",
    },
  },
});
