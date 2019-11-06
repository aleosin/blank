import React from 'react';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from '@reach/router';
import { Formik, Field, Form } from 'formik';
import { TextField } from 'formik-material-ui';
import actions from '../../Redux/Actions';
import * as Yup from 'yup';

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

const ResetSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required')
});

function ForgotPassword(props) {
  const classes = useStyles();

  const handleSubmit = (values, { errors, touched, setSubmitting, setErrors }) => {
    // todo: move to store?
    setSubmitting(false);

    props.resetPassword(values, setErrors);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Receive reset link
        </Typography>
        <Formik
          initialValues={{ email: '' }}
          validationSchema={ResetSchema}
          onSubmit={handleSubmit}
        >
        {({ errors, touched, isSubmitting }) => (
          <Form className={classes.form} noValidate>
            <Field
              component={TextField}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Send
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/sign-in" variant="body2">
                  Return to Sign In
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

export default connect(null, {
  resetPassword: actions.resetPassword
})(ForgotPassword);