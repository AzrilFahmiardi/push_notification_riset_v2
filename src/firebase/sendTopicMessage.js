import admin from "./admin";

export const sendToTopic = async (topicName = 'pionir',title_prompt='default title', messageText = 'Hello from server') => {
  const message = {
    notification: {
      title: title_prompt,
      body: messageText,
    },
    topic: topicName,
  };

  try {
    const response = await admin.messaging().send(message);
    console.log('Successfully sent message:', response);

    return { success: true, response };
  } catch (error) {
    console.error('Error sending message:', error);
    return { success: false, error: error.message };
  }
};
