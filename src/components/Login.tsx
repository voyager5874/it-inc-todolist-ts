import React from 'react';

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  TextField,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { authTC } from '../state/reducers/loginReducer';
import { useAppSelector } from '../state/store';

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn);

  const formik = useFormik({
    validate: values => {
      if (!values.email) {
        return { email: 'email required' };
      }
      if (!values.password) {
        return { password: 'password required' };
      }
    },
    initialValues: {
      email: 'free@samuraijs.com',
      password: 'free',
      rememberMe: false,
    },
    onSubmit: values => {
      dispatch(authTC(values));
    },
  });

  // if(isLoggedIn){
  //     navigate("/")
  // }

  return (
    <Grid container justify="center">
      <Grid item xs={4}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <p>
                sign up on <a href="https://social-network.samuraijs.com/">samuraiJS</a>
              </p>
              <p>or use the default credentials</p>
            </FormLabel>
            <FormGroup>
              <TextField
                label="Email"
                margin="normal"
                type="email"
                {...formik.getFieldProps('email')}
                error={Boolean(formik.errors.email)}
                helperText={formik.errors.email}
              />
              <TextField
                label="Password"
                margin="normal"
                type={formik.values.password ? 'password' : ''}
                {...formik.getFieldProps('password')}
                error={Boolean(formik.errors.password)}
                helperText={formik.errors.password}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    {...formik.getFieldProps('rememberMe')}
                    checked={formik.values.rememberMe}
                  />
                }
                label="remember me"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={Boolean(formik.errors.password) || Boolean(formik.errors.email)}
              >
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
};
