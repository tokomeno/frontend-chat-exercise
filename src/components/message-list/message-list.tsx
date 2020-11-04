import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { IStoreState } from '../../redux/mainReducer';
import { IConversation } from '../../redux/room/room.interface';
import { ConversationSocketInstance } from '../../socket/conversation-socket/conversation-socket';
import { TopBar } from '../UI/top-bar/top-bar';
import { AddMessage } from '../add-message/add-message';
import styles from './styles.module.scss';
import { MessageItem } from './message-item';
import { IUser } from '../../redux/auth/auth-reducers';
import { sendNewMessageAction } from '../../redux/room/room-actions';

interface Props {
  conversation?: IConversation;
  user: IUser;
  sendNewMessageAction: typeof sendNewMessageAction;
}

const _MessageList: React.FC<Props> = ({
  conversation,
  user,
  sendNewMessageAction,
}) => {
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
    sendNewMessageAction({
      currentUser: user!,
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
            <MessageItem
              key={message.id}
              currentUserId={user!.id}
              message={message}
              showAuthor={false}
              showTime={false}
            />
          ))}
        </div>
      </div>

      <AddMessage onSubmit={addNewMessage} />
    </div>
  );
};

const mapStateToProps = ({ room, auth }: IStoreState) => {
  return {
    user: auth.user!,
    conversation: room.room?.conversations_list.find(
      (c) => c.id === room.active_conversation_id
    ),
  };
};
export const MessageList = connect(mapStateToProps, { sendNewMessageAction })(
  _MessageList
);
