import React from 'react';
import { useSelector } from 'react-redux';
import { IStoreState } from '../../redux/mainReducer';
import { UserInfo } from '../current-user-info/current-user-info';
import { TopBar } from '../UI/top-bar/top-bar';
import { UserListInRoom } from '../user-list-in-room/user-list-in-room';
import styles from './styles.module.scss';

interface Props {}

export const InfoSideBar: React.FC<Props> = () => {
  const room = useSelector(({ room }: IStoreState) => room.room);

  return (
    <>
      <div className={styles.wrapper}>
        <UserInfo />
        <UserListInRoom />
        {room && (
          <>
            <TopBar title="Room" />
            <br />
            <div className={styles.preJson}>
              <pre>{JSON.stringify(room, null, 2)}</pre>
            </div>
          </>
        )}
      </div>
    </>
  );
};
