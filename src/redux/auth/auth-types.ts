import { IUser } from './auth-reducers';

export enum authActionTypes {
  LOGOUT_USER = 'LOGOUT_USER',
  SET_CURRENT_USER = 'SET_CURRENT_USER',
}

export interface SetCurrentUserAction {
  payload: {
    user: IUser;
  };
  type: authActionTypes.SET_CURRENT_USER;
}

export interface AuthLogoutAction {
  type: authActionTypes.LOGOUT_USER;
}

export type IAuthActions = SetCurrentUserAction | AuthLogoutAction;
