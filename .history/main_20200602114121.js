const MAX_CNFG_VALUE = 99;
const DEFMINUTES = 25;
const DEFBREAK = 5;
let configSessionMinutes = DEFMINUTES;
let configBreakMinutes = DEFBREAK;
let timerMinutes = configSessionMinutes;
let timerSeconds = 0;
let interval;
let isPaused = true;
let isOnBreak = false;

document.getElementById('session-minute').innerText = configSessionMinutes.toString();
document.getElementById('break-minute').innerText = configBreakMinutes.toString();

document.getElementById('session-up').addEventListener('click', raiseSessionMinutes);
document.getElementById('session-down').addEventListener('click', decreaseSessionMinutes);
document.getElementById('break-up').addEventListener('click', raiseBreakMinutes);
document.getElementById('break-down').addEventListener('click', decreaseBreakMinutes);
document.getElementById('btn-play').addEventListener('click', pressPlay);
document.getElementById('btn-pause').addEventListener('click', pressPause);
document.getElementById('btn-stop').addEventListener('click', pressStop);
document.getElementById('btn-reset').addEventListener('click', resetButton);


function raiseSessionMinutes(){
  if(configSessionMinutes < MAX_CNFG_VALUE){
    configSessionMinutes++;
    document.getElementById('session-minute').innerText = configSessionMinutes.toString();
  }
}

function decreaseSessionMinutes(){
    if(configSessionMinutes > 0){
      configSessionMinutes--;
        document.getElementById('session-minute').innerText = configSessionMinutes.toString();
    }
}

function raiseBreakMinutes(){
  if(configBreakMinutes < MAX_CNFG_VALUE){
    configBreakMinutes++;
    document.getElementById('break-minute').innerText = configBreakMinutes.toString();
  }
}

function decreaseBreakMinutes(){
  if(configBreakMinutes > 0){
    configBreakMinutes--;
      document.getElementById('break-minute').innerText = configBreakMinutes.toString();
  }
}

function updateDisplay(){
  let timer = '';
  timerMinutes < 10 ? timer = `0${timerMinutes}`: timer = timerMinutes;
  timerSeconds < 10 ? timer += `:0${timerSeconds}`: timer += `:${timerSeconds}`;
  document.getElementById('timer').innerText = timer;
}

function countdown(){
   interval = setInterval(() => {
    if(isPaused === true){
      clearInterval(interval);
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
  timerMinutes = configSessionMinutes;
  updateDisplay();
  isPaused = true;
  isOnBreak = false;
}

function resetButton(){
  configSessionMinutes = DEFMINUTES;
  configBreakMinutes = DEFBREAK;
  document.getElementById('session-minute').innerText = configSessionMinutes.toString();
  document.getElementById('break-minute').innerText = configBreakMinutes.toString();
  pressStop();
}

function switchStauts(){
  isOnBreak = !isOnBreak;
  let sessionP = document.getElementById('session');
  if(isOnBreak){
    timerMinutes = configBreakMinutes;
    sessionP.innerText = "Break";
  } else {
    timerMinutes = configSessionMinutes;
    sessionP.innerText = "Session";
  }
  updateDisplay();
}
