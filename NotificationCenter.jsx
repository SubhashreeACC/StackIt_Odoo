import React, { useState, useEffect } from 'react';
import { BellIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const { data } = await axios.get('/api/notifications');
        setNotifications(data.notifications);
        setUnreadCount(data.notifications.filter(n => !n.isRead).length);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
    
    fetchNotifications();
  }, []);

  const markAsRead = async (id) => {
    try {
      await axios.patch(`/api/notifications/${id}/read`);
      setNotifications(notifications.map(n => 
        n._id === id ? { ...n, isRead: true } : n
      ));
      setUnreadCount(unreadCount - 1);
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const clearAll = async () => {
    try {
      await axios.delete('/api/notifications/clear');
      setNotifications([]);
      setUnreadCount(0);
    } catch (error) {
      console.error('Error clearing notifications:', error);
    }
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 rounded-full text-gray-400 hover:text-gray-500 relative"
      >
        <BellIcon className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg overflow-hidden z-10 border border-gray-200">
          <div className="py-1">
            <div className="px-4 py-2 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-sm font-medium text-gray-700">Notifications</h3>
              <button 
                onClick={clearAll}
                className="text-xs text-blue-600 hover:text-blue-500"
              >
                Clear All
              </button>
            </div>

            {notifications.length > 0 ? (
              notifications.map(notification => (
                <div 
                  key={notification._id}
                  className={`px-4 py-2 hover:bg-gray-50 cursor-pointer ${!notification.isRead ? 'bg-blue-50' : ''}`}
                  onClick={() => markAsRead(notification._id)}
                >
                  <div className="flex items-start">
                    <div className={`flex-shrink-0 mt-0.5 rounded-full p-1 ${!notification.isRead ? 'bg-blue-200 text-blue-600' : 'bg-gray-200 text-gray-600'}`}>
                      {notification.type === 'new_answer' && (
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                      )}
                      {/* Other icons based on notification type */}
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm text-gray-800">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDistanceToNow(new Date(notification.createdAt))} ago
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-4 py-4 text-center text-sm text-gray-500">
                No notifications
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;
