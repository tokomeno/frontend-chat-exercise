import React from 'react';
import styles from './styles.module.scss';

interface Props {}

export const Demo: React.FC<Props> = () => {
  return (
    <div className={styles.some}>
      <div>123</div>
    </div>
  );
};
