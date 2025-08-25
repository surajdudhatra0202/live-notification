import {
  getMessaging,
  requestPermission,
  getToken,
  onMessage,
  AuthorizationStatus,
} from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { Platform, Alert } from 'react-native';

export async function requestUserPermission() {
  const messaging = getMessaging();

  const authStatus = await requestPermission(messaging);
  const enabled =
    authStatus === AuthorizationStatus.AUTHORIZED ||
    authStatus === AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    // console.log('✅ Notification permission granted');
  } else {
    Alert.alert('Notifications blocked', 'Enable notifications in settings');
  }
}

export async function getFcmToken(): Promise<string | null> {
  try {
    const messaging = getMessaging();
    const token = await getToken(messaging);
    // console.log('📱 FCM Token:', token);
    return token;
  } catch (err) {
    console.error('❌ Error fetching FCM token', err);
    return null;
  }
}

export function setupForegroundHandler() {
  const messaging = getMessaging();

  onMessage(messaging, async remoteMessage => {
    const { data } = remoteMessage;


    // Use a persistent ID so the notification can be updated
    const NOTIFICATION_ID = 'task_progress_notification';

    const title = data?.title ?? 'Notification';
    const body = data?.body ?? '';
    const totalCalls = parseInt(data?.totalCalls ?? '0');
    const completedCalls = parseInt(data?.completedCalls ?? '0');
    const pendingCalls = totalCalls - completedCalls;

    // console.log(totalCalls, completedCalls);
    // console.log(remoteMessage);

    // Create the RemoteViews object from your XML layout
    const customViews = await notifee.getRemoteViews(
      'notification_custom_layout',
    );

    // Update the views in your custom layout with data from the message
    await customViews.setTextViewText('notification_title', title);
    await customViews.setTextViewText('notification_body', body);
    await customViews.setProgressBar(
      'notification_progress_bar',
      totalCalls,
      completedCalls,
      false,
    );

    // Optional: You can also change the text color or background
    // await customViews.setTextViewTextColor('notification_title', AndroidColor.parse('#FF5722'));

    await notifee.displayNotification({
      id: NOTIFICATION_ID,
      title: title,
      body: body,
      android: {
        channelId: 'default',
        importance: AndroidImportance.HIGH,
        setContentView : customViews,
      },
    });
  });
}

export async function createDefaultChannel() {
  if (Platform.OS === 'android') {
    await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });
  }
}
