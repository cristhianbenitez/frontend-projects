import { elements } from './elements.js';
import { languageService } from './languageService.js';
import { uiHandlers } from './uiHandlers.js';
import { dropdownCreator } from './dropdownCreator.js';
import { utils } from './utils.js';

let languages = [];
let inputLanguage = 'en';
let outputLanguage = 'fr';
let defaultInputValue = 'Hello, how are you?';

async function init() {
  languages = await languageService.fetchLanguages();
  uiHandlers.languages = languages; // Pass languages to uiHandlers

  dropdownCreator.createLazyLoadingDropdown(elements.translateInputLanguages, languages);
  dropdownCreator.createLazyLoadingDropdown(elements.translateOutputLanguages, languages);

  elements.translateInput.value = defaultInputValue;
  await uiHandlers.handleTranslation(inputLanguage, outputLanguage);

  // Event Listeners
  elements.translateForm.addEventListener('submit', (e) => {
    e.preventDefault();
    uiHandlers.handleTranslation(inputLanguage, outputLanguage);
  });

  elements.translateInput.addEventListener(
    'input',
    utils.debounce(() => {
      uiHandlers.handleTranslation(inputLanguage, outputLanguage);
    }, 300)
  );

  elements.translateInput.addEventListener('keypress', (e) =>
    uiHandlers.handleInputKeyPress(e, () => {
      uiHandlers.handleTranslation(inputLanguage, outputLanguage);
    })
  );

  [elements.translateInputLanguages, elements.translateOutputLanguages].forEach((element) => {
    element.addEventListener('click', (e) => {
      e.stopPropagation();
      const dropdown = element.querySelector('[data-type="dropdown-list"]');
      uiHandlers.toggleDropdown(dropdown);
    });
  });

  document.addEventListener('click', uiHandlers.handleOutsideClick.bind(uiHandlers));

  elements.swapLanguagesBtn.addEventListener('click', () => {
    [inputLanguage, outputLanguage] = uiHandlers.handleSwapLanguages(
      inputLanguage,
      outputLanguage,
      (newInputLang, newOutputLang) => {
        uiHandlers.handleTranslation(newInputLang, newOutputLang);
      }
    );
  });

  elements.copyToClipboardInputBtn.addEventListener('click', () => uiHandlers.handleCopyToClipboard(true));
  elements.listenInputBtn.addEventListener('click', () => uiHandlers.handleTextToSpeech(inputLanguage));
  elements.copyToClipboardOutputBtn.addEventListener('click', () => uiHandlers.handleCopyToClipboard(false));

  speechSynthesis.onvoiceschanged = () => {
    console.log('Voices loaded:', speechSynthesis.getVoices());
  };
}

init();
