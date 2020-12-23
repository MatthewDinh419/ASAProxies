import React from "react";
import { useStyles } from "../styling/dashstyle";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Button, Card, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import * as actions from "../store/actions/plan";
import { connect } from "react-redux";
import DiscordLogo from "../../assets/Discord-Logo-Color.svg";
import DashDecoration from "../../assets/dash-decoration.svg";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import Grow from "@material-ui/core/Grow";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

class Dashboard extends React.Component {
  // Constructor will load in user plan
  state = {
    proxies: "",
    region: "",
    static: "",
    progress: 1,
    alert: false,
    error: false,
    message: null,
  };
  constructor(props) {
    super(props);
    props.checkPlan();
  }
  handleSubmit = (event) => {
    event.preventDefault();
    if (
      event.target.elements.static_select.value === "" ||
      event.target.elements.pool_select.value === "" ||
      event.target.elements.count_select.value === ""
    ) {
      this.setState({
        message: "Some values are missing...",
        alert: true,
        error: true,
      });
    }
    if (event.target.elements.count_select.value >= 2000) {
      this.setState({
        message: "Proxy count too high. Limit is 2000",
        alert: true,
        error: true,
      });
    }
    axios
      .post(
        "http://127.0.0.1:8000/api/create-proxies/",
        {
          sticky:
            event.target.elements.static_select.value === "static"
              ? "True"
              : "False",
          pool: event.target.elements.pool_select.value,
          count: event.target.elements.count_select.value,
        },
        { headers: { Authorization: `Token ${localStorage.getItem("token")}` } }
      )
      .then((res) => {
        let proxies = res.data.proxies;
        var proxies_str = "";
        proxies.forEach((proxy) => {
          proxies_str = proxies_str + proxy + "\n";
        });
        this.setState({ proxies: proxies_str });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    const { classes } = this.props;
    // Snackbar Functions
    function Alert(props) {
      return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    const handleClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      this.setState({ alert: false });
    };
    const handleCopyClick = () => {
      this.setState({
        message: "Copied to clipboard",
        alert: true,
        error: false,
      });
    };
    // Other Functions
    function CopyFunc(this_obj) {
      navigator.clipboard.writeText(this_obj.state.proxies);
      handleCopyClick();
    }
    function ExportFunc(this_obj) {
      var element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," +
          encodeURIComponent(this_obj.state.proxies)
      );
      element.setAttribute("download", "proxies");

      element.style.display = "none";
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    }

    return (
      <div className={classes.dashContainerStyle}>
        {this.props.loading ? (
          <div className={classes.dashContainerStyle}>
            <CircularProgress size={75}></CircularProgress>
          </div>
        ) : (
          <Grid container spacing={1}>
            {/* Progress */}
            <Grow in={true} timeout={900}>
              <Grid item sm={12} md={6}>
                <Card className={classes.cardStyle}>
                  <Grid
                    className={classes.progressContainerStyle}
                    container
                    spacing={5}
                  >
                    <Grid item md={12}>
                      <Typography
                        className={classes.baseTextStyle}
                        variant="h1"
                      >
                        Welcome Back
                      </Typography>
                    </Grid>
                    <Grid item md={12}>
                      <Box position="relative">
                        <CircularProgress
                          className={classes.trackBarStyle}
                          variant="determinate"
                          size={150}
                          thickness={3}
                          value={100}
                        />
                        <CircularProgress
                          className={classes.activeBarStyle}
                          variant="static"
                          size={150}
                          thickness={3}
                          value={
                            (this.props.gb_used / this.props.gb_total) * 100
                          }
                        />
                        <Box
                          top={0}
                          left={0}
                          bottom={0}
                          right={0}
                          position="absolute"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Typography
                            className={` ${classes.baseTextStyle} ${classes.statusTextStyle}`}
                            variant="subtitle1"
                          >
                            {this.props.gb_used} / {this.props.gb_total} GB
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    {/* <Grid item md={12}>
                      <Typography
                        className={` ${classes.baseTextStyle} ${classes.statusTextStyle}`}
                        variant="subtitle1"
                      >
                        2 / 5 GB
                      </Typography>
                    </Grid> */}
                  </Grid>
                </Card>
              </Grid>
              {/* Settings */}
            </Grow>
            <Grow in={true} timeout={900}>
              <Grid item sm={12} md={6}>
                <Card className={classes.cardStyle}>
                  <form onSubmit={this.handleSubmit}>
                    <Grid direction={"column"} container spacing={3}>
                      {/* Static Rotating */}
                      <Grid item md={12}>
                        <FormControl className={classes.selectStyle}>
                          <InputLabel id="static-select">
                            Static/Rotating
                          </InputLabel>
                          <Select
                            className={classes.selectStyle}
                            name="static_select"
                            labelId="static-select"
                            id="static_select"
                            value={this.state.static}
                            onChange={(e) =>
                              this.setState({ static: e.target.value })
                            }
                            MenuProps={{
                              anchorOrigin: {
                                vertical: "bottom",
                                horizontal: "left",
                              },
                              transformOrigin: {
                                vertical: "top",
                                horizontal: "left",
                              },
                              getContentAnchorEl: null,
                            }}
                          >
                            <MenuItem value={"static"}>Static</MenuItem>
                            <MenuItem value={"rotating"}>Rotating</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      {/* Pool */}
                      <Grid item md={12}>
                        <FormControl className={classes.selectStyle}>
                          <InputLabel id="region-select">Pool</InputLabel>
                          <Select
                            name="pool_select"
                            labelId="pool-select"
                            id="pool-select"
                            value={this.state.region}
                            onChange={(e) =>
                              this.setState({ region: e.target.value })
                            }
                            MenuProps={{
                              anchorOrigin: {
                                vertical: "bottom",
                                horizontal: "left",
                              },
                              transformOrigin: {
                                vertical: "top",
                                horizontal: "left",
                              },
                              getContentAnchorEl: null,
                            }}
                          >
                            <MenuItem value={"USA"}>United States</MenuItem>
                            <MenuItem value={"Canada"}>Canada</MenuItem>
                            <MenuItem value={"GB"}>Great Britain</MenuItem>
                            <MenuItem value={"Germany"}>Germany</MenuItem>
                            <MenuItem value={"France"}>France</MenuItem>
                            <MenuItem value={"Spain"}>Spain</MenuItem>
                            <MenuItem value={"Italy"}>Italy</MenuItem>
                            <MenuItem value={"Sweden"}>Sweden</MenuItem>
                            <MenuItem value={"Greece"}>Greece</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      {/* Slider */}
                      <Grid item md={12}>
                        <TextField
                          name="count_select"
                          id="standard-number"
                          label="Count"
                          type="number"
                          inputProps={{
                            min: 0,
                            style: { textAlign: "center" },
                          }}
                        />
                      </Grid>
                      {/* Generate */}
                      <Grid item md={12}>
                        <Button
                          type="submit"
                          className={`${classes.buttonStyle} ${classes.generateButtonStyle}`}
                        >
                          Generate
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Card>
              </Grid>
            </Grow>
            {/* Proxies */}
            <Grow in={true} timeout={1400}>
              <Grid item sm={12} md={12}>
                <Card className={classes.cardStyle}>
                  <Grid container spacing={3}>
                    <Grid item md={12}>
                      <TextField
                        className={classes.textboxStyle}
                        id="outlined-multiline-static"
                        label="Proxies"
                        multiline
                        rows={5}
                        defaultValue={this.state.proxies}
                        name="proxies"
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid className={classes.copyGridStyle} item md={6}>
                      <Button
                        onClick={() => {
                          CopyFunc(this);
                        }}
                        className={classes.buttonStyle}
                      >
                        Copy
                      </Button>
                    </Grid>
                    <Grid className={classes.exportGridStyle} item md={6}>
                      <Button
                        onClick={() => {
                          ExportFunc(this);
                        }}
                        className={classes.buttonStyle}
                      >
                        Export
                      </Button>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grow>
          </Grid>
        )}
        <Snackbar
          open={this.state.alert}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={this.state.error ? "error" : "success"}
          >
            {this.state.message}
          </Alert>
        </Snackbar>
        <img
          className={classes.discordLogoStyle}
          onClick={() => {
            window.open("https://discord.gg/Wr5Fv7xpSc", "_blank");
          }}
          src={DiscordLogo}
          alt="discord_logo"
        />
        <img
          className={classes.decorationStyle}
          src={DashDecoration}
          alt="dash_decoration"
        />
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
