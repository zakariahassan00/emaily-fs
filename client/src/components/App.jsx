import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./Header";
import { connect } from "react-redux";
import * as actions from "../actions";
import Dashboard from "./Dashboard";
import Landing from "./Landing";
import SurveyNew from "./surveys/SurveyNew";

class App extends Component {
  componentDidMount() {
    // do initial ajax calls !!
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <Header />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/surveys/new" component={SurveyNew} />
            <Route path="/surveys" component={Dashboard} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(
  null,
  actions
)(App);
