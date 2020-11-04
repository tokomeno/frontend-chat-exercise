import { store } from '../store';
import { setCurrentUser } from './auth-actions';

export const tryLocalLogin = () => {
  const authStateFromStorage = localStorage.getItem('user');
  let storageAuthState: any;

  if (authStateFromStorage) {
    storageAuthState = JSON.parse(authStateFromStorage);
  }

  if (
    typeof storageAuthState === 'object' &&
    storageAuthState.id &&
    storageAuthState.name
  ) {
    store.dispatch(
      setCurrentUser({
        user: {
          id: storageAuthState.id,
          name: storageAuthState.name,
        },
      })
    );
  }
};
