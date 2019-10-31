import React from 'react';
import CustomizedSnackbar from './CustomizedSnackbar';

/**
 * Component to show information messages set to the user.
 */
class SnackbarsQueue extends React.Component {
  render() {
    return (
      <React.Fragment>
      {this.props.queue.map(item => (
        <CustomizedSnackbar
          key = {item.message}
          variant={item.variant}
          message={item.message}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          autoHideDuration={6000}
        />
      ))}
      </React.Fragment>
    );
  }
}

export default SnackbarsQueue;