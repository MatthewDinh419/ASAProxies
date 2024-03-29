import React, { Component } from "react";
import "./App.css";
import Login from "./components/Login";
import Dashboard from "./components/dashboard";
import PlansPage from "./components/PlansPage";
import { Error } from "./components/Error";
import HomePage from "./components/homepage";
import PasswordResetEmail from "./components/PasswordResetEmail";
import PasswordReset from "./components/PasswordReset";
import TermsofService from "./components/TermsofService";
import ResendConfirmation from "./components/ResendConfirmation";
import ConfirmEmail from "./components/ConfirmEmail";
import Success from "./components/success";
import PaymentHistory from "./components/PaymentHistory";
import Faq from "./components/Faq";
import PasswordResetConfirm from "./components/PasswordResetConfirm";
import Nav from "./nav";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions/auth";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#C7E3FF",
    },
    secondary: {
      main: "#000000",
    },
  },
});

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  render() {
    return (
      <Router>
        <div>
          <MuiThemeProvider theme={theme}>
            <Nav {...this.props}></Nav>
            <Switch>
              <Route exact path="/" component={HomePage}></Route>
              <Route path="/login" component={Login}></Route>
              <Route path="/plans" component={PlansPage}></Route>
              <Route path="/dashboard" component={Dashboard}></Route>
              <Route path="/tos" component={TermsofService}></Route>
              <Route path="/password-reset" component={PasswordReset}></Route>
              <Route path="/faq" component={Faq}></Route>
              {/* Page to resend email confirmation */}
              <Route
                path="/resend-confirmation"
                component={ResendConfirmation}
              ></Route>
              <Route path="/confirm-email" component={ConfirmEmail}></Route>
              <Route
                path="/password-confirm"
                component={PasswordResetEmail}
              ></Route>
              {/* what the user is redirected to after clicking link in reset email */}
              <Route
                path="/password-change"
                component={PasswordResetConfirm}
              ></Route>
              <Route path="/payment-history" component={PaymentHistory}></Route>
              <Route path="/success" component={Success}></Route>
              <Route component={Error}></Route>
            </Switch>
          </MuiThemeProvider>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
