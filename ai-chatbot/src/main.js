import './style.css';
import ChatService from './services/chatService.js';
import conversations, { saveConversations } from './components/conversations.js';
import sidebar from './components/sidebar.js';

const chatApp = {
  // Properties
  messageContainer: null,
  inputContainer: null,
  input: null,
  conversationsList: null,
  conversations: null,
  newConversationBtn: null,
  currentConversationId: null,
  chatService: null,

  // Initialization
  init() {
    this.initializeElements();
    this.initializeServices();
    this.bindEvents();
    this.renderConversations();
    this.loadCurrentConversation();
    this.initializeTransitions();
  },

  initializeElements() {
    this.messageContainer = document.getElementById('chat-messages');
    this.inputContainer = document.getElementById('chat-input');
    this.input = this.inputContainer.querySelector('input');
    this.conversationsList = document.getElementById('conversations-list');
    this.newConversationBtn = document.getElementById('new-conversation');
    this.conversations = conversations;

    if (this.conversations.length > 0) {
      this.currentConversationId = this.conversations[0].id;
      this.loadConversation(this.currentConversationId);
    }
  },

  initializeServices() {
    sidebar.init();
    this.chatService = new ChatService(import.meta.env.VITE_OPENAI_API_KEY);
  },

  initializeTransitions() {
    window.requestAnimationFrame(() => {
      document.getElementById('sidebar').style.setProperty('--transition-duration', '0.6s');
    });
  },

  // Event Handlers
  bindEvents() {
    this.newConversationBtn.addEventListener('click', () => this.newConversation());
    this.input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && this.input.value.trim()) {
        this.handleUserMessage(this.input.value.trim());
      }
    });
  },

  // Conversation Management
  newConversation() {
    this.currentConversationId = crypto.randomUUID();
    this.conversations.push({
      id: this.currentConversationId,
      title: 'New Conversation',
      messages: []
    });
    saveConversations(this.conversations);
    this.loadConversation(this.currentConversationId);
  },

  loadConversation(conversationId) {
    this.currentConversationId = conversationId;
    const conversation = this.conversations.find((c) => c.id === conversationId);

    if (!conversation) return;

    this.messageContainer.innerHTML = '';
    conversation.messages.forEach((message) => {
      this.renderMessage(message.role, message.content);
    });
    this.renderConversations();
  },

  addMessageToConversation(message, response) {
    let conversation = this.conversations.find((c) => c.id === this.currentConversationId);

    if (!conversation) {
      conversation = this.createNewConversation(message, this.truncateTitle(message));
    } else if (conversation.messages.length === 0) {
      conversation.title = this.truncateTitle(message);
    }

    this.addMessagesToConversation(conversation, message, response);
    this.renderConversations();
    saveConversations(this.conversations);
  },

  createNewConversation(title) {
    const conversation = {
      id: crypto.randomUUID(),
      title: title,
      messages: []
    };
    this.conversations.push(conversation);
    this.currentConversationId = conversation.id;
    saveConversations(this.conversations);
    return conversation;
  },

  truncateTitle(message) {
    return message.length > 30 ? message.substring(0, 27) + '...' : message;
  },

  addMessagesToConversation(conversation, message, response) {
    const timestamp = new Date().toISOString();
    conversation.messages.push(
      { role: 'user', content: message, timestamp },
      { role: 'bot', content: response, timestamp }
    );
  },

  // Message Handling
  async handleUserMessage(message) {
    this.renderMessage('user', message);
    this.input.value = '';
    this.input.disabled = true;
    this.input.style.cursor = 'wait';

    const loadingId = this.renderMessage('bot', 'Thinking...');

    try {
      const response = await this.chatService.sendMessage(message);
      this.updateMessage(loadingId, response);
      this.addMessageToConversation(message, response);
    } catch (error) {
      this.updateMessage(loadingId, 'Sorry, an error occurred. Please try again.');
    } finally {
      this.input.disabled = false;
      this.input.style.cursor = 'text';
    }
  },

  // UI Rendering
  renderConversations() {
    this.conversationsList.innerHTML = '';
    const sortedConversations = this.getSortedConversations();

    sortedConversations.forEach((conversation) => {
      const element = this.createConversationElement(conversation);
      this.conversationsList.appendChild(element);
    });
  },

  getSortedConversations() {
    return [...this.conversations].sort((a, b) => {
      const aLatest = a.messages[a.messages.length - 1]?.timestamp || '';
      const bLatest = b.messages[b.messages.length - 1]?.timestamp || '';
      return bLatest.localeCompare(aLatest);
    });
  },

  createConversationElement(conversation) {
    const element = document.createElement('div');
    element.className = 'conversation flex justify-between items-center text-white gap-2 p-2 rounded-md';
    const chatIcon = document.createElement('img');
    chatIcon.src = '/chat_fill.svg';
    chatIcon.alt = 'chat';
    chatIcon.className = 'w-6 h-6';

    element.appendChild(chatIcon);

    // Title container (becomes input when editing)
    const titleContainer = document.createElement('div');
    titleContainer.className = 'flex-grow capitalize cursor-pointer';
    titleContainer.textContent = conversation.title;

    // Actions container
    const actionsContainer = document.createElement('div');
    actionsContainer.className = 'flex gap-2';

    // Edit button
    const editBtn = document.createElement('button');
    editBtn.className = 'text-gray-400 hover:text-white';
    editBtn.innerHTML = '<i class="fas fa-regular fa-pen"></i>';

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'text-gray-400 hover:text-red-500';
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';

    // Done button (hidden initially)
    const doneBtn = document.createElement('button');
    doneBtn.className = 'text-gray-400 hover:text-green-500 hidden';
    doneBtn.innerHTML = '<i class="fas fa-check"></i>';

    if (conversation.id === this.currentConversationId) {
      element.classList.add('bg-dark-alt');
    }

    // Event handlers
    titleContainer.addEventListener('click', () => {
      if (!titleContainer.isEditing) {
        this.loadConversation(conversation.id);
      }
    });

    editBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const input = document.createElement('input');
      input.className = 'bg-transparent text-white rounded w-full outline-none';
      input.value = conversation.title;
      titleContainer.textContent = '';
      titleContainer.appendChild(input);
      titleContainer.isEditing = true;
      input.focus();

      editBtn.classList.add('hidden');
      doneBtn.classList.remove('hidden');
    });

    doneBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const input = titleContainer.querySelector('input');
      const newTitle = input.value.trim();
      if (newTitle) {
        conversation.title = newTitle;
        titleContainer.textContent = newTitle;
        saveConversations(this.conversations);
      }
      titleContainer.isEditing = false;
      editBtn.classList.remove('hidden');
      doneBtn.classList.add('hidden');
    });

    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (confirm('Are you sure you want to delete this conversation?')) {
        this.conversations = this.conversations.filter((c) => c.id !== conversation.id);
        saveConversations(this.conversations);
        this.renderConversations();
        if (this.currentConversationId === conversation.id) {
          this.currentConversationId = this.conversations[0]?.id;
          this.loadCurrentConversation();
        }
      }
    });

    actionsContainer.append(editBtn, doneBtn, deleteBtn);
    element.append(titleContainer, actionsContainer);
    return element;
  },

  renderMessage(type, content) {
    const messageId = crypto.randomUUID();
    const messageElementContainer = document.createElement('div');
    const messageElement = document.createElement('p');
    const chatbotIcon = document.createElement('img');
    chatbotIcon.src = '/logo-small.svg';
    chatbotIcon.alt = 'chatbot';
    chatbotIcon.className = 'w-6 h-6';

    messageElement.id = `message-${messageId}`;
    messageElement.className = `message ${type} ${type === 'user' ? 'bg-primary ml-auto' : 'bg-dark'}`;
    messageElement.style.maxWidth = '352px';

    messageElementContainer.className = 'flex items-start gap-2 max';

    // First append the icon (only for bot messages)
    if (type === 'bot') {
      messageElementContainer.appendChild(chatbotIcon);
    }

    // Then add the text content
    const textNode = document.createTextNode(content);
    messageElement.appendChild(textNode);

    messageElementContainer.appendChild(messageElement);
    this.messageContainer.appendChild(messageElementContainer);
    this.messageContainer.scrollTop = this.messageContainer.scrollHeight;

    return messageId;
  },

  updateMessage(messageId, content) {
    const messageElement = document.getElementById(`message-${messageId}`);
    if (messageElement) {
      messageElement.textContent = content;
    }
  },

  saveCurrentConversation() {
    localStorage.setItem('simplechat_current_conversation', this.currentConversationId || '');
  },

  loadCurrentConversation() {
    const savedId = localStorage.getItem('simplechat_current_conversation');
    if (savedId && this.conversations.some((c) => c.id === savedId)) {
      this.loadConversation(savedId);
    }
  }
};

// Initialize the chat application
document.addEventListener('DOMContentLoaded', () => chatApp.init());
