import React, { useEffect } from 'react';

import { Box, CircularProgress } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Menu } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';

import { AllTodoLists } from 'components/AllTodoLists';
import { ErrorSnackbar } from 'components/ErrorSnackbar';
import { Login } from 'components/Login';
import { Page404 } from 'components/Page404';
import { initializeAppTC } from 'state/middlewares/app';
import { logoutTC } from 'state/middlewares/login';
import { getAppInitializationState, getAppStatus, getAuthState } from 'state/selectors';
import { ComponentReturnType } from 'types/ComponentReturnType';

type AppPropsType = {
  demo?: boolean;
};

export const App = ({ demo = false }: AppPropsType): ComponentReturnType => {
  // console.log('app was called');
  const appStatus = useSelector(getAppStatus);
  const appIsInitialized = useSelector(getAppInitializationState);
  const userIsLoggedIn = useSelector(getAuthState);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAppTC());
  }, []);

  if (!appIsInitialized) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  const handleLogout = (): void => {
    dispatch(logoutTC());
    navigate('/login');
  };

  const showProgressBar = appStatus === 'loading';

  return (
    <div>
      <ErrorSnackbar />
      <AppBar position="static">
        {/* <Toolbar style={{ justifyContent: 'space-between' }}> */}
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">Todolist</Typography>
          {userIsLoggedIn && (
            <Button
              color="inherit"
              variant="outlined"
              onClick={handleLogout}
              style={{ marginLeft: '50px' }}
            >
              Log out
            </Button>
          )}
        </Toolbar>
        {showProgressBar && <LinearProgress color="secondary" />}
      </AppBar>
      <Container fixed>
        <Routes>
          <Route path="/it-inc-todolist-ts" element={<AllTodoLists demo={demo} />} />
          <Route path="/" element={<AllTodoLists demo={demo} />} />
          <Route path="/login" element={<Login />} />
          <Route path="404" element={<Page404 />} />
          <Route path="*" element={<Navigate to="404" />} />
        </Routes>
      </Container>
    </div>
  );
};
