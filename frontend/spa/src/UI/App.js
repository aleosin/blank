import React from 'react';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import WaitForLoading from './Layout/WaitForLoading';
import TopLine from './Layout/TopLine';
import NavigationLine from './Layout/NavigationLine';
import Copyright from './Layout/Copyright';
import CustomizedSnackbar from './Layout/Snackbar/CustomizedSnackbar';
import SignIn from './Auth/SignIn';
import SignUp from './Auth/SignUp';
import ForgotPassword from './Auth/ForgotPassword';
import { Router, Redirect } from '@reach/router';
import actions from '../Redux/Actions';

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

class App extends React.Component {
  constructor(props) {
    super(props)

    this.props.requestAppData()
  }

  render() {
    const NonAuthenticated = [
      <SignIn key="sign-in" path="/sign-in" />,
      <SignUp key="sign-up" path="/sign-up" />,
      <ForgotPassword key="forgot-password" path="/forgot-password" />
    ]

    const Authenticated = [

    ]

    const routing = [
      ...(!this.props.user ? NonAuthenticated : []),
      ...(this.props.user ? Authenticated : []),
      ...navigation,
      <Redirect key="default" from="*" to="/" default noThrow />
    ]

    return (
      <React.Fragment>
        <CssBaseline />
        {this.props.isAppDataLoaded && (
          <React.Fragment>
            <TopLine />
            <NavigationLine routing={navigation} />
            <Container maxWidth="xl">
              <Router>
                {routing}
              </Router>
              <Copyright />
            </Container>
            <CustomizedSnackbar />
          </React.Fragment>
        )}
        {!this.props.isAppDataLoaded && <WaitForLoading />}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAppDataLoaded: state.isAppDataLoaded,
    user: state.user
  };
};

export default connect(mapStateToProps, {
  requestAppData: actions.requestAppData
})(App);
