import { combineReducers } from 'redux';
import { IAuthState, authReducer } from './auth/auth-reducers';
import { IRoomState, roomReducer } from './room/room-reducers';

export interface IStoreState {
  auth: IAuthState;
  room: IRoomState;
}

export const reducers = combineReducers<IStoreState>({
  auth: authReducer,
  room: roomReducer,
});
