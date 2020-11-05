import { BaseSocket } from '../base-socket';
import {
  ConversationClientEventTypes,
  ISendNewMessageSocketEvent,
} from './conversation-client-socket-events';
import {
  ConversationServerEventTypes,
  IAddRoomSocketEvent,
  IConversationServerSocketEvents,
  INewMessageSocketEvent,
  IUserHasJoinedSocketEvent,
  IUserHasLeftSocketEvent,
} from './conversation-server-socket-events';

interface ConnectionQuery {
  user_id: number;
  room_id: number;
  user_name: string;
}

class ConversationSocket extends BaseSocket<
  IConversationServerSocketEvents,
  keyof typeof ConversationServerEventTypes
> {
  protected connectionQuery: ConnectionQuery | undefined;
  protected serverEventListeners: {
    [key in ConversationServerEventTypes]?: Function[];
  } = {};

  public getSocketUrl() {
    return `${process.env.REACT_APP_SOCKET_URL}/?room_id=${this.connectionQuery?.room_id}&user_id=${this.connectionQuery?.user_id}&user_name=${this.connectionQuery?.user_name}`;
  }

  emitNewMessage = (data: ISendNewMessageSocketEvent['payload']) => {
    let event: ISendNewMessageSocketEvent = {
      payload: data,
      eventName: ConversationClientEventTypes.newMessage,
    };
    this.sendEvent(event);
    return this;
  };

  onRoomInfo = (callback: (data: IAddRoomSocketEvent) => void) => {
    this.registerServerEventListener('roomInfo', callback);
    return this;
  };

  onNewMessage = (callback: (data: INewMessageSocketEvent) => void) => {
    this.registerServerEventListener('newMessage', callback);
    return this;
  };

  onUserLeft = (callback: (data: IUserHasLeftSocketEvent) => void) => {
    this.registerServerEventListener('userLeft', callback);
    return this;
  };

  onUserJoined = (callback: (data: IUserHasJoinedSocketEvent) => void) => {
    this.registerServerEventListener('userJoined', callback);
    return this;
  };
}

export const ConversationSocketSingleton = new ConversationSocket();
