export const useStyles = (theme) => ({
  // Container, div styles
  plansContainerStyle: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
  },
  gridContainerStyle: {
    textAlign: "center",
  },
  gridItemsStyle: {
    alignItems: "center",
    textAlign: "right",
  },
  buttonGridStyle: {
    padding: "2rem 0rem 0rem 0rem",
  },
  // Components Style
  cardStyle: {
    position: "relative",
    backgroundColor: "#52AAFF",
    borderRadius: 25,
    width: "60%",
    [theme.breakpoints.down("md")]: {
      width: "90%",
      marginTop: "40%",
    },
    [theme.breakpoints.between("md", "lg")]: {
      width: "70%",
      marginTop: "20%",
    },
    [theme.breakpoints.between("lg", "xl")]: {
      width: "70%",
      marginTop: "0%",
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
  FeaturesDivStyle: {
    padding: "1rem 1rem 1rem 1rem",
    [theme.breakpoints.down("sm")]: {
      borderBottom: ".2rem solid #DAEEFD",
    },
    [theme.breakpoints.between("md", "lg")]: {
      borderRight: ".2rem solid #DAEEFD",
    },
  },
  ResiDivStyle: {
    padding: "1rem 1rem 1rem 1rem",
  },
  homeIconStyle: {
    fontSize: "100px",
    padding: "3rem 0rem 2rem 0rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "80px",
    },
  },
  sliderStyle: {
    padding: "0rem 2rem 0rem 2rem",
  },
  buttonStyle: {
    fontSize: "1rem",
    backgroundColor: "#7EFF8B",
    fontFamily: `"Ramabhadra",sans-serif`,
    "&:hover": {
      background: "#a5d0fa",
    },
    width: "10rem",
    height: "3rem",
    borderRadius: "10px",
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
    [theme.breakpoints.between("lg", "xl")]: {
      fontSize: "5vw",
    },
    [theme.breakpoints.up("xl")]: {
      fontSize: "4.3vw",
    },
  },
  featuresTextStyle: {
    fontSize: "18px",
    color: "black",
    fontFamily: `"PT Sans",sans-serif`,
    [theme.breakpoints.down("sm")]: {
      fontSize: "16px",
    },
  },
});
