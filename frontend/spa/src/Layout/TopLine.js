import React from 'react';
import { withStyles, fade } from '@material-ui/core/styles';
import { navigate } from "@reach/router"
import axios from 'axios';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import MeetingRoomTwoToneIcon from '@material-ui/icons/MeetingRoomTwoTone';



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

    this.state = {
      anchorEl: null,
      isMenuOpen: false
    }

    this.menuId = 'primary-search-account-menu';

    this.signOut = this.signOut.bind(this);
    this.openProfileMenu = this.openProfileMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  /**
   * Needed here to remove link to menu anchor DOM element and prevent issues.
   */
  componentWillUnmount() {
    this.closeMenu();
  }

  /**
   * Signs user out.
   *
   * Also removes link to menu anchor DOM element.
   */
  signOut() {
    this.closeMenu();

    axios
      .post("/auth/logout/")
      .then(res => this.props.onSignedOut(res))
      .catch(err => console.log(err));
  }

  /**
   * Opens profile menu on the right.
   */
  openProfileMenu(event) {
    this.setState({
      anchorEl: event.currentTarget,
      isMenuOpen: true
    });
  }

  /**
   * Closes menu.
   */
  closeMenu() {
    this.setState({
      anchorEl: null,
      isMenuOpen: false
    });
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

            {
              this.props.user && 
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={this.menuId}
                aria-haspopup="true"
                onClick={this.openProfileMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            }
          </Toolbar>
        </AppBar>
        {
          this.props.user &&
          <Menu
            anchorEl={this.state.anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={this.menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={this.state.isMenuOpen}
            onClose={this.closeMenu}
          >
            <MenuItem onClick={this.closeMenu}>Profile ({ this.props.user.username })</MenuItem>
            <MenuItem onClick={this.closeMenu}>Settings</MenuItem>
            <Divider />
            <MenuItem onClick={this.signOut}>Sign out</MenuItem>
          </Menu>
        }
      </div>
    );
  }
}

export default withStyles(styles)(TopLine);