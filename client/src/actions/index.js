import axios from "axios";
import { FETCH_USER, FETCH_SURVEYS } from "./types";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/cu");

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const payCharge = token => async dispatch => {
  const res = await axios.post("/api/stripe", token);

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (survey, history) => async dispatch => {
  const res = await axios.post("/api/surveys", survey);

  // after the request is ocmplete route the user to /surveys
  history.push("/surveys");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const getSurveys = () => async dispatch => {
  const surveys = await axios.get("/api/surveys");

  dispatch({ type: FETCH_SURVEYS, payload: surveys.data });
};
