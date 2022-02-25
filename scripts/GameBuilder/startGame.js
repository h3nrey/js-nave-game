function start() { // Inicio da função start()
    game.timer = setInterval(Update,30);
	$("#start").hide(); //hidding the start message
	
	$("#game-background").append("<div id='player' class='anima1'></div>"); //adding player element to the game-background div
	$("#game-background").append("<div id='enemy1' class='anima2'></div>");
	$("#game-background").append("<div id='enemy2' ></div>");
	$("#game-background").append("<div id='player-friend' class='anima3'></div>");
    $("#game-background").append("<div id='scoreboard'></div>");
    $("#game-background").append("<div id='energy'></div>");

} // Fim da função start

//Função GAME OVER
function gameOver() {
	fimdejogo=true;
	musica.pause();
	somGameover.play();
	
	window.clearInterval(game.timer);
	game.timer=null;
	
	$("#player").remove();
	$("#enemy1").remove();
	$("#enemy2").remove();
	$("#player-friend").remove();
	
	$("#game-background").append("<div id='fim'></div>");
	
	$("#fim").html("<h1> Game Over </h1><p>Sua pontuação foi: " + pontos + "</p>" + "<div id='reinicia' onClick=reiniciaJogo()><h3>Jogar Novamente</h3></div>");
} 

function reiniciaJogo() {
	somGameover.pause();
	$("#fim").remove();
    fimdejogo=false;
    $("#fim").remove();
	start();	
}
//Game Variables
var game = {}	
var fimdejogo=false;
var keys = {
	left: 37,
	up: 38,
	right: 39,
    down: 40,

}
let velocity=5;
let posY = parseInt(Math.random() * 334);

var podeAtirar =true;

//UI
var pontos=0;
var salvos=0;
var perdidos=0;
var energiaAtual=3;

//Audio
var somDisparo=document.getElementById("somDisparo");
var somExplosao=document.getElementById("somExplosao");
var musica=document.getElementById("musica");
var somGameover=document.getElementById("somGameover");
var somPerdido=document.getElementById("somPerdido");
var somResgate=document.getElementById("somResgate");

musica.addEventListener("ended", function(){ musica.currentTime = 0; musica.play(); }, false);
musica.play();
game.pressed = [];

//Player Input
	
$(document).keydown(function(e){
	game.pressed[e.which] = true;
});


$(document).keyup(function(e){
    game.pressed[e.which] = false;
});

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

function moveBackground() {
	
	left = parseInt($("#game-background").css("background-position"));
	$("#game-background").css("background-position",left-1);
	
}

function PlayerMovement() {
    const playerTop = parseInt($("#player").css("top"));
	
	if (game.pressed[keys.up]) {
        
        if (playerTop>=0) {
            $("#player").css("top",playerTop-10);
        }        
	}
	
	if (game.pressed[keys.down]) {        
        if (playerTop<=434) {	             
            $("#player").css("top",playerTop+10);
        }
        
	}
	
	if (game.pressed[keys.right]) {
		
		disparo();	
	}
}

function disparo() {
	
	if (podeAtirar==true) {
		
	podeAtirar=false;
    somDisparo.play();
	
	topo = parseInt($("#player").css("top"))
	posicaoX= parseInt($("#player").css("left"))
	tiroX = posicaoX + 190;
	topoTiro=topo+37;
	$("#game-background").append("<div id='disparo'></div");
	$("#disparo").css("top",topoTiro);
	$("#disparo").css("left",tiroX);
	
	var tempoDisparo=window.setInterval(executaDisparo, 30);
	
	} //Fecha podeAtirar
 
   	    function executaDisparo() {
	    posicaoX = parseInt($("#disparo").css("left"));
	    $("#disparo").css("left",posicaoX+15); 

        		if (posicaoX>900) {
						
			window.clearInterval(tempoDisparo);
			tempoDisparo=null;
			$("#disparo").remove();
			podeAtirar=true;
					
                   }
	} // Fecha executaDisparo()
} // Fecha disparo()

function FriendMovement() {
	
	posX = parseInt($("#player-friend").css("left"));
	$("#player-friend").css("left",posX+1);
				
		if (posX>906) {
			
		$("#player-friend").css("left",0);
					
	}

}

function HelicopterEnemyMovement() {

	posX = parseInt($("#enemy1").css("left"));
	$("#enemy1").css("left",posX-velocity);
	$("#enemy1").css("top",posY);
		
    if (posX<=-20) {
        posY = parseInt(Math.random() * 334);
        $("#enemy1").css("left",694);
        $("#enemy1").css("top",posY);
        
    }
}

function TruckEnemyMovement() {
    posX = parseInt($("#enemy2").css("left"));
    $("#enemy2").css("left",posX-3);
            
    if (posX<=0) {        
        $("#enemy2").css("left",775);                
    }
}

function OnCollisionEnter2D() {
	var colisao1 = ($("#player").collision($("#enemy1")));
	var colisao2 = ($("#player").collision($("#enemy2")));
    var colisao3 = ($("#disparo").collision($("#enemy1")));
    var colisao4 = ($("#disparo").collision($("#enemy2")));
    var colisao5 = ($("#player").collision($("#player-friend")));
    var colisao6 = ($("#enemy2").collision($("#player-friend")));

	if (colisao1.length>0) {
        inimigo1X = parseInt($("#enemy1").css("left"));
        inimigo1Y = parseInt($("#enemy1").css("top"));
        explosion1(inimigo1X,inimigo1Y);
        energiaAtual--;
        posicaoY = parseInt(Math.random() * 334);
        $("#enemy1").css("left",694);
        $("#enemy1").css("top",posicaoY);
    }

    // jogador com o inimigo2 
    if (colisao2.length>0) {
	
        inimigo2X = parseInt($("#enemy2").css("left"));
        inimigo2Y = parseInt($("#enemy2").css("top"));
        explosion1(inimigo2X,inimigo2Y);
        energiaAtual--;       
        $("#enemy2").remove();
            
        reposicionaInimigo2();
            
    }	

    // Disparo com o inimigo1
    if (colisao3.length>0) {
		
		
        inimigo1X = parseInt($("#enemy1").css("left"));
        inimigo1Y = parseInt($("#enemy1").css("top"));
        pontos=pontos+100;
        velocity=velocity+0.3;
            
        explosion1(inimigo1X,inimigo1Y);
        $("#disparo").css("left",950);
            
        posicaoY = parseInt(Math.random() * 334);
        $("#enemy1").css("left",694);
        $("#enemy1").css("top",posicaoY);
    }

    // Disparo com o inimigo2
    if (colisao4.length>0) {
		
        inimigo2X = parseInt($("#enemy2").css("left"));
        inimigo2Y = parseInt($("#enemy2").css("top"));
        pontos=pontos+50;
        $("#enemy2").remove();
    
        explosion1(inimigo2X,inimigo2Y);
        $("#disparo").css("left",950);
        
        reposicionaInimigo2();
            
    }

    // jogador com o amigo
		
	if (colisao5.length>0) {		
        reposicionaAmigo();
        somResgate.play();
        salvos++;
        $("#player-friend").remove();
    }

    //Inimigo2 com o amigo
		
    if (colisao6.length>0) {
            
        amigoX = parseInt($("#player-friend").css("left"));
        amigoY = parseInt($("#player-friend").css("top"));
        explosao3(amigoX,amigoY);
        perdidos++;
        somPerdido.play();
        $("#player-friend").remove();
                
        reposicionaAmigo();
                
    }
}

function explosion1(inimigo1X,inimigo1Y) {
	$("#game-background").append("<div id='explosion1'></div");
	var div=$("#explosion1");
	div.css("top", inimigo1Y);
	div.css("left", inimigo1X);
	div.animate({width:200, opacity:0}, "slow");
    somExplosao.play();
	
	var tempoExplosao=window.setInterval(removeExplosao, 1000);
	
		function removeExplosao() {
			
			div.remove();
			window.clearInterval(tempoExplosao);
			tempoExplosao=null;
			
		}
		
}

function explosion2(inimigo2X,inimigo2Y) {
	
	$("#game-background").append("<div id='explosao2'></div");
	var div2=$("#explosion2");
	div2.css("top", inimigo2Y);
	div2.css("left", inimigo2X);
	div2.animate({width:200, opacity:0}, "slow");
	
	var tempoExplosao2=window.setInterval(removeExplosao2, 1000);
	
		function removeExplosao2() {
			
			div2.remove();
			window.clearInterval(tempoExplosao2);
			tempoExplosao2=null;
			
		}
		
		
} 

function explosao3(amigoX,amigoY) {
    $("#game-background").append("<div id='explosao3' class='anima4'></div");
    $("#explosao3").css("top",amigoY);
    $("#explosao3").css("left",amigoX);

    var tempoExplosao3=window.setInterval(resetaExplosao3, 1000);
    
    function resetaExplosao3() {
    $("#explosao3").remove();
    window.clearInterval(tempoExplosao3);
    tempoExplosao3=null;
            
    }
}

function reposicionaInimigo2() {
	
	var tempoColisao4=window.setInterval(reposiciona4, 5000);
		
		function reposiciona4() {
		window.clearInterval(tempoColisao4);
		tempoColisao4=null;
			
			if (fimdejogo==false) {
			
			$("#game-background").append("<div id=enemy2></div");
			
			}
			
		}	
}

function reposicionaAmigo() {
	
	var tempoAmigo=window.setInterval(reposiciona6, 6000);
	
		function reposiciona6() {
		window.clearInterval(tempoAmigo);
		tempoAmigo=null;
		
		if (fimdejogo==false) {
		
		$("#game-background").append("<div id='player-friend' class='anima3'></div>");
		
		}
		
	}
	
}

function placar() {
	
	$("#scoreboard").html("<h2> Pontos: " + pontos + " Salvos: " + salvos + " Perdidos: " + perdidos + "</h2>");
	
}

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

const div = document.querySelector("div#start").addEventListener('click', start)