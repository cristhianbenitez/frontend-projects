import { uiHandlers } from './uiHandlers.js';

const BATCH_SIZE = 10;

export const dropdownCreator = {
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
    dropdownList.className = 'dropdown-list';
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
