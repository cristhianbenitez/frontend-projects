// Constants
const API_URL = 'https://api.mymemory.translated.net/get';
const LANGUAGES_URL = 'https://gist.githubusercontent.com/jrnk/8eb57b065ea0b098d571/raw/ISO-639-1-language.json';
const BATCH_SIZE = 10;

// Global variables
let languages = [];
let inputLanguage = 'en';
let outputLanguage = 'fr';

// DOM Elements
const elements = {
  translateInput: document.getElementById('translate-input'),
  translateOutput: document.getElementById('translate-output'),
  translateForm: document.getElementById('translate-form'),
  translateInputLanguages: document.getElementById('translate-input-languages'),
  translateOutputLanguages: document.getElementById('translate-output-languages')
};

// Translation Service
const translationService = {
  async translate(text, from, to) {
    if (text.length <= 1) return '';

    try {
      const encodedText = encodeURIComponent(text);
      const response = await fetch(`${API_URL}?q=${encodedText}&langpair=${from}|${to}`);
      const data = await response.json();
      console.log(data);

      return data.responseStatus === 200 ? data.responseData.translatedText : 'This language may not be supported.';
    } catch (error) {
      console.error('Translation error:', error);
      return 'An error occurred during translation.';
    }
  }
};

// Language Service
const languageService = {
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

// UI Handlers
const uiHandlers = {
  async handleTranslation() {
    const inputText = elements.translateInput.value.trim();
    const translatedText = await translationService.translate(inputText, inputLanguage, outputLanguage);
    elements.translateOutput.value = translatedText;
  },

  handleInputKeyPress(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      elements.translateForm.dispatchEvent(new Event('submit'));
    } else if (e.shiftKey && e.key === 'Enter') {
      e.preventDefault();
      elements.translateInput.value += '\n';
    }
  },

  handleLanguageChange(newLanguage) {
    const selectElement = newLanguage.closest('[data-type="dropdown-list"]').parentElement;
    const selectedOption = selectElement.querySelector('.dropdownList-option.selected');

    selectedOption.textContent = newLanguage.textContent;
    selectedOption.dataset.value = newLanguage.value;

    if (selectElement.id === 'translate-input-languages') {
      inputLanguage = newLanguage.dataset.value;
    } else if (selectElement.id === 'translate-output-languages') {
      outputLanguage = newLanguage.dataset.value;
    }

    uiHandlers.handleTranslation();
    console.log(inputLanguage, outputLanguage);
  },

  toggleDropdown(dropdown) {
    const isExpanded = dropdown.getAttribute('aria-expanded') === 'true';
    dropdown.style.display = isExpanded ? 'none' : 'block';
    dropdown.hidden = isExpanded;
    dropdown.setAttribute('aria-expanded', !isExpanded);
  }
};

// Dropdown Creation
const dropdownCreator = {
  createLazyLoadingDropdown(selectElement, languages) {
    let loadedCount = 0;

    const dropdownList = this.createDropdownList();
    const selectedOption = this.createSelectedOption(selectElement, languages);

    function loadMore() {
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < BATCH_SIZE && loadedCount < languages.length; i++, loadedCount++) {
        const option = dropdownCreator.createOption(languages[loadedCount]);
        fragment.appendChild(option);
      }
      dropdownList.appendChild(fragment);
    }

    loadMore();

    dropdownList.addEventListener('scroll', () => {
      if (dropdownList.scrollTop + dropdownList.clientHeight >= dropdownList.scrollHeight - 50) {
        loadMore();
      }
    });

    selectElement.appendChild(dropdownList);
  },

  createDropdownList() {
    const dropdownList = document.createElement('ul');
    dropdownList.dataset.type = 'dropdown-list';
    dropdownList.role = 'listbox';
    dropdownList.setAttribute('aria-labelledby', 'translate-languages');
    dropdownList.style.maxHeight = '200px';
    dropdownList.style.overflowY = 'auto';
    dropdownList.style.display = 'none';
    dropdownList.hidden = true;
    return dropdownList;
  },

  createSelectedOption(selectElement, languages) {
    const selectedOption = document.createElement('div');
    selectedOption.className = 'dropdownList-option selected';
    selectElement.appendChild(selectedOption);

    const defaultValue = selectElement.getAttribute('default-value');
    if (defaultValue) {
      const defaultLanguage = languages.find((language) => language.code === defaultValue);
      if (defaultLanguage) {
        selectedOption.textContent = defaultLanguage.name;
        selectedOption.dataset.value = defaultLanguage.code;
      }
    }

    return selectedOption;
  },

  createOption(language) {
    const option = document.createElement('li');
    option.className = 'dropdown-list-option';
    option.dataset.value = language.code;
    option.textContent = language.name;
    option.addEventListener('click', () => {
      uiHandlers.handleLanguageChange(option);
    });
    return option;
  }
};

// Initialization
async function init() {
  languages = await languageService.fetchLanguages();
  dropdownCreator.createLazyLoadingDropdown(elements.translateInputLanguages, languages);
  dropdownCreator.createLazyLoadingDropdown(elements.translateOutputLanguages, languages);

  // Event Listeners
  elements.translateForm.addEventListener('submit', (e) => {
    e.preventDefault();
    uiHandlers.handleTranslation();
  });

  elements.translateInput.addEventListener('keypress', uiHandlers.handleInputKeyPress);

  [elements.translateInputLanguages, elements.translateOutputLanguages].forEach((element) => {
    element.addEventListener('click', () => {
      uiHandlers.toggleDropdown(element.querySelector('[data-type="dropdown-list"]'));
    });
  });
}

// Start the application
init();
