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
import TwitterIcon from '@material-ui/icons/Twitter';
import DiscordLogo from '../../assets/Discord-Logo-Color.svg';

class Dashboard extends React.Component {
  // Constructor will load in user plan
  state = {
    proxies: "",
  }
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
    function CopyFunc(this_obj) {
      this_obj.setState({proxies: 
        `d1.x.h3x.me:17292:QmRHijCtGF7YHBD9zuWs:wxGwM6HYlokXxY2jnV0Zra7VbUbJsFD8Qtx0oONjlDNSkpRE4PkTEnVkG-cAVPOIbNpP
        d1.x.h3x.me:17424:QmRHijCtGF7YHBD9zuWs:wxGwM6HYlokXxY2jnV0Zra7VbUbJsFD8Qtx0oONjlDNSkpRE4PkTEnVkG-xRneAnHrSu
        d1.x.h3x.me:17905:QmRHijCtGF7YHBD9zuWs:wxGwM6HYlokXxY2jnV0Zra7VbUbJsFD8Qtx0oONjlDNSkpRE4PkTEnVkG-rByC3pkYw8
        d1.x.h3x.me:18433:QmRHijCtGF7YHBD9zuWs:wxGwM6HYlokXxY2jnV0Zra7VbUbJsFD8Qtx0oONjlDNSkpRE4PkTEnVkG-Pl7wxpl7h8`})
      navigator.clipboard.writeText(this_obj.state.proxies)
    }
    function ExportFunc(this_obj) {
      var element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(this_obj.state.proxies));
      element.setAttribute('download', "proxies");

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    }
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
                  defaultValue={this.state.proxies}
                  name="proxies"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                    style: { color: "red", fontWeight: "bold" }
                  }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button onClick={() => {CopyFunc(this)}} className={classes.buttonStyle} style={{marginRight: "3%", marginLeft: "2%"}}>
                  Copy
                  <FileCopyIcon />
                </Button>
                <Button onClick={() => {ExportFunc(this)}} className={classes.buttonStyle} style={{marginLeft: "3%"}}>
                  Export
                  <FileCopyIcon />
                </Button>
              </Grid>
            </Grid>
          </Grid>
          {/* Generate Proxies Box */}
          <Grid item xs={6}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <Card raised={true} className={classes.cardStyle}>
                  <h1 id="usage" className={classes.textStyle}>{this.props.gb_used} / {this.props.gb_total} GB</h1>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card raised={true} className={classes.cardStyle}>
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
              <Grid item xs={12}>
                <Card raised={true} className={classes.cardStyle}>
                  <div style={{textAlign: "center"}}>
                    <TwitterIcon onClick={() => {window.open('https://twitter.com/asaproxies', '_blank')}} target="_blank" style={{color: "#00acee", fontSize: "60px", marginRight: "1%", cursor: "pointer", marginBottom: "-1.2%"}}/>
                    <img src={DiscordLogo} onClick={() => {window.open('https://discord.gg/bZV4j7', '_blank')}} alt="discord_logo" style={{width: "58.77px", height: "60px", marginLeft: "1%", cursor: "pointer", marginBottom: "-1.2%"}} />
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
