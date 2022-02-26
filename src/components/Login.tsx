import React, { useState } from 'react';

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
import { Navigate } from 'react-router-dom';

import { loginTC } from 'state/middlewares/login';
import { getAuthState } from 'state/selectors';
import { useAppSelector } from 'state/store';
import { ComponentReturnType } from 'types/ComponentReturnType';

export const Login = (): ComponentReturnType => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const userIsLoggedIn = useAppSelector(getAuthState);
  const dispatch = useDispatch();

  const MIN_PASSWORD_LENGTH = 4;

  const formik = useFormik({
    validate: (values) => {
      if (!values.email) {
        return { email: 'email required' };
      }
      if (values.password.length < MIN_PASSWORD_LENGTH) {
        return { password: 'password is too short' };
      }
      if (!values.password) {
        return { password: 'password required' };
      }
    },
    initialValues: {
      email: 'free@samuraijs.com',
      password: 'free',
      rememberMe: false,
      // showPassword: false,
    },
    onSubmit: values => {
      dispatch(loginTC(values));
    },
  });

  const handlePasswordVisibilityChange = (): void => {
    setShowPassword(!showPassword);
  };

  if (userIsLoggedIn) {
    return <Navigate replace to="/" />;
  }

  return (
    <Grid container justify="center">
      <Grid item xs={4}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel
              style={{ marginTop: '20vh', minWidth: '300px', textAlign: 'center' }}
            >
              <p>
                sign up on <a href="https://social-network.samuraijs.com/">samuraiJS</a>
              </p>
              <p>or use the default credentials</p>
            </FormLabel>
            <FormGroup>
              <TextField
                label="Email"
                name="email"
                margin="normal"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.errors.email}
              />
              <TextField
                label="Password"
                name="password"
                margin="normal"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                type={showPassword ? '' : 'password'}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.errors.password}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="rememberMe"
                    onChange={formik.handleChange}
                    checked={formik.values.rememberMe}
                  />
                }
                label="remember me"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={showPassword}
                    onChange={handlePasswordVisibilityChange}
                  />
                }
                label="show password"
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
