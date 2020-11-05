import React from 'react';
import { TopBar } from '../UI/top-bar/top-bar';
import styles from './styles.module.scss';

interface Props {}

export const InfoSideBarLoader: React.FC<Props> = () => {
  return (
    <div className={styles.wrapper}>
      <TopBar title="User Info" />
    </div>
  );
};
