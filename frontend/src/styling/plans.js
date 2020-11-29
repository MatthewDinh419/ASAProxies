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
  planSecondaryStyle: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    height: "100%",
    alignItems: "center",
  },
  decorationDivStyle: {
    position: "absolute",
    bottom: 0,
  },
  itemDivStyle: {
    borderRadius: 10,
    backgroundColor: "#DAEEFD",
    padding: "1rem 0rem 1rem 0rem",
    marginTop: "20%",
    marginBottom: "20%",
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
    // backgroundColor: "#96cbff",
    padding: "1rem 1rem 1rem 1rem",
    width: "20rem",
    textAlign: "left",
  },
  featureIconsStyle: {
    fontSize: "35px",
    // verticalAlign: "middle",
    [theme.breakpoints.down("sm")]: {
      fontSize: "30px",
    },
  },
  paddingDivStyle: {
    padding: "1.5rem 1.5rem 1.5rem 1.5rem",
  },
  selectGridStyle: {
    textAlign: "center",
  },
  FeaturesDivStyle: {
    [theme.breakpoints.down("sm")]: {
      borderBottom: ".2rem solid #DAEEFD",
    },
    [theme.breakpoints.between("md", "xl")]: {
      borderRight: ".2rem solid #DAEEFD",
    },
  },
  buttonStyle: {
    backgroundColor: "#4ef594",
    fontFamily: `"Source Sans Pro",sans-serif`,
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
    fontFamily: `"Hind",sans-serif`,
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
  priceText: {
    // padding: "2rem 1rem 1rem 1rem",
    verticalAlign: "middle",
    color: "green",
    fontSize: "28px",
  },
  agreementTextStyle: {
    fontFamily: `"Hind",sans-serif`,
    textAlign: "center",
    marginTop: "7%",
    marginBottom: "5%",
    fontSize: "15px",
    [theme.breakpoints.up("lg")]: {
      marginTop: "10%",
    },
  },
  errorTextStyle: {
    fontSize: "16px",
    color: "red",
  },
  selectionTextStyle: {
    display: "inline-block",
    verticalAlign: "middle",
    fontSize: "21px",
  },
});
