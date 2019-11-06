import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  spinner: {
    textAlign: 'center',
    marginTop: '10%'
  }
}));


function WaitForLoading(props) {
  const classes = useStyles();

  return (
    <div className={classes.spinner}>
        <CircularProgress />
    </div>
  );
}

export default WaitForLoading;