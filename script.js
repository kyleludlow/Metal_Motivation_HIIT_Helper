let countdown;
const timerDisplay = document.querySelector('.display__main-time-left');
const roundTimerDisplay = document.querySelector('.display__round-time-left');


function mainTimer(seconds, round = 30, cooldowns = 15) {
  const now = Date.now();
  const then = now + seconds * 1000;
  timer(round);
  mainCountdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    if (secondsLeft < 0) {
      stopAudio();
      clearInterval(mainCountdown);
      clearInterval(countdown);
      playAudio('cooldown');
      return;
    }

    displayTimeLeft(secondsLeft, 'main');
  }, 1000);
}

function timer(seconds, type = 'roundStart', cooldown = false) {
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;

  playAudio(type);
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    console.log(cooldown);

    if (secondsLeft < 0) {
      stopAudio();
      clearInterval(countdown);
      if (!cooldown) {
        coolDown();
      } else {
        roundStart();
      }
      return;
    }

    displayTimeLeft(secondsLeft, 'round');
  }, 1000);
}


function coolDown(seconds = 15) {
  timer(seconds, 'cooldown', true);
}

function roundStart(seconds = 30) {
  timer(seconds, 'roundStart');
}

function displayTimeLeft(seconds, type) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;

  if (type === 'main') {
    document.title = display;
    timerDisplay.textContent = display;
  }

  if (type === 'round') {
    roundTimerDisplay.textContent = display;
  }

}

function playAudio(sound) {
  const audio = document.querySelector(`audio[data-key="${sound}"]`)

  stopAudio();
  audio.play();
}

function stopAudio() {
  // targets every single audio tag
  const audio = Array.from(document.querySelectorAll('audio'));
  // for each audio tag, stop and reset
  audio.forEach(song => {
    song.pause();
    song.currentTime = 0;
  });
}

document.tabataForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  mainTimer(mins * 60);

  //playAudio('roundStart');
  this.reset();
})
