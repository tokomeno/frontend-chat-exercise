import { formatTime } from '../../../helpers/format-time';
import { IConversation } from '../room.interface';

export const addLtTimeToConversationList = (
  conversations_list: IConversation[]
) => {
  return conversations_list.map((item) => {
    return {
      ...item,
      conversationMessages: item.conversationMessages.map((message) => ({
        ...message,
        ltTime: formatTime(message.time),
      })),
    };
  });
};
