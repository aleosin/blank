import React from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import CustomizedSnackbarContent from './CustomizedSnackbarContent';

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
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={true}
        autoHideDuration={3000}
        onClose={this.onClose}
      >
        <CustomizedSnackbarContent
          key={this.props.snackbar.message}
          variant={this.props.snackbar.variant}
          message={this.props.snackbar.message}
          onClose={this.onClose}
        />
      </Snackbar>
    );
  }
}

export default CustomizedSnackbar;