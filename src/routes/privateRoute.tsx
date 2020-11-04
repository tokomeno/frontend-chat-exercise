import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { routes } from './routes';

import { connect } from 'react-redux';
import { IStoreState } from '../redux/mainReducer';
import { IAuthState } from '../redux/auth/auth-reducers';

interface PrivateRouteProps {
  isAuth: IAuthState['isAuth'];
}

const _PrivateRoute: React.FC<PrivateRouteProps> = ({ children, isAuth }) => (
  <>{isAuth ? children : <Redirect to={routes.home()} />}</>
);

const mapStateToProps = ({ auth }: IStoreState) => {
  return {
    isAuth: auth.isAuth,
  };
};

export const PrivateRoute = connect(mapStateToProps)(_PrivateRoute);
