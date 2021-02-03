import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

type ScheduleNotificationType = {
  content: {
    title: string;
    body: string;
    data: { id: number };
  };
  trigger: {
    seconds: number;
    repeats: boolean;
    channelId: string;
  };
};

export const scheduleNotification = async (data: ScheduleNotificationType) =>
  await Notifications.scheduleNotificationAsync(data);

export const getAllScheduleNotifications = async () =>
  await Notifications.getAllScheduledNotificationsAsync();

export const cancelAllScheduleNotifications = async () =>
  await Notifications.cancelAllScheduledNotificationsAsync();

export const editNotificationDaysToRepeat = async (
  id: string,
  data: ScheduleNotificationType
) => {
  await Notifications.cancelScheduledNotificationAsync(id);
  return await scheduleNotification(data);
};
