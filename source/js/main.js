import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';
import {Form} from './modules/form-validate/form';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

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

  let openButton = document.querySelector('.about-company__button');
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


  // МОДАЛЬНОЕ ОКНО

  let modal = document.querySelector('.modal');
  let modalOpenButton = document.querySelector('.header__button');
  let modalCloseButton = document.querySelector('.modal__close-button');
  let modalForm = document.querySelector('.modal__form');
  let nameInput = document.querySelector('#modal-input-name');

  if (modal && modalOpenButton && modalCloseButton && modalForm && nameInput) {
    let onCloseModalButtonClick = function () {
      modal.classList.add('modal--close');
    };

    let onEscKeydown = function (e) {
      if (e.keyCode === 27) {
        modal.classList.add('modal--close');
      }
    };

    let onSubmitForm = function () {
      modal.classList.add('modal--close');
    };

    let onOpenModalButtonClick = function () {
      modal.classList.remove('modal--close');

      nameInput.focus();

      modalCloseButton.addEventListener('click', onCloseModalButtonClick);
      document.addEventListener('keydown', onEscKeydown);
      modalForm.addEventListener('submit', onSubmitForm);
    };

    modalOpenButton.addEventListener('click', onOpenModalButtonClick);
  }

  // ТАБЫ В МОБИЛЬНОМ ФУТЕРЕ

  let navigationButton = document.querySelector('.navigation__button');
  let contactsButton = document.querySelector('.contacts__button');
  let navigation = document.querySelector('.navigation__list');
  let contacts = document.querySelector('.contacts__container');

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

  // Utils
  // ---------------------------------

  iosVhFix();

  // Modules
  // ---------------------------------

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
    initModals();
    const form = new Form();
    window.form = form;
    form.init();
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
