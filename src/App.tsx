import React, { useEffect } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Menu } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { AllTodoLists } from './components/AllTodoLists';
import { ErrorSnackbar } from './components/ErrorSnackbar';
import { Login } from './components/Login';
import { fetchListsTC } from './state/reducers/listsActionsReducer';
import { getAppStatus } from './state/selectors';
import { ComponentReturnType } from './types/ComponentReturnType';

type AppPropsType = {
  demo?: boolean;
};

export const App = ({ demo = false }: AppPropsType): ComponentReturnType => {
  // console.log('app was called');
  const appStatus = useSelector(getAppStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (demo) return;
    dispatch(fetchListsTC());
  }, [dispatch, demo]);

  const showProgressBar = appStatus === 'loading';

  return (
    <div>
      <ErrorSnackbar />
      <AppBar position="static">
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">Todolists</Typography>
          <Button color="inherit" variant="outlined">
            Login
          </Button>
        </Toolbar>
        {showProgressBar && <LinearProgress color="secondary" />}
      </AppBar>
      <Container fixed>
        <Routes>
          <Route path="/" element={<AllTodoLists demo={demo} />} />
          <Route path="/loginReducer" element={<Login />} />
        </Routes>
      </Container>
    </div>
  );
};
