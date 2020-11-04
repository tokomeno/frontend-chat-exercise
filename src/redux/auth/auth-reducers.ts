import { IAuthActions, authActionTypes } from './auth-types';

export interface IUser {
  id: number | string;
  name: string;
}

export interface IAuthState {
  isAuth: boolean;
  user: IUser | null;
}
const initState: IAuthState = {
  isAuth: false,
  user: null,
};

export const authReducer = (
  state = initState,
  action: IAuthActions
): IAuthState => {
  switch (action.type) {
    case authActionTypes.SET_CURRENT_USER: {
      return {
        ...state,
        isAuth: true,
        user: {
          ...action.payload.user,
          id: +action.payload.user.id,
        },
      };
    }
    case authActionTypes.LOGOUT_USER: {
      return {
        ...state,
        isAuth: false,
        user: null,
      };
    }
    default:
      return state;
  }
};
