import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import TopLine from './TopLine';
import NavigationLine from './NavigationLine';

import { Router } from "@reach/router"

const Component = (props) => (
  <div>
    <h1>{props.title}</h1>
    Page content.
  </div>
)

const routing = [
    <Component title="Landing page" key="landing" path="/" />,
    <Component title="One more page" key="one-more" path="/one-more" />
]

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
          <TopLine />
          <NavigationLine routing={routing} />
          <Container maxWidth="xl">
            <Router>
              {routing}
            </Router>
          </Container>
      </React.Fragment>
    );
  }
}

export default App;