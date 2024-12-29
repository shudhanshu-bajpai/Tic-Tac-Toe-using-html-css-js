let music = new Audio("music.mp3") ;
let audioTurn = new Audio("ting.mp3");
let audioOver = new Audio("gameover.mp3");
const boxes = document.querySelectorAll(".box");
const info = document.querySelector("#info");
const restartBtn = document.querySelector("#resetBtn");
const winConditions =
[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],    
];
let options = ["", "", "", "", "", "", "", "", ""] ;
let currentPlayer ="X" ;
let running = false ;
initializeGame() ;

function initializeGame(){
       boxes.forEach(box => box.addEventListener("click", boxClicked));
       restartBtn.addEventListener("click", restartGame);
       info.textContent = `${currentPlayer}'s turn` ;
       running = true ;
       
}
function boxClicked(){ 
     audioTurn.play() ;
    const boxIndex = parseInt(this.getAttribute("boxindex"));
       if(options[boxIndex] != "" || !running){
        return ;
       }
       updateBox(this, boxIndex) ;
       checkWinner();
}
function updateBox(box, index){
    options[index] = currentPlayer ;
    box.textContent = currentPlayer ;
    changePlayer() ;
    checkWinner() ;

} 
function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X" ;
    info.textContent = `${currentPlayer}'s turn` ;
} 
function checkWinner(){
    let roundWon = false ;

    for(let i=0 ; i<winConditions.length; i++){
        const condition = winConditions[i] ;
        const boxA = options[condition[0]] ;
        const boxB = options[condition[1]] ;
        const boxC = options[condition[2]] ;
       
        if(boxA == "" || boxB == "" || boxC == ""){
            continue ;
        }
        if (boxA == boxB && boxB == boxC ){
            roundWon = true ;
            break ;
          
        }
    }
    if(roundWon){
        running = false ;
        info.textContent = `${currentPlayer} Won !` ;
       
        return ;
    }
    else if(!options.includes("")){
        info.textContent = `Draw !` ;
        running = false ;
    }
    else{
        changePlayer() ;
     }
}
 function restartGame(){ 
      currentPlayer = "X" ;
      options = ["", "", "", "", "", "", "", "", ""] ;
      info.textContent = `${ currentPlayer}'s turn` ;
      boxes.forEach(box => box.textContent = "") ;
      running = true ;
 }
 let isMusicPlaying = false; // renamed for clarity
 function toggleMusic() {
     if (isMusicPlaying) {
         pauseMusic(); // If music is playing, pause it
     } else {
         playMusic(); // If music is not playing, play it
     }
 }
 
 function playMusic() {
     music.play();
     isMusicPlaying = true;
 }
 
 function pauseMusic() {
     music.pause();
     isMusicPlaying = false;
 }
 