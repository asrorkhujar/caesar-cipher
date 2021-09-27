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

function Caser (str, amount) {
  // Wrap the amount
  if (amount < 0) {
    return caesarShift(str, amount + 26);
  }

  // Make an output variable
  var output = "";

  // Go through each character
  for (var i = 0; i < str.length; i++) {

    // Get the character we'll be appending
    var c = str[i];

    // If it's a letter...
    if (c.match(/[a-z]/i)) {
      // Get its code
      var code = str.charCodeAt(i);

      // Uppercase letters
      if (code >= 65 && code <= 90) {
        c = String.fromCharCode(((code - 65 + amount) % 26) + 65);
      }

      // Lowercase letters
      else if (code >= 97 && code <= 122) {
        c = String.fromCharCode(((code - 97 + amount) % 26) + 97);
      }
    }

    // Append
    output += c;
  }

  // All done!
  elCaesarOutput.value = output;
};

showRotOptions();

elCaesarForm.addEventListener('input', evt => {
  evt.preventDefault();
  const userInput = elCaesarInput.value;
  const userRot = Number(elCaesarRotSelect.value);

  Caser(userInput, userRot);
  elCaesarRotSelect.addEventListener('input', evt => {
    const userRot = Number(elCaesarRotSelect.value);
    Caser(userInput, userRot);
  });
});

//CLEAR-BUTTON
if (elCaesarClearButton) {
  elCaesarClearButton.addEventListener('click', evt => {
    elCaesarInput.value = '';
    elCaesarOutput.value = '';
    Caser(userInput, userRot);
  })
}

//COPY-BUTTON
elCaesarCopyButton.addEventListener('click', evt => {
  elCaesarOutput.select(elCaesarOutput.value);
  document.execCommand('copy');
});