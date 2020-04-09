import React from 'react';
import './Login.css';
import { Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withRouter, Redirect } from "react-router-dom";
import * as FirebaseService from '../../service/firebase.service';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { redirectToReferrer: false };
    this.loginGoogle = this.loginGoogle.bind(this);
    this.loginFacebook = this.loginFacebook.bind(this);

  }

  async loginGoogle(event) {
    // TODO(jessi): set a loading state
    await FirebaseService.logUserInUser(/* isGoog= */ true).then(u => {
      this.props.completeLogin(u);
      this.props.history.push("/courseLibrary");
      this.setState({ redirectToReferrer: true });
    });
    // TODO(jessi): unset loading state
  }

  async loginFacebook(event) {
    // TODO(jessi): set a loading state
    await FirebaseService.logUserInUser(/* isGoog= */ false).then(u => {
      this.props.completeLogin(u);
      this.props.history.push("/courseLibrary");
      this.setState({ redirectToReferrer: true });
    });
    // TODO(jessi): unset loading state
  }

  render() {
    // Show loading screen while we load the user.
    if (this.props.loadingUser) {
      return (
        <div>
          Loading..
          <CircularProgress></CircularProgress>
        </div>
      )
    }

    // Redirect if logged in or complete login.
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state
    if (redirectToReferrer === true || this.props.user) {
      return <Redirect to={from} />
    }


    // TODO(jessi): style these buttons
    return (
      <div className="login">
        <h1>Sign into Mooc in a Box</h1>
        <Button color="inherit" className="menu-button" onClick={this.loginFacebook}>
          Sign in with Facebook
      </Button>
        <Button color="inherit" className="menu-button" onClick={this.loginGoogle}>
          Sign in with Google
      </Button>
      </div>
    );
  }
}

export default withRouter(LoginPage);
