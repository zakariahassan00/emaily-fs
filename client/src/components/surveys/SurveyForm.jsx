import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";
import validateEmails from "../../utils/validateEmails";
import formFields from "./formFields";

class SurveyForm extends Component {
  state = {};

  onSubmit(values) {
    this.props.next();
  }

  renderFields() {
    return _.map(formFields, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={SurveyField}
          type="text"
          name={name}
          label={label}
        />
      );
    });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <h3>SurveyForm</h3>
        <form onSubmit={handleSubmit(values => this.onSubmit(values))}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat left white-text">
            Cancel
          </Link>
          <button className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const error = {};

  error.recipients = validateEmails(values.recipients || "");

  _.each(formFields, ({ name }) => {
    if (!values[name]) {
      return (error[name] = "You Must Provide a Value!");
    }
  });

  return error;
}

export default reduxForm({
  validate,
  form: "surveyForm",
  destroyOnUnmount: false
})(SurveyForm);
