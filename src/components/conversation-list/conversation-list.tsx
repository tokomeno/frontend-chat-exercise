import React from 'react';
import { IConversation } from '../../redux/room/room.interface';
import { TopBar } from '../UI/top-bar/top-bar';
import { ConversationItem } from './conversation-item';
import styles from './styles.module.scss';

interface Props {
  conversations: IConversation[];
}

export const ConversationList: React.FC<Props> = ({ conversations }) => {
  return (
    <div className={styles.wrapper}>
      <>
        <TopBar title="Conversations List" />
        <br />
        {conversations.map((item) => (
          <ConversationItem key={item.id} conversation={item} />
        ))}
      </>
    </div>
  );
};
