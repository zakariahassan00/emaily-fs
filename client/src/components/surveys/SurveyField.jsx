import React from "react";

const style = {
  formField: {
    margin: "10px 0",
    textAlign: "left"
  },
  input: {
    marginBottm: "5px",
    height: "2rem"
  },
  inputError: {
    marginBottm: "20px"
  }
};

const SurveyField = ({ input, label, meta, meta: { touched, error } }) => {
  return (
    <div style={style.formField}>
      <label>{label}</label>
      <input {...input} style={style.input} />

      <div className="red-text" style={style.input}>
        {/* ES6 syntax means if touched is True return error! */}
        {touched && error}
      </div>
    </div>
  );
};

export default SurveyField;
