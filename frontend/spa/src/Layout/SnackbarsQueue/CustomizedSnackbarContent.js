import React from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';

import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import { amber, green } from '@material-ui/core/colors';

const styles = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};


/**
 * Snackbar content look customization.
 */
class CustomizedSnackbarContent extends React.Component {
  render() {
    const Icon = variantIcon[this.props.variant];
    const classes = this.props.classes;

    return (
      <SnackbarContent
        className={clsx(classes[this.props.variant], this.props.className)}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
            <Icon className={clsx(classes.icon, classes.iconVariant)} />
            {this.props.message}
          </span>
        }
        action={[
          <IconButton key="close" aria-label="close" color="inherit" onClick={this.props.onClose}>
            <CloseIcon className={classes.icon} />
          </IconButton>
        ]}
      />
    );
  }
}

export default withStyles(styles)(CustomizedSnackbarContent);