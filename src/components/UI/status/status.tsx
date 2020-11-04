import React from 'react';
import styles from './styles.module.scss';

interface Props {
  type: 'online' | 'offline';
}

export const Status: React.FC<Props> = ({ type }) => {
  return (
    <div className={styles.wrapper}>
      <span className={styles[type]}></span>
    </div>
  );
};
