export const useStyles = (theme) => ({
  // Div, container styles
  faqContainerStyle: {
    display: "flex",
    textAlign: "center",
    height: "70vh",
    alignItems: "center",
    overflowY: "hidden",
    overflowX: "hidden",
  },
  containerStyle: {
    zIndex: 2,
    padding: "0rem 5rem 0rem 5rem",
    [theme.breakpoints.up("xl")]: {
      padding: "0rem 15rem 0rem 15rem",
    },
  },
  // Component Styles
  accordianStyle: {
    backgroundColor: "#52AAFF",
  },
  decorationStyle: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "auto",
  },
  // Typography Styles
  headerStyle: {
    fontSize: "40px",
    fontFamily: `"Hind",sans-serif`,
  },
  baseTextStyle: {
    fontSize: "16px",
    color: "black",
    fontFamily: `"PT Sans",sans-serif`,
    [theme.breakpoints.up("lg")]: {
      fontSize: "18px",
    },
  },
});
