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

const Component = (props) => (
  <div>
    <h1>{props.title}</h1>
    Page content.
  </div>
)

const navigation = [
  <Component title="Landing page" key="landing" path="/" />,
  <Component title="One more page" key="one-more" path="/one-more" />
]

const routing = [
  <SignIn key="sign-in" path="/sign-in" />,
  <SignUp key="sign-up" path="/sign-up" />,
  <ForgotPassword key="forgot-password" path="/forgot-password" />,
    ...navigation
]

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
          <TopLine />
          <NavigationLine routing={navigation} />
          <Container maxWidth="xl">
            <Router>
              {routing}
            </Router>
            <Copyright />
          </Container>
      </React.Fragment>
    );
  }
}

export default App;