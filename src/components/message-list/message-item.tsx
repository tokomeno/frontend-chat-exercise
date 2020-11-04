import classNames from 'classnames';
import React from 'react';
import { IMessage } from '../../redux/room/room.interface';
import styles from './styles.module.scss';

interface Props {
  message: IMessage;
  currentUserId: number;
}

export const MessageItem: React.FC<Props> = ({ message, currentUserId }) => {
  return (
    <div
      key={message.id}
      className={classNames(styles.messageContainer, {
        // eslint-disable-next-line eqeqeq
        [styles.byMe]: currentUserId == message?.user?.id,
      })}
    >
      <div className={styles.timestamp}>{message.time}</div>
      <div className={styles.author}>{message.user?.name}</div>
      <div className={styles.text}>{message.message}</div>
    </div>
  );
};
