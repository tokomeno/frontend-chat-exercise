import { IConversation, IRoom } from './room.interface';
import { IRoomActions, roomActionTypes } from './room-types';

export interface IRoomState {
  room: IRoom | undefined;
}
const initState: IRoomState = {
  room: undefined,
};

export const roomReducer = (
  state = initState,
  action: IRoomActions
): IRoomState => {
  switch (action.type) {
    case roomActionTypes.SET_ROOM: {
      const { room } = action.payload;
      return {
        room: room,
      };
    }
    case roomActionTypes.USER_HAS_LEFT: {
      const { userId } = action.payload;
      if (!state.room) return state;
      return {
        room: {
          ...state.room,
          users_list: state.room.conversations_list.filter(
            (u) => u.id !== userId
          ),
        },
      };
    }

    case roomActionTypes.USER_HAS_JOINED: {
      const { user } = action.payload;
      if (!state.room) return state;

      return {
        room: {
          ...state.room,
          users_list: [user, ...state.room.users_list],
        },
      };
    }
    case roomActionTypes.NEW_MESSAGE: {
      const { conversation_id, message } = action.payload;
      if (!state.room) return state;
      return {
        room: {
          ...state.room,
          conversations_list: state.room.conversations_list.map((co) => {
            if (co.id !== conversation_id) return co;
            const newConversation: IConversation = {
              ...co,
              lastMessage: message,
              conversationMessages: [...co.conversationMessages, message],
            };
            return newConversation;
          }),
        },
      };
    }
    default:
      return state;
  }
};
