import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { useStyles } from "../styling/faq";
import { withStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grow from "@material-ui/core/Grow";
import Decoration from "../../assets/other-decoration.svg";

class Faq extends React.Component {
  state = {
    message: null,
    error: false,
    loading: false,
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.faqContainerStyle}>
        <Grid className={classes.containerStyle} container spacing={4}>
          <Grow in={true} timeout={800}>
            <Grid item sm={12} md={12}>
              <Typography className={classes.headerStyle} variant="h1">
                FAQ
              </Typography>
            </Grid>
          </Grow>
          <Grow in={true} timeout={800}>
            <Grid item sm={12} md={6}>
              <Accordion className={classes.accordianStyle}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.baseTextStyle}>
                    Question 1
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className={classes.baseTextStyle}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grow>
          <Grow in={true} timeout={800}>
            <Grid item sm={12} md={6}>
              <Accordion className={classes.accordianStyle}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography className={classes.baseTextStyle}>
                    Question 2
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className={classes.baseTextStyle}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grow>
          <Grow in={true} timeout={1600}>
            <Grid item sm={12} md={6}>
              <Accordion className={classes.accordianStyle}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.baseTextStyle}>
                    Question 3
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className={classes.baseTextStyle}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grow>
          <Grow in={true} timeout={1600}>
            <Grid item sm={12} md={6}>
              <Accordion className={classes.accordianStyle}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography className={classes.baseTextStyle}>
                    Question 4
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className={classes.baseTextStyle}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grow>
        </Grid>
        <img
          className={classes.decorationStyle}
          src={Decoration}
          alt="dash_decoration"
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    loading: state.auth.loading,
    error: state.auth.error,
  };
};

export default connect(mapStateToProps)(withStyles(useStyles)(Faq));
