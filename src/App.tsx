import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { RoomPage } from './pages/room-page/room-page';
import { LoginPage } from './pages/login-page/login-page';
import { tryLocalLogin } from './redux/auth/try-local-login';
import { PrivateRoute } from './routes/privateRoute';
import { routes } from './routes/routes';

tryLocalLogin();

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={routes.home()} component={LoginPage} />
        <PrivateRoute>
          <Route exact path={routes.chatRoom()} component={RoomPage} />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  );
};

export { App };
