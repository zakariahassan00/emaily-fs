import React, { Component } from "react";
import { connect } from "react-redux";
import { getSurveys } from "../../actions/";

class SurveysList extends Component {
  componentDidMount() {
    // when the component loads up make an http request to grap all surveys
    this.props.getSurveys();
  }

  renderSurveys() {
    const { surveys } = this.props;
    return surveys.reverse().map(survey => {
      return (
        <div className="card darken-5" key={survey._id}>
          <div className="card-content">
            <span className="card-title">{survey.title}</span>
            <p>{survey.body}</p>
            <div className="right">
              Sent On: {new Date(survey.dateSent).toLocaleDateString()}
            </div>
          </div>
          <div className="card-action">
            <a>Yes: {survey.yes}</a>
            <a>no: {survey.no}</a>
          </div>
        </div>
      );
    });
  }

  render() {
    return <div className="surveys-list">{this.renderSurveys()}</div>;
  }
}

function mapStateToProps({ surveys }) {
  return { surveys };
}

export default connect(
  mapStateToProps,
  { getSurveys }
)(SurveysList);
