import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RefreshIcon } from '@heroicons/react/outline';

const ContentModeration = () => {
  const [flaggedContent, setFlaggedContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState('');

  useEffect(() => {
    fetchFlaggedContent();
  }, []);

  const fetchFlaggedContent = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get('/api/admin/moderation');
      setFlaggedContent(data.content);
    } catch (error) {
      console.error('Error fetching flagged content:', error);
    }
    setIsLoading(false);
  };

  const handleAction = async (contentId, action) => {
    try {
      const { data } = await axios.post(`/api/admin/moderation/${contentId}`, { action });
      setFlaggedContent(flaggedContent.filter(item => item._id !== contentId));
      setActionMessage(data.msg);
      setTimeout(() => setActionMessage(''), 3000);
    } catch (error) {
      console.error('Error performing moderation action:', error);
    }
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Flagged Content
        </h3>
        <button
          onClick={fetchFlaggedContent}
          disabled={isLoading}
          className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <RefreshIcon className={`-ml-1 mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {actionMessage && (
        <div className="bg-green-50 border-l-4 border-green-400 p-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-green-700">{actionMessage}</p>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reported By</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                  Loading flagged content...
                </td>
              </tr>
            ) : flaggedContent.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                  No flagged content to review
                </td>
              </tr>
            ) : (
              flaggedContent.map((item) => (
                <tr key={item._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 max-w-xs truncate">
                    {item.contentPreview}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.contentType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.reportedBy.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.reason}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleAction(item._id, 'approve')}
                      className="text-green-600 hover:text-green-900 mr-3"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleAction(item._id, 'remove')}
                      className="text-red-600 hover:text-red-900"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContentModeration;
