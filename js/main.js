const elCaesarForm = document.querySelector('.js-coder-form');
const elCaesarInput = elCaesarForm.querySelector('.js-text-input');
const elCaesarOutput = elCaesarForm.querySelector('.js-text-output');
const elCaesarRotSelect = elCaesarForm.querySelector('.js-rot-select');
const elCaesarClearButton = elCaesarForm.querySelector('.js-clear-button');
const elCaesarCopyButton = elCaesarForm.querySelector('.js-copy-button');


//ROT-SELECT function
function showRotOptions() {
  const elRotFragment = document.createDocumentFragment();
  for (let rot = 1; rot <= 25; rot++) {
    const elRotOption = document.createElement('option');
    elRotOption.textContent = `ROT-${rot}`;
    elRotOption.value = rot;
    elRotFragment.appendChild(elRotOption);
  };
  elCaesarRotSelect.appendChild(elRotFragment);
};

function caser (str, amount) {
  let output = "";

  for (let i = 0; i < str.length; i++) {

    let c = str[i];

    if (c.match(/[a-z]/i)) {
      let code = str.charCodeAt(i);

      if (code >= 65 && code <= 90) {
        c = String.fromCharCode(((code - 65 + amount) % 26) + 65);
      }

      else if (code >= 97 && code <= 122) {
        c = String.fromCharCode(((code - 97 + amount) % 26) + 97);
      }
    }
    output += c;
  }

  elCaesarOutput.value = output;
};
showRotOptions();

elCaesarForm.addEventListener('input', evt => {
  evt.preventDefault();
  const userInput = elCaesarInput.value;
  const userRot = Number(elCaesarRotSelect.value);

  caser(userInput, userRot);
  elCaesarRotSelect.addEventListener('input', evt => {
    const userRot = Number(elCaesarRotSelect.value);
    caser(userInput, userRot);
  });
});

//CLEAR-BUTTON
if (elCaesarClearButton) {
  elCaesarClearButton.addEventListener('click', evt => {
    elCaesarInput.value = '';
    elCaesarOutput.value = '';
    caser(userInput, userRot);
  })
}

//COPY-BUTTON
elCaesarCopyButton.addEventListener('click', evt => {
  elCaesarOutput.select(elCaesarOutput.value);
  document.execCommand('copy');
});