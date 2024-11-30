const STORAGE_KEY = 'simplechat_conversations';

const DEFAULT_CONVERSATION = {
  id: 'default',
  title: 'How are you?',
  messages: [
    {
      role: 'user',
      content: 'Hey my name is Clara! How are you?',
      timestamp: new Date().toISOString()
    },
    {
      role: 'bot',
      content: "Hi, Clara. I'm doing well. I just got back from the gym. How about yourself?",
      timestamp: new Date().toISOString()
    }
  ]
};

let conversations = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

// Add default conversation if no conversations exist
if (conversations.length === 0) {
  conversations.push(DEFAULT_CONVERSATION);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
}

export const saveConversations = (updatedConversations) => {
  conversations = updatedConversations;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
};

export default conversations;
