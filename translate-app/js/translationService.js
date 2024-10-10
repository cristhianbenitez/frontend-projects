const API_URL = 'https://api.mymemory.translated.net/get';

export const translationService = {
  async translate(text, from, to) {
    if (text.length <= 1) return '';

    try {
      const encodedText = encodeURIComponent(text);
      const response = await fetch(`${API_URL}?q=${encodedText}&langpair=${from}|${to}`);
      const data = await response.json();

      return data.responseStatus === 200 ? data.responseData.translatedText : 'This language may not be supported.';
    } catch (error) {
      console.error('Translation error:', error);
      return 'An error occurred during translation.';
    }
  }
};
