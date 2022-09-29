import { useCallback, useEffect, useMemo } from 'react';
import { io, Socket } from 'socket.io-client';
import { User } from '../constants/interfaces';
import { useStore } from '../mobx/store';
import { socketsBase } from '../constants/server';
import { schedulePushNotification } from './schedulePushNotification';

type UserUpdatePayload = {
  userId: string;
  email: string;
  sum: number;
};

type SocketResponseType = {
  userUpdated: User;
  userIdShared: string;
  sum: number;
};

let socket: Socket;

export const useSockets = () => {
  const { currentUserId, changeCategories } = useStore();
  socket = io(socketsBase, {
    query: {
      userId: currentUserId,
    },
  });

  useEffect(() => {
    socket.on('user:put', (response: SocketResponseType) => {
      const { userUpdated, userIdShared, sum } = response;
      if (userUpdated._id === currentUserId) {
        schedulePushNotification(userIdShared, sum);
        changeCategories(userUpdated.categories);
      }
    });
  }, []);

  const update = useCallback((payload: UserUpdatePayload) => {
    socket.emit('user:put', payload);
  }, []);

  const logOut = useCallback(() => {
    socket.close();
  }, []);

  const actions = useMemo(
    () => ({
      update,
      logOut,
    }),
    []
  );

  return { actions };
};
