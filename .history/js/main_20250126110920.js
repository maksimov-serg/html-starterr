/* Создаем префикс +7, даже если вводят 8 или 9 */
const prefixNumber = (str) => {
  /* если вводят семерку, добавляем ей скобку */
  if (str === '7') {
    return '7 (';
  }
  /* если вводят восьмерку, ставим вместо нее +7 ( */
  if (str === '8') {
    return '+7 (';
  }
  /* если пишут девятку, заменяем на +7 (9  */
  if (str === '9') {
    return '7 (9';
  }
  /* в других случаях просто 7 (  */
  return '7 (';
}; /* профикс в любом раскладе будет +7 () */

/* Ловим события ввода в любом поле */
document.addEventListener('input', (e) => {
  /* Проверяем, что это поле имеет класс phone-mask */
  if (e.target.classList.contains('phone-mask')) {
    /* поле с телефоном помещаем в переменную input */
    const input = e.target;
    /* вставляем плюс в начале номера */
    const value = input.value.replace(/\D+/g, '');
    /* длинна номера 11 символов */
    const numberLength = 11;

    /* Создаем переменную, куда будем записывать номер */
    let result;
    /* Если пользователь ввел 8... */
    if (input.value.includes('+8') || input.value[0] === '8') {
      /* Стираем восьмерку */
      result = '';
    } else {
      /* Оставляем плюсик в поле */
      result = '+';
    }

    /* Запускаем цикл, где переберем каждую цифру от 0 до 11 */
    for (let i = 0; i < value.length && i < numberLength; i++) {
      switch (i) {
        case 0:
          /* в самом начале ставим префикс +7 ( */
          result += prefixNumber(value[i]);
          continue;
        case 4:
          /* добавляем после "+7 (" круглую скобку ")" */
          result += ') ';
          break;
        case 7:
          /* дефис после 7 символа */
          result += '-';
          break;
        case 9:
          /* еще дефис  */
          result += '-';
          break;
        default:
          break;
      }
      /* на каждом шаге цикла добавляем новую цифру к номеру */
      result += value[i];
    }
    /* итог: номер в формате +7 (999) 123-45-67 */
    input.value = result;
  }
});

const btnOpen = document.querySelector('[data-action="open-modal"]')
const btnOpen = document.querySelector('[data-action="open-modal"]')


const refs = {
  openModalBtn: document.querySelector('[data-action="open-modal"]'),
  closeModalBtn: document.querySelector('[data-action="close-modal"]'),
  backdrop: document.querySelector('.js-backdrop'),
};

refs.openModalBtn.addEventListener('click', onOpenModal);
refs.closeModalBtn.addEventListener('click', onCloseModal);
refs.backdrop.addEventListener('click', onBackdropClick);

function onOpenModal() {
  window.addEventListener('keydown', onEscKeyPress);
  document.body.classList.add('show-modal');
}

function onCloseModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  document.body.classList.remove('show-modal');
}

function onBackdropClick(event) {
  // console.log(event.currentTarget); // js-backdrop - элемент, на котором висит слушатель события
  // console.log(event.target); // целевой элемент - где буквально произошло это событие, т.е. на котором мы щелкнули
  if (event.currentTarget === event.target) {
    // console.log('Кликнули именно в бекдроп');
    document.body.classList.remove('show-modal');
  }
}

function onEscKeyPress(even) {
  console.log(even);
  if (even.code === 'Escape') {
    onCloseModal();
  }
}

