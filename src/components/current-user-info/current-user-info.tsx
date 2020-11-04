import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { authLogout } from '../../redux/auth/auth-actions';
import { IStoreState } from '../../redux/mainReducer';
import { routes } from '../../routes/routes';
import { TopBar } from '../UI/top-bar/top-bar';
import styles from './styles.module.scss';

export const UserInfo: React.FC = () => {
  const { push } = useHistory();
  const user = useSelector(({ auth }: IStoreState) => auth.user);
  const room = useSelector(({ room }: IStoreState) => room.room);
  const dispatch = useDispatch();
  if (!user || !room) {
    return <h2>Loading</h2>;
  }
  return (
    <>
      <TopBar title="Current User Info" />
      <div className={styles.info}>
        id: <span>{user.id}</span>
        <br />
        name: <span>{user.name}</span>
        <br />
        current room id: <span>{room.id}</span>
      </div>
      <button
        onClick={() => {
          dispatch(authLogout());
          push(routes.home());
        }}
        className="btn light d-block w-100"
      >
        Logout
      </button>
      <br />
    </>
  );
};
