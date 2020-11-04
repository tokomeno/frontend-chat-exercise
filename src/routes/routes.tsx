export const routes = {
  home: () => {
    return '/';
  },
  chatRoom: (id = ':roomId') => {
    return `/chat-app/${id}`;
  },
};
