import React from "react";
import { useStyles } from "../styling/dashstyle";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Button, Card } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Slider from "@material-ui/core/Slider";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import * as actions from "../store/actions/plan";
import { connect } from "react-redux";

class Dashboard extends React.Component {
  // Constructor will load in user plan
  constructor(props) {
    super(props);
    props.checkPlan();
  }
  render() {
    // Alters the generate proxies slider
    const marks = [
      {
        value: 0,
        label: "0",
      },
      {
        value: 100,
        label: "100",
      },
    ];
    const { classes } = this.props;
    return (
      <div className={classes.rootStyle}>
        <Grid container spacing={2}>
          {/* Proxies box and copy button */}
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  className={classes.textboxStyle}
                  id="outlined-multiline-static"
                  label="Proxies"
                  multiline
                  rows={30}
                  defaultValue=""
                  name="proxies"
                  variant="outlined"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button className={classes.buttonStyle}>
                  Copy
                  <FileCopyIcon />
                </Button>
              </Grid>
            </Grid>
          </Grid>
          {/* Generate Proxies Box */}
          <Grid item xs={6}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card raised={true} className={classes.cardStyle}>
                  <h1 id="usage" className={classes.textStyle}>{this.props.gb_used} / {this.props.gb_total} GB</h1>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card raised={true} className={classes.optionsStyle}>
                  <div style={{ marginLeft: "20%", marginRight: "20%" }}>
                    <h1 className={classes.textStyle}>Generate Proxies</h1>
                    <Slider
                      defaultValue={30}
                      aria-labelledby="discrete-slider"
                      valueLabelDisplay="auto"
                      step={5}
                      marks={marks}
                      min={0}
                      max={100}
                    />
                    <div style={{ textAlign: "center" }}>
                      <Button className={classes.buttonStyle}>Generate</Button>
                    </div>
                  </div>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    gb_used: state.plan.gb_used,
    gb_total: state.plan.gb_total,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkPlan: () => dispatch(actions.planDetails()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(Dashboard));
