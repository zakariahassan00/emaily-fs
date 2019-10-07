import React from "react";
import { Link } from "react-router-dom";
import SurveysList from "./surveys/SurveysList";

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <SurveysList />
      <div className="fixed-action-btn">
        <Link to="/surveys/new" className="btn-floating btn-large red">
          <i className="material-icons">add</i>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
