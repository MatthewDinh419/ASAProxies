export const useStyles = (theme) => ({
  // Container, div styles
  plansContainerStyle: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    height: "100vh",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      padding: "8rem 0rem 6rem 0rem",
    },
  },
  gridContainerStyle: {
    textAlign: "center",
  },
  gridItemsStyle: {
    alignItems: "center",
    textAlign: "right",
  },

  decorationDivStyle: {
    position: "absolute",
    bottom: 0,
  },
  // Components Style
  cardStyle: {
    position: "relative",
    backgroundColor: "#52AAFF",
    borderRadius: 25,
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
    [theme.breakpoints.between("md", "lg")]: {
      width: "70%",
    },
    [theme.breakpoints.between("lg", "xl")]: {
      width: "60%",
    },
    [theme.breakpoints.up("xl")]: {
      width: "50%",
    },
  },
  featuresCardStyle: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#DAEEFD",
    borderRadius: "32px",
    padding: "1rem 1rem 1rem 1rem",
    width: "20rem",
    textAlign: "left",
  },
  featureIconsStyle: {
    fontSize: "35px",
    verticalAlign: "middle",
    [theme.breakpoints.down("sm")]: {
      fontSize: "30px",
    },
  },
  paddingDivStyle: {
    padding: "1.5rem 1.5rem 1.5rem 1.5rem",
  },
  FeaturesDivStyle: {
    [theme.breakpoints.down("sm")]: {
      borderBottom: ".2rem solid #DAEEFD",
    },
    [theme.breakpoints.between("md", "xl")]: {
      borderRight: ".2rem solid #DAEEFD",
    },
  },
  homeIconStyle: {
    fontSize: "100px",
    padding: "1.5rem 0rem 1.5rem 0rem",
  },
  sliderStyle: {
    padding: "0rem 2rem 0rem 2rem",
  },
  buttonStyle: {
    backgroundColor: "#4ef594",
    fontFamily: `"Ramabhadra",sans-serif`,
    "&:hover": {
      background: "#8cffa2",
    },
    width: "10rem",
    height: "3rem",
    borderRadius: "10px",
  },
  decorationStyle: {
    height: "auto",
    width: "100vw",
  },
  // Typography Style
  headerStyle: {
    color: "black",
    fontFamily: `"Ramabhadra",sans-serif`,
    [theme.breakpoints.down("sm")]: {
      fontSize: "8vw",
    },
    [theme.breakpoints.between("md", "lg")]: {
      fontSize: "2.5vw",
    },
    [theme.breakpoints.up("xl")]: {
      fontSize: "2vw",
    },
  },
  featuresTextStyle: {
    fontSize: "16px",
    color: "black",
    fontFamily: `"PT Sans",sans-serif`,
    [theme.breakpoints.up("lg")]: {
      fontSize: "18px",
    },
  },
  agreementTextStyle: {
    textAlign: "center",
    marginTop: "7%",
    marginBottom: "5%",
    fontSize: "14px",
    [theme.breakpoints.up("lg")]: {
      marginTop: "10%",
    },
  },
  errorTextStyle: {
    fontSize: "16px",
    color: "red",
  },
});
