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
        <Grid className={classes.containerStyle} container spacing={6}>
          <Grow in={true} timeout={800}>
            <Grid item sm={12} md={12}>
              <Typography className={classes.headerStyle} variant="h1">
                Frequently Asked Questions
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
                    Do plans expire?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className={classes.baseTextStyle}>
                    Plans do not expire. Plans will only end when your usage
                    goes above your traffic limit.
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
                    Do new plans stack with previously purchased plans?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className={classes.baseTextStyle}>
                    Yes, new plans will stack with previously purchased plans.
                    For example, if you bought a 5GB resi plan and purchased
                    another 2GB resi plan, then they would stack with each other
                    to bring your total to 7GB.
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
                    Why did my plan reset to 0/0 gb?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className={classes.baseTextStyle}>
                    When you use up your entire plan, the plan is reset and will
                    appear as 0/0 gb on the dashboard.
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
                    Is there a discord for Asaproxies?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className={classes.baseTextStyle}>
                    Yes! You can find the discord invite on the bottom right
                    corner of the dashboard.
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
