import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import TopLine from './Layout/TopLine';
import NavigationLine from './Layout/NavigationLine';
import Copyright from './Layout/Copyright';
import SignIn from './Auth/SignIn';
import SignUp from './Auth/SignUp';
import Box from '@material-ui/core/Box';

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
            <Box mt={8}>
              <Copyright />
            </Box>
          </Container>
      </React.Fragment>
    );
  }
}

export default App;