import { IConversation, IMessage } from '../room.interface';

interface params {
  conversations_list: IConversation[];
  message: IMessage;
  conversation_id: string;
}

export const removeSendingMessageFromConversation = ({
  conversations_list,
  message,
  conversation_id,
}: params): IConversation[] => {
  console.log('asdfa');
  return conversations_list.map((conversation) => {
    if (conversation.id !== conversation_id) return conversation;
    const newConversation: IConversation = {
      ...conversation,
      conversationMessages: conversation.conversationMessages.filter(
        (oldMessages) => {
          if (
            oldMessages.status === 'sending' &&
            +oldMessages.user!.id === +message.user!.id &&
            oldMessages.message === message.message
          ) {
            return false;
          }
          return true;
        }
      ),
    };
    return newConversation;
  });
};
