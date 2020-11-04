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

export class ConversationSocket {
  private shouldTryReconnect: boolean = true;
  public ws: WebSocket | undefined;
  private connectionQuery: ConnectionQuery | undefined;

  private serverEventListeners: {
    [key in ConversationServerEventTypes]?: Function[];
  } = {};

  connect() {
    this.shouldTryReconnect = true;
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      console.log('already connected');
      return;
    }
    this.ws = new WebSocket(this.getSocketUrl());
    this.ws.onopen = () => {
      console.log('connected');
    };
    this.reconnectOnClose();
    this.handleServerEvent();
  }

  disconnect() {
    this.shouldTryReconnect = false;
    this.ws?.close();
  }

  // automatically try to reconnect on connection loss but if disconnect was called on purpose skip
  private reconnectOnClose() {
    this.ws!.onclose = () => {
      console.log('disconnected');
      if (this.shouldTryReconnect) {
        setTimeout(() => {
          if (this.ws?.readyState === WebSocket.CLOSED) {
            this.connect();
          }
        }, 1000);
      }
    };
    this.ws!.onerror = (err) => {
      console.error('Socket error: ', err);
      this.ws?.close();
    };
  }

  private handleServerEvent() {
    this.ws!.onmessage = (evt) => {
      try {
        const evtData: IConversationServerSocketEvents = JSON.parse(evt.data);
        console.log(evtData);
        this.triggerServerEventListener(evtData);
      } catch (err) {
        console.error(err);
      }
    };
  }

  private registerServerEventListener(
    eventName: keyof typeof ConversationServerEventTypes,
    callback: Function
  ) {
    const handlers = this.serverEventListeners[eventName] || [];
    handlers.push(callback);
    this.serverEventListeners[eventName] = handlers;
  }

  private triggerServerEventListener = (
    event: IConversationServerSocketEvents
  ): void => {
    const eventName = event.eventName;
    const handler = this.serverEventListeners[eventName];
    if (!handler || handler.length === 0) return;
    handler.forEach((callback) => callback(event));
  };

  private getSocketUrl() {
    return `${process.env.REACT_APP_SOCKET_URL}/?room_id=${this.connectionQuery?.room_id}&user_id=${this.connectionQuery?.user_id}&user_name=${this.connectionQuery?.user_name}`;
  }

  setConnectionQuery = (connectionParams: ConnectionQuery) => {
    this.connectionQuery = connectionParams;
    return this;
  };

  //////////// Events

  emitNewMessage = (data: ISendNewMessageSocketEvent['payload']) => {
    let event: ISendNewMessageSocketEvent = {
      payload: data,
      eventName: ConversationClientEventTypes.newMessage,
    };
    this.ws!.send(JSON.stringify(event));
    // console.log(event);
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

export const ConversationSocketInstance = new ConversationSocket();
