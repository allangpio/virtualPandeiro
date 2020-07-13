const playBtn = document.querySelector('.play');
const symbolBtn = document.querySelector('.symbol');
playBtn.addEventListener('click', startLoop);

function startLoop() {
  playBtn.classList.toggle('active');
  symbolBtn.classList.toggle('symbol-active');
  if (!playBtn.classList.contains('active')) {
    return Tone.Transport.stop();
  } else {
    return Tone.Transport.start();
  }
}

sequencer();

function sequencer() {
  const grave = new Tone.Player('./sounds/grave.mp3').toMaster();
  const graveAbafado = new Tone.Player('./sounds/grave-abafado.mp3').toMaster();
  const platinela = new Tone.Player('./sounds/platinela.mp3').toMaster();
  const tapa = new Tone.Player('./sounds/tapa.mp3').toMaster();

  let index = 0;

  const bpm = document.querySelector('#number');
  const bpmValue = document.querySelector('#bpm-value');
  bpmValue.textContent = bpm.value;
  bpm.addEventListener('change', setTempo);
  function setTempo(e) {
    Tone.Transport.bpm.value = e.target.value;
    bpmValue.textContent = e.target.value;
  }

  Tone.Transport.scheduleRepeat(repeat, '8n');
  Tone.Transport.start();
  function repeat() {
    let step = index % 8;

    let graveInputs = document.querySelector(
      `.grave div:nth-child(${step + 2})`
    );
    let graveAbafadoInputs = document.querySelector(
      `.grave-abafado div:nth-child(${step + 2})`
    );
    let platinelaInputs = document.querySelector(
      `.platinela div:nth-child(${step + 2})`
    );
    let tapaInputs = document.querySelector(`.tapa div:nth-child(${step + 2})`);

    if (graveInputs.classList.contains('checked')) {
      grave.start();
    }

    if (graveAbafadoInputs.classList.contains('checked')) {
      graveAbafado.start();
    }

    if (platinelaInputs.classList.contains('checked')) {
      platinela.start();
    }

    if (tapaInputs.classList.contains('checked')) {
      tapa.start();
    }
    index++;
  }
}

btns = document.querySelectorAll('.input');
btns.forEach((btn) => {
  btn.addEventListener('click', toggleChecked);
});

function toggleChecked(e) {
  e.target.classList.toggle('checked');
}
