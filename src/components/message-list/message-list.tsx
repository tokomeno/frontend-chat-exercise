import classNames from 'classnames';
import React from 'react';
import { connect, useSelector } from 'react-redux';
import { IStoreState } from '../../redux/mainReducer';
import { IConversation } from '../../redux/room/room.interface';
import { ConversationSocketInstance } from '../../socket/conversation-socket/conversation-socket';
import { AddMessage } from './add-message';
import styles from './styles.module.scss';

interface Props {
  conversation?: IConversation;
  conversationId: string;
}

const _MessageList: React.FC<Props> = ({ conversation, conversationId }) => {
  const user = useSelector(({ auth }: IStoreState) => auth.user);
  // const conversation = useSelector(({ auth }: IStoreState) => auth.user);

  console.log(conversation, conversationId);
  if (!conversation) {
    return <h2>Not Found</h2>;
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.bar}>
        <h3 className={styles.title}>{conversation.name}</h3>
      </div>
      <div className={styles.scrollWrapper}>
        <div className={styles.messageListContainer}>
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

      <AddMessage
        onSubmit={(text) => {
          ConversationSocketInstance.emitNewMessage({
            conversation_id: conversation.id,
            message: text,
          });
        }}
      />
    </div>
  );
};

const mapStateToProps = (
  { room }: IStoreState,
  { conversationId }: Omit<Props, 'conversation'>
) => {
  return {
    conversation: room.room?.conversations_list.find(
      (c) => c.id === conversationId
    ),
  };
};
export const MessageList = connect(mapStateToProps)(_MessageList);
