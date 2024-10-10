const LANGUAGES_URL = 'https://gist.githubusercontent.com/jrnk/8eb57b065ea0b098d571/raw/ISO-639-1-language.json';

export const languageService = {
  async fetchLanguages() {
    try {
      const response = await fetch(LANGUAGES_URL);
      const data = await response.json();
      return data
        .map((lang) => ({
          ...lang,
          name: lang.name.split(/[^a-zA-Z\s]/, 1)[0].trim()
        }))
        .sort((a, b) => a.name.localeCompare(b.name));
    } catch (error) {
      console.error('Error fetching languages:', error);
      return [];
    }
  }
};
