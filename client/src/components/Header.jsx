import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Payments from "./Payments";

class Header extends Component {
  renderButton() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a className="waves-effect waves-light btn" href="/auth/google">
              Login With Google
            </a>
          </li>
        );
      default:
        return [
          <li key="0" style={{ margin: "0 15px" }}>
            Credits : {this.props.auth.credits}
          </li>,
          <li key="1">
            <Payments />
          </li>,
          <li key="2">
            <a className="teal waves-effect waves-light btn" href="/api/logout">
              Logout
            </a>
          </li>
        ];
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper blue">
          <Link to={this.props.auth ? "/surveys" : "/"} className="brand-logo">
            Emaily
          </Link>
          <ul className="right">{this.renderButton()}</ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
