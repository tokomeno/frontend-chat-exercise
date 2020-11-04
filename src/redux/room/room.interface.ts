import { IUser } from '../auth/auth-reducers';

export interface IRoomUser extends IUser {
  status: 'online' | 'offline';
  last_seen?: string;
}
export interface ISendingMessages {
  message: string;
  conversation_id: string;
}

export type IServerRoom = {
  [k in keyof Omit<IRoom, 'users_list'>]: IRoom[k];
} & {
  users_list: IUser[];
};

export interface IRoom {
  id: string;
  users_list: IRoomUser[];
  conversations_list: IConversation[];
}

export interface IConversation {
  id: string;
  lastMessage: IMessage;
  name: string;
  type: string;
  conversationMessages: IMessage[];
}

export interface IMessage {
  id: string;
  message: string;
  time: number;
  ltTime?: string;
  user?: IUser;
  status?: 'sending';
}
