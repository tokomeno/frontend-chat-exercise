import { IUser } from '../auth/auth-reducers';

export interface IRoom {
  id: string;
  users_list: IUser[];
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
  user?: IUser;
}
