export const getChatNotificationText = (message: any) => {
  const senderName = message.senderId?.username || "Someone";
  const content = message.content?.trim();

  if (content) {
    return `${senderName}: ${content}`;
  }

  const mediaType = message.media?.[0]?.type;

  if (mediaType === "image") return `${senderName} sent an image`;
  if (mediaType === "video") return `${senderName} sent a video`;
  if (mediaType === "file") return `${senderName} sent a file`;

  return `${senderName} sent a message`;
};

export const getChatNotificationTitle = (message: any, groupName?: string) => {
  if (groupName) return groupName;
  return message.senderId?.username || "SocialSpace";
};
