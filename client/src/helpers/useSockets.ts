import { useCallback, useEffect, useMemo } from 'react';
import { io, Socket } from 'socket.io-client';
import { User } from '../constants/interfaces';
import { useStore } from '../mobx/store';
import { socketsBase } from '../constants/server';
import * as Notifications from 'expo-notifications';
import { getUser } from './api';

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

async function schedulePushNotification(userIdShared: string, sum: number) {
  const { email } = await getUser(userIdShared);
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'One of your friends has shared expenses with you! 📬',
      body: `Friend: ${email}, amount: ${sum}$`,
      data: { data: 'goes here' },
    },
    trigger: { seconds: 1 },
  });
}

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
