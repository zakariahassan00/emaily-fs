import React, { Component } from "react";
import StripeChekout from "react-stripe-checkout";
import { connect } from "react-redux";
import * as actions from "../actions";

class Payments extends Component {
  render() {
    return (
      <StripeChekout
        name="Emaily"
        description="5$ for 5 email credit"
        amount={723}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
        token={token => this.props.payCharge(token)}
      >
        <button className="btn green">Add Credits</button>
      </StripeChekout>
    );
  }
}

export default connect(
  null,
  actions
)(Payments);
