import { IUser } from '../auth/auth-reducers';
import { IMessage, IServerRoom } from './room.interface';

export enum roomActionTypes {
  USER_HAS_JOINED = 'USER_HAS_JOINED',
  USER_HAS_LEFT = 'USER_HAS_LEFT',
  SET_ROOM = 'SET_ROOM',
  NEW_MESSAGE = 'NEW_MESSAGE',
  SEND_NEW_MESSAGE = 'SEND_NEW_MESSAGE',
  SET_ACTIVE_CONVERSATION_ID = 'SET_ACTIVE_CONVERSATION_ID',
}

export interface ISetActiveConversationId {
  payload: {
    conversation_id: string;
  };
  type: roomActionTypes.SET_ACTIVE_CONVERSATION_ID;
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
    room: IServerRoom;
  };
  type: roomActionTypes.SET_ROOM;
}

export interface IReceiveNewMessage {
  payload: {
    message: Required<IMessage>;
    conversation_id: string;
    currentUser: IUser;
  };
  type: roomActionTypes.NEW_MESSAGE;
}

export interface ISendNewMessage {
  payload: {
    message: string;
    conversation_id: string;
    currentUser: IUser;
  };
  type: roomActionTypes.SEND_NEW_MESSAGE;
}

export type IRoomActions =
  | IUserHasJoined
  | IUserHasLeft
  | IAddRoom
  | IReceiveNewMessage
  | ISetActiveConversationId
  | ISendNewMessage;
