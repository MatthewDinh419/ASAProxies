export const useStyles = (theme) => ({
  // Div, container styles
  loginContainerStyle: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    height: "100vh",
    alignItems: "center",
  },
  // Component Styles
  buttonStyle: {
    color: "black",
    backgroundColor: "#4ef594",
    marginTop: "5%",
    marginBottom: "5%",
    fontFamily: `"Source Sans Pro",sans-serif`,
    "&:hover": {
      background: "#8cffa2",
    },
    width: "25%",
  },
  cardStyle: {
    zIndex: 2,
    backgroundColor: "#52AAFF",
    borderRadius: 25,
    padding: ".5rem .5rem .5rem .5rem",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
    [theme.breakpoints.between("md", "lg")]: {
      width: "50%",
    },
    [theme.breakpoints.between("lg", "xl")]: {
      width: "40%",
    },
    [theme.breakpoints.up("xl")]: {
      width: "30%",
    },
  },
  headerStyle: {
    fontSize: "25px",
    fontFamily: `"Ramabhadra",sans-serif`,
  },
  decorationStyle: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "auto",
  },
  // Typography Styling
  baseTextStyle: {
    fontSize: "16px",
    color: "black",
    fontFamily: `"PT Sans",sans-serif`,
    [theme.breakpoints.up("lg")]: {
      fontSize: "18px",
    },
  },
  hyperlinkTextStyle: {
    fontSize: "16px",
    color: "blue",
    fontWeight: "bold",
    textDecoration: "none",
  },
  errorTextStyle: {
    color: "red",
  },
});
