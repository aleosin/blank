import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import TopLine from './Layout/TopLine';
import NavigationLine from './Layout/NavigationLine';
import Copyright from './Layout/Copyright';
import SignIn from './Auth/SignIn';
import SignUp from './Auth/SignUp';
import ForgotPassword from './Auth/ForgotPassword';
import { Router } from "@reach/router"
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const Component = (props) => (
  <div>
    <h1>{props.title}</h1>
    Page content.
  </div>
)

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: null
    }

    this.onSigned = this.onSigned.bind(this)
    this.onSignedOut = this.onSignedOut.bind(this)

    this.navigation = [
      <Component title="Landing page" key="landing" path="/" />,
      <Component title="One more page" key="one-more" path="/one-more" />
    ]

    this.routing = [
      <SignIn key="sign-in" path="/sign-in" onSigned={this.onSigned} />,
      <SignUp key="sign-up" path="/sign-up" />,
      <ForgotPassword key="forgot-password" path="/forgot-password" />,
        ...this.navigation
    ]

    axios
      .get('/auth/user/')
      .then(this.onSigned)
      .catch(err => console.log(err));
  }

  onSigned(res) {
    this.setState({ user: res.data })
  }

  onSignedOut(res) {
    console.log(res);
    this.setState({ user: null })
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
          <TopLine user={this.state.user} onSignedOut={this.onSignedOut} />
          <NavigationLine routing={this.navigation} />
          <Container maxWidth="xl">
            <Router>
              {this.routing}
            </Router>
            <Copyright />
          </Container>
      </React.Fragment>
    );
  }
}

export default App;