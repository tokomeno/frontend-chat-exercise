import { IRoom, IRoomUser } from './room.interface';
import { IRoomActions, roomActionTypes } from './room-types';
import { addLtTimeToConversationList } from './helpers/add-lt-time-to-conversation-list';
import moment from 'moment';
import { addUserInList } from './helpers/add-user-in-list';
import { addNewMessageInConversation } from './helpers/add-new-message-in-conversation';
import { formatTime } from '../../helpers/time-helpers';
import { v4 as uuidv4 } from 'uuid';
import { removeSendingMessageFromConversation } from './helpers/remove-sending-message-from-conversation';

export interface IRoomState {
  room: IRoom | undefined;
  active_conversation_id: string | null;
}
const initState: IRoomState = {
  room: undefined,
  active_conversation_id: null,
};

export const roomReducer = (
  state = initState,
  action: IRoomActions
): IRoomState => {
  switch (action.type) {
    case roomActionTypes.SET_ROOM: {
      const { room } = action.payload;
      return {
        ...state,
        room: {
          ...room,
          conversations_list: addLtTimeToConversationList(
            room.conversations_list
          ),
          users_list: room.users_list.map((u) => ({ ...u, status: 'online' })),
        },
        active_conversation_id: room.conversations_list[0].id,
      };
    }
    case roomActionTypes.SET_ACTIVE_CONVERSATION_ID: {
      const { conversation_id } = action.payload;
      return {
        ...state,
        active_conversation_id: conversation_id,
      };
    }
    case roomActionTypes.USER_HAS_LEFT: {
      const { userId } = action.payload;
      if (!state.room) return state;
      return {
        ...state,
        room: {
          ...state.room,
          users_list: state.room.users_list.map((u) => {
            if (+u.id === +userId) {
              return {
                ...u,
                status: 'offline',
                last_seen: moment().format('LTS'),
              } as IRoomUser;
            }
            return u;
          }),
        },
      };
    }

    case roomActionTypes.USER_HAS_JOINED: {
      const { user } = action.payload;
      if (!state.room) return state;
      return {
        ...state,
        room: {
          ...state.room,
          users_list: addUserInList(state.room.users_list, user),
        },
      };
    }
    case roomActionTypes.NEW_MESSAGE: {
      const { conversation_id, message, currentUser } = action.payload;
      if (!state.room) return state;
      let conversationsList = addNewMessageInConversation({
        message,
        conversation_id,
        conversations_list: state.room.conversations_list,
      });
      // If received msg userId is same auth userId it means that we have that message as was as sending status
      if (currentUser.id === +message.user.id) {
        conversationsList = removeSendingMessageFromConversation({
          message,
          conversation_id,
          conversations_list: conversationsList,
        });
      }
      return {
        ...state,
        room: {
          ...state.room,
          conversations_list: conversationsList,
        },
      };
    }
    case roomActionTypes.SEND_NEW_MESSAGE: {
      const { conversation_id, message, currentUser } = action.payload;
      if (!state.room) return state;
      let timestamp = Date.now();
      return {
        ...state,
        room: {
          ...state.room,
          conversations_list: addNewMessageInConversation({
            message: {
              id: uuidv4(),
              message: message,
              user: currentUser,
              time: timestamp,
              ltTime: formatTime(timestamp),
              status: 'sending',
            },
            conversation_id,
            conversations_list: state.room.conversations_list,
          }),
        },
      };
    }
    default:
      return state;
  }
};
