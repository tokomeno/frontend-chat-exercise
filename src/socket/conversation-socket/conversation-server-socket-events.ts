import { IUser } from '../../redux/auth/auth-reducers';
import { IMessage, IServerRoom } from '../../redux/room/room.interface';

export enum ConversationServerEventTypes {
  userJoined = 'userJoined',
  userLeft = 'userLeft',
  roomInfo = 'roomInfo',
  newMessage = 'newMessage',
}

export interface IUserHasLeftSocketEvent {
  payload: {
    userKey: string | number;
  };
  eventName: ConversationServerEventTypes.userLeft;
}
export interface IUserHasJoinedSocketEvent {
  payload: {
    user: IUser;
  };
  eventName: ConversationServerEventTypes.userJoined;
}

export interface IAddRoomSocketEvent {
  payload: {
    room: IServerRoom;
  };
  eventName: ConversationServerEventTypes.roomInfo;
}

export interface INewMessageSocketEvent {
  payload: {
    message: Required<IMessage>;
    conversation_id: string;
  };
  eventName: ConversationServerEventTypes.newMessage;
}

export type IConversationServerSocketEvents =
  | IUserHasLeftSocketEvent
  | IAddRoomSocketEvent
  | INewMessageSocketEvent
  | IUserHasJoinedSocketEvent;
