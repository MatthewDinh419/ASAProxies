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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress';

class Dashboard extends React.Component {
  // Constructor will load in user plan
  state = {
    proxies: "",
    region: "",
  }
  constructor(props) {
    super(props);
    props.checkPlan();
  }
  handleSubmit = (event) => {
    event.preventDefault();
    console.log("hello");
    if(event.target.elements.region.value === "") {
      event.target.elements.region.value = "USA";
    }
    axios.post('http://127.0.0.1:8000/api/create-proxies/', {"region": event.target.elements.region.value, "count": event.target.elements.count.value} ,{headers: {Authorization: `Token ${localStorage.getItem("token")}`}})
    .then(res => {  
      let proxies = res.data.proxies
      var proxies_str = ""
      proxies.forEach(proxy => {
        proxies_str = proxies_str + proxy + "\n";
      })
      this.setState({proxies: proxies_str});
    })
    .catch(err => {
      console.log(err);
    })
  };
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
        {
          this.props.loading ?
         ( <div style={{textAlign: "center", marginTop: "25%", marginBottom: "25%"}}>
            <CircularProgress size={75}></CircularProgress>
          </div>)
          :
          (<Grid container spacing={2}>
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
                      
                      <div style={{ textAlign: "center" }}>
                        <form onSubmit={this.handleSubmit}>
                        <Slider
                          name="count"
                          defaultValue={30}
                          aria-labelledby="discrete-slider"
                          valueLabelDisplay="auto"
                          step={5}
                          marks={marks}
                          min={0}
                          max={100}
                        />
                        <FormControl className={classes.formControl} style={{width: "50%"}}>
                          <InputLabel id="demo-simple-select-label">Region</InputLabel>
                          <Select
                            name="region"
                            id="region-select"
                            value={this.state.region}
                            onChange={e => this.setState({region: e.target.value})}
                            MenuProps={{
                              anchorOrigin: {
                                vertical: "bottom",
                                horizontal: "left"
                              },
                              transformOrigin: {
                                vertical: "top",
                                horizontal: "left"
                              },
                              getContentAnchorEl: null
                            }}
                          >
                            <MenuItem value={'USA'}>United States</MenuItem>
                            <MenuItem value={'Canada'}>Canada</MenuItem>
                            <MenuItem value={'GB'}>Great Britain</MenuItem>
                            <MenuItem value={"Germany"}>Germany</MenuItem>
                            <MenuItem value={"France"}>France</MenuItem>
                            <MenuItem value={"Spain"}>Spain</MenuItem>
                            <MenuItem value={'Italy'}>Italy</MenuItem>
                            <MenuItem value={'Sweden'}>Sweden</MenuItem>
                            <MenuItem value={"Greece"}>Greece</MenuItem>
                          </Select>
                        </FormControl>
                        <Button type="submit" style={{marginLeft: "10%"}} className={classes.buttonStyle}>Generate</Button>
                        </form>
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
          </Grid>)
        }
        
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.plan.loading,
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
