import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatTime } from '../../helpers/format-time';
import { IStoreState } from '../../redux/mainReducer';
import { setActiveConversationIdAction } from '../../redux/room/room-actions';
import { IConversation } from '../../redux/room/room.interface';
import styles from './styles.module.scss';
import classNames from 'classnames';

interface Props {
  conversation: IConversation;
}
export const ConversationItem: React.FC<Props> = ({ conversation }) => {
  const dispatch = useDispatch();
  const active_conversation_id = useSelector(
    ({ room }: IStoreState) => room.active_conversation_id
  );
  return (
    <div
      className={classNames(styles.conversationItem, {
        [styles.active]: active_conversation_id === conversation.id,
      })}
      onClick={() => {
        dispatch(
          setActiveConversationIdAction({ conversation_id: conversation.id })
        );
      }}
    >
      <div className={styles.title}>{conversation.name}</div>
      <div className={styles.lastMessage}>
        {conversation.lastMessage && (
          <>
            <div className={styles.username}>
              username: <span>{conversation.lastMessage.user?.name}</span>
            </div>
            <div className={styles.message}>
              lastMsg: <span>{conversation.lastMessage.message}</span>
            </div>
            <div className={styles.time}>
              time: <span>{formatTime(conversation.lastMessage.time)}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
