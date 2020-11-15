import React, { Component } from "react";
import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/dashboard";
import PlansPage from "./components/PlansPage";
import { Error } from "./components/Error";
import HomePage from "./components/homepage";
import PasswordResetEmail from "./components/PasswordResetEmail";
import PasswordReset from "./components/PasswordReset";
import PaymentHistory from "./components/PaymentHistory";
import PasswordResetConfirm from "./components/PasswordResetConfirm";
import Nav from "./nav";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions/auth";
import Checkout from "./components/Checkout";
import Toolbar from "@material-ui/core/Toolbar";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  render() {
    return (
      <Router>
        <div>
          <Nav {...this.props}></Nav>
          <Switch>
            <Route exact path="/" component={HomePage}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/signup" component={Signup}></Route>
            <Route path="/plans" component={PlansPage}></Route>
            <Route path="/checkout" component={Checkout}></Route>
            <Route path="/dashboard" component={Dashboard}></Route>
            <Route path="/password-reset" component={PasswordReset}></Route>
            <Route
              path="/password-confirm"
              component={PasswordResetEmail}
            ></Route>
            <Route
              path="/password-change"
              component={PasswordResetConfirm}
            ></Route>
            <Route path="/payment-history" component={PaymentHistory}></Route>
            <Route component={Error}></Route>
          </Switch>
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
