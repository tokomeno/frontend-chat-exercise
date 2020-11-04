import { IUser } from '../auth/auth-reducers';
import { IMessage, IRoom } from './room.interface';

export enum roomActionTypes {
  USER_HAS_JOINED = 'USER_HAS_JOINED',
  USER_HAS_LEFT = 'USER_HAS_LEFT',
  SET_ROOM = 'SET_ROOM',
  NEW_MESSAGE = 'NEW_MESSAGE',
}

export interface IUserHasJoined {
  payload: {
    user: IUser;
  };
  type: roomActionTypes.USER_HAS_JOINED;
}

export interface IUserHasLeft {
  payload: {
    userId: string | number;
  };
  type: roomActionTypes.USER_HAS_LEFT;
}

export interface IAddRoom {
  payload: {
    room: IRoom;
  };
  type: roomActionTypes.SET_ROOM;
}

export interface INewMessage {
  payload: {
    message: Required<IMessage>;
    conversation_id: string;
  };
  type: roomActionTypes.NEW_MESSAGE;
}

export type IRoomActions =
  | IUserHasJoined
  | IUserHasLeft
  | IAddRoom
  | INewMessage;
