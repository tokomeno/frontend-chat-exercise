import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useInput } from '../../hooks/common/useInput';
import { authLogout } from '../../redux/auth/auth-actions';
import { IStoreState } from '../../redux/mainReducer';
import { routes } from '../../routes/routes';
import { Input } from '../common/input/input';
import { TopBar } from '../UI/top-bar/top-bar';
import styles from './styles.module.scss';

export const UserInfo: React.FC = () => {
  const { push } = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(({ auth }: IStoreState) => auth.user!);
  const room = useSelector(({ room }: IStoreState) => room.room!);
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
      <br />
      <ChangeRoomForm />
    </>
  );
};

const ChangeRoomForm = () => {
  const { push } = useHistory();
  const { onChange, value, setInputValue } = useInput();
  const room = useSelector(({ room }: IStoreState) => room.room!);

  const handleSubmit = () => {
    let roomId = +value;
    setInputValue('');
    if (roomId < 0) {
      alert('room id has to be more than zero');
      return;
    }
    if (roomId === +room.id) {
      alert(`you are already in room by id: ${roomId}`);
      return;
    }
    push(routes.chatRoom(roomId));
  };
  return (
    <>
      <div className="d-flex">
        <Input
          style={{ minWidth: '70px' }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleSubmit();
          }}
          type="number"
          placeholder="roomId"
          onChange={onChange}
          value={value}
        />
        <button onClick={handleSubmit} className="btn light w-100">
          Join another room
        </button>
      </div>
    </>
  );
};
