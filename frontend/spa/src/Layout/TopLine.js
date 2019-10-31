import React from 'react';
import { withStyles, fade } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import AppBar from '@material-ui/core/AppBar';
import InputBase from '@material-ui/core/InputBase';
import MeetingRoomTwoToneIcon from '@material-ui/icons/MeetingRoomTwoTone';
import { navigate } from "@reach/router"
import axios from 'axios';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  loginButton: {
    marginLeft: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
    marginRight: theme.spacing(1),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  }
});

class TopLine extends React.Component {

  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
  }

  signOut() {
    axios
      .post("/auth/logout/")
      .then(res => this.props.onSignedOut(res))
      .catch(err => console.log(err));
  }

  render() {
    const classes = this.props.classes;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title} noWrap>
              Blank application
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
            {!this.props.user && <Button color="inherit" className={classes.loginButton} onClick={()=>navigate('/sign-in')}>
              <MeetingRoomTwoToneIcon />
              Sign In
            </Button>}

            {this.props.user && <Button color="inherit" className={classes.loginButton} onClick={this.signOut}>
              <MeetingRoomTwoToneIcon />
              Sign Out
            </Button>}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(TopLine);