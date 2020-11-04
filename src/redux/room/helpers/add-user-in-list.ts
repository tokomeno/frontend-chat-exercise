import { IUser } from '../../auth/auth-reducers';
import { IRoomUser } from '../room.interface';

export const addUserInList = (
  users_list: IRoomUser[],
  user: IUser
): IRoomUser[] => {
  let wasInList = false;
  let newList: IRoomUser[] = users_list.map((u) => {
    if (+u.id === +user.id) {
      wasInList = true;
      return {
        ...u,
        status: 'online',
        last_seen: undefined,
      };
    }
    return u;
  });
  if (!wasInList) {
    newList = [
      {
        ...user,
        status: 'online',
      },
      ...users_list,
    ];
  }
  return newList;
};
