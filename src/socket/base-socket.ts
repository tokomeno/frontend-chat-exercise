/**
 * @param T event action types
 * @param K event enum type
 */
export abstract class BaseSocket<
  T extends { eventName: string; payload: any },
  K extends string
> {
  public ws: WebSocket | undefined;

  protected shouldTryReconnect: boolean = true;
  protected abstract connectionQuery: Object | undefined;

  protected serverEventListeners: {
    [key: string]: Function[] | undefined;
  } = {};

  abstract getSocketUrl(): string;

  connect() {
    this.shouldTryReconnect = true;
    if (
      this.ws &&
      (this.ws.readyState === WebSocket.OPEN ||
        this.ws.readyState === WebSocket.CONNECTING)
    ) {
      console.log('already connected');
      return this;
    }
    this.ws = new WebSocket(this.getSocketUrl());
    this.ws.onopen = () => {
      console.log('connected');
    };
    this.reconnectOnClose();
    this.handleServerEvent();
    return this;
  }

  disconnect() {
    this.shouldTryReconnect = false;
    this.emptyServerEventListeners();
    this.ws?.close();
  }

  protected emptyServerEventListeners = () => {
    this.serverEventListeners = {};
  };

  // automatically try to reconnect on connection loss but if disconnect was called on purpose skip
  protected reconnectOnClose() {
    this.ws!.onclose = () => {
      console.log('disconnected');
      if (this.shouldTryReconnect) {
        setTimeout(() => {
          if (
            this.ws?.readyState !== WebSocket.OPEN ||
            this.ws?.readyState !== WebSocket.CONNECTING
          ) {
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

  protected handleServerEvent() {
    this.ws!.onmessage = (evt) => {
      try {
        const evtData: T = JSON.parse(evt.data);
        console.log(evtData);
        this.triggerServerEventListener(evtData);
      } catch (err) {
        console.error(err);
      }
    };
  }

  protected registerServerEventListener(eventName: K, callback: Function) {
    const handlers = this.serverEventListeners[eventName] || [];
    handlers.push(callback);
    this.serverEventListeners[eventName] = handlers;
  }

  protected triggerServerEventListener = (event: T): void => {
    const eventName = event.eventName;
    const handler = this.serverEventListeners[eventName];
    if (!handler || handler.length === 0) return;
    handler.forEach((callback) => callback(event));
  };

  setConnectionQuery = (connectionParams: Object) => {
    this.connectionQuery = connectionParams;
    return this;
  };

  protected sendEvent = (event: Object): boolean => {
    try {
      this.ws!.send(JSON.stringify(event));
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };
}
