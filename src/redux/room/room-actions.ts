import { formatTime } from '../../helpers/format-time';
import {
  IAddRoom,
  IUserHasLeft,
  IUserHasJoined,
  roomActionTypes,
  INewMessage,
  ISetActiveConversationId,
} from './room-types';

export const setRoomAction = ({ room }: IAddRoom['payload']): IAddRoom => {
  return {
    type: roomActionTypes.SET_ROOM,
    payload: {
      room,
    },
  };
};

export const userHasLeftAction = ({
  userId,
}: IUserHasLeft['payload']): IUserHasLeft => {
  return {
    type: roomActionTypes.USER_HAS_LEFT,
    payload: {
      userId,
    },
  };
};

export const userHasJoinedAction = ({
  user,
}: IUserHasJoined['payload']): IUserHasJoined => {
  return {
    type: roomActionTypes.USER_HAS_JOINED,
    payload: {
      user,
    },
  };
};

export const newMessageAction = ({
  conversation_id,
  message,
}: INewMessage['payload']): INewMessage => {
  const newMessage = {
    ...message,
    ltTime: formatTime(message.time),
  };
  return {
    type: roomActionTypes.NEW_MESSAGE,
    payload: {
      conversation_id,
      message: newMessage,
    },
  };
};

export const setActiveConversationIdAction = ({
  conversation_id,
}: ISetActiveConversationId['payload']): ISetActiveConversationId => {
  return {
    type: roomActionTypes.SET_ACTIVE_CONVERSATION_ID,
    payload: {
      conversation_id,
    },
  };
};
