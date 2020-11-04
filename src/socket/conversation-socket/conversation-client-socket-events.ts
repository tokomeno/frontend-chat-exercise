export enum ConversationClientEventTypes {
  newMessage = 'newMessage',
}

export interface ISendNewMessageSocketEvent {
  payload: {
    conversation_id: string;
    message: string;
  };
  eventName: ConversationClientEventTypes.newMessage;
}

export type IConversationClientSocketEvents = ISendNewMessageSocketEvent;
