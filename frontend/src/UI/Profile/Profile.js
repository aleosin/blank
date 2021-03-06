import React from 'react';
import { connect } from 'react-redux';

import {
  CssBaseline,
  Container,
  Typography,
  Grid,
  Avatar,
  Badge,
  Button,
  IconButton,
  CircularProgress,
  FormHelperText
} from '@material-ui/core';

import PersonIcon from '@material-ui/icons/Person';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

import { makeStyles } from '@material-ui/core/styles';

import { Link } from '@reach/router';
import { Formik, Field, Form } from 'formik';
import { TextField } from 'formik-material-ui';

import actions from '../../Redux/Actions';


const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    width: 80,
    height: 80
  },
  addPhotoBadge: {
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
    marginTop: -4,
    marginLeft: -4
  },
  addPhotoProgress: {
    position: 'absolute'
  },
  addPhotoIcon: {
    fontSize: 10
  },
  addPhotoButton: {
    padding: 3
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  inlineField: {
    paddingLeft: 4,
    paddingRight: 4
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


function Profile(props) {
  const classes = useStyles();

  const avatarInput = React.createRef();

  const handleSubmit = (values, { errors, touched, setSubmitting, setErrors }) => {
    // todo: move to store?
    setSubmitting(false);

    props.updateProfile(values);
  }

  const handleAvatarClick = () => {
    avatarInput.current.click();
  }

  const handleAvatarChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      props.updateAvatar(event.target.files[0]);
    }
  }

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="upload-avatar-field"
          type="file"
          ref={avatarInput} 
          onChange={handleAvatarChange}
          disabled={props.profile.isAvatarLoading}
        />
        <IconButton
          className={classes.addPhotoButton}
          aria-label="account of current user"
          aria-haspopup="true"
          color="inherit"
          onClick={handleAvatarClick}
          disabled={props.profile.isAvatarLoading}
        >
          <Badge
              overlap="circle"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              badgeContent={
                <Avatar className={classes.addPhotoBadge}>
                  <AddAPhotoIcon className={classes.addPhotoIcon} />
                </Avatar>
              }
            >
            <Avatar className={classes.avatar} src={props.user.avatar}>
              {!props.user.avatar &&
                <PersonIcon fontSize="large" />
              }
            </Avatar>
          </Badge>
          {props.profile.isAvatarLoading && <CircularProgress size={80} className={classes.addPhotoProgress} />}
        </IconButton>
        <Typography component="h1" variant="h5">
          Profile
        </Typography>
        <Formik
          initialValues={{first_name: props.user.first_name, last_name: props.user.last_name}}
          onSubmit={handleSubmit}
        >
        {({ errors, touched, isSubmitting }) => (
          <Form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Field
                  component=  {TextField}
                  autoComplete="fname"
                  name="first_name"
                  variant="outlined"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  component={TextField}
                  variant="outlined"
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="last_name"
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" display="inline">
                  User Name:
                </Typography>
                <Typography variant="body1" display="inline" className={classes.inlineField}>
                  {props.user.username}
                </Typography>
                <Link to="/profile/username" variant="body2">
                  Change
                </Link>
                <FormHelperText>Unique account name which will be displayed as <b>@{props.user.username}</b> near your records and posts.</FormHelperText>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" display="inline">
                  Email:
                </Typography>
                <Typography variant="body1" display="inline" className={classes.inlineField}>
                  {props.user.email}
                </Typography>
                <Link to="/profile/email" variant="body2">
                  Change
                </Link>
                <FormHelperText>Primary email address for signing in and resetting password.</FormHelperText>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={isSubmitting}
            >
              Save
            </Button>
          </Form>
        )}
        </Formik>
      </div>
    </Container>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user,
    profile: state.profile
  };
};

export default connect(mapStateToProps, {
  updateProfile: actions.updateProfile,
  updateAvatar: actions.updateAvatar,
})(Profile);