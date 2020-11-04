import { IConversation, IMessage, IRoom } from '../room.interface';

interface params {
  conversations_list: IConversation[];
  message: IMessage;
  conversation_id: string;
}
export const addNewMessageInConversation = ({
  conversations_list,
  message,
  conversation_id,
}: params): IConversation[] => {
  return conversations_list.map((conversation) => {
    if (conversation.id !== conversation_id) return conversation;
    const newConversation: IConversation = {
      ...conversation,
      lastMessage: message,
      conversationMessages: [...conversation.conversationMessages, message],
    };
    return newConversation;
  });
};
