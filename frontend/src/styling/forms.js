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
  labelStyle: {
    color: "black",
  },
  cardStyle: {
    zIndex: 2,
    backgroundColor: "#52AAFF",
    borderRadius: 25,
    padding: "1rem 1rem 1rem 1rem",
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
  successCardStyle: {
    position: "relative",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    height: "30%",
  },
  headerStyle: {
    fontSize: "20px",
    fontFamily: `"Ramabhadra",sans-serif`,
  },
  decorationStyle: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "auto",
  },
  toggleGroupStyle: {
    marginBottom: "5%",
    backgroundColor: "#C7E3FF",
  },
  checkmarkLogoStyle: {
    color: "green",
    fontSize: "60px",
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
  passEmailText: {
    padding: "0rem 5rem 0rem 5rem",
  },
  successTextStyle: {
    color: "#20f7b0",
  },
});
