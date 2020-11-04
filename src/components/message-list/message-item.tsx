import classNames from 'classnames';
import React from 'react';
import { IMessage } from '../../redux/room/room.interface';
import styles from './styles.module.scss';

import { ReactComponent as CheckIcon } from '../../svg/check-solid.svg';

interface Props {
  message: IMessage;
  currentUserId: number;
  showAuthor: boolean;
  showTime: boolean;
  isSending?: boolean;
}

export const MessageItem: React.FC<Props> = ({
  message,
  currentUserId,
  showAuthor,
  showTime,
  isSending = false,
}) => {
  // eslint-disable-next-line eqeqeq
  const byMe = currentUserId == message?.user?.id;
  return (
    <div
      key={message.id}
      className={classNames(styles.messageContainer, {
        [styles.byMe]: byMe,
      })}
    >
      {showTime && <div className={styles.timestamp}>{message.time}</div>}
      {showAuthor && <div className={styles.author}>{message.user?.name}</div>}
      <div className={styles.text}>
        {message.message}
        {byMe && (
          <div
            className={classNames(styles.status, {
              [styles.sending]: message.status === 'sending',
            })}
          >
            <CheckIcon />
          </div>
        )}
      </div>
    </div>
  );
};
