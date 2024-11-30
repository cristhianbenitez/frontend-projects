const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

class ChatService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.requestQueue = [];
    this.isProcessing = false;
    this.rateLimitDelay = 1000; // 1 second between requests
    this.lastRequestTime = 0;
  }

  async sendMessage(message) {
    try {
      // Check if we need to wait due to rate limiting
      const now = Date.now();
      const timeElapsed = now - this.lastRequestTime;
      if (timeElapsed < this.rateLimitDelay) {
        await new Promise((resolve) => setTimeout(resolve, this.rateLimitDelay - timeElapsed));
      }

      const response = await fetch(OPENAI_API_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: message }],
          temperature: 0.7,
          max_tokens: 150
        })
      });

      this.lastRequestTime = Date.now();

      if (!response.ok) {
        const errorData = await response.json();

        if (response.status === 429) {
          return 'I apologize, but the API quota has been exceeded. Please check your OpenAI account billing details.';
        }

        throw new Error(errorData.error?.message || 'API request failed');
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
    } catch (error) {
      console.error('Error:', error);

      // More user-friendly error messages
      if (error.message.includes('insufficient_quota')) {
        return 'I apologize, but the API quota has been exceeded. Please check your OpenAI account billing details.';
      } else if (error.message.includes('rate_limit_exceeded')) {
        return 'Too many requests. Please wait a moment before trying again.';
      }

      return 'Sorry, there was an error processing your message. Please try again later.';
    }
  }
}

export default ChatService;
