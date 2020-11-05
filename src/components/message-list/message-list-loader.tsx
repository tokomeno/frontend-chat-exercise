import React, { useEffect, useRef } from 'react';
import ContentLoader from 'react-content-loader';
import { AddMessage } from '../add-message/add-message';
import { TopBar } from '../UI/top-bar/top-bar';
import styles from './styles.module.scss';

interface Props {
  items?: number;
}

export const MessageListLoader: React.FC<Props> = ({ items = 12 }) => {
  return (
    <div className={styles.wrapper}>
      <TopBar title="Loading" />
      <div className={styles.scrollWrapper}>
        <div className={styles.messageListContainer}>
          {new Array(items).fill(1).map((a, index) => (
            <div
              style={{
                paddingLeft: '10px',
                paddingRight: '10px',
                width: '100%',
                margin: 'auto',
                marginBottom: '10px',
                overflow: 'hidden',
                borderRadius: '10px',
                display: 'flex',
                justifyContent:
                  Math.round(Math.random()) > 0 ? 'flex-end' : 'flex-start',
              }}
              key={index}
            >
              <ContentLoader
                speed={2}
                width={'80%'}
                height={30}
                viewBox="0 0 100% 30"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
              >
                <rect x="0" y="0" rx="7" ry="7" width="100%" height="30" />
              </ContentLoader>
            </div>
          ))}
        </div>
      </div>
      <AddMessage disabled={true} onSubmit={() => {}} />
    </div>
  );
};
