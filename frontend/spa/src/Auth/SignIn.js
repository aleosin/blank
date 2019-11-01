import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link, navigate } from '@reach/router';
import axios from 'axios';
import { Formik, Field, Form } from 'formik';
import { TextField } from 'formik-material-ui';


const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn(props) {
  const classes = useStyles();

  const handleSubmit = (values, { setSubmitting }) => {
    if (!values.username || !values.password) {
      props.onSignInEmpty();
      return;
    }

    axios
      .post("/auth/login/", values)
      .then(res => axios.get('/auth/user/'))
      .then(res => props.onSigned(res, true))
      .then(() => navigate('/'))
      .finally(function () {
        setSubmitting(false);
      })
      .catch(err => {
        if (err.response.status === 400) {
          props.onSignInFailed();
        }
        else {
          props.onSignInError();
        }
      });
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <Formik
          initialValues={{ username: '', password: '' }}
          onSubmit={handleSubmit}
        >
        {({ isSubmitting }) => (
          <Form className={classes.form} noValidate>
            <Field
              component={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
              id="username"
              label="User Name"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <Field
              component={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              type="submit"
              disabled={isSubmitting}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/forgot-password" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/sign-up" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Form>
        )}
        </Formik>
      </div>
    </Container>
  );
}