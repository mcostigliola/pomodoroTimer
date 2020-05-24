const MAX_CNFG_VALUE = 99;
let configSessionMinutes = 25;
let configBreakMinutes = 5;

// Add event listener to id=session-up
document.getElementById('session-up').addEventListener('click', raiseSessionMinutes);
document.getElementById('session-down').addEventListener('click', decreaseSessionMinutes);
document.getElementById('break-up').addEventListener('click', raiseBreakMinutes);
document.getElementById('break-down').addEventListener('click', decreaseBreakMinutes);
// let configBreak

// Setto variabili minuti secondi e break
// Imposto session e break tramite pulsanti up and down
// Schiaccio il pulsante PLAY
// Arrivo a zero il countdown fermo il timer su 00:00
// Cambia testo e diventa break con i minuti del break
// Schiaccio pulsante PLAY per partire con il break
// Il countdown si ferma sullo 00:00
// Rivalorizzo in session con i minuti del pomodoro timer
// se premo play riparte un altro pomodoro

//TASTO UP
/*
se il valore e' inferiore o uguale a 99 (costante)
  incremento di uno il valore di session/break
*/
function raiseSessionMinutes(){
  if(configSessionMinutes < MAX_CNFG_VALUE){
    configSessionMinutes++;
    document.getElementById('session-minute').innerText = configSessionMinutes.toString();
    console.log(configSessionMinutes);
  }
}

//TASTO DOWN
/*
se il valore e' superiore a 0
   decremento di uno il valore di session/break

*/

function decreaseSessionMinutes(){
    if(configSessionMinutes > 0){
      configSessionMinutes--;
        document.getElementById('session-minute').innerText = configSessionMinutes.toString();
        console.log(configSessionMinutes);
    }
}

function raiseBreakMinutes(){
  if(configBreakMinutes < MAX_CNFG_VALUE){
    configBreakMinutes++;
    document.getElementById('break-minute').innerText = configBreakMinutes.toString();
    console.log(configBreakMinutes);
  }
}

function decreaseBreakMinutes(){
  if(configBreakMinutes > 0){
    configBreakMinutes--;
      document.getElementById('break-minute').innerText = configBreakMinutes.toString();
      console.log(configBreakMinutes);
  }
}
