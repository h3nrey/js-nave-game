function start() { // Inicio da função start()
    game.timer = setInterval(Update,30);
	$("#start").hide(); //hidding the start message
	
    [
    "<div id='player' class='anima1'></div>",
    // "<div id='enemy1' class='anima2'></div>",
    // "<div id='player-friend' class='anima3'></div>",
    "<div id='scoreboard'></div>"].forEach((element) => {CreateElementInGame(element)})
    setTimeout(createFriend, 1000);
    setTimeout(CreateElementInGame("<div id='enemy1' class='anima2'></div>"), 800)
} // Fim da função start

function CreateElementInGame(element) {
    $("#game-background").append(element);
}

//Função GAME OVER
function gameOver() {
	fimdejogo=true;
	musica.pause();
	somGameover.play();
	
	window.clearInterval(game.timer);
	game.timer=null;

    ["#player","#enemy1","#player-friend"].forEach((el) => $(el).remove())
	
    CreateElementInGame("<div id='fim'></div>");
	
	$("#fim").html("<h1> Game Over </h1><p>Sua pontuação foi: " + pontos + "</p>" + "<div id='reinicia' onClick=reiniciaJogo()><h3>Jogar Novamente</h3></div>");
} 

function reiniciaJogo() {
	// somGameover.pause();
	$("#fim").remove();
    fimdejogo=false;
	// start();	
}
//Game Variables
var game = {}	
var fimdejogo=false;

var gameCanvas = document.querySelector("#game-background");
gameCanvasWidth = gameCanvas.offsetWidth;
gameCanvasHeight = gameCanvas.offsetHeight;

//Game Loop
	
function Update() {
    OnCollisionEnter2D();
    moveBackground();
    PlayerMovement();
    FriendMovement();
    HelicopterEnemyMovement();
    TruckEnemyMovement();
    PlayerEnergy();
    placar();

} // Fim da função loop()

const div = document.querySelector("div#start").addEventListener('click', start)

