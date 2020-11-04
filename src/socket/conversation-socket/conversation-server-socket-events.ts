import { IUser } from '../../redux/auth/auth-reducers';
import { IMessage, IRoom } from '../../redux/room/room.interface';

export enum ConversationServerEventTypes {
  userJoined = 'userJoined',
  userLeft = 'userLeft',
  roomInfo = 'roomInfo',
  newMessage = 'newMessage',
}

export interface IUserHasLeftSocketEvent {
  payload: {
    useKey: string | number;
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
    room: IRoom;
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
