import React from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import CustomizedSnackbarContent from './CustomizedSnackbarContent';

/**
 * Tweaks to support closing of snackbar via buttons and use customized content look.
 */
class CustomizedSnackbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: true
    };

    this.onClose = this.onClose.bind(this);
  }

  /**
   * Hides a snackbar
   */
  onClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({
      isOpen: false
    })
  };

  render() {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={this.state.isOpen}
        autoHideDuration={6000}
        onClose={this.close}
      >
        <CustomizedSnackbarContent
          onClose={this.onClose}
          variant="success"
          message={this.props.message}
        />
      </Snackbar>
    );
  }
}

export default CustomizedSnackbar;