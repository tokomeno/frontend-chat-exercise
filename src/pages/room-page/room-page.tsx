import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { MessageList } from '../../components/message-list/message-list';
import { IUser } from '../../redux/auth/auth-reducers';
import { IStoreState } from '../../redux/mainReducer';
import { IRoom } from '../../redux/room/room.interface';
import {
  setRoomAction,
  newMessageAction,
  userHasJoinedAction,
  userHasLeftAction,
} from '../../redux/room/room-actions';
import { ConversationSocketInstance } from '../../socket/conversation-socket/conversation-socket';
import styles from './styles.module.scss';
import { match } from 'react-router-dom';

interface Props {
  match: match<{ roomId: string }>;
  room: IRoom | undefined;
  user: IUser;
  addRoomAction: typeof setRoomAction;
  newMessageAction: typeof newMessageAction;
  userHasJoinedAction: typeof userHasJoinedAction;
  userHasLeftAction: typeof userHasLeftAction;
}

const _RoomPage: React.FC<Props> = ({
  match,
  user,
  room,
  addRoomAction,
  newMessageAction,
  userHasJoinedAction,
  userHasLeftAction,
}) => {
  useEffect(() => {
    const connectionQuery = {
      user_id: typeof user.id === 'string' ? parseInt(user.id) : user.id,
      user_name: user.name,
      room_id: +match.params.roomId,
    };
    ConversationSocketInstance.connect(connectionQuery);
    ConversationSocketInstance.onNewMessage((event) => {
      const { payload } = event;
      newMessageAction(payload);
    });
    ConversationSocketInstance.onUserLeft((event) => {
      const { payload } = event;
      userHasLeftAction({ userId: payload.useKey });
    });
    ConversationSocketInstance.onUserJoined((event) => {
      const { payload } = event;
      userHasJoinedAction({ user: payload.user });
    });
    ConversationSocketInstance.onRoomInfo((event) => {
      const { payload } = event;
      addRoomAction({ room: payload.room });
    });

    return () => {
      ConversationSocketInstance.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return (
    <div className={styles.some}>
      {/* <div>Chat</div> */}
      {room?.conversations_list && (
        <MessageList conversationId={room.conversations_list[0].id} />
      )}
    </div>
  );
};

const mapStateToProps = ({ auth, room }: IStoreState) => {
  return {
    user: auth.user!,
    room: room.room,
  };
};
export const RoomPage = connect(mapStateToProps, {
  addRoomAction: setRoomAction,
  newMessageAction,
  userHasJoinedAction,
  userHasLeftAction,
})(_RoomPage);
