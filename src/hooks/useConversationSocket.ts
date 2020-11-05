import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IStoreState } from '../redux/mainReducer';
import {
  userHasLeftAction,
  userHasJoinedAction,
  setRoomAction,
  receiveNewMessageAction,
} from '../redux/room/room-actions';
import { ConversationSocketSingleton } from '../socket/conversation-socket/conversation-socket';

export const useConversationSocket = (roomId: number) => {
  const user = useSelector(({ auth }: IStoreState) => auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      console.error('user not defined');
      return;
    }
    const connectionQuery = {
      user_id: typeof user.id === 'string' ? parseInt(user.id) : user.id,
      user_name: user.name,
      room_id: roomId,
    };
    ConversationSocketSingleton.setConnectionQuery(connectionQuery).connect();
    ConversationSocketSingleton.onNewMessage((event) => {
      const { payload } = event;
      dispatch(receiveNewMessageAction({ ...payload, currentUser: user }));
    });
    ConversationSocketSingleton.onUserLeft((event) => {
      const { payload } = event;
      dispatch(userHasLeftAction({ userId: payload.userKey }));
    });
    ConversationSocketSingleton.onUserJoined((event) => {
      const { payload } = event;
      dispatch(userHasJoinedAction({ user: payload.user }));
    });
    ConversationSocketSingleton.onRoomInfo((event) => {
      const { payload } = event;
      dispatch(setRoomAction({ room: payload.room }));
    });
  }, [user, dispatch, roomId]);

  useEffect(() => {
    return () => {
      ConversationSocketSingleton.disconnect();
    };
  }, []);

  return {};
};
