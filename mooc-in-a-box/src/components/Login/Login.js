import React from 'react';
import './Login.css';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { withRouter } from "react-router-dom";
import * as FirebaseService from '../../service/firebase.service';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: undefined };
    this.loginGoogle = this.loginGoogle.bind(this);
    this.loginFacebook = this.loginFacebook.bind(this);

  }

  async loginGoogle(event) {
    // TODO(jessi): set a loading state
    await FirebaseService.logUserInUser(/* isGoog= */ true).then(u => {
      this.props.completeLogin(u);
      this.props.history.push("/myCourses");
    });
    // TODO(jessi): unset loading state
  }

  async loginFacebook(event) {
    // TODO(jessi): set a loading state
    await FirebaseService.logUserInUser(/* isGoog= */ false).then(u => {
      this.props.completeLogin(u);
      this.props.history.push("/myCourses");
    });
    // TODO(jessi): unset loading state
  }

  render() {
    // TODO(jessi): style these buttons, remove this page from nav
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
