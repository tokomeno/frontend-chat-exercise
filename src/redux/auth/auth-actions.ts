import {
  SetCurrentUserAction,
  authActionTypes,
  AuthLogoutAction,
} from './auth-types';

export const setCurrentUser = ({
  user,
}: SetCurrentUserAction['payload']): SetCurrentUserAction => {
  localStorage.setItem('user', JSON.stringify(user));
  return {
    type: authActionTypes.SET_CURRENT_USER,
    payload: { user },
  };
};

export const authLogout = (): AuthLogoutAction => {
  localStorage.removeItem('user');
  return {
    type: authActionTypes.LOGOUT_USER,
  };
};
