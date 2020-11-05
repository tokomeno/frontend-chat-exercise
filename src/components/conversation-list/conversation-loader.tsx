import React from 'react';
import ContentLoader from 'react-content-loader';
import { TopBar } from '../UI/top-bar/top-bar';
import styles from './styles.module.scss';

interface Props {
  items?: number;
}

export const ConversationListLoader: React.FC<Props> = ({ items = 10 }) => {
  return (
    <div className={styles.wrapper}>
      <>
        <TopBar title="Conversations List" />
        <br />
        <>
          {new Array(items).fill(1).map((a, index) => (
            <div
              style={{
                width: '90%',
                margin: 'auto',
                marginBottom: '10px',
                overflow: 'hidden',
                borderRadius: '10px',
              }}
              key={index}
            >
              <div className="" style={{ overflow: 'hidden' }}>
                <ContentLoader
                  speed={2}
                  width={'100%'}
                  height={60}
                  backgroundColor="#f3f3f3"
                  foregroundColor="#ecebeb"
                >
                  <rect x="0" y="0" rx="7" ry="7" width="100%" height="60" />
                </ContentLoader>
              </div>
            </div>
          ))}
        </>
      </>
    </div>
  );
};
