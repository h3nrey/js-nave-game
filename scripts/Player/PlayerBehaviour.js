var keys = {
	left: 37,
	up: 38,
	right: 39,
    down: 40,
    shootKey: 90,

}
game.pressed = [];
var canShoot =true;
const playerInstance = $("#player")

//UI
var pontos=0;
var salvos=0;
var perdidos=0;
var energiaAtual=3;

//Player Input
	
$(document).keydown(function(e){
	game.pressed[e.which] = true;
});


$(document).keyup(function(e){
    game.pressed[e.which] = false;
});


//Movement
function PlayerMovement() {
    const playerTop = parseInt($("#player").css("top"));
    const playerLeft = parseInt($("#player").css("left"));
	const playerSpeed = 10;
	if (game.pressed[keys.up]) {
        
        if (playerTop>=0) {
            $("#player").css("top",playerTop-playerSpeed);
        }        
	}
	
	if (game.pressed[keys.down]) {        
        if (playerTop<=434) {	             
            $("#player").css("top",playerTop+playerSpeed);
        }        
	}

    if (game.pressed[keys.right]) {        
        if (playerLeft <= (gameCanvasWidth / 1.3)) {	             
            $("#player").css("left",playerLeft+playerSpeed);
        }        
	}
    if (game.pressed[keys.left]) {        
        if (playerLeft >= 0) {	             
            $("#player").css("left",playerLeft-playerSpeed);
        }        
	}
    if (game.pressed[keys.shootKey]) {
        
        disparo();	
    }
	
}

function disparo() {
	
	if (canShoot==true) {
		
	canShoot=false;
    somDisparo.play();
	
	topo = parseInt($("#player").css("top"))
	posicaoX= parseInt($("#player").css("left"))
	tiroX = posicaoX + 190;
	topoTiro=topo+37;
	$("#game-background").append("<div id='disparo'></div");
	$("#disparo").css("top",topoTiro);
	$("#disparo").css("left",tiroX);
	
	var tempoDisparo=window.setInterval(executaDisparo, 30);
	
	} //Fecha canShoot
 
   	    function executaDisparo() {
	    posicaoX = parseInt($("#disparo").css("left"));
	    $("#disparo").css("left",posicaoX+15); 

        		if (posicaoX>900) {
						
			window.clearInterval(tempoDisparo);
			tempoDisparo=null;
			$("#disparo").remove();
			canShoot=true;
					
                   }
	} // Fecha executaDisparo()
} // Fecha disparo()

function PlayerEnergy() {
	
    if (energiaAtual==3) {
        
        $("#energy").css("background-image", "url(../../GraphicsElements/sprites/energia3.png)");
    }

    if (energiaAtual==2) {
        
        $("#energy").css("background-image", "url(../../GraphicsElements/sprites/energia2.png)");
    }

    if (energiaAtual==1) {
        
        $("#energy").css("background-image", "url(../../GraphicsElements/sprites/energia1.png)");
    }

    if (energiaAtual==0) {
        
        $("#energy").css("background-image", "url(../../GraphicsElements/sprites/energia0.png)");
        
        gameOver();
    }

}