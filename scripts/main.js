// //////////////////////////////
// // Main function

// play notes
function playNote(event) {
  //get keyCode
  let noteKeyCode = getKeyCode(event);

  // Btn of the app that was pressed
  const btn = document.querySelector(`[data-key="${noteKeyCode}"]`);

  // Do nothing if keypressed doesn't correnpond to any Note
  const invalidBtn = !btn;
  if (invalidBtn) {
    return;
  }
  // play audio and click style
  addPlayingClass(btn);
  playNoteAudio(noteKeyCode);
}

// //////////
// // Helpers functions

// Funtion to get keyCode
function getKeyCode(event) {
  let keyCode;

  const isKeyboard = event.type === 'keydown';
  if (isKeyboard) {
    keyCode = event.keyCode;
  } else {
    keyCode = event.target.dataset.key;
  }
  return keyCode;
}

// Function to play note audio
function playNoteAudio(noteKeyCode) {
  const note = document.querySelector(`audio[data-key="${noteKeyCode}"]`);
  note.currentTime = 0;
  note.play();
}

// Function to add the onclick css style to keypressed
function addPlayingClass(btn) {
  btn.classList.add('btn-active');
  let pandeiro = document.querySelector('.pandeiro');
  pandeiro.classList.toggle('pandeiro-active');
}

function removePlayingClass(event) {
  event.target.classList.remove('btn-active');
}

////////////////////////////////////
// Event listeners

// function to initialize the registration of the  eventListeners
function initRegEvents() {
  // GET ALL BUTTONS
  const btns = document.querySelectorAll('.btn');

  // click with mouse
  btns.forEach((btn) => {
    btn.addEventListener('click', playNote);
    btn.addEventListener('touchstart', playNote);
    btn.addEventListener('transitionend', removePlayingClass);
  });

  // get keypress event
  window.addEventListener('keydown', playNote);

  //////
  // MODAL
  const modal = document.querySelector('.modal');
  const exit = document.querySelector('.exit');
  const instructions = document.querySelector('.instructions');

  exit.addEventListener('click', function () {
    modal.style.display = 'none';
  });

  instructions.addEventListener('click', function () {
    modal.style.display = 'block';
  });
}

window.addEventListener('load', initRegEvents);
