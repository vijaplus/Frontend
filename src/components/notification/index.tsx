import { notification } from 'antd';

type type = "success" | "info" | "warning" | "error"

export const Notification = () => {
  const [api, contextHolder] = notification.useNotification();
  
  const openNotificationWithIcon = (type: type, message:string, des:string) => {
    api[type]({
      message: message,
      description: des,
    });
  };

  return {
    contextHolder,
    openNotificationWithIcon
  }
};
