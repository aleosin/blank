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

    this.props.onClose();
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
        onClose={this.onClose}
      >
        <CustomizedSnackbarContent
          key = {this.props.snackbar.message}
          variant={this.props.snackbar.variant}
          message={this.props.snackbar.message}
          onClose={this.onClose}
        />
      </Snackbar>
    );
  }
}

export default CustomizedSnackbar;