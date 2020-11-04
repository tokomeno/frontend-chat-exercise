import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FormGroup } from '../../components/common/form-group/form-group';
import { Input } from '../../components/common/input/input';
import { useInputs } from '../../hooks/common/useInputs';
import { setCurrentUser } from '../../redux/auth/auth-actions';
import { routes } from '../../routes/routes';
import styles from './styles.module.scss';

interface Props {
  setCurrentUser: typeof setCurrentUser;
}

interface ILoginForm {
  user_id?: string;
  room_id?: string;
  user_name?: string;
}

const _LoginPage: React.FC<Props> = ({ setCurrentUser }) => {
  const history = useHistory();
  const { handleInputChange, inputs } = useInputs<ILoginForm>();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    (e.target as any).checkValidity();
    setCurrentUser({
      user: {
        id: +inputs.user_id!,
        name: inputs.user_name!,
      },
    });
    history.push(routes.chatRoom(inputs.room_id));
  };

  return (
    <div className={styles.wrapper}>
      <div className="right"></div>
      <div className="left">
        <div className={styles.formTitle}>Login</div>

        <form onSubmit={handleSubmit}>
          <FormGroup label="UserName">
            <Input
              onChange={handleInputChange}
              name="user_name"
              required={true}
            />
          </FormGroup>

          <FormGroup label="UserId">
            <Input
              onChange={handleInputChange}
              name="user_id"
              required={true}
              type="number"
            />
          </FormGroup>

          <FormGroup label="RoomId">
            <Input
              onChange={handleInputChange}
              name="room_id"
              required={true}
              type="number"
            />
          </FormGroup>

          <button className="btn default mt-20" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export const LoginPage = connect(null, { setCurrentUser })(_LoginPage);
