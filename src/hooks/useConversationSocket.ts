import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IStoreState } from '../redux/mainReducer';
import {
  newMessageAction,
  userHasLeftAction,
  userHasJoinedAction,
  setRoomAction,
} from '../redux/room/room-actions';
import { ConversationSocketInstance } from '../socket/conversation-socket/conversation-socket';

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
    ConversationSocketInstance.setConnectionQuery(connectionQuery).connect();
    ConversationSocketInstance.onNewMessage((event) => {
      const { payload } = event;
      dispatch(newMessageAction(payload));
    });
    ConversationSocketInstance.onUserLeft((event) => {
      const { payload } = event;
      dispatch(userHasLeftAction({ userId: payload.userKey }));
    });
    ConversationSocketInstance.onUserJoined((event) => {
      const { payload } = event;
      dispatch(userHasJoinedAction({ user: payload.user }));
    });
    ConversationSocketInstance.onRoomInfo((event) => {
      const { payload } = event;
      dispatch(setRoomAction({ room: payload.room }));
    });
  }, [user, dispatch, roomId]);

  useEffect(() => {
    return () => {
      ConversationSocketInstance.disconnect();
    };
  }, []);

  return {};
};
