import React, { Component } from "react";
import { reduxForm } from "redux-form";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";

const style = {
  textAlign: "center"
};

class SurveyNew extends Component {
  state = {
    showSurveyFormReview: false
  };

  renderCreateSurvey() {
    if (this.state.showSurveyFormReview) {
      return (
        <SurveyFormReview
          back={() => this.setState({ showSurveyFormReview: false })}
        />
      );
    }

    return (
      <SurveyForm next={() => this.setState({ showSurveyFormReview: true })} />
    );
  }

  render() {
    return (
      <div style={style}>
        <h1>Create New Survey!</h1>
        {this.renderCreateSurvey()}
      </div>
    );
  }
}

export default reduxForm({
  form: "surveyForm"
})(SurveyNew);
