import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "../../actions";
import _ from "lodash";
import formFields from "./formFields";

const style = {
  textAlign: "left"
};

const SurveyFormReview = ({ back, formValues, submitSurvey, history }) => {
  const renderFormReviewFields = () => {
    return _.map(formFields, ({ label, name }) => {
      return (
        <div key={name}>
          <label>{label}</label>
          <div>{formValues[name]}</div>
        </div>
      );
    });
  };

  return (
    <div>
      <h5>Please Double Check Your Entries!</h5>
      <div style={style}>
        {renderFormReviewFields()}
        <button
          className="yellow white-text darken-3 btn-flat left"
          onClick={back}
        >
          Back
        </button>
        <button
          className="green white-text btn-flat right"
          onClick={() => submitSurvey(formValues, history)}
        >
          Submit
          <i className="material-icons right">email</i>
        </button>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return { formValues: state.form.surveyForm.values };
}

export default connect(
  mapStateToProps,
  actions
)(withRouter(SurveyFormReview));
