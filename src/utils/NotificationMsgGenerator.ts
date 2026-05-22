export const getNotificationMessage = (notification: any) => {
  const username = notification.sender?.username || "Someone";

  switch (notification.type) {
    case "LIKE":
      return `${username} liked your post`;

    case "COMMENT": {
      const content = notification.content || "";
      const trimmed =
        content.length > 45 ? `${content.substring(0, 45)}...` : content;

      return trimmed
        ? `${username} commented "${trimmed}"`
        : `${username} commented on your post`;
    }

    case "FOLLOW":
      return `${username} followed you`;

    default:
      return notification.content || "You have a new notification";
  }
};
