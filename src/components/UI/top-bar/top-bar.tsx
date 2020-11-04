import React from 'react';
import styles from './styles.module.scss';

interface Props {
  title: string;
}

export const TopBar: React.FC<Props> = ({ title }) => {
  return (
    <div className={styles.topBar}>
      <h3 className={styles.title}>{title}</h3>
    </div>
  );
};
