import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { MessageList } from '../../components/message-list/message-list';
import { IUser } from '../../redux/auth/auth-reducers';
import { IStoreState } from '../../redux/mainReducer';
import { IRoom } from '../../redux/room/room.interface';
import {
  setRoomAction,
  receiveNewMessageAction,
  userHasJoinedAction,
  userHasLeftAction,
  setActiveConversationIdAction,
} from '../../redux/room/room-actions';
import { ConversationSocketInstance } from '../../socket/conversation-socket/conversation-socket';
import styles from './styles.module.scss';
import { match } from 'react-router-dom';
import { ConversationList } from '../../components/conversation-list/conversation-list';
import { InfoSideBar } from '../../components/info-side-bar/info-side-bar';

interface Props {
  match: match<{ roomId: string }>;
  room: IRoom | undefined;
  user: IUser;
  setRoomAction: typeof setRoomAction;
  receiveNewMessageAction: typeof receiveNewMessageAction;
  userHasJoinedAction: typeof userHasJoinedAction;
  userHasLeftAction: typeof userHasLeftAction;
  setActiveConversationIdAction: typeof setActiveConversationIdAction;
}

const _RoomPage: React.FC<Props> = ({
  match,
  user,
  room,
  setRoomAction,
  receiveNewMessageAction,
  userHasJoinedAction,
  userHasLeftAction,
}) => {
  useEffect(() => {
    const roomId = +match.params.roomId;
    if (!user || !roomId) return;
    const connectionQuery = {
      user_id: typeof user.id === 'string' ? parseInt(user.id) : user.id,
      user_name: user.name,
      room_id: roomId,
    };
    ConversationSocketInstance.setConnectionQuery(connectionQuery).connect();
    ConversationSocketInstance.onNewMessage((event) => {
      const { payload } = event;
      receiveNewMessageAction({ ...payload, currentUser: user });
    })
      .onUserLeft((event) => {
        const { payload } = event;
        userHasLeftAction({ userId: payload.userKey });
      })
      .onUserJoined((event) => {
        const { payload } = event;
        userHasJoinedAction({ user: payload.user });
      })
      .onRoomInfo((event) => {
        const { payload } = event;
        setRoomAction({ room: payload.room });
      });

    return () => {
      ConversationSocketInstance.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (!room) {
    return <h2>Loading</h2>;
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.conversationsList}>
        <ConversationList conversations={room?.conversations_list} />
      </div>
      <div className={styles.messageList}>
        <MessageList />
      </div>
      <div className={styles.userInfo}>
        <InfoSideBar />
      </div>
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
  setRoomAction,
  receiveNewMessageAction,
  userHasJoinedAction,
  userHasLeftAction,
  setActiveConversationIdAction,
})(_RoomPage);
