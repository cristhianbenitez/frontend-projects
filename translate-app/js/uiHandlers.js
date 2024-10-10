import { elements } from './elements.js';
import { translationService } from './translationService.js';

export const uiHandlers = {
  async handleTranslation(inputLanguage, outputLanguage) {
    const inputText = elements.translateInput.value.trim();
    const translatedText = await translationService.translate(inputText, inputLanguage, outputLanguage);
    elements.translateOutput.value = translatedText;
  },

  handleInputChange: function (callback) {
    return function () {
      callback();
    };
  },

  handleInputKeyPress(e, callback) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      elements.translateForm.dispatchEvent(new Event('submit'));
    } else if (e.shiftKey && e.key === 'Enter') {
      e.preventDefault();
      elements.translateInput.value += '\n';
    }
  },

  handleLanguageChange(newLanguage, callback) {
    const selectElement = newLanguage.closest('[data-type="dropdown-list"]').parentElement;
    const selectedOption = selectElement.querySelector('.dropdownList-option.selected');

    selectedOption.textContent = newLanguage.textContent;
    selectedOption.dataset.value = newLanguage.value;

    document.querySelectorAll('.selected-language').forEach((el) => el.classList.remove('selected-language'));
    selectElement.classList.add('selected-language');

    callback(selectElement.id, newLanguage.dataset.value);
  },

  toggleDropdown(dropdown) {
    const isExpanded = dropdown.getAttribute('aria-expanded') === 'true';
    dropdown.style.display = isExpanded ? 'none' : 'block';
    dropdown.hidden = isExpanded;
    dropdown.setAttribute('aria-expanded', !isExpanded);
  },

  handleOutsideClick(event) {
    const dropdowns = document.querySelectorAll('[data-type="dropdown-list"]');
    dropdowns.forEach((dropdown) => {
      if (
        dropdown.getAttribute('aria-expanded') === 'true' &&
        !dropdown.contains(event.target) &&
        !dropdown.previousElementSibling.contains(event.target)
      ) {
        this.toggleDropdown(dropdown);
      }
    });
  },

  handleCopyToClipboard(isInput) {
    const textToCopy = isInput ? elements.translateInput.value : elements.translateOutput.value;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        alert(`${isInput ? 'Input' : 'Output'} text copied to clipboard!`);
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  },

  handleTextToSpeech(inputLanguage) {
    const textToSpeak = elements.translateInput.value;

    console.log(`Attempting to speak: "${textToSpeak}" in language: ${inputLanguage}`);

    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = inputLanguage;

      utterance.onstart = () => console.log('Speech started');
      utterance.onend = () => console.log('Speech ended');
      utterance.onerror = (event) => console.error('Speech error:', event.error);

      speechSynthesis.cancel();
      setTimeout(() => speechSynthesis.speak(utterance), 100);
    } else {
      console.error('Text-to-speech not supported in this browser');
      alert('Text-to-speech is not supported in your browser');
    }
  },

  handleSwapLanguages(inputLanguage, outputLanguage, callback) {
    // Swap the language codes
    [inputLanguage, outputLanguage] = [outputLanguage, inputLanguage];

    // Update the UI for input language
    const inputDropdown = elements.translateInputLanguages.querySelector('.dropdownList-option.selected');
    const inputLanguageData = this.findLanguageByCode(inputLanguage);
    if (inputLanguageData) {
      inputDropdown.textContent = inputLanguageData.name;
      inputDropdown.dataset.value = inputLanguageData.code;
    }

    // Update the UI for output language
    const outputDropdown = elements.translateOutputLanguages.querySelector('.dropdownList-option.selected');
    const outputLanguageData = this.findLanguageByCode(outputLanguage);
    if (outputLanguageData) {
      outputDropdown.textContent = outputLanguageData.name;
      outputDropdown.dataset.value = outputLanguageData.code;
    }

    // Swap the text in the input and output areas
    [elements.translateInput.value, elements.translateOutput.value] = [
      elements.translateOutput.value,
      elements.translateInput.value
    ];

    // Call the callback with the new language codes
    callback(inputLanguage, outputLanguage);

    return [inputLanguage, outputLanguage];
  },

  findLanguageByCode(code) {
    // This function should be implemented to find a language object by its code
    // You might need to pass the languages array to this handler or store it globally
    return this.languages.find((lang) => lang.code === code);
  }
};
