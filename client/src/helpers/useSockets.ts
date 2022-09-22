import { useCallback, useEffect, useMemo } from 'react';
import { io, Socket } from 'socket.io-client';
import { User } from '../constants/interfaces';
import { useStore } from '../mobx/store';

const server = 'http://127.0.0.1:3000/events';

type UserUpdatePayload = {
  userId: string;
  email: string;
  sum: number;
};

let socket: Socket;

export const useSockets = () => {
  const { currentUserId, changeCategories } = useStore();

  if (!socket) {
    socket = io(server, {
      query: {
        userId: currentUserId,
      },
    });
  }

  useEffect(() => {
    socket.on('user:put', (user: User) => {
      console.log('updated user: ', user);
      if (user._id === currentUserId) {
        changeCategories(user.categories);
      }
    });
  }, []);

  const update = useCallback((payload: UserUpdatePayload) => {
    socket.emit('user:put', payload);
  }, []);

  const actions = useMemo(
    () => ({
      update,
    }),
    []
  );

  return { actions };
};
