// components/Notifications/Notifications.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchNotifications();
  }, [token]);

  const fetchNotifications = () => {
    axios.get('/api/notifications', { headers: { Authorization: `Bearer ${token}` } })
      .then(response => setNotifications(response.data))
      .catch(error => console.error('Error fetching notifications', error));
  };

  const markAsRead = id => {
    axios.put(`/api/notifications/${id}/read`, {}, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => fetchNotifications())
      .catch(error => console.error('Error marking notification as read', error));
  };

  return (
    <div className="notifications-container">
      <h2>Notifications</h2>
      <ul>
        {notifications.map(notification => (
          <li key={notification.id} style={{ fontWeight: notification.is_read ? 'normal' : 'bold' }}>
            <h4>{notification.title}</h4>
            <p>{notification.message}</p>
            <small>{new Date(notification.created_at).toLocaleString()}</small>
            {!notification.is_read && (
              <button onClick={() => markAsRead(notification.id)}>Mark as Read</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notifications;
