import React from 'react';
import { connect } from "react-redux";
import Snackbar from '@material-ui/core/Snackbar';
import CustomizedSnackbarContent from './CustomizedSnackbarContent';
import actions from '../../../Redux/Actions';

/**
 * Tweaks to support closing of snackbar via buttons and use customized content look.
 */
class CustomizedSnackbar extends React.Component {
  constructor(props) {
    super(props);

    this.onClose = this.onClose.bind(this);
  }

  /**
   * Hides a snackbar
   */
  onClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    this.props.onClose();
  };

  render() {
    if (!this.props.snackbar) {
      return null;
    }

    const {message, variant} = this.props.snackbar;

    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={true}
        autoHideDuration={3000}
        onClose={this.onClose}
      >
        <CustomizedSnackbarContent
          key={message}
          variant={variant}
          message={message}
          onClose={this.onClose}
        />
      </Snackbar>
    );
  }
}


const mapStateToProps = state => {
  return {
    snackbar: state.snackbar,
  };
};

export default connect(mapStateToProps, {
  onClose: actions.hideSnackbar
})(CustomizedSnackbar);