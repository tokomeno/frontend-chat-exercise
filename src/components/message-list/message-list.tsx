import classNames from 'classnames';
import React, { useEffect, useRef } from 'react';
import { connect, useSelector } from 'react-redux';
import { IStoreState } from '../../redux/mainReducer';
import { IConversation } from '../../redux/room/room.interface';
import { ConversationSocketInstance } from '../../socket/conversation-socket/conversation-socket';
import { TopBar } from '../UI/top-bar/top-bar';
import { AddMessage } from './add-message';
import styles from './styles.module.scss';

interface Props {
  conversation?: IConversation;
}

const _MessageList: React.FC<Props> = ({ conversation }) => {
  const user = useSelector(({ auth }: IStoreState) => auth.user);
  const listWrapper = useRef<HTMLDivElement>(null);

  const scrollBottom = () => {
    if (listWrapper.current) {
      listWrapper.current.scrollTop = listWrapper.current.scrollHeight;
    }
  };

  const addNewMessage = (text: string) => {
    ConversationSocketInstance.emitNewMessage({
      conversation_id: conversation!.id,
      message: text,
    });
    scrollBottom();
  };

  useEffect(() => {
    scrollBottom();
  }, [conversation]);

  if (!conversation) {
    return <h2>Not Found</h2>;
  }
  return (
    <div className={styles.wrapper}>
      <TopBar title={conversation.name} />
      <div className={styles.scrollWrapper}>
        <div ref={listWrapper} className={styles.messageListContainer}>
          {conversation.conversationMessages.map((message) => (
            <div
              key={message.id}
              className={classNames(styles.messageContainer, {
                // eslint-disable-next-line eqeqeq
                [styles.byMe]: user?.id == message?.user?.id,
              })}
            >
              <div className={styles.timestamp}>{message.time}</div>
              <div className={styles.author}>{message.user?.name}</div>
              <div className={styles.text}>{message.message}</div>
            </div>
          ))}
        </div>
      </div>

      <AddMessage onSubmit={addNewMessage} />
    </div>
  );
};

const mapStateToProps = ({ room }: IStoreState) => {
  return {
    conversation: room.room?.conversations_list.find(
      (c) => c.id === room.active_conversation_id
    ),
  };
};
export const MessageList = connect(mapStateToProps)(_MessageList);
