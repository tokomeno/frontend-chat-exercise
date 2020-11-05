export const routes = {
  home: () => {
    return '/';
  },
  chatRoom: (id: number | string = ':roomId') => {
    return `/chat-app/${id}`;
  },
};
