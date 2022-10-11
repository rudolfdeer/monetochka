import * as Notifications from 'expo-notifications';
import { getUser } from './api';

const SECONDS_TIMEOUT = 1;
const NOTIFICATION_MSG = 'Shared with you! 📬';
const NOTIFICATION_SENDER='Friend: ';
const NOTIFICATION_AMOUNT = 'Amount: ';


export const schedulePushNotification = async(userIdShared: string, sum: number) => {
  const { email } = await getUser(userIdShared);
  await Notifications.scheduleNotificationAsync({
    content: {
      title: NOTIFICATION_MSG,
      body: `${NOTIFICATION_SENDER}${email},${NOTIFICATION_AMOUNT} ${sum}$`,
      data: { data: '' },
    },
    trigger: { seconds: SECONDS_TIMEOUT },
  });
}
