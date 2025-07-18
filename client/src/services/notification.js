export const showNotification = (title, body) => {
  // Check if browser supports notifications
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications');
    return;
  }

  // Check if permission is already granted
  if (Notification.permission === 'granted') {
    new Notification(title, { body });
    return;
  }

  // Otherwise, ask for permission
  if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        new Notification(title, { body });
      }
    });
  }
};

export const playNotificationSound = () => {
  const audio = new Audio('/notification.mp3');
  audio.play().catch(e => console.log('Error playing sound:', e));
};