const MAX_CNFG_VALUE = 99;
const DEFMINUTES = 25;
const DEFBREAK = 5;
let configSessionMinutes = DEFMINUTES;
let configBreakMinutes = DEFBREAK;
let timerMinutes = configSessionMinutes;
let timerSeconds = 0;
let intervalId;
let isPaused = true;
let isOnBreak = false;
let sessionP = document.getElementById('status');
document.getElementById('session-minute').innerText = configSessionMinutes.toString();
document.getElementById('break-minute').innerText = configBreakMinutes.toString();

let arrowBtns = Array.from(document.querySelectorAll('.arrow-btn'));
arrowBtns.forEach(btn => btn.addEventListener('click', pressArrow));

document.getElementById('btn-play').addEventListener('click', pressPlay);
document.getElementById('btn-pause').addEventListener('click', pressPause);
document.getElementById('btn-stop').addEventListener('click', pressStop);
document.getElementById('btn-reset').addEventListener('click', resetButton);

function pressArrow(e){
  //const buttonId = e.target.parentNode.id;
  const buttonId = e.target.id;
  changeConfigMinutes(buttonId);
  alignConfigWithDisplay(buttonId);
}

function alignConfigWithDisplay(buttonId){
  if(buttonId.includes('break')){
    updateDisplay();
    if(isPaused && isOnBreak){
      timerMinutes = configBreakMinutes;
      updateDisplay();
    }
  }else{
    updateDisplay();
    if(isPaused && !isOnBreak){
      timerMinutes = configSessionMinutes;
      updateDisplay();
    }
  }
}

function changeConfigMinutes(buttonId){
  switch(buttonId){
    case "session-up":
      if(configSessionMinutes < MAX_CNFG_VALUE) configSessionMinutes++;
      break;
    case "session-down":
      if(configSessionMinutes > 0) configSessionMinutes--;
      break;
    case "break-up":
      if(configBreakMinutes < MAX_CNFG_VALUE) configBreakMinutes++;
      break;
    case "break-down":
      if(configBreakMinutes > 0) configBreakMinutes--;
      break;
  }
}

function updateDisplay(){
  updateTimerText();
  udpateConfigText();
}

function updateTimerText(){
  let timer = '';
  timerMinutes < 10 ? timer = `0${timerMinutes}`: timer = timerMinutes;
  timerSeconds < 10 ? timer += `:0${timerSeconds}`: timer += `:${timerSeconds}`;
  document.getElementById('timer').innerText = timer;
}

function udpateConfigText(){
  document.getElementById('break-minute').innerText = configBreakMinutes.toString();
  document.getElementById('session-minute').innerText = configSessionMinutes.toString();
}

function countdown(){
   intervalId = setInterval(() => {
    if(isPaused === true){
      clearInterval(intervalId);
      return;
    }
    if (timerSeconds > 0){
          timerSeconds--;
          updateDisplay();
    }else{
      if (timerMinutes > 0){
        timerMinutes--;
        timerSeconds = 59;
        updateDisplay();
      } else {
        isPaused = true;
        switchStatus();
      }
    }
   }, 1000);
}

function pressPlay(){
  if (isPaused){
    countdown();
    isPaused = false;
  }
}

function pressPause(){
  if(!isPaused) isPaused = true;
}

function pressStop(){
  timerSeconds = 0;
  isPaused = true;
  if(isOnBreak){
    sessionP.innerText = "Break";
    timerMinutes = configBreakMinutes;
  }else{
    sessionP.innerText = "Session";
    timerMinutes = configSessionMinutes;
  }
  updateDisplay();
}

function resetButton(){
  configSessionMinutes = DEFMINUTES;
  configBreakMinutes = DEFBREAK;
  isPaused = true;
  isOnBreak = false;
  timerMinutes = configSessionMinutes;
  timerSeconds = 0;
  sessionP.innerText = "Session";
  updateDisplay();
}

function switchStatus(){
  clearInterval(intervalId);
  isOnBreak = !isOnBreak;
  if(isOnBreak){
    timerMinutes = configBreakMinutes;
    sessionP.innerText = "Break";
  } else {
    timerMinutes = configSessionMinutes;
    sessionP.innerText = "Session";
  }
  isPaused = true;
  updateDisplay();
}
