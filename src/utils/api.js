const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchThreads = async () => {
  const response = await fetch(`${API_BASE_URL}/onebox/list`);
  if (!response.ok) throw new Error('Failed to fetch threads');
  return response.json();
};

export const fetchThread = async (threadId) => {
  const response = await fetch(`${API_BASE_URL}/onebox/${threadId}`);
  if (!response.ok) throw new Error('Failed to fetch thread');
  return response.json();
};

export const deleteThread = async (threadId) => {
  const response = await fetch(`${API_BASE_URL}/onebox/${threadId}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete thread');
  return response.json();
};

export const sendReply = async (threadId, replyData)