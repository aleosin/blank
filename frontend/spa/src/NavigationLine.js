import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';

import Typography from '@material-ui/core/Typography';
import { Link } from '@reach/router';

const styles = theme => ({
  toolbarSecondary: {
    marginLeft: -theme.spacing(1),
    '& hr': {
      height: theme.spacing(3),
      margin: theme.spacing(0, 0.5),
    }
  },
  toolbarLink: {
    textDecoration: 'none',
    "&:hover": {
      textDecoration: 'underline',
    },
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  }
});

class NavigationLine extends React.Component {
  render() {
    const classes = this.props.classes;

    return (
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
      {this.props.routing.map((component, index) => (
        <React.Fragment key={component.key}>
          {index > 0 && <Divider orientation="vertical" />}
          <Link
            to={component.props.path}
            className={classes.toolbarLink}
          >
            <Typography
              color="primary"
              variant="button"
              noWrap
            >
              {component.props.title}
            </Typography>
          </Link>
        </React.Fragment>
      ))}
      </Toolbar>
    );
  }
}

export default withStyles(styles)(NavigationLine);