import React from 'react';
import { useSelector } from 'react-redux';
import { IStoreState } from '../../redux/mainReducer';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { TopBar } from '../UI/top-bar/top-bar';
import { Status } from '../UI/status/status';

interface Props {}

export const UserListInRoom: React.FC<Props> = () => {
  const userList = useSelector(
    ({ room }: IStoreState) => room.room?.users_list
  );
  if (!userList) return null;
  return (
    <>
      <TopBar title="User List" />
      {userList.map((user) => (
        <div key={user.id} className={classNames(styles.userItem)}>
          <div className={styles.info}>
            id: <span>{user.id}</span>
            <br />
            name: <span>{user.name}</span>
            <br />
            <div className="d-flex align-items-center">
              status:
              <span className="ml-10">
                <Status type={user.status} />
              </span>
            </div>
            {user.last_seen && (
              <>
                last seen: <span>{user.last_seen}</span>
              </>
            )}
          </div>
        </div>
      ))}
    </>
  );
};
