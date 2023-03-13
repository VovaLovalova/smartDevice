import {iosVhFix} from './utils/ios-vh-fix';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // ВАЛИДАЦИЯ ФОРМЫ НА ГЛАВНОЙ СТРАНИЦЕ
  let contactForm = document.querySelector('.contact-form__form');
  let contactFormInputContainer = document.querySelector('.contact-form__input-container');
  let contactFormConfirmContainer = document.querySelector('.contact-form__confirm-container');
  let contactCheckbox = document.querySelector('#input-agreement');
  let contactCheckboxLabel = document.querySelector('label[for=input-agreement]');
  let contactPhoneInput = contactForm.querySelector('input[type=tel]');

  let erorrCheckbox = document.createElement('div');
  erorrCheckbox.textContent = 'Необходимо дать согласие';
  erorrCheckbox.setAttribute('id', 'errorCheckbox');

  let erorrPhone = document.createElement('div');
  erorrPhone.textContent = 'Длинна номера не менее 11 символов';
  erorrPhone.setAttribute('id', 'errorPhone');

  let onSubmitContactForm = function (evt) {
    evt.preventDefault();

    let contactPhoneInputNumbersLength = contactPhoneInput.value.replace(/\D/g, '').length;

    if (contactPhoneInputNumbersLength < 11) {
      if (contactFormInputContainer.querySelectorAll('#errorPhone').length === 0) {
        contactFormInputContainer.appendChild(erorrPhone);
      }
    } else {
      if (!contactCheckbox.checked) {
        if (contactFormConfirmContainer.querySelectorAll('#errorCheckbox').length === 0) {
          contactFormConfirmContainer.appendChild(erorrCheckbox);
        }
      } else {
        contactForm.submit();
      }
    }
  };

  let onPnoneInput = function () {
    if (contactFormInputContainer.querySelectorAll('#errorPhone').length > 0) {
      contactFormInputContainer.removeChild(erorrPhone);
    }
  };

  let onContactCheckboxChange = function () {
    if (contactFormConfirmContainer.querySelectorAll('#errorCheckbox').length > 0) {
      contactFormConfirmContainer.removeChild(erorrCheckbox);
    }
  };

  let onContactCheckboxLabelClick = function (e) {
    if (e.keyCode === 13 || e.keyCode === 32) {
      if (!contactCheckbox.checked) {
        contactCheckbox.checked = true;
      } else {
        contactCheckbox.checked = false;
      }
    }
  };

  contactForm.addEventListener('submit', onSubmitContactForm);
  contactPhoneInput.addEventListener('input', onPnoneInput);
  contactCheckbox.addEventListener('change', onContactCheckboxChange);
  contactCheckboxLabel.addEventListener('keydown', onContactCheckboxLabelClick);

  //  МАСКА ДЛЯ ВВОДА НОМЕРА ТЕЛЕФОНА
  let phoneInput = document.querySelectorAll('input[type=tel]');

  if (phoneInput) {
    let getInputNumbersValue = function (input) {
      return input.value.replace(/\D/g, '');
    };

    let onPhoneInput = function (e) {
      let input = e.target;
      let inputNumbersValue = getInputNumbersValue(input);
      let formatedInputValue = '';

      if (!inputNumbersValue) {
        input.value = '';
      }

      if (['7', '8', '9'].indexOf(inputNumbersValue[0]) > -1) {
        // russian number
        if (inputNumbersValue[0] === '9') {
          inputNumbersValue = '7' + inputNumbersValue;
        }
        let firstSymbols = '+7(';
        formatedInputValue = firstSymbols;

        if (inputNumbersValue.length > 1) {
          formatedInputValue += inputNumbersValue.substring(1, 4);
        }
        if (inputNumbersValue.length >= 5) {
          formatedInputValue += ') ' + inputNumbersValue.substring(4, 7);
        }
        if (inputNumbersValue.length >= 8) {
          formatedInputValue += '-' + inputNumbersValue.substring(7, 9);
        }
        if (inputNumbersValue.length >= 10) {
          formatedInputValue += '-' + inputNumbersValue.substring(9, 11);
        }
      } else {
        // not russian number
        formatedInputValue = '+' + inputNumbersValue.substring(0, 16);
      }

      input.value = formatedInputValue;
    };

    let onPhonedelete = function (e) {
      let input = e.target;
      if (e.keyCode === 8 && getInputNumbersValue(input).length === 1) {
        input.value = '';
      }
    };

    for (let i = 0; i < phoneInput.length; i++) {
      let input = phoneInput[i];
      input.addEventListener('input', onPhoneInput);
      input.addEventListener('keydown', onPhonedelete);
    }
  }

  // КНОПКА "ПОДРОБНЕЕ"

  let openButton = document.querySelector('#about-company-button');
  let textContainer = document.querySelector('.about-company__text-container');

  if (openButton && textContainer) {
    let onOpenButtonClick = function (e) {
      textContainer.classList.toggle('about-company__text-container--close');
      textContainer.classList.toggle('about-company__text-container--open');

      if (textContainer.classList.contains('about-company__text-container--open')) {
        e.target.textContent = 'Свернуть';
      } else {
        e.target.textContent = 'Подробнее';
      }
    };

    openButton.addEventListener('click', onOpenButtonClick);
  }

  // ТАБЫ В МОБИЛЬНОМ ФУТЕРЕ

  let navigationButton = document.querySelector('#navigation-button');
  let contactsButton = document.querySelector('#contacts-button');
  let navigation = document.querySelector('#navigation-list');
  let contacts = document.querySelector('#contacts-container');

  navigationButton.classList.add('navigation__button--open');
  contactsButton.classList.add('contacts__button--open');
  navigation.classList.add('navigation__list--close');
  contacts.classList.add('contacts__container--close');

  if (navigationButton && navigation) {
    let onNavButtonClick = function () {
      navigation.classList.toggle('navigation__list--close');
      navigationButton.classList.toggle('navigation__button--open');
      if (!contacts.classList.contains('contacts__container--close')) {
        contacts.classList.add('contacts__container--close');
        contactsButton.classList.add('contacts__button--open');
      }
    };

    navigationButton.addEventListener('click', onNavButtonClick);
  }

  if (contactsButton && contacts) {
    let onContactsButtonClick = function () {
      contacts.classList.toggle('contacts__container--close');
      contactsButton.classList.toggle('contacts__button--open');
      if (!navigation.classList.contains('navigation__list--close')) {
        navigation.classList.add('navigation__list--close');
        navigationButton.classList.add('navigation__button--open');
      }
    };

    contactsButton.addEventListener('click', onContactsButtonClick);
  }

  // НАВИГАЦИЯ В ФУТЕРЕ
  let navItemArray = navigation.querySelectorAll('li');
  let navAreaArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

  for (let i = 0; i < 7; i++) {
    navItemArray[i].style.gridArea = `${navAreaArray[i]}`;
  }

  // Utils
  // ---------------------------------

  iosVhFix();

  // // Modules
  // // ---------------------------------

  // // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // // в load следует добавить скрипты, не участвующие в работе первого экрана

  window.addEventListener('load', () => {
    // МОДАЛЬНОЕ ОКНО

    let modal = document.querySelector('.modal');
    let modalOpenButton = document.querySelector('#header-button');
    let modalCloseButton = document.querySelector('#modal-close-button');
    let modalForm = document.querySelector('.modal__form');
    let nameInput = document.querySelector('#modal-input-name');
    let html = document.querySelector('html');
    let modalCheckbox = document.querySelector('#modal-checkbox');
    let modalCheckboxLabel = document.querySelector('label[for=modal-checkbox]');
    let modalPhoneInput = modalForm.querySelector('input[type=tel]');

    if (modal && modalOpenButton && modalCloseButton && modalForm && nameInput && modalCheckbox && modalCheckboxLabel) {
      let focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
      let focusableElements = modal.querySelectorAll(focusableElementsString);
      focusableElements = Array.prototype.slice.call(focusableElements);
      let firstTabStop = focusableElements[0];
      let lastTabStop = focusableElements[focusableElements.length - 1];

      let removeListners = function () {
        modalCloseButton.removeEventListener('click', onCloseModalButtonClick);
        document.removeEventListener('keydown', onEscKeydown);
        modalForm.removeEventListener('submit', onSubmitModalForm);
        document.removeEventListener('click', onFolderClick);
        modalCheckboxLabel.removeEventListener('keydown', onModalCheckboxLabelClick);
        modalCheckbox.removeEventListener('change', onModalCheckboxChange);
        modal.removeEventListener('keydown', onTabClick);
        modalPhoneInput.removeEventListener('input', onModalPnoneInput);
      };

      let onTabClick = function (e) {
        if (focusableElements.length > 0) {
          if (e.keyCode === 9) {
            if (e.shiftKey) {
              if (document.activeElement === firstTabStop) {
                e.preventDefault();
                lastTabStop.focus();
              }
            } else {
              if (document.activeElement === lastTabStop) {
                e.preventDefault();
                firstTabStop.focus();
              }
            }
          }
        }
      };

      let focus = function () {
        modalOpenButton.focus();
      };

      let onCloseModalButtonClick = function () {
        modal.classList.add('modal--close');
        html.setAttribute('style', 'overflow-y: auto;');
        focus();
        removeListners();
      };

      let onEscKeydown = function (e) {
        if (e.keyCode === 27) {
          modal.classList.add('modal--close');
          html.setAttribute('style', 'overflow-y: auto;');
          focus();
          removeListners();
        }
      };

      let onFolderClick = function (e) {
        if (e.target === modal) {
          modal.classList.add('modal--close');
          html.setAttribute('style', 'overflow-y: auto;');
          focus();
          removeListners();
        }
      };

      let onSubmitModalForm = function (evt) {
        evt.preventDefault();

        let modalPhoneInputNumbersLength = modalPhoneInput.value.replace(/\D/g, '').length;

        if (modalPhoneInputNumbersLength < 11) {
          if (modalForm.querySelectorAll('#errorPhone').length === 0) {
            modalForm.appendChild(erorrPhone);
          }
        } else {
          if (!modalCheckbox.checked) {
            if (modalForm.querySelectorAll('#errorCheckbox').length === 0) {
              modalForm.appendChild(erorrCheckbox);
            }
          } else {
            modalForm.submit();
            modal.classList.add('modal--close');
            html.setAttribute('style', 'overflow-y: auto;');
            focus();
            removeListners();
          }
        }
      };

      let onModalPnoneInput = function () {
        if (modalForm.querySelectorAll('#errorPhone').length > 0) {
          modalForm.removeChild(erorrPhone);
        }
      };

      let onModalCheckboxChange = function () {
        if (modalForm.querySelectorAll('#errorCheckbox').length > 0) {
          modalForm.removeChild(erorrCheckbox);
        }
      };

      let onModalCheckboxLabelClick = function (e) {
        if (e.keyCode === 13 || e.keyCode === 32) {
          if (!modalCheckbox.checked) {
            modalCheckbox.checked = true;
          } else {
            modalCheckbox.checked = false;
          }
        }
      };

      let addListeners = function () {
        modalCloseButton.addEventListener('click', onCloseModalButtonClick);
        document.addEventListener('keydown', onEscKeydown);
        modalForm.addEventListener('submit', onSubmitModalForm);
        document.addEventListener('click', onFolderClick);
        modalCheckboxLabel.addEventListener('keydown', onModalCheckboxLabelClick);
        modalCheckbox.addEventListener('change', onModalCheckboxChange);
        modal.addEventListener('keydown', onTabClick);
        modalPhoneInput.addEventListener('input', onModalPnoneInput);
      };

      let onOpenModalButtonClick = function () {
        modal.classList.remove('modal--close');
        html.setAttribute('style', 'overflow-y: hidden;');
        nameInput.focus();

        addListeners();
      };

      modalOpenButton.addEventListener('click', onOpenModalButtonClick);
    }

  });
});

// ---------------------------------

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✅

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используется matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)
